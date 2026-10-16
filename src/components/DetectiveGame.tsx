import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  FileQuestion,
} from 'lucide-react';
import { INSPECTOR_CASES, InspectorCase } from '../data/inspectorData';
import { soundEffects } from '../utils/audio';

interface DetectiveGameProps {
  onScoreUpdate: (points: number) => void;
  onItemSolved: () => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({ onScoreUpdate, onItemSolved }) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const currentCase: InspectorCase = INSPECTOR_CASES[caseIndex];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const option = currentCase.options.find((o) => o.id === optionId);
    if (!option) return;

    setExplanation(option.explanation);
    if (option.isCorrect) {
      setIsCorrect(true);
      soundEffects.playCorrect();
      onScoreUpdate(120);
      onItemSolved();
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      setIsCorrect(false);
      soundEffects.playWrong();
    }
  };

  const handleNextCase = () => {
    soundEffects.playSelect();
    const nextIdx = (caseIndex + 1) % INSPECTOR_CASES.length;
    setCaseIndex(nextIdx);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setExplanation(null);
    setIsCorrect(false);
  };

  const handleResetCase = () => {
    soundEffects.playSelect();
    setSelectedOptionId(null);
    setIsAnswered(false);
    setExplanation(null);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-lg text-slate-800 flex items-center space-x-2">
              <Search className="w-5 h-5 text-amber-500" />
              <span>นักสืบฉลากยา อย.น้อย (ตรวจจับจุดผิดปกติ)</span>
            </h2>
            <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
              คดีที่ {caseIndex + 1} / {INSPECTOR_CASES.length}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            ส่องฉลากยา ตรวจวันหมดอายุ เลข อย. และระวังยาชุดยาผีบอกที่ผสมสารอันตราย
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetCase}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>เริ่มคดีนี้ใหม่</span>
          </button>
          <button
            onClick={handleNextCase}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <span>คดีถัดไป</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Detective Case Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Zoomed Evidence Drug Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-5 border-2 border-amber-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                วัตถุพยานในคดี
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {currentCase.subtitle}
              </span>
            </div>

            {/* Realistic Drug Box Evidence Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                <span className="font-heading font-bold text-base text-slate-900">
                  {currentCase.drugName}
                </span>
                <span className="text-2xl">🔍</span>
              </div>

              {/* Box Details */}
              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">เลขทะเบียนตำรับยา:</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {currentCase.boxVisual.regNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">วันผลิต (MFG):</span>
                    <span className="font-mono font-bold text-slate-700 text-xs">
                      {currentCase.boxVisual.mfgDate}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">วันหมดอายุ (EXP):</span>
                    <span className="font-mono font-bold text-red-600 text-xs">
                      {currentCase.boxVisual.expDate}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">
                    ข้อความบนฉลาก / คำเตือน:
                  </span>
                  <span className="font-semibold text-amber-900 block mt-0.5">
                    {currentCase.boxVisual.labelWarning}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] leading-relaxed">
                  <span className="font-bold block text-slate-800">สภาพภายนอกที่สังเกตได้:</span>
                  {currentCase.boxVisual.stateDescription}
                </div>
              </div>
            </div>

            {/* Detective Handbook Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-900 space-y-1">
              <span className="font-bold flex items-center space-x-1.5 text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>คู่มือนักสืบ อย.น้อย:</span>
              </span>
              <p className="leading-relaxed text-[11px]">{currentCase.fdaDetectiveTip}</p>
            </div>
          </div>
        </div>

        {/* Right: Question and Choices (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide block">
                {currentCase.title}
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mt-1">
                {currentCase.question}
              </h3>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {currentCase.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start space-x-3 text-xs sm:text-sm font-medium ${btnStyle}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isAnswered && opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isAnswered && isSelected && !opt.isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border-2 space-y-2 animate-in fade-in zoom-in-95 text-xs ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>นักสืบตอบถูกต้อง! (+120 คะแนน)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>คำตอบยังไม่ถูกต้อง ลองอ่านคำอธิบายด้านล่าง</span>
                    </>
                  )}
                </div>

                <p className="leading-relaxed text-xs">{explanation}</p>

                <div className="pt-2">
                  <button
                    onClick={handleNextCase}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>ไปสืบคดีถัดไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
