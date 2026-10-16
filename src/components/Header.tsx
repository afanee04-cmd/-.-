import React from 'react';
import { Volume2, VolumeX, Award, ShieldCheck, HeartPulse, Search, BookOpen, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export type GameTab = 'cabinet' | 'clinic' | 'detective' | 'encyclopedia' | 'certificate';

interface HeaderProps {
  currentTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  totalScore: number;
  solvedCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  totalScore,
  solvedCount,
  isMuted,
  onToggleMute,
  onOpenCertificate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('cabinet')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm ring-2 ring-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-bold text-lg text-emerald-800 tracking-tight">
                  ตู้ยาสามัญประจำบ้าน
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  อย.น้อย
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                โรงเรียนปลอดภัย · คัดแยกถูกชั้น · ปฐมพยาบาลมั่นใจ
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Functional buttons as segmented controls) */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-medium">
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectTab('cabinet');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'cabinet'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏠</span>
              <span>ภารกิจจัดตู้ยา</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectTab('clinic');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'clinic'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>ห้องพยาบาล อย.น้อย</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectTab('detective');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'detective'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>นักสืบฉลากยา</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectTab('encyclopedia');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'encyclopedia'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>คู่มือตู้ยา อย.</span>
            </button>
          </nav>

          {/* Right Controls: Score & Audio */}
          <div className="flex items-center space-x-3">
            {/* Clean Score Display (Zero-pill discipline: unboxed text with subtle separator) */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="flex items-center space-x-1 font-semibold text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{totalScore} คะแนน</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">ผ่าน {solvedCount} ชิ้น</span>
            </div>

            {/* Certificate Button */}
            <button
              onClick={() => {
                soundEffects.playFanfare();
                onOpenCertificate();
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              title="พิมพ์เกียรติบัตร อย.น้อย"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เกียรติบัตร</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียง'}
              aria-label="เปิดปิดเสียง"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs overflow-x-auto">
          <button
            onClick={() => onSelectTab('cabinet')}
            className={`px-2 py-1 rounded font-medium whitespace-nowrap ${
              currentTab === 'cabinet' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600'
            }`}
          >
            🏠 จัดตู้ยา
          </button>
          <button
            onClick={() => onSelectTab('clinic')}
            className={`px-2 py-1 rounded font-medium whitespace-nowrap ${
              currentTab === 'clinic' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600'
            }`}
          >
            🚑 ห้องพยาบาล
          </button>
          <button
            onClick={() => onSelectTab('detective')}
            className={`px-2 py-1 rounded font-medium whitespace-nowrap ${
              currentTab === 'detective' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600'
            }`}
          >
            🔍 นักสืบฉลากยา
          </button>
          <button
            onClick={() => onSelectTab('encyclopedia')}
            className={`px-2 py-1 rounded font-medium whitespace-nowrap ${
              currentTab === 'encyclopedia' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600'
            }`}
          >
            📖 คู่มือ อย.
          </button>
        </div>
      </div>
    </header>
  );
};
