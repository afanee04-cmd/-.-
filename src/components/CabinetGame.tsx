import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Flame,
  Award,
} from 'lucide-react';
import { MedicineItem, MedicineCategory } from '../types/medicine';
import { ALL_MEDICINES, CATEGORY_NAMES } from '../data/medicinesData';
import { VisualBottle } from './VisualBottle';
import { MedicineDetailModal } from './MedicineDetailModal';
import { soundEffects } from '../utils/audio';
import { getItemVisualIcon } from '../utils/itemVisuals';

interface CabinetGameProps {
  onScoreUpdate: (points: number) => void;
  onItemSolved: () => void;
}

export const CabinetGame: React.FC<CabinetGameProps> = ({ onScoreUpdate, onItemSolved }) => {
  // Shelves state: mapping category -> MedicineItem[]
  const [shelves, setShelves] = useState<Record<MedicineCategory, MedicineItem[]>>({
    internal: [],
    external: [],
    firstaid: [],
    hazard: [],
  });

  // Items remaining to be sorted on the table
  const [remainingItems, setRemainingItems] = useState<MedicineItem[]>([]);
  // Currently selected item for click-to-place (mobile friendly)
  const [selectedItem, setSelectedItem] = useState<MedicineItem | null>(null);
  // Detailed modal inspector
  const [inspectedItem, setInspectedItem] = useState<MedicineItem | null>(null);

  // Gameplay feedback toast
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong';
    message: string;
    detail: string;
  } | null>(null);

  // Game stats
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<MedicineItem | null>(null);

  // Initialize a fresh game round
  const startNewGame = () => {
    // Shuffle all items and pick 12 diverse items for an exciting round
    const shuffled = [...ALL_MEDICINES].sort(() => 0.5 - Math.random());
    // Ensure we have items from all 4 categories in the mix
    const internalList = shuffled.filter((m) => m.category === 'internal').slice(0, 3);
    const externalList = shuffled.filter((m) => m.category === 'external').slice(0, 3);
    const firstAidList = shuffled.filter((m) => m.category === 'firstaid').slice(0, 3);
    const hazardList = shuffled.filter((m) => m.category === 'hazard').slice(0, 3);

    const roundItems = [...internalList, ...externalList, ...firstAidList, ...hazardList].sort(
      () => 0.5 - Math.random()
    );

    setShelves({
      internal: [],
      external: [],
      firstaid: [],
      hazard: [],
    });
    setRemainingItems(roundItems);
    setSelectedItem(null);
    setInspectedItem(null);
    setFeedback(null);
    setCombo(0);
    setIsGameCompleted(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Handle sorting attempt to a specific target category
  const handleSortItem = (item: MedicineItem, targetCategory: MedicineCategory) => {
    if (item.category === targetCategory) {
      // CORRECT PLACEMENT!
      soundEffects.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const comboBonus = Math.min(newCombo * 20, 100);
      const points = 100 + comboBonus;
      onScoreUpdate(points);
      onItemSolved();

      // Place in shelf
      setShelves((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], item],
      }));

      // Remove from table
      const nextRemaining = remainingItems.filter((i) => i.id !== item.id);
      setRemainingItems(nextRemaining);
      setSelectedItem(null);

      setFeedback({
        type: 'correct',
        message: `จัดถูกชั้นแล้ว! (+${points} คะแนน)`,
        detail: item.explanation,
      });

      // Check if finished
      if (nextRemaining.length === 0) {
        setIsGameCompleted(true);
        soundEffects.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      // WRONG PLACEMENT!
      soundEffects.playWrong();
      setCombo(0);

      let hint = '';
      if (item.category === 'hazard') {
        hint = `ระวัง! "${item.name}" เป็นของอันตราย/ยาหมดอายุ ต้องทิ้งลงถังขยะอันตราย ห้ามวางในตู้ยา!`;
      } else if (item.labelType === 'red_external') {
        hint = `สังเกตฉลากสีแดง! "${item.name}" เป็นยาใช้ภายนอก ห้ามรับประทาน ต้องวางชั้น 2`;
      } else if (item.category === 'internal') {
        hint = `"${item.name}" เป็นยาสำหรับกิน (ยาใช้ภายใน) ต้องวางชั้นที่ 1 บนสุด`;
      } else {
        hint = `"${item.name}" เป็นอุปกรณ์ปฐมพยาบาล ต้องวางชั้นที่ 3`;
      }

      setFeedback({
        type: 'wrong',
        message: 'ยังไม่ถูกต้องนะ ลองสังเกตฉลากและคำเตือนอีกครั้ง!',
        detail: hint,
      });
    }
  };

  // Drag and Drop handlers
  const onDragStart = (item: MedicineItem) => {
    setDraggedItem(item);
    soundEffects.playSelect();
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (targetCategory: MedicineCategory) => {
    if (draggedItem) {
      handleSortItem(draggedItem, targetCategory);
      setDraggedItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Guidelines */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-lg text-slate-800">
              ภารกิจจัดตู้ยาสามัญประจำบ้านตามหลัก อย.น้อย
            </h2>
            {combo > 1 && (
              <span className="flex items-center space-x-1 text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>คอมโบ x{combo}!</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            แยกยาใช้ภายใน (ชั้นบน) · ยาใช้ภายนอกฉลากแดง (ชั้นกลาง) · เวชภัณฑ์ (ชั้นล่าง) · และคัดทิ้งยาหมดอายุ/ของอันตรายลงถังขยะ
          </p>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-center">
          <button
            onClick={() => {
              soundEffects.playSelect();
              startNewGame();
            }}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>เริ่มรอบใหม่</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start space-x-3 transition-all ${
            feedback.type === 'correct'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          {feedback.type === 'correct' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs">
            <div className="font-bold text-sm">{feedback.message}</div>
            <div className="mt-0.5 leading-relaxed opacity-90">{feedback.detail}</div>
          </div>
        </div>
      )}

      {/* Main Game Stage: Cabinet (Left/Center) + Desk / Staging Tray (Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cabinet Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-gradient-to-b from-amber-800 to-amber-950 p-3 sm:p-5 rounded-3xl shadow-xl border-4 border-amber-900">
            {/* Cabinet Roof/Header */}
            <div className="bg-amber-900/90 rounded-t-xl p-2.5 text-center border-b-2 border-amber-700/60 flex items-center justify-between px-4">
              <span className="text-white text-xs font-bold flex items-center space-x-1">
                <span>🛡️</span>
                <span>ตู้ยาสามัญประจำบ้าน (มาตรฐาน อย.)</span>
              </span>
              <span className="text-amber-200 text-[11px]">
                ติดสูงพ้นมือเด็กเล็ก · หลีกเลี่ยงแสงแดดและความชื้น
              </span>
            </div>

            {/* Cabinet Interior (3 Shelves) */}
            <div className="bg-[#fbf7ee] p-3 sm:p-4 rounded-b-xl space-y-3.5 shadow-inner min-h-[460px] flex flex-col justify-between">
              {/* SHELF 1: Internal Medicines (ยาใช้ภายใน) */}
              <div
                onDragOver={onDragOver}
                onDrop={() => onDrop('internal')}
                onClick={() => selectedItem && handleSortItem(selectedItem, 'internal')}
                className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer min-h-[125px] flex flex-col justify-between ${
                  selectedItem
                    ? 'border-blue-400 bg-blue-50/70 hover:bg-blue-100/70 ring-2 ring-blue-300'
                    : 'border-blue-200/90 bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between border-b border-blue-100 pb-1 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">💊</span>
                    <span className="font-bold text-xs text-blue-900">ชั้นที่ 1: ยาใช้ภายใน (รับประทาน)</span>
                  </div>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    ลดไข้ · แก้ปวด · ท้องเสีย · แน่นท้อง
                  </span>
                </div>

                {/* Items placed on shelf 1 */}
                <div className="flex flex-wrap gap-2.5 items-end min-h-[64px]">
                  {shelves.internal.length === 0 ? (
                    <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1">
                      <span>ว่างเปล่า (ลากหรือคลิกยาวางที่นี่)</span>
                    </div>
                  ) : (
                    shelves.internal.map((item) => (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedItem(item);
                        }}
                        className="cursor-pointer"
                        title="คลิกเพื่อดูรายละเอียด"
                      >
                        <VisualBottle item={item} size="sm" showDetails />
                      </div>
                    ))
                  )}
                </div>

                {/* Wooden Shelf Bar */}
                <div className="h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-xs mt-1" />
              </div>

              {/* SHELF 2: External Medicines (ยาใช้ภายนอก - ฉลากสีแดง) */}
              <div
                onDragOver={onDragOver}
                onDrop={() => onDrop('external')}
                onClick={() => selectedItem && handleSortItem(selectedItem, 'external')}
                className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer min-h-[125px] flex flex-col justify-between ${
                  selectedItem
                    ? 'border-rose-400 bg-rose-50/70 hover:bg-rose-100/70 ring-2 ring-rose-300'
                    : 'border-rose-200/90 bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between border-b border-rose-100 pb-1 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">🧴</span>
                    <span className="font-bold text-xs text-rose-900">
                      ชั้นที่ 2: ยาใช้ภายนอก (ฉลากสีแดง "ห้ามรับประทาน")
                    </span>
                  </div>
                  <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    ทาแผล · ล้างแผล · ยาหม่อง · คาราไมน์
                  </span>
                </div>

                {/* Items placed on shelf 2 */}
                <div className="flex flex-wrap gap-2.5 items-end min-h-[64px]">
                  {shelves.external.length === 0 ? (
                    <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1">
                      <span>ว่างเปล่า (ลากหรือคลิกยาวางที่นี่)</span>
                    </div>
                  ) : (
                    shelves.external.map((item) => (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedItem(item);
                        }}
                        className="cursor-pointer"
                        title="คลิกเพื่อดูรายละเอียด"
                      >
                        <VisualBottle item={item} size="sm" showDetails />
                      </div>
                    ))
                  )}
                </div>

                {/* Wooden Shelf Bar */}
                <div className="h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-xs mt-1" />
              </div>

              {/* SHELF 3: First Aid Supplies (เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล) */}
              <div
                onDragOver={onDragOver}
                onDrop={() => onDrop('firstaid')}
                onClick={() => selectedItem && handleSortItem(selectedItem, 'firstaid')}
                className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer min-h-[125px] flex flex-col justify-between ${
                  selectedItem
                    ? 'border-emerald-400 bg-emerald-50/70 hover:bg-emerald-100/70 ring-2 ring-emerald-300'
                    : 'border-emerald-200/90 bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between border-b border-emerald-100 pb-1 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">🩹</span>
                    <span className="font-bold text-xs text-emerald-900">
                      ชั้นที่ 3: เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    พลาสเตอร์ · ผ้าก๊อซ · สำลี · ปรอทวัดไข้
                  </span>
                </div>

                {/* Items placed on shelf 3 */}
                <div className="flex flex-wrap gap-2.5 items-end min-h-[64px]">
                  {shelves.firstaid.length === 0 ? (
                    <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1">
                      <span>ว่างเปล่า (ลากหรือคลิกยาวางที่นี่)</span>
                    </div>
                  ) : (
                    shelves.firstaid.map((item) => (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedItem(item);
                        }}
                        className="cursor-pointer"
                        title="คลิกเพื่อดูรายละเอียด"
                      >
                        <VisualBottle item={item} size="sm" showDetails />
                      </div>
                    ))
                  )}
                </div>

                {/* Wooden Shelf Bar */}
                <div className="h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-xs mt-1" />
              </div>
            </div>
          </div>

          {/* Hazardous / Expired Bin Zone (ถังขยะอันตราย อย.น้อย) */}
          <div
            onDragOver={onDragOver}
            onDrop={() => onDrop('hazard')}
            onClick={() => selectedItem && handleSortItem(selectedItem, 'hazard')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-3 ${
              selectedItem
                ? 'border-red-500 bg-red-100/90 hover:bg-red-200 ring-2 ring-red-400'
                : 'border-red-300 bg-red-50/80 hover:bg-red-100/50'
            }`}
          >
            <div className="flex items-center space-x-3 text-red-950">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                🗑️
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-red-900 flex items-center space-x-1.5">
                  <span>ถังขยะอันตราย / คัดแยกสิ่งต้องห้ามในตู้ยา</span>
                  <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.5 rounded font-bold">
                    ห้ามใส่ตู้ยา!
                  </span>
                </div>
                <p className="text-xs text-red-800">
                  สำหรับ: ยาหมดอายุ (EXP) · ยาปฏิชีวนะ (Amoxicillin) · ยาชุดสเตียรอยด์ · สารเคมีล้างห้องน้ำ · ลูกอมขนม
                </p>
              </div>
            </div>

            {/* Dropped hazard items */}
            <div className="flex items-center space-x-1 shrink-0">
              {shelves.hazard.length > 0 && (
                <div className="flex -space-x-2 overflow-hidden py-1">
                  {shelves.hazard.map((h) => (
                    <span
                      key={h.id}
                      className="inline-block w-7 h-7 rounded-full bg-red-200 border-2 border-red-500 text-xs flex items-center justify-center shadow-xs cursor-pointer"
                      title={h.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedItem(h);
                      }}
                    >
                      {getItemVisualIcon(h)}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-xs font-semibold text-red-700 bg-red-200/70 px-2.5 py-1 rounded-lg">
                คัดทิ้ง {shelves.hazard.length} ชิ้น
              </span>
            </div>
          </div>
        </div>

        {/* Desk / Staging Tray (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-800">
                  โต๊ะตรวจยา อย.น้อย (รอจัดเข้าตู้)
                </h3>
                <span className="text-[11px] text-slate-500">
                  เหลือ {remainingItems.length} ชิ้น
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                สัมผัสหรือลากเพื่อจัด
              </span>
            </div>

            {/* Instructions */}
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>วิธีเล่น:</span>
              </div>
              <p>1. แตะเลือกยา หรือลาก (Drag) ไปยังชั้นที่ต้องการ</p>
              <p>2. กดไอคอน 🔍 แว่นขยายเพื่อส่องดูฉลาก วันหมดอายุ และสรรพคุณ</p>
            </div>

            {/* Staging items grid */}
            {remainingItems.length === 0 ? (
              <div className="py-12 text-center space-y-3 bg-emerald-50/50 rounded-2xl border border-emerald-200 p-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                  🎉
                </div>
                <h4 className="font-heading font-bold text-slate-800">จัดตู้ยาเสร็จสมบูรณ์!</h4>
                <p className="text-xs text-slate-600">
                  สุดยอดมาก! ตู้ยาของคุณผ่านเกณฑ์มาตรฐานความปลอดภัย อย.น้อย เรียบร้อยแล้ว
                </p>
                <button
                  onClick={startNewGame}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  เล่นอีกรอบ (สุ่มยาชุดใหม่)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto p-1">
                {remainingItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => onDragStart(item)}
                      onClick={() => {
                        soundEffects.playSelect();
                        setSelectedItem(isSelected ? null : item);
                      }}
                      className={`relative p-2.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[140px] text-center ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300 scale-102'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* Zoom Inspector Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedItem(item);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 bg-white hover:bg-slate-100 rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 shadow-xs z-10"
                        title="ส่องดูฉลากยา"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      <VisualBottle item={item} size="sm" />

                      <div className="mt-2 w-full">
                        <span className="text-[11px] font-semibold text-slate-800 line-clamp-2 leading-tight block">
                          {item.thaiName}
                        </span>
                        <span className="text-[9px] text-slate-400 block mt-0.5 truncate">
                          {item.expiryDate}
                        </span>
                      </div>

                      {/* Quick place buttons when selected */}
                      {isSelected && (
                        <div className="mt-2 w-full pt-1 border-t border-emerald-200 space-y-1">
                          <span className="text-[9.5px] font-bold text-emerald-800 block">
                            แตะชั้นตู้ยา หรือกด:
                          </span>
                          <div className="grid grid-cols-2 gap-1 text-[9px] font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSortItem(item, 'internal');
                              }}
                              className="bg-blue-600 text-white rounded py-1 hover:bg-blue-700"
                            >
                              ชั้น 1 (ใน)
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSortItem(item, 'external');
                              }}
                              className="bg-rose-600 text-white rounded py-1 hover:bg-rose-700"
                            >
                              ชั้น 2 (นอก)
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSortItem(item, 'firstaid');
                              }}
                              className="bg-emerald-600 text-white rounded py-1 hover:bg-emerald-700"
                            >
                              ชั้น 3 (เวชภัณฑ์)
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSortItem(item, 'hazard');
                              }}
                              className="bg-red-700 text-white rounded py-1 hover:bg-red-800"
                            >
                              ทิ้งขยะ
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Detail Inspector Modal */}
      <MedicineDetailModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
        onSortToCategory={
          inspectedItem && remainingItems.some((r) => r.id === inspectedItem.id)
            ? (category) => handleSortItem(inspectedItem, category)
            : undefined
        }
      />
    </div>
  );
};
