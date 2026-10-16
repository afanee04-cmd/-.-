import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  PhoneCall,
  Search,
  ExternalLink,
  CheckCircle2,
  Trash2,
  Layers,
  Thermometer,
  Eye,
  Beaker,
  PackageCheck,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface FdaCareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FdaCareGuideModal: React.FC<FdaCareGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'categories' | 'testkits' | 'storage' | 'contact'>('principles');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-400 flex flex-col overflow-hidden">
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-amber-400">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🛡️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-lg shadow-xs">
                  คู่มือ อย.น้อย ฉบับสมบูรณ์
                </span>
                <span className="text-xs text-sky-200 font-semibold hidden sm:inline">
                  ครอบคลุมผลิตภัณฑ์สุขภาพและการดูแล
                </span>
              </div>
              <h2 className="font-heading font-black text-lg sm:text-2xl text-white leading-tight mt-0.5">
                วิธีการดูแลและตรวจสอบผลิตภัณฑ์สุขภาพ อย.
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all border border-white/20"
            title="ปิดหน้าต่าง"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex overflow-x-auto space-x-2 no-scrollbar">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('principles');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === 'principles'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>1. หลัก 4 ต. ของ อย.น้อย</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('categories');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. ผลิตภัณฑ์สุขภาพ 6 ด้าน</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('testkits');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === 'testkits'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Beaker className="w-4 h-4" />
            <span>3. ตรวจสารปนเปื้อน & ทดสอบแพ้</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('storage');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === 'storage'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. มาตรฐานจัดตู้ยา & ถังขยะอันตราย</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              setActiveTab('contact');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>5. เช็คเลข อย. & สายด่วน 1556</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* TAB 1: PRINCIPLES (หลัก 4 ต.) */}
          {activeTab === 'principles' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 sm:p-5 flex items-start space-x-4">
                <span className="text-3xl shrink-0">🔍</span>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-blue-950">
                    หัวใจสำคัญ: "หลัก 4 ต." ก่อนตัดสินใจซื้อหรือใช้ผลิตภัณฑ์สุขภาพ
                  </h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    อย.น้อย ได้วางแนวทางการสังเกตความปลอดภัย 4 ขั้นตอนสั้นๆ ที่จดจำง่ายและนำไปใช้ได้จริงในชีวิตประจำวัน เพื่อป้องกันการตกเป็นเหยื่อสินค้าปลอม สินค้าเถื่อน หรือสารเคมีอันตราย
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. ต. ตรวจสอบฉลาก */}
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-700 font-black text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-black">
                      1
                    </span>
                    <span>ต. ที่ 1: ตรวจสอบฉลาก (ฉลากภาษาไทย)</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    ต้องมีข้อความภาษาไทยที่อ่านง่ายและชัดเจน ระบุชื่อผลิตภัณฑ์, ชื่อและที่ตั้งของผู้ผลิตหรือผู้นำเข้า, ปริมาณสุทธิ, ส่วนประกอบสำคัญ, วิธีการใช้, คำเตือน, ข้อควรระวัง, และครั้งที่ผลิต
                  </p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                    <strong className="text-rose-600">⚠️ ข้อควรระวัง:</strong> ห้ามซื้อสินค้าที่มีแต่ภาษาต่างประเทศล้วนโดยไม่มีฉลากภาษาไทยกำกับ เพราะอาจเป็นสินค้าลักลอบหนีภาษีที่ไม่ได้มาตรฐาน
                  </div>
                </div>

                {/* 2. ต. ตรวจสอบเครื่องหมาย อย. */}
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-700 font-black text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-black">
                      2
                    </span>
                    <span>ต. ที่ 2: ตรวจสอบเครื่องหมายและเลข อย.</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    มองหาเครื่องหมาย อย. หรือเลขที่จดแจ้งที่ถูกต้องตามกฎหมาย: อาหาร (เลข 13 หลักในกรอบ อย.), ยา (เลขทะเบียนตำรับยา เช่น 1A 42/57), เครื่องสำอาง (เลขที่ใบรับจดแจ้ง 10 หรือ 13 หลัก), วัตถุอันตราย (เลข วอส.)
                  </p>
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900">
                    <strong className="text-emerald-700">💡 เคล็ดลับ:</strong> เลข อย. ต้องตรงกับชื่อผลิตภัณฑ์และประเภท โดยสามารถตรวจเช็คผ่านระบบออนไลน์ได้ทันที
                  </div>
                </div>

                {/* 3. ต. ตรวจสอบสภาพภาชนะบรรจุ */}
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2 hover:border-amber-400 transition-colors">
                  <div className="flex items-center space-x-2 text-amber-700 font-black text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-black">
                      3
                    </span>
                    <span>ต. ที่ 3: ตรวจสอบสภาพภาชนะบรรจุ</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    ภาชนะบรรจุต้องปิดสนิท ไม่ฉีกขาด ไม่แตกร้าว ซีลไม่ชำรุด หากเป็นอาหารกระป๋อง ต้อง <strong>"ไม่บวม ไม่บุบ ไม่เป็นสนิม ตะเข็บไม่รั่ว"</strong> เนื้อยาหรือสารภายในต้องไม่เปลี่ยนสี ไม่ตกตะกอนแข็ง
                  </p>
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                    <strong className="text-amber-800">📌 กระป๋องบวม:</strong> เกิดจากก๊าซของเชื้อแบคทีเรียคลอสทริเดียม โบทูลินัม ที่สร้างสารพิษทำลายระบบประสาทถึงแก่ชีวิต ห้ามชิมเด็ดขาด!
                  </div>
                </div>

                {/* 4. ต. ตรวจสอบวันหมดอายุ */}
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2 hover:border-rose-400 transition-colors">
                  <div className="flex items-center space-x-2 text-rose-700 font-black text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 text-xs font-black">
                      4
                    </span>
                    <span>ต. ที่ 4: ตรวจสอบวันหมดอายุ (EXP / BBE)</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    ตรวจสอบวันที่ผลิต (MFG/MFD) และวันหมดอายุ (EXP/EXD) หรือวันควรบริโภคก่อน (BBE/BBF) อย่างเคร่งครัด สินค้าที่หมดอายุแล้วสารสำคัญจะสลายตัวและกลายเป็นสารพิษสะสมในร่างกาย
                  </p>
                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-[11px] text-rose-900">
                    <strong className="text-rose-700">👁️ ยาหยอดตา:</strong> เมื่อเปิดขวดแล้ว สารกันเสียจะเสื่อมฤทธิ์ภายใน <strong>30 วัน</strong> ต้องเขียนวันที่เปิดและทิ้งทันทีเมื่อครบ 1 เดือน!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES (ผลิตภัณฑ์สุขภาพ 6 ด้าน) */}
          {activeTab === 'categories' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-indigo-950">
                    6 กลุ่มผลิตภัณฑ์สุขภาพที่สำนักงานคณะกรรมการอาหารและยา (อย.) กำกับดูแล
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">
                    แต่ละประเภทมีกฎหมาย เครื่องหมาย และวิธีการตรวจสอบที่เฉพาะเจาะจง
                  </p>
                </div>
                <span className="text-3xl">📦</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* 1. อาหาร */}
                <div className="bg-white p-4 rounded-3xl border-2 border-blue-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-blue-900 text-sm">
                      <span className="text-xl">🥗</span>
                      <span>1. อาหาร (Food)</span>
                    </div>
                    <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-lg">
                      อย. 13 หลัก
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>เครื่องหมาย อย. 13 หลัก:</strong> อยู่ในกรอบเครื่องหมาย อย. (เช่น 10-1-04741-1-0001)</li>
                    <li><strong>ตราสัญลักษณ์ทางเลือกสุขภาพ (Healthier Choice):</strong> รับรองอาหารที่มีน้ำตาล ไขมัน โซเดียม ในเกณฑ์ที่เหมาะสม</li>
                    <li><strong>ฉลาก GDA (หวาน มัน เค็ม):</strong> แสดงแท่งพลังงาน น้ำตาล ไขมัน โซเดียม เป็นเปอร์เซ็นต์ต่อวัน</li>
                  </ul>
                </div>

                {/* 2. ยา */}
                <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-emerald-900 text-sm">
                      <span className="text-xl">💊</span>
                      <span>2. ยา (Drugs)</span>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg">
                      ทะเบียนตำรับยา
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>ยาสามัญประจำบ้าน:</strong> มีข้อความในกรอบสีเขียว ใช้รักษาอาการเจ็บป่วยเล็กน้อยได้เอง</li>
                    <li><strong>ยาอันตราย:</strong> มีอักษรสีแดง "ยาอันตราย" ต้องซื้อจากร้านยาที่มีเภสัชกรควบคุม</li>
                    <li><strong>ยาใช้ภายนอก:</strong> มีอักษรสีแดง "ยาใช้ภายนอก ห้ามรับประทาน" ต้องแยกชั้นวางชัดเจน</li>
                    <li><strong>เลขทะเบียนตำรับยา:</strong> เช่น 1A 42/57 (1 = ผลิตในประเทศ, A = ยาเดี่ยวแผนปัจจุบัน)</li>
                  </ul>
                </div>

                {/* 3. เครื่องสำอาง */}
                <div className="bg-white p-4 rounded-3xl border-2 border-pink-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-pink-900 text-sm">
                      <span className="text-xl">💄</span>
                      <span>3. เครื่องสำอาง (Cosmetics)</span>
                    </div>
                    <span className="text-[10px] font-black bg-pink-100 text-pink-800 px-2 py-0.5 rounded-lg">
                      ใบรับจดแจ้ง 10 หลัก
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>เลขที่ใบรับจดแจ้ง 10 หรือ 13 หลัก:</strong> เช่น 10-1-6500024890</li>
                    <li><strong>สารห้ามใช้ร้ายแรง:</strong> สารปรอท (ไตวาย หน้าดำ), ไฮโดรควิโนน (ฝ้าถาวร), กรดเรทิโนอิก, สเตียรอยด์</li>
                    <li><strong>ห้ามเชื่อรีวิวขาวไวใน 3 วัน:</strong> ครีมที่ทำให้หน้าขาวเร็วผิดปกติมักลักลอบใส่สารปรอท</li>
                  </ul>
                </div>

                {/* 4. เครื่องมือแพทย์ */}
                <div className="bg-white p-4 rounded-3xl border-2 border-cyan-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-cyan-900 text-sm">
                      <span className="text-xl">🩺</span>
                      <span>4. เครื่องมือแพทย์ (Medical Devices)</span>
                    </div>
                    <span className="text-[10px] font-black bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-lg">
                      ใบอนุญาต/จดแจ้ง
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>อุปกรณ์ทั่วไป:</strong> ปรอทวัดไข้, หน้ากากอนามัยทางการแพทย์, ชุดตรวจ ATK, ถุงยางอนามัย</li>
                    <li><strong>คอนแทคเลนส์:</strong> เป็นเครื่องมือแพทย์ ต้องมีเลข อย. ห้ามใส่นอน ห้ามใช้น้ำประปาล้าง (เสี่ยงตาบอด)</li>
                    <li><strong>หน้ากากอนามัย:</strong> เอาด้านกันน้ำ (สีเขียว/ฟ้า) ออกด้านนอก และกดแถบลวดให้แนบสนิท</li>
                  </ul>
                </div>

                {/* 5. วัตถุอันตรายในบ้าน */}
                <div className="bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-amber-900 text-sm">
                      <span className="text-xl">🧴</span>
                      <span>5. วัตถุอันตรายในบ้านเรือน</span>
                    </div>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg">
                      เลข วอส. / ตรา GHS
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>เลขทะเบียน วอส.:</strong> เช่น วอส. 120/2561 บนน้ำยาล้างห้องน้ำ, สเปรย์กำจัดแมลง</li>
                    <li><strong>กฎเหล็กความปลอดภัย:</strong> ห้ามเก็บปนกับอาหารหรือยาเด็ดขาด! ต้องเก็บในที่มิดชิด พ้นมือเด็ก</li>
                    <li><strong>ห้ามผสมเด็ดขาด:</strong> ห้ามผสมน้ำยาล้างห้องน้ำกรดกับน้ำยาซักผ้าขาว เพราะจะเกิดก๊าซคลอรีนพิษถึงตาย</li>
                  </ul>
                </div>

                {/* 6. วัตถุออกฤทธิ์และยาเสพติด */}
                <div className="bg-white p-4 rounded-3xl border-2 border-red-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-black text-red-900 text-sm">
                      <span className="text-xl">⚠️</span>
                      <span>6. วัตถุออกฤทธิ์และยาเสพติด</span>
                    </div>
                    <span className="text-[10px] font-black bg-red-100 text-red-800 px-2 py-0.5 rounded-lg">
                      สิ่งผิดกฎหมาย
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>ยาลดความอ้วนเถื่อน:</strong> แอบผสมไซบูทรามีนหรือเฟนเตอมีน ทำให้หัวใจวาย ประสาทหลอน ช็อกเสียชีวิต</li>
                    <li><strong>ยาควบคุมพิเศษ:</strong> ยานอนหลับ ยาระงับประสาท ต้องจ่ายโดยแพทย์ในโรงพยาบาลเท่านั้น</li>
                    <li><strong>แจ้งเบาะแส:</strong> การซื้อขายทางเน็ตผิดกฎหมาย โทรแจ้งสายด่วน อย. 1556 ทันที</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEST KITS & ALLERGY TESTING */}
          {activeTab === 'testkits' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-emerald-950">
                    การตรวจสอบสารปนเปื้อน 5 ชนิดในอาหาร & วิธีทดสอบการแพ้เครื่องสำอาง
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">
                    อย.น้อย รณรงค์ใช้วิทยาศาสตร์เพื่อคุ้มครองผู้บริโภคในโรงเรียนและชุมชน
                  </p>
                </div>
                <span className="text-3xl">🧪</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <h4 className="font-heading font-black text-sm text-slate-900 flex items-center space-x-2">
                    <span className="text-rose-600">🔴</span>
                    <span>1. สารบอแรกซ์ (Borax / ผงกรอบ)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    มักพบใน: ลูกชิ้น หมูเด้ง ทอดมัน ไส้กรอก เพื่อให้เด้งกรอบผิดธรรมชาติ พิษสะสมทำลายตับ ไต ทางเดินอาหารอักเสบ<br />
                    <strong>วิธีทดสอบ:</strong> นำสารสกัดอาหารมาหยดลงบนกระดาษขมิ้น หากเปลี่ยนเป็น <strong>สีแดงอมส้มถึงแดงเข้ม</strong> แสดงว่ามีสารบอแรกซ์
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <h4 className="font-heading font-black text-sm text-slate-900 flex items-center space-x-2">
                    <span className="text-rose-600">🔴</span>
                    <span>2. สารฟอร์มาลีน (Formalin / น้ำยาดองศพ)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    มักพบใน: อาหารทะเลสด (ปลาหมึก กุ้ง หอย) ผักสด เห็ดฟาง เพื่อให้คงความสดไม่เน่าเสีย กลิ่นฉุนแสบจมูก ทำลายระบบประสาทและทางเดินอาหาร<br />
                    <strong>วิธีสังเกต:</strong> หากอาหารสดไม่มีแมลงวันตอม และเนื้อเด้งแข็งผิดปกติ ให้สงสัยว่าแช่ฟอร์มาลิน ทดสอบด้วยชุดตรวจฟอร์มาลิน อย.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <h4 className="font-heading font-black text-sm text-slate-900 flex items-center space-x-2">
                    <span className="text-amber-600">🟠</span>
                    <span>3. สารฟอกขาว (โซเดียมไฮโดรซัลไฟต์)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    มักพบใน: ถั่วงอก ขิงซอย หน่อไม้ดอง ยอดมะพร้าวอ่อน เพื่อให้ขาวน่ากิน<br />
                    <strong>อันตราย:</strong> ทำให้เกิดอาการปวดท้อง แน่นหน้าอก หายใจไม่ออก ความดันโลหิตต่ำ ผู้ป่วยหอบหืดอาจเสียชีวิตได้
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <h4 className="font-heading font-black text-sm text-slate-900 flex items-center space-x-2">
                    <span className="text-amber-600">🟠</span>
                    <span>4. สารกันรา (กรดซาลิซิลิค)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    มักพบใน: น้ำดองผักผลไม้ พริกดอง กระเทียมดอง ป้องกันเชื้อรา<br />
                    <strong>อันตราย:</strong> กัดกระเพาะอาหารและลำไส้ เลือดออกในทางเดินอาหาร มีไข้ และความดันโลหิตลดต่ำลง
                  </p>
                </div>
              </div>

              {/* Patch test box */}
              <div className="bg-pink-50 border-2 border-pink-200 rounded-3xl p-4 space-y-2">
                <h4 className="font-heading font-black text-sm text-pink-950 flex items-center space-x-2">
                  <span>✨</span>
                  <span>วิธีทดสอบการแพ้เครื่องสำอางเบื้องต้น (Patch Test)</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  ก่อนเริ่มใช้เครื่องสำอางหรือครีมบำรุงผิวใหม่ทุกครั้ง ให้ทาครีมขนาดเท่าเมล็ดถั่วเขียวบริเวณ <strong>ท้องแขนด้านใน หรือผิวหนังหลังใบหู</strong> ทิ้งไว้ <strong>24 ถึง 48 ชั่วโมง</strong> โดยไม่ล้างออก หากมีอาการคัน แดง บวม มีผื่นขึ้น หรือแสบร้อน แสดงว่าแพ้ผลิตภัณฑ์นั้น ห้ามนำมาทาผิวหน้าโดยเด็ดขาด!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CABINET STORAGE & HAZARDOUS WASTE */}
          {activeTab === 'storage' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-amber-950">
                    มาตรฐานการจัดตู้ยาสามัญประจำบ้าน อย.น้อย & การทิ้งถังขยะอันตราย
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">
                    คู่มือ อย.น้อย หน้า 111-125 วางหลักเกณฑ์การจัดระเบียบตู้ยาอย่างปลอดภัย
                  </p>
                </div>
                <span className="text-3xl">🗄️</span>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3.5 flex items-start space-x-3">
                  <div className="text-2xl shrink-0">1️⃣</div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">ชั้นที่ 1 (บนสุด): ยาใช้ภายใน (รับประทาน)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      ยาสำหรับกินเท่านั้น เช่น ยาพาราเซตามอล, ยาแก้แพ้ CPM, ผงเกลือแร่ ORS, ผงถ่านคาร์บอน, ยาธาตุน้ำแดง, ยาลดกรดอลูมินา-แมกนีเซีย ต้องปิดฝาและเก็บในแผงบรรจุเดิมเสมอ
                    </p>
                  </div>
                </div>

                <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3.5 flex items-start space-x-3">
                  <div className="text-2xl shrink-0">2️⃣</div>
                  <div>
                    <h4 className="font-bold text-rose-900 text-sm">ชั้นที่ 2 (กลาง): ยาใช้ภายนอก (ฉลากตัวหนังสือสีแดง "ห้ามรับประทาน")</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      ห้ามนำมารับประทานเด็ดขาด เช่น โพวิโดนไอโอดีนใส่แผลสด, แอลกอฮอล์ 70%, คาราไมน์แก้คัน, ยาหม่องขี้ผึ้ง, เจลว่านหางจระเข้ทาแผลไฟไหม้ ต้องแยกชั้นจากยากินชัดเจน ป้องกันการหยิบสับสนในความมืด
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3.5 flex items-start space-x-3">
                  <div className="text-2xl shrink-0">3️⃣</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">ชั้นที่ 3 (ล่างสุด): เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      พลาสเตอร์ยา, ผ้าก๊อซปลอดเชื้อ, สำลีทางการแพทย์, ปรอทวัดไข้ดิจิทัล, เทปแต่งแผล, ปากคีบทำแผล ต้องเก็บในซองปิดสนิท สะอาด แห้ง และพร้อมใช้งานเมื่อเกิดอุบัติเหตุ
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-3.5 flex items-start space-x-3">
                  <div className="text-2xl shrink-0">🗑️</div>
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">ถังขยะอันตรายสีแดง: ของต้องห้ามในตู้ยา</h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      <strong>ห้ามใส่สิ่งเหล่านี้ในตู้ยาเด็ดขาด:</strong> ยาหมดอายุ, ยาเปลี่ยนสภาพ (ตกตะกอน สีเปลี่ยน), ยาหยอดตาเปิดเกิน 30 วัน, ยาชุดสเตียรอยด์, ยาปฏิชีวนะเหลือใช้ (Amoxicillin), น้ำยาล้างห้องน้ำกรด, ครีมกวนเองไร้เลข อย., และขนมหวานคล้ายยา (ป้องกันเด็กเล็กหยิบกินผิด)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT & VERIFICATION */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-sky-950">
                    ช่องทางตรวจสอบเลข อย. และแจ้งเบาะแสผลิตภัณฑ์ผิดกฎหมาย
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">
                    ร่วมเป็นหูเป็นตา พิทักษ์สิทธิผู้บริโภคไปกับ อย.น้อย ทั่วประเทศ
                  </p>
                </div>
                <span className="text-3xl">📞</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 font-black text-sm">
                    <PhoneCall className="w-5 h-5" />
                    <span>สายด่วน อย. 1556</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    โทรฟรีได้ตลอด 24 ชั่วโมง เพื่อสอบถามข้อมูล ร้องเรียนการได้รับอันตรายจากผลิตภัณฑ์สุขภาพ หรือแจ้งเบาะแสการโฆษณาโอ้อวดเกินจริง
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600 font-black text-sm">
                    <Search className="w-5 h-5" />
                    <span>แอปพลิเคชัน Oryor Smart App</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ดาวน์โหลดได้ทั้ง iOS และ Android มีฟังก์ชันสแกนบาร์โค้ด ตรวจสอบสถานะการอนุญาตของเลข อย. แบบเรียลไทม์
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-600 font-black text-sm">
                    <Sparkles className="w-5 h-5" />
                    <span>Line Official: @FDAThai</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    พิมพ์เลข อย. หรือชื่อผลิตภัณฑ์ส่งในช่องแชท ระบบแชทบอทของ อย. จะตอบผลการตรวจสอบความถูกต้องให้ทันที
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-600 font-black text-sm">
                    <ExternalLink className="w-5 h-5" />
                    <span>เว็บไซต์ www.fda.moph.go.th</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เว็บไซต์ทางการของสำนักงานคณะกรรมการอาหารและยา คลังความรู้ สื่อการเรียนรู้ อย.น้อย และประกาศเตือนภัยผลิตภัณฑ์อันตราย
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            📖 อ้างอิง: คู่มือ อย.น้อย กระทรวงสาธารณสุข และมาตรฐานคุ้มครองผู้บริโภค
          </div>
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all"
          >
            เข้าใจแล้ว & ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
