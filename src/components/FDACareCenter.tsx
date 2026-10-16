import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Info,
  Home,
  Sparkles,
  PhoneCall,
  Eye,
  HeartPulse,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface FDACareCenterProps {
  onGoHome: () => void;
  onOpenMarioGame?: () => void;
}

export const FDACareCenter: React.FC<FDACareCenterProps> = ({ onGoHome, onOpenMarioGame }) => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'scanner' | 'hazards' | 'complaint'>('guidelines');

  // Interactive Simulator state for FDA Number Scanner
  const [inputNumber, setInputNumber] = useState('');
  const [selectedScanType, setSelectedScanType] = useState<'food' | 'drug' | 'cosmetic' | 'device' | 'hazardous'>('food');
  const [scanResult, setScanResult] = useState<{
    status: 'valid' | 'invalid' | 'fake';
    title: string;
    description: string;
    detail: string;
  } | null>(null);

  const sampleNumbers = [
    { type: 'food', label: '10-1-04741-1-0001 (นมสดแท้)', num: '10-1-04741-1-0001', valid: true },
    { type: 'food', label: '99-9-99999-9-9999 (เลขปลอม!)', num: '99-9-99999-9-9999', valid: false },
    { type: 'drug', label: '1A 42/57 (พาราเซตามอล)', num: '1A 42/57', valid: true },
    { type: 'drug', label: 'G 99/54 (ยาธาตุน้ำแดง แผนโบราณ)', num: 'G 99/54', valid: true },
    { type: 'cosmetic', label: '10-1-6500024890 (ครีมกันแดด)', num: '10-1-6500024890', valid: true },
    { type: 'hazardous', label: 'วอส. 120/2561 (น้ำยาล้างจาน)', num: 'วอส. 120/2561', valid: true },
  ];

  const handleSimulateScan = (numToScan?: string, typeToScan?: string) => {
    soundEffects.playSelect();
    const targetNum = (numToScan || inputNumber).trim();
    const targetType = typeToScan || selectedScanType;

    if (!targetNum) {
      setScanResult({
        status: 'invalid',
        title: 'กรุณากรอกเลขที่ต้องการตรวจสอบ',
        description: 'พิมพ์เลข อย., เลขสารบบอาหาร หรือเลือกตัวอย่างด้านล่างเพื่อทดสอบ',
        detail: 'ระบบตรวจสอบของ อย. รองรับทั้งเลข 13 หลัก, เลข 1A/2A, เลขที่ใบรับแจ้ง และเลข วอส.',
      });
      return;
    }

    if (targetNum === '99-9-99999-9-9999' || targetNum.includes('99999') || targetNum.toLowerCase().includes('fake')) {
      soundEffects.playWrong();
      setScanResult({
        status: 'fake',
        title: '⚠️ ไม่พบข้อมูลในระบบฐานข้อมูล อย. (เสี่ยงเลขปลอม/สวมเลข)',
        description: `เลข "${targetNum}" ไม่ได้รับการอนุญาตจากสำนักงานคณะกรรมการอาหารและยา`,
        detail: 'ข้อควรระวัง: ผู้ผลิตบางรายนำเลขปลอมมาพิมพ์ใส่ซองหลอกผู้บริโภค ให้โทรแจ้งสายด่วน อย. 1556 ทันที!',
      });
    } else {
      soundEffects.playCorrect();
      let infoTitle = '';
      let infoDesc = '';
      if (targetType === 'food' || targetNum.length === 16 || targetNum.includes('-')) {
        infoTitle = '✓ ผลการค้นหา: ได้รับอนุญาตเป็น "อาหาร" ถูกต้อง';
        infoDesc = 'มีเลขสารบบอาหาร 13 หลัก แสดงจังหวัด สถานที่ผลิต และลำดับอาหารตามมาตรฐานกระทรวงสาธารณสุข';
      } else if (targetType === 'drug' || targetNum.toUpperCase().includes('1A') || targetNum.toUpperCase().includes('G')) {
        infoTitle = '✓ ผลการค้นหา: ได้รับอนุญาตเป็น "ยาแผนปัจจุบัน/แผนโบราณ" ถูกต้อง';
        infoDesc = 'ขึ้นทะเบียนตำรับยากับ อย. ผ่านการทดสอบคุณภาพ ประสิทธิภาพ และความปลอดภัย';
      } else if (targetType === 'cosmetic') {
        infoTitle = '✓ ผลการค้นหา: ได้รับ "ใบรับแจ้งเครื่องสำอาง" ถูกต้อง';
        infoDesc = 'จดแจ้งสูตรและผู้ผลิตกับ อย. เรียบร้อย ปราศจากสารห้ามใช้ตามกฎหมายเครื่องสำอาง';
      } else {
        infoTitle = '✓ ผลการค้นหา: ได้รับอนุญาตถูกต้องตามมาตรฐาน อย.';
        infoDesc = 'สามารถตรวจสอบย้อนกลับไปยังผู้ผลิตและผู้จัดจำหน่ายได้';
      }

      setScanResult({
        status: 'valid',
        title: infoTitle,
        description: `เลขทะเบียน: ${targetNum}`,
        detail: infoDesc,
      });
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Banner Navigation Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border-4 border-amber-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onGoHome();
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all"
            title="กลับหน้าหลัก"
          >
            <Home className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                อย
              </span>
              <h2 className="font-heading font-black text-sm sm:text-base text-amber-300">
                ศูนย์การเรียนรู้วิธีการดูแลผลิตภัณฑ์สุขภาพของ อย.น้อย
              </h2>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              คู่มือความปลอดภัย · หลัก 4 ฉ. · การจัดเก็บที่ถูกสุขลักษณะ · ตรวจสอบเลข อย. จริง
            </p>
          </div>
        </div>

        {onOpenMarioGame && (
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenMarioGame();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-2xl shadow-md border-2 border-emerald-300 transition-all"
          >
            <span>🎮 เล่นเกมคัดแยก อย.</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-amber-300 shadow-md">
        <button
          onClick={() => {
            soundEffects.playSelect();
            setActiveTab('guidelines');
          }}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'guidelines'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. วิธีดูแล & จัดเก็บผลิตภัณฑ์</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSelect();
            setActiveTab('scanner');
          }}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'scanner'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>2. เครื่องตรวจเลข อย. เสมือนจริง</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSelect();
            setActiveTab('hazards');
          }}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'hazards'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>3. สารปนเปื้อน & ของอันตราย</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSelect();
            setActiveTab('complaint');
          }}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'complaint'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>4. สายด่วน 1556 & สิทธิผู้บริโภค</span>
        </button>
      </div>

      {/* TAB 1: GUIDELINES & STORAGE */}
      {activeTab === 'guidelines' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* 4 Inspection Rules Card */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 rounded-3xl shadow-xl border-4 border-amber-400 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-heading font-black text-lg sm:text-xl text-yellow-300">
                  หลัก 4 ฉ. ของ อย.น้อย ในการเลือกซื้อผลิตภัณฑ์สุขภาพ
                </h3>
                <p className="text-xs text-blue-100">
                  สูตรลับง่ายๆ ที่นักเรียน อย.น้อย ทุกคนต้องจำและนำไปใช้ในชีวิตประจำวัน
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1">
                <span className="text-xs font-black bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-lg inline-block">
                  ฉ. 1 : ฉลาก
                </span>
                <h4 className="font-bold text-sm text-white">ตรวจฉลากครบถ้วน</h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  มีเครื่องหมาย อย. / เลข 13 หลัก / ทะเบียนยา / วันผลิต (MFG) / วันหมดอายุ (EXP) / ชื่อผู้ผลิตชัดเจน
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1">
                <span className="text-xs font-black bg-pink-400 text-slate-950 px-2 py-0.5 rounded-lg inline-block">
                  ฉ. 2 : เฉดสี
                </span>
                <h4 className="font-bold text-sm text-white">สีสันต้องเป็นธรรมชาติ</h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  ไม่เลือกอาหารหรือขนมที่มีสีฉูดฉาดผิดปกติ เพราะมักลักลอบใช้สีย้อมผ้าหรือใส่สารฟอกขาวเป็นอันตราย
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1">
                <span className="text-xs font-black bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-lg inline-block">
                  ฉ. 3 : สภาพ
                </span>
                <h4 className="font-bold text-sm text-white">บรรจุภัณฑ์สมบูรณ์</h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  กระป๋องไม่บุบ ไม่บวม ไม่ขึ้นสนิม กล่องไม่ฉีกขาด ยาเม็ดไม่แตกหักเปลี่ยนสี ของเหลวไม่ตกตะกอนแยกชั้น
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1">
                <span className="text-xs font-black bg-purple-400 text-slate-950 px-2 py-0.5 rounded-lg inline-block">
                  ฉ. 4 : ฉลาดซื้อ
                </span>
                <h4 className="font-bold text-sm text-white">ไม่หลงเชื่อโฆษณาเกินจริง</h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  ไม่เชื่อคำอวดอ้าง "ขาวใน 3 วัน", "ลดความอ้วนไม่เหนื่อย", "รักษาได้สารพัดโรค" ซื้อจากร้านที่เชื่อถือได้
                </p>
              </div>
            </div>
          </div>

          {/* Safe Storage Guidelines by Category */}
          <div className="bg-white p-5 rounded-3xl shadow-xl border-3 border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading font-black text-base text-slate-900">
                วิธีการดูแลและจัดเก็บผลิตภัณฑ์สุขภาพ 6 ประเภทอย่างถูกต้อง
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* ยา */}
              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs sm:text-sm">
                  <span>💊</span>
                  <span>1. การดูแลรักษา ยา (Drugs)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>เก็บในตู้ยาสามัญประจำบ้าน แยกชั้น 1 (ยาใน) และชั้น 2 (ยานอก-ฉลากแดง) อย่างเด็ดขาด</li>
                  <li>เก็บในที่แห้ง อุณหภูมิห้อง ไม่ชื้น ไม่โดนแสงแดดโดยตรง และพ้นมือเด็กเล็ก</li>
                  <li>ไม่เก็บยาในตู้เย็น เว้นแต่มีฉลากระบุชัดเจน (เช่น ยาหยอดตาบางชนิด, อินซูลิน)</li>
                  <li>ตรวจวันหมดอายุทุก 3 เดือน ยาเปิดขวดเกิน 30 วันหรือเปลี่ยนสีต้องทิ้งทันที</li>
                </ul>
              </div>

              {/* อาหาร */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs sm:text-sm">
                  <span>🥗</span>
                  <span>2. การดูแลรักษา อาหาร (Food)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>ตรวจฉลาก GDA หวาน มัน เค็ม และตราทางเลือกสุขภาพ (Healthier Choice)</li>
                  <li>นมสดและเนื้อสัตว์สดต้องแช่ตู้เย็นต่ำกว่า 8°C เสมอ สังเกตวันหมดอายุ (EXP)</li>
                  <li>อาหารกระป๋องเก็บในที่แห้ง ไม่ชื้น ห้ามทานหากกระป๋องบวมหรือฝาปูดเด็ดขาด</li>
                  <li>อาหารแห้งต้องปิดภาชนะให้มิดชิด ป้องกันมด แมลงสาบ และเชื้อรา</li>
                </ul>
              </div>

              {/* เครื่องสำอาง */}
              <div className="p-3.5 bg-pink-50/70 rounded-2xl border border-pink-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-pink-900 font-bold text-xs sm:text-sm">
                  <span>💄</span>
                  <span>3. การดูแลรักษา เครื่องสำอาง (Cosmetics)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>ปิดฝาให้สนิททุกครั้งหลังใช้ ไม่ทิ้งไว้ในรถยนต์ที่จอดตากแดดจัด</li>
                  <li>ทดสอบการแพ้ก่อนใช้จริง โดยทาข้อพับแขนหรือหลังใบหูทิ้งไว้ 24-48 ชั่วโมง</li>
                  <li>ไม่ใช้เครื่องสำอางร่วมกับผู้อื่น (เช่น ลิปสติก, มาสคาร่า) ป้องกันการติดเชื้อ</li>
                  <li>มีเลขที่ใบรับแจ้ง 10 หลัก ปราศจากสารปรอท สเตียรอยด์ หรือไฮโดรควิโนน</li>
                </ul>
              </div>

              {/* เครื่องมือแพทย์ */}
              <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs sm:text-sm">
                  <span>🩺</span>
                  <span>4. การดูแลรักษา เครื่องมือแพทย์ (Medical Devices)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>ปรอทวัดไข้ต้องเช็ดแอลกอฮอล์ 70% ก่อนและหลังใช้ทุกครั้ง ห้ามต้มน้ำร้อน</li>
                  <li>หน้ากากอนามัยเป็นแบบใช้ครั้งเดียวทิ้ง ไม่ซักซ้ำ และมัดทิ้งลงถังขยะติดเชื้อ</li>
                  <li>คอนแทคเลนส์ต้องซื้อจากร้านที่น่าเชื่อถือ มีเลข อย. และล้างด้วยน้ำยาเฉพาะเท่านั้น</li>
                </ul>
              </div>

              {/* วัตถุอันตรายในบ้าน */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs sm:text-sm">
                  <span>🧴</span>
                  <span>5. การดูแลรักษา วัตถุอันตรายในบ้าน (Household Chemicals)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>สังเกตเลข วอส. และสัญลักษณ์ GHS (เตือนสารพิษ วัตถุไวไฟ สารกัดกร่อน)</li>
                  <li>เก็บในที่มิดชิด แยกต่างหากจากอาหารและตู้ยาอย่างเด็ดขาด ห้ามวางปนกัน!</li>
                  <li>ห้ามเทน้ำยาใส่ขวดน้ำดื่มหรือภาชนะใส่อาหารเด็ดขาด ป้องกันการหยิบดื่มกิน</li>
                </ul>
              </div>

              {/* วัตถุออกฤทธิ์และยาเสพติด */}
              <div className="p-3.5 bg-red-50/70 rounded-2xl border border-red-200 space-y-1.5">
                <div className="flex items-center space-x-2 text-red-900 font-bold text-xs sm:text-sm">
                  <span>⚠️</span>
                  <span>6. วัตถุออกฤทธิ์ & สิ่งต้องห้าม (Controlled Substances)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside leading-relaxed">
                  <li>ยานอนหลับ ยาระงับประสาท ต้องอยู่ในความควบคุมของแพทย์และเภสัชกรเท่านั้น</li>
                  <li>ยาชุดลดความอ้วนที่ลักลอบผสมยาบ้า (เฟนเตอมีน) เป็นสารเสพติดผิดกฎหมาย</li>
                  <li>หากพบเบาะแสการลักลอบจำหน่ายยาเถื่อน แจ้งสายด่วน อย. 1556 ทันที</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SIMULATOR SCANNER */}
      {activeTab === 'scanner' && (
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl border-4 border-emerald-400 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-xs">
              🔍
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                เครื่องจำลองตรวจเลข อย. เสมือนจริง (Oryor Smart Verification)
              </h3>
              <p className="text-xs text-slate-500">
                ทดลองป้อนหรือคลิกเลขตัวอย่าง เพื่อตรวจสอบว่าผลิตภัณฑ์ได้รับอนุญาตถูกต้องหรือไม่
              </p>
            </div>
          </div>

          {/* Type selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
            <button
              onClick={() => setSelectedScanType('food')}
              className={`p-2.5 rounded-xl border-2 transition-all ${
                selectedScanType === 'food'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              🥗 อาหาร (13 หลัก)
            </button>
            <button
              onClick={() => setSelectedScanType('drug')}
              className={`p-2.5 rounded-xl border-2 transition-all ${
                selectedScanType === 'drug'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              💊 ยา (1A/2A/G)
            </button>
            <button
              onClick={() => setSelectedScanType('cosmetic')}
              className={`p-2.5 rounded-xl border-2 transition-all ${
                selectedScanType === 'cosmetic'
                  ? 'border-pink-600 bg-pink-50 text-pink-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              💄 เครื่องสำอาง (10 หลัก)
            </button>
            <button
              onClick={() => setSelectedScanType('device')}
              className={`p-2.5 rounded-xl border-2 transition-all ${
                selectedScanType === 'device'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              🩺 เครื่องมือแพทย์
            </button>
            <button
              onClick={() => setSelectedScanType('hazardous')}
              className={`p-2.5 rounded-xl border-2 transition-all ${
                selectedScanType === 'hazardous'
                  ? 'border-amber-600 bg-amber-50 text-amber-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              🧴 วัตถุอันตราย (วอส.)
            </button>
          </div>

          {/* Search Box Form */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="พิมพ์เลข อย. เช่น 10-1-04741-1-0001 หรือ 1A 42/57..."
              className="flex-1 px-4 py-3 border-2 border-slate-300 focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-900 outline-none shadow-inner"
            />
            <button
              onClick={() => handleSimulateScan()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Search className="w-4 h-4" />
              <span>กดตรวจสอบเลข อย.</span>
            </button>
          </div>

          {/* Preset Samples to try */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-600 block">
              💡 คลิกเพื่อทดสอบตัวอย่างเลขจริง & เลขปลอม:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleNumbers.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputNumber(s.num);
                    setSelectedScanType(s.type as any);
                    handleSimulateScan(s.num, s.type);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    s.valid
                      ? 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-300'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          {scanResult && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-1.5 animate-in zoom-in-95 ${
                scanResult.status === 'valid'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : scanResult.status === 'fake'
                  ? 'bg-rose-50 border-rose-400 text-rose-950'
                  : 'bg-amber-50 border-amber-400 text-amber-950'
              }`}
            >
              <div className="flex items-center space-x-2">
                {scanResult.status === 'valid' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                )}
                <h4 className="font-heading font-black text-sm sm:text-base">
                  {scanResult.title}
                </h4>
              </div>
              <p className="text-xs font-bold">{scanResult.description}</p>
              <p className="text-xs leading-relaxed text-slate-700">{scanResult.detail}</p>
            </div>
          )}

          {/* Structural anatomy of FDA Number */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-black text-slate-900 block text-xs">
              📌 โครงสร้างเครื่องหมายและเลขสารบบอาหาร 13 หลัก (อย.):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
              <div className="bg-white p-2 rounded-xl border border-slate-300">
                <span className="font-bold text-blue-600 block text-sm">10</span>
                <span className="text-[10px] text-slate-500 font-sans">จังหวัดที่ตั้ง (กทม.)</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-300">
                <span className="font-bold text-blue-600 block text-sm">1</span>
                <span className="text-[10px] text-slate-500 font-sans">สถานะ (ผู้ผลิต)</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-300">
                <span className="font-bold text-blue-600 block text-sm">04741</span>
                <span className="text-[10px] text-slate-500 font-sans">เลขสถานที่ผลิต</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-300">
                <span className="font-bold text-blue-600 block text-sm">1-0001</span>
                <span className="text-[10px] text-slate-500 font-sans">ปีและลำดับอาหาร</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HAZARDS & ADULTERATIONS */}
      {activeTab === 'hazards' && (
        <div className="bg-white p-5 rounded-3xl shadow-xl border-3 border-amber-400 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-heading font-black text-base text-slate-900">
              สารปนเปื้อนอันตรายที่ อย.น้อย ต้องเฝ้าระวังและทดสอบ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* บอแรกซ์ */}
            <div className="p-3.5 bg-rose-50 rounded-2xl border-2 border-rose-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-rose-950">1. สารบอแรกซ์ (ผงกรอบ)</span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">อันตรายไตวาย</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>พบใน:</strong> ลูกชิ้น หมูยอ ไส้กรอก หมูหมัก ทอดมัน ผลไม้ดอง
                <br />
                <strong>อันตราย:</strong> ระคายเคืองกระเพาะอาหาร ไตอักเสบ ไตวาย และเป็นสารก่อมะเร็ง
                <br />
                <strong>ชุดทดสอบ อย.:</strong> ใช้กระดาษขมิ้นชุบน้ำอาหาร หากเปลี่ยนจากสีเหลืองเป็นสีส้ม/แดงเข้ม แสดงว่ามีบอแรกซ์
              </p>
            </div>

            {/* ฟอร์มาลีน */}
            <div className="p-3.5 bg-rose-50 rounded-2xl border-2 border-rose-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-rose-950">2. สารฟอร์มาลีน (น้ำยาดองศพ)</span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">อันตรายสูงสุด</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>พบใน:</strong> อาหารทะเล (ปลา กุ้ง หมึก) สดผิดปกติ, เห็ดหอมสด, ผักสด
                <br />
                <strong>อันตราย:</strong> ปวดท้องรุนแรง ทางเดินอาหารไหม้ ตับวาย ไตวาย ช็อกเสียชีวิต
                <br />
                <strong>สังเกต:</strong> เนื้ออาหารสดเด้งแข็งผิดปกติ ไม่มีกลิ่นคาวธรรมชาติ และไม่มีแมลงวันตอม
              </p>
            </div>

            {/* สารฟอกขาว */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-amber-950">3. สารฟอกขาว (โซเดียมไฮโดรซัลไฟต์)</span>
                <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">ระคายเคืองปอด</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>พบใน:</strong> ถั่วงอกขาวอวบ, ขิงซอย, หน่อไม้ขาว, ส่าหร่าย, กระท้อน
                <br />
                <strong>อันตราย:</strong> แน่นหน้าอก หายใจขัด ความดันโลหิตลดต่ำลงเฉียบพลัน อาจช็อกเสียชีวิตในผู้ป่วยหอบหืด
              </p>
            </div>

            {/* สเตียรอยด์ */}
            <div className="p-3.5 bg-purple-50 rounded-2xl border-2 border-purple-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-purple-950">4. สารสเตียรอยด์ในยาชุด</span>
                <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">กระเพาะทะลุ</span>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                <strong>พบใน:</strong> ยาชุด ยาผีบอก ยาลูกกลอน ยาแผนโบราณเถื่อนที่อวดอ้างแก้สารพัดโรค
                <br />
                <strong>อันตราย:</strong> หน้าบวมคล้ายพระจันทร์ (Moon Face) ภูมิคุ้มกันตก กระดูกผุ กระเพาะอาหารทะลุ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPLAINTS & CONSUMER PROTECTION */}
      {activeTab === 'complaint' && (
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl border-4 border-rose-400 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl shadow-xs">
              📞
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                สายด่วน อย. 1556 และการคุ้มครองผู้บริโภค
              </h3>
              <p className="text-xs text-slate-500">
                หากพบผลิตภัณฑ์สุขภาพอันตราย หลอกลวง หรือโฆษณาเกินจริง แจ้งเจ้าหน้าที่ได้ทันที
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 text-center space-y-1">
              <span className="text-3xl block">☎️</span>
              <h4 className="font-heading font-black text-rose-950 text-base">สายด่วน อย. 1556</h4>
              <p className="text-xs text-rose-700">โทรฟรีในวันและเวลาราชการ ให้คำปรึกษาและรับเรื่องร้องเรียน</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-300 text-center space-y-1">
              <span className="text-3xl block">🌐</span>
              <h4 className="font-heading font-black text-blue-950 text-base">เว็บไซต์ อย.</h4>
              <p className="text-xs text-blue-700">www.fda.moph.go.th ตรวจสอบเลข อย. และข่าวสารแจ้งเตือนภัย</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 text-center space-y-1">
              <span className="text-3xl block">📱</span>
              <h4 className="font-heading font-black text-emerald-950 text-base">Oryor Smart App</h4>
              <p className="text-xs text-emerald-700">แอปพลิเคชัน อย. สแกนบาร์โค้ดและตรวจสอบผลิตภัณฑ์สุขภาพบนมือถือ</p>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 space-y-1">
            <span className="font-bold block">💡 สิ่งที่ต้องเตรียมเมื่อร้องเรียน:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              <li>ชื่อผลิตภัณฑ์ ยี่ห้อ และภาพถ่ายฉลากผลิตภัณฑ์หน้า-หลัง</li>
              <li>เลข อย. วันผลิต วันหมดอายุ และชื่อผู้ผลิต/ผู้นำเข้า</li>
              <li>สถานที่ซื้อ หรือลิงก์ร้านค้าออนไลน์ที่พบการจำหน่าย</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
