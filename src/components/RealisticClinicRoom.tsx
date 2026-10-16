import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HeartPulse,
  Info,
  Cloud,
  BookOpen,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { MedicineItem, MedicineCategory, ProductDomain } from '../types/medicine';
import { ALL_MEDICINES } from '../data/medicinesData';
import { ALL_HEALTH_PRODUCTS } from '../data/healthProductsData';
import { VisualBottle } from './VisualBottle';
import { MedicineDetailModal } from './MedicineDetailModal';
import { FdaCareGuideModal } from './FdaCareGuideModal';
import { soundEffects } from '../utils/audio';

interface RealisticClinicRoomProps {
  playerName: string;
  initialDomain?: ProductDomain;
  onGoHome: () => void;
  onOpenCloudRank: () => void;
}

export const RealisticClinicRoom: React.FC<RealisticClinicRoomProps> = ({
  playerName,
  initialDomain = 'medicine',
  onGoHome,
  onOpenCloudRank,
}) => {
  const [domain, setDomain] = useState<ProductDomain>(initialDomain);
  const [isFdaGuideOpen, setIsFdaGuideOpen] = useState(false);

  // Shelves state: mapping category -> MedicineItem[]
  const [woodenShelves, setWoodenShelves] = useState<Record<MedicineCategory, MedicineItem[]>>({
    internal: [],
    external: [],
    firstaid: [],
    hazard: [],
  });

  // Desk medicines waiting to be organized
  const [deskItems, setDeskItems] = useState<MedicineItem[]>([]);
  // Selected item (for click-to-place fallback on touch)
  const [selectedItem, setSelectedItem] = useState<MedicineItem | null>(null);
  // Dragged item (for actual HTML5 drag & drop)
  const [draggedItem, setDraggedItem] = useState<MedicineItem | null>(null);
  // Hovered shelf target
  const [hoveredShelf, setHoveredShelf] = useState<MedicineCategory | null>(null);
  // Detailed modal inspector
  const [inspectedItem, setInspectedItem] = useState<MedicineItem | null>(null);

  // Score & feedback
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong';
    title: string;
    detail: string;
  } | null>(null);

  // Initialize fresh round of medicines on desk
  const initDeskCabinet = (targetDomain: ProductDomain = domain) => {
    let pool: MedicineItem[] = [];
    if (targetDomain === 'health_products') {
      pool = ALL_HEALTH_PRODUCTS;
    } else if (targetDomain === 'all') {
      pool = [...ALL_MEDICINES, ...ALL_HEALTH_PRODUCTS];
    } else {
      pool = ALL_MEDICINES;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const items = shuffled.slice(0, 10);

    setWoodenShelves({
      internal: [],
      external: [],
      firstaid: [],
      hazard: [],
    });
    setDeskItems(items);
    setSelectedItem(null);
    setDraggedItem(null);
    setFeedback(null);
  };

  useEffect(() => {
    initDeskCabinet(domain);
  }, [domain]);

  // Handle dropping item onto a wooden shelf
  const handleDropOnShelf = (targetCategory: MedicineCategory, itemToPlace?: MedicineItem) => {
    const item = itemToPlace || draggedItem || selectedItem;
    if (!item) return;

    if (item.category === targetCategory) {
      // CORRECT!
      soundEffects.playCorrect();
      soundEffects.playDrop();

      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 100 + newCombo * 20;
      setScore((prev) => prev + points);

      setWoodenShelves((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], item],
      }));

      const remaining = deskItems.filter((i) => i.id !== item.id);
      setDeskItems(remaining);
      setSelectedItem(null);
      setDraggedItem(null);
      setHoveredShelf(null);

      let categoryTitle = '';
      if (domain === 'health_products') {
        if (targetCategory === 'internal') categoryTitle = 'หมวดอาหาร & เสริมอาหาร (เลข อย. 13 หลัก)';
        else if (targetCategory === 'external') categoryTitle = 'หมวดเครื่องสำอาง (ใบรับจดแจ้ง 10 หลัก)';
        else if (targetCategory === 'firstaid') categoryTitle = 'หมวดเครื่องมือแพทย์ (ใบอนุญาต/จดแจ้ง อย.)';
        else categoryTitle = 'วัตถุอันตรายในบ้านเรือน วอส. / สารปนเปื้อน (ถังขยะอันตราย)';
      } else if (domain === 'all') {
        if (targetCategory === 'internal') categoryTitle = item.healthCategory === 'food' ? 'หมวดอาหาร/เสริมอาหาร (อย. 13 หลัก)' : 'หมวดยาใช้ภายใน (สำหรับรับประทาน)';
        else if (targetCategory === 'external') categoryTitle = item.healthCategory === 'cosmetic' ? 'หมวดเครื่องสำอาง (เลขจดแจ้ง 10 หลัก)' : 'หมวดยาใช้ภายนอก (ฉลากสีแดง ห้ามรับประทาน)';
        else if (targetCategory === 'firstaid') categoryTitle = item.healthCategory === 'med_device' ? 'หมวดเครื่องมือแพทย์ อย.' : 'หมวดเวชภัณฑ์และอุปกรณ์ปฐมพยาบาล';
        else categoryTitle = 'ของอันตราย/ยาหมดอายุ/วัตถุอันตราย วอส.';
      } else {
        if (targetCategory === 'internal') categoryTitle = 'ยาใช้ภายใน (สำหรับรับประทาน)';
        else if (targetCategory === 'external') categoryTitle = 'ยาใช้ภายนอก (ฉลากสีแดง ห้ามรับประทาน)';
        else if (targetCategory === 'firstaid') categoryTitle = 'เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล';
        else categoryTitle = 'ยาหมดอายุ/ยาเสื่อมสภาพ';
      }

      setFeedback({
        type: 'correct',
        title: `จัดวางถูกต้อง! (+${points} แต้ม) — ${categoryTitle}`,
        detail: item.explanation,
      });

      if (remaining.length === 0) {
        soundEffects.playFanfare();
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
        });
      }
    } else {
      // WRONG SHELF!
      soundEffects.playWrong();
      setCombo(0);
      setDraggedItem(null);
      setHoveredShelf(null);

      let hint = '';
      if (domain === 'health_products') {
        if (item.category === 'hazard') {
          hint = `ระวัง! "${item.name}" เป็นวัตถุอันตรายในบ้านเรือน (วอส.) หรือผลิตภัณฑ์ผิดกฎหมาย/สารปนเปื้อนอันตราย (บอแรกซ์/ฟอร์มาลิน/ปรอท/ไซบูทรามีน) ต้องทิ้งลงถังขยะอันตรายสีแดง!`;
        } else if (item.category === 'external') {
          hint = `สังเกตเลขจดแจ้ง 10 หลัก! "${item.name}" เป็นเครื่องสำอางที่ปลอดภัย ต้องจัดวางบนชั้นที่ 2 (เครื่องสำอาง & เวชสำอาง)`;
        } else if (item.category === 'internal') {
          hint = `สังเกตเลข อย. 13 หลัก หรือตราทางเลือกสุขภาพ! "${item.name}" เป็นอาหารและเครื่องดื่มที่ปลอดภัย ต้องจัดวางบนชั้นที่ 1 (อาหาร & เสริมอาหาร)`;
        } else {
          hint = `สังเกตใบอนุญาต/จดแจ้ง อย.! "${item.name}" เป็นเครื่องมือแพทย์และอุปกรณ์มาตรฐาน ต้องจัดวางบนชั้นที่ 3 (เครื่องมือแพทย์)`;
        }
      } else if (domain === 'all') {
        if (item.category === 'hazard') {
          hint = `ระวัง! "${item.name}" เป็นของอันตราย ยาหมดอายุ หรือวัตถุอันตราย วอส. ต้องทิ้งลงถังขยะอันตรายสีแดง!`;
        } else if (item.category === 'external') {
          hint = `"${item.name}" เป็นยาใช้ภายนอก (ฉลากสีแดง) หรือเครื่องสำอาง ต้องจัดวางชั้นที่ 2`;
        } else if (item.category === 'internal') {
          hint = `"${item.name}" เป็นยาสำหรับรับประทาน หรืออาหารเสริมที่มี อย. ต้องจัดวางชั้นที่ 1`;
        } else {
          hint = `"${item.name}" เป็นเครื่องมือแพทย์หรือเวชภัณฑ์ปฐมพยาบาล ต้องจัดวางชั้นที่ 3`;
        }
      } else {
        if (item.category === 'hazard') {
          hint = `ระวัง! "${item.name}" เป็นยาหมดอายุหรือยาเสื่อมสภาพ ต้องทิ้งลงถังขยะอันตรายสีแดงเท่านั้น!`;
        } else if (item.category === 'external') {
          hint = `สังเกตฉลากสีแดง! "${item.name}" เป็นยาใช้ภายนอก ห้ามรับประทาน ต้องวางชั้นที่ 2`;
        } else if (item.category === 'internal') {
          hint = `"${item.name}" เป็นยาสำหรับรับประทาน (ยาใช้ภายใน) ต้องวางชั้นบนสุด (ชั้นที่ 1)`;
        } else {
          hint = `"${item.name}" เป็นเวชภัณฑ์และอุปกรณ์ปฐมพยาบาล ต้องวางชั้นล่างสุด (ชั้นที่ 3)`;
        }
      }

      setFeedback({
        type: 'wrong',
        title: 'วางผิดชั้นนะ! (คำแนะนำจาก อย.น้อย)',
        detail: hint,
      });
    }
  };

  // Drag and drop events
  const handleDragStart = (e: React.DragEvent, item: MedicineItem) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
    soundEffects.playSelect();
  };

  const handleDragOver = (e: React.DragEvent, category: MedicineCategory) => {
    e.preventDefault();
    setHoveredShelf(category);
  };

  const handleDragLeave = () => {
    setHoveredShelf(null);
  };

  const handleDrop = (e: React.DragEvent, category: MedicineCategory) => {
    e.preventDefault();
    if (draggedItem) {
      handleDropOnShelf(category, draggedItem);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header Navigation Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-3 sm:p-4 shadow-xl border-4 border-amber-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onGoHome();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-2xl text-xs transition-colors shadow-xs"
            title="กลับหน้าหลัก"
          >
            <Home className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>ห้องพยาบาลโรงเรียน (จัดตู้ยาไม้จริง)</span>
            </span>
            <span className="hidden sm:inline-block bg-amber-500 text-slate-950 px-2 py-1 rounded-xl font-black">
              ผู้เล่น: {playerName}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setIsFdaGuideOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-xs transition-colors border border-indigo-400"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>วิธีการดูแลของ อย.</span>
          </button>

          <div className="flex items-center space-x-1 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{score} แต้ม</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              initDeskCabinet(domain);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs border border-slate-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">เริ่มจัดใหม่</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-slate-800 border border-sky-400/60 rounded-xl text-[11px] font-bold text-sky-200 shadow-xs">
            <Cloud className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>ซิงก์กับ Data Cloud</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenCloudRank();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">อันดับ Data Cloud</span>
          </button>
        </div>
      </div>

      {/* Domain Mode Selector Ribbon */}
      <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-2xl shadow-md border-2 border-amber-300 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-heading font-black text-slate-800 flex items-center space-x-1">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>เลือกประเภทผลิตภัณฑ์:</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            (เลือกโหมดเพื่อฝึกแยกประเภทและตรวจฉลากตามคู่มือ อย.น้อย)
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setDomain('medicine');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              domain === 'medicine'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            💊 1. โหมดยาสามัญ (ตู้ยาไม้)
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setDomain('health_products');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              domain === 'health_products'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            🥗 2. โหมดผลิตภัณฑ์สุขภาพ อย.
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setDomain('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              domain === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            🌟 3. รวมทุกประเภท (ครบวงจร)
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border-2 flex items-start space-x-3 text-xs animate-in fade-in ${
            feedback.type === 'correct'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-rose-50 border-rose-400 text-rose-950'
          }`}
        >
          {feedback.type === 'correct' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-bold text-sm">{feedback.title}</div>
            <div className="mt-0.5 leading-relaxed">{feedback.detail}</div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REALISTIC CLINIC ROOM VIEWPORT (บรรยากาศห้องพยาบาลจริง) */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-gradient-to-b from-[#e0f2fe] via-[#f0fdf4] to-[#f8fafc] p-4 sm:p-6 min-h-[580px]">
        {/* Realistic Room Wall Decorations */}
        <div className="absolute top-4 left-6 flex items-center space-x-3 pointer-events-none opacity-90">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-red-500 shadow-sm flex items-center justify-center text-red-600 font-black text-2xl">
            ✚
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold text-emerald-800 tracking-wider block">
              ห้องพยาบาลประจำโรงเรียน
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              อย.น้อยใช้ยาอย่างปลอดภัย · จัดตู้ยาให้ถูกสุขลักษณะ
            </span>
          </div>
        </div>

        {/* Height Measurement Scale on wall (ไม้บรรทัดวัดส่วนสูง) */}
        <div className="absolute top-4 right-6 hidden md:flex flex-col items-center bg-white/80 p-2 rounded-xl border border-slate-300 shadow-xs pointer-events-none text-[8.5px] text-slate-500 font-mono">
          <span className="font-bold text-slate-700">170cm</span>
          <span>-</span>
          <span>160cm</span>
          <span>-</span>
          <span>150cm</span>
          <span className="font-bold text-emerald-700">วัดส่วนสูง</span>
        </div>

        {/* ORGANIZING THE WOODEN CABINET IN CLINIC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 pt-10">
          {/* Left/Center: REAL WOODEN MEDICINE CABINET (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Wooden Cabinet Frame (ตู้ไม้สักทองขัดเงา 3 มิติ) */}
            <div className="relative bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#451a03] p-4 sm:p-5 rounded-3xl shadow-2xl border-4 border-[#3a1a05] ring-4 ring-amber-900/30">
              {/* Cabinet Top Crown */}
              <div className="bg-gradient-to-r from-[#92400e] via-[#b45309] to-[#92400e] p-2.5 rounded-t-2xl border-b-2 border-[#451a03] flex items-center justify-between text-white px-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🛡️</span>
                  <span className="font-heading font-extrabold text-sm tracking-wide">
                    {domain === 'health_products'
                      ? 'เชลฟ์ตรวจสอบผลิตภัณฑ์สุขภาพ อย. (มาตรฐาน 6 ด้าน)'
                      : domain === 'all'
                      ? 'ตู้จัดเก็บผลิตภัณฑ์สุขภาพและยา อย.น้อย (ครบวงจร)'
                      : 'ตู้ยาสามัญประจำบ้าน (ไม้สักทองแท้ มาตรฐาน อย.)'}
                  </span>
                </div>
                <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                  ลากยาวางบนชั้นไม้
                </span>
              </div>

              {/* Cabinet Interior with 3 Real Wooden Shelves */}
              <div className="bg-radial from-[#fdfbf7] to-[#f5eedb] p-3 sm:p-4 rounded-b-2xl space-y-4 shadow-inner min-h-[460px] flex flex-col justify-between border-2 border-[#713f12]/40">
                {/* --- SHELF 1: ยาใช้ภายใน หรือ อาหาร (Internal) --- */}
                <div
                  onDragOver={(e) => handleDragOver(e, 'internal')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'internal')}
                  onClick={() => selectedItem && handleDropOnShelf('internal')}
                  className={`relative p-3 rounded-2xl transition-all cursor-pointer min-h-[120px] flex flex-col justify-between border-2 ${
                    hoveredShelf === 'internal' || selectedItem
                      ? 'border-blue-500 bg-blue-100/60 ring-4 ring-blue-300 scale-101'
                      : 'border-amber-300/60 bg-amber-50/40 hover:bg-amber-100/40'
                  }`}
                >
                  {/* Shelf Label Plaque */}
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-1 mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                      <span className="font-heading font-black text-xs text-blue-900">
                        {domain === 'health_products'
                          ? 'ชั้นที่ 1: อาหาร & โภชนาการปลอดภัย (ตรา อย. 13 หลัก)'
                          : 'ชั้นที่ 1: ยาใช้ภายใน (สำหรับรับประทาน)'}
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg font-bold">
                      {domain === 'health_products'
                        ? 'นมสด · บะหมี่ GDA · ปลากระป๋อง'
                        : 'ลดไข้ · แก้ปวด · ท้องเสีย · ขับลม'}
                    </span>
                  </div>

                  {/* Placed Items on Shelf 1 */}
                  <div className="flex flex-wrap gap-2 items-end min-h-[64px] p-1">
                    {woodenShelves.internal.length === 0 ? (
                      <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1 font-medium">
                        <span>ลากยาวางบนชั้นไม้นี้ (หรือแตะที่ชั้นเมื่อเลือกยาแล้ว)</span>
                      </div>
                    ) : (
                      woodenShelves.internal.map((item) => (
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

                  {/* Solid 3D Wood Plank */}
                  <div className="h-3.5 bg-gradient-to-r from-[#78350f] via-[#92400e] to-[#78350f] rounded-md shadow-md border-t border-[#b45309] border-b border-[#451a03]" />
                </div>

                {/* --- SHELF 2: ยาใช้ภายนอก หรือ เครื่องสำอาง (External) --- */}
                <div
                  onDragOver={(e) => handleDragOver(e, 'external')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'external')}
                  onClick={() => selectedItem && handleDropOnShelf('external')}
                  className={`relative p-3 rounded-2xl transition-all cursor-pointer min-h-[120px] flex flex-col justify-between border-2 ${
                    hoveredShelf === 'external' || selectedItem
                      ? 'border-red-500 bg-red-100/60 ring-4 ring-red-300 scale-101'
                      : 'border-amber-300/60 bg-amber-50/40 hover:bg-amber-100/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-rose-200/60 pb-1 mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                      <span className="font-heading font-black text-xs text-red-900">
                        {domain === 'health_products'
                          ? 'ชั้นที่ 2: เครื่องสำอาง & เวชสำอาง (ใบรับจดแจ้ง 10 หลัก)'
                          : 'ชั้นที่ 2: ยาใช้ภายนอก (ฉลากสีแดง "ห้ามรับประทาน")'}
                      </span>
                    </div>
                    <span className="text-[10px] text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-lg font-black uppercase">
                      {domain === 'health_products'
                        ? 'ครีมกันแดด SPF50+ · สบู่เหลว pH5.5'
                        : 'ทาแผล · ล้างแผล · ยาหม่อง · คาราไมน์'}
                    </span>
                  </div>

                  {/* Placed Items on Shelf 2 */}
                  <div className="flex flex-wrap gap-2 items-end min-h-[64px] p-1">
                    {woodenShelves.external.length === 0 ? (
                      <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1 font-medium">
                        <span>ลากยาวางบนชั้นไม้นี้ (หรือแตะที่ชั้นเมื่อเลือกยาแล้ว)</span>
                      </div>
                    ) : (
                      woodenShelves.external.map((item) => (
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

                  {/* Solid 3D Wood Plank */}
                  <div className="h-3.5 bg-gradient-to-r from-[#78350f] via-[#92400e] to-[#78350f] rounded-md shadow-md border-t border-[#b45309] border-b border-[#451a03]" />
                </div>

                {/* --- SHELF 3: เวชภัณฑ์และอุปกรณ์ หรือ เครื่องมือแพทย์/ของใช้ในบ้าน (First Aid) --- */}
                <div
                  onDragOver={(e) => handleDragOver(e, 'firstaid')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'firstaid')}
                  onClick={() => selectedItem && handleDropOnShelf('firstaid')}
                  className={`relative p-3 rounded-2xl transition-all cursor-pointer min-h-[120px] flex flex-col justify-between border-2 ${
                    hoveredShelf === 'firstaid' || selectedItem
                      ? 'border-emerald-500 bg-emerald-100/60 ring-4 ring-emerald-300 scale-101'
                      : 'border-amber-300/60 bg-amber-50/40 hover:bg-amber-100/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-1 mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                      <span className="font-heading font-black text-xs text-emerald-900">
                        {domain === 'health_products'
                          ? 'ชั้นที่ 3: เครื่องมือแพทย์ & ผลิตภัณฑ์ในบ้าน (ใบอนุญาต/วอส.)'
                          : 'ชั้นที่ 3: เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล'}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg font-bold">
                      {domain === 'health_products'
                        ? 'หน้ากากอนามัย · ชุดตรวจ ATK · น้ำยาล้างจาน วอส.'
                        : 'พลาสเตอร์ · ผ้าก๊อซ · สำลี · ปรอทวัดไข้'}
                    </span>
                  </div>

                  {/* Placed Items on Shelf 3 */}
                  <div className="flex flex-wrap gap-2 items-end min-h-[64px] p-1">
                    {woodenShelves.firstaid.length === 0 ? (
                      <div className="w-full text-center py-4 text-xs text-slate-400 flex items-center justify-center space-x-1 font-medium">
                        <span>ลากอุปกรณ์วางบนชั้นไม้นี้ (หรือแตะที่ชั้น)</span>
                      </div>
                    ) : (
                      woodenShelves.firstaid.map((item) => (
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

                  {/* Solid 3D Wood Plank */}
                  <div className="h-3.5 bg-gradient-to-r from-[#78350f] via-[#92400e] to-[#78350f] rounded-md shadow-md border-t border-[#b45309] border-b border-[#451a03]" />
                </div>
              </div>
            </div>

            {/* Red Hazardous Waste Bin next to cabinet */}
            <div
              onDragOver={(e) => handleDragOver(e, 'hazard')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'hazard')}
              onClick={() => selectedItem && handleDropOnShelf('hazard')}
              className={`p-3.5 rounded-2xl border-3 transition-all cursor-pointer flex items-center justify-between ${
                hoveredShelf === 'hazard' || selectedItem
                  ? 'border-red-600 bg-red-100 ring-4 ring-red-400 scale-101'
                  : 'border-red-400 bg-red-50 hover:bg-red-100/70'
              }`}
            >
              <div className="flex items-center space-x-3 text-red-950">
                <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl shadow-xs">
                  🗑️
                </div>
                <div>
                  <span className="font-heading font-black text-xs text-red-900 block">
                    {domain === 'health_products'
                      ? 'ถังขยะอันตราย / ของต้องห้าม อย. (สารเคมี · สารปนเปื้อน · สินค้าเถื่อน)'
                      : 'ถังขยะติดเชื้อ / ถังขยะอันตราย อย.น้อย'}
                  </span>
                  <span className="text-[11px] text-red-700">
                    {domain === 'health_products'
                      ? 'ลากทิ้ง: บอแรกซ์ · ฟอร์มาลิน · ครีมปรอท · ยาลดความอ้วนยาบ้า · สเปรย์ยุง/กรด'
                      : 'ลากทิ้ง: ยาหมดอายุ (EXP) · ยาปฏิชีวนะ · สารเคมีห้องน้ำ · ขนมหวานคล้ายยา'}
                  </span>
                </div>
              </div>

              <span className="text-xs font-black bg-red-600 text-white px-2.5 py-1 rounded-xl">
                ทิ้งแล้ว {woodenShelves.hazard.length} ชิ้น
              </span>
            </div>
          </div>

          {/* Right: NURSE DESK & TRAY (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Wooden Examination Desk */}
            <div className="bg-gradient-to-b from-white via-slate-50 to-amber-50/50 p-4 rounded-3xl border-3 border-amber-300 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🩺</span>
                  <h3 className="font-heading font-extrabold text-sm text-slate-900">
                    โต๊ะตรวจและถาดสแตนเลส (รอจัดเข้าตู้)
                  </h3>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg">
                  เหลือ {deskItems.length} ชิ้น
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                💡 <strong>วิธีจัดยา:</strong> สามารถ <u>คลิกลาก (Drag)</u> ตัวยาไปวางบนชั้นไม้ในตู้ยาได้ทันที หรือแตะที่ตัวยาแล้วกดเลือกชั้นไม้
              </p>

              {/* Staging medicines grid */}
              {deskItems.length === 0 ? (
                <div className="py-12 text-center space-y-2 bg-emerald-50 rounded-2xl border-2 border-emerald-300 p-4">
                  <div className="text-4xl">🎉</div>
                  <h4 className="font-heading font-black text-emerald-900 text-base">
                    จัดตู้ยาไม้เสร็จสมบูรณ์แล้ว!
                  </h4>
                  <p className="text-xs text-slate-600">
                    ตู้ยาห้องพยาบาลถูกต้องตามหลัก อย.น้อยใช้ยาอย่างปลอดภัย
                  </p>
                  <button
                    onClick={() => initDeskCabinet()}
                    className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    สุ่มจัดยาชุดใหม่
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto p-1">
                  {deskItems.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onClick={() => {
                          soundEffects.playSelect();
                          setSelectedItem(isSelected ? null : item);
                        }}
                        className={`relative p-2.5 rounded-2xl border-2 transition-all cursor-grab active:cursor-grabbing flex flex-col items-center justify-between min-h-[145px] text-center ${
                          isSelected
                            ? 'border-amber-500 bg-amber-100/80 shadow-md ring-2 ring-amber-400 scale-102'
                            : 'border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/50 shadow-xs'
                        }`}
                      >
                        {/* Info Inspector Icon */}
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
                          <span className="text-[11px] font-bold text-slate-900 line-clamp-2 leading-tight block">
                            {item.thaiName}
                          </span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5 truncate">
                            {item.expiryDate}
                          </span>
                        </div>

                        {/* Quick shelf buttons if selected */}
                        {isSelected && (
                          <div className="mt-2 w-full pt-1.5 border-t border-amber-200 space-y-1">
                            <span className="text-[9.5px] font-bold text-amber-900 block">
                              ลากไปวาง หรือกด:
                            </span>
                            <div className="grid grid-cols-2 gap-1 text-[8.5px] font-bold">
                              <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                  handleDropOnShelf('internal', item);
                                }}
                                className="bg-blue-600 text-white rounded py-1 hover:bg-blue-700"
                              >
                                ชั้น 1 (ใน)
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDropOnShelf('external', item);
                                }}
                                className="bg-red-600 text-white rounded py-1 hover:bg-red-700"
                              >
                                ชั้น 2 (นอก)
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDropOnShelf('firstaid', item);
                                }}
                                className="bg-emerald-600 text-white rounded py-1 hover:bg-emerald-700"
                              >
                                ชั้น 3 (เวชภัณฑ์)
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDropOnShelf('hazard', item);
                                }}
                                className="bg-zinc-800 text-white rounded py-1 hover:bg-zinc-900"
                              >
                                ถังขยะ
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
      </div>

      {/* Item Detail Inspector Modal */}
      <MedicineDetailModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />

      {/* FDA Care & Safe Consumer Guidelines Modal */}
      <FdaCareGuideModal
        isOpen={isFdaGuideOpen}
        onClose={() => setIsFdaGuideOpen(false)}
      />
    </div>
  );
};
