import React, { useState } from 'react';
import { X, Printer, Award, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalScore: number;
  solvedCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  totalScore,
  solvedCount,
}) => {
  const [studentName, setStudentName] = useState('ด.ช. ปัญญา ดีเด่น');
  const [schoolName, setSchoolName] = useState('โรงเรียนอนุบาลเทศบาล');
  const [gradeLevel, setGradeLevel] = useState('ชั้นประถมศึกษาปีที่ 5');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayThaiDate = new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Control Bar (Hidden in print) */}
        <div className="print:hidden p-4 bg-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-heading font-bold text-sm">
              เกียรติบัตรเยาวชน อย.น้อย ผู้พิทักษ์ตู้ยาสามัญประจำบ้าน
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Form for Personalization (Hidden in print) */}
        <div className="print:hidden p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">ชื่อ-นามสกุล นักเรียน:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="ระบุชื่อ-นามสกุล..."
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">โรงเรียน:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="ระบุชื่อโรงเรียน..."
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">ระดับชั้น:</label>
            <input
              type="text"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="เช่น ชั้น ป.5/2"
            />
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-radial from-amber-50/50 via-white to-amber-50/30 relative border-8 border-double border-amber-600 m-4 rounded-2xl shadow-inner text-center">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-500 text-xl">⚜️</div>
          <div className="absolute top-2 right-2 text-amber-500 text-xl">⚜️</div>
          <div className="absolute bottom-2 left-2 text-amber-500 text-xl">⚜️</div>
          <div className="absolute bottom-2 right-2 text-amber-500 text-xl">⚜️</div>

          {/* Seal / Crest */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-700 via-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md ring-4 ring-amber-400 mb-3">
            <ShieldCheck className="w-12 h-12" />
          </div>

          {/* Thai FDA Junior Header */}
          <div className="space-y-1">
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-900 tracking-tight">
              อย.น้อยใช้ยาอย่างปลอดภัย
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
              รอบรู้เรื่องตู้ยาสามัญประจำบ้านและการปฐมพยาบาลเบื้องต้น
            </p>
          </div>

          <div className="my-5 flex items-center justify-center space-x-3">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-heading text-lg font-bold text-amber-800 tracking-widest uppercase">
              เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า
            </span>
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          {/* Student Name */}
          <div className="py-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-800 border-b-2 border-emerald-600 pb-1 px-6 inline-block">
              {studentName || 'นักเรียน อย.น้อย ผู้กล้าหาญ'}
            </span>
            <div className="text-xs sm:text-sm text-slate-700 font-medium mt-2">
              {gradeLevel} · {schoolName}
            </div>
          </div>

          {/* Achievement Description */}
          <div className="max-w-xl mx-auto my-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            ได้ผ่านการทดสอบและฝึกฝนทักษะ{' '}
            <span className="font-bold text-emerald-800">
              "การจัดตู้ยาสามัญประจำบ้านตามมาตรฐาน อย. และการปฐมพยาบาลเบื้องต้น"
            </span>{' '}
            มีความรู้ในการคัดแยกยาใช้ภายใน ยาใช้ภายนอกฉลากสีแดง เวชภัณฑ์ และตรวจจับยาหมดอายุ
            ด้วยคะแนนสะสม <span className="font-bold text-amber-700">{totalScore} คะแนน</span> (ผ่านการจัดยาและแก้เคส {solvedCount} รายการ)
          </div>

          {/* Signatures & Seal */}
          <div className="mt-8 pt-6 border-t border-amber-300 grid grid-cols-2 gap-8 text-xs text-slate-600">
            <div className="text-center space-y-1">
              <div className="font-script text-base text-slate-800 font-bold italic">
                ( คุณครูที่ปรึกษากิจกรรม อย.น้อย )
              </div>
              <div className="text-[11px] text-slate-500">หัวหน้างานอนามัยโรงเรียน</div>
            </div>

            <div className="text-center space-y-1">
              <div className="font-bold text-slate-800">
                ให้ไว้ ณ วันที่ {todayThaiDate}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center justify-center space-x-1">
                <span>ตราสัญลักษณ์รับรองความปลอดภัย อย.น้อย</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info (Hidden in print) */}
        <div className="print:hidden p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-600 flex items-center justify-center space-x-2">
          <span>💡 สามารถกดปุ่ม</span>
          <span className="font-bold text-emerald-700">"พิมพ์ / บันทึก PDF"</span>
          <span>เพื่อดาวน์โหลดเกียรติบัตรไปติดบอร์ดห้องเรียนหรือเก็บในพอร์ตฟอลิโอ</span>
        </div>
      </div>
    </div>
  );
};
