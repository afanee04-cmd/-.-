import React from 'react';
import { GameMode, GameLevel, GameMapId } from '../types/game';
import { ProductDomain } from '../types/medicine';
import { GAME_MAPS } from '../data/mapsData';
import {
  Trophy,
  BookOpen,
  Zap,
  Volume2,
  VolumeX,
  ShieldCheck,
  Play,
  User,
  MapPin,
  Sparkles,
  Cloud,
  Layers,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MainMenuProps {
  playerName: string;
  onChangePlayerName: (name: string) => void;
  domain: ProductDomain;
  mode: GameMode;
  level: GameLevel;
  selectedMapId: GameMapId;
  onSelectDomain: (d: ProductDomain) => void;
  onSelectMode: (m: GameMode) => void;
  onSelectLevel: (l: GameLevel) => void;
  onSelectMap: (mapId: GameMapId) => void;
  onStartGame: () => void;
  onOpenClinicRoom: () => void;
  onOpenCloudRank: () => void;
  onOpenFdaCareGuide: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  playerName,
  onChangePlayerName,
  domain,
  mode,
  level,
  selectedMapId,
  onSelectDomain,
  onSelectMode,
  onSelectLevel,
  onSelectMap,
  onStartGame,
  onOpenClinicRoom,
  onOpenCloudRank,
  onOpenFdaCareGuide,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="relative min-h-[640px] bg-[#5c94fc] rounded-3xl p-5 sm:p-8 border-4 border-amber-400 shadow-2xl overflow-hidden flex flex-col justify-between space-y-6">
      {/* Decorative Pixel Clouds & Hills in Background */}
      <div className="absolute top-6 left-12 w-32 h-14 bg-white/90 rounded-full blur-2xs pointer-events-none" />
      <div className="absolute top-14 right-20 w-44 h-16 bg-white/80 rounded-full blur-2xs pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#00a800] rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-96 h-96 bg-[#00d000] rounded-full pointer-events-none" />

      {/* Top Bar: Replaced title with "อย.น้อยใช้ยาอย่างปลอดภัย", audio, and cloud rank button */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl shadow-md border-2 border-emerald-400">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="font-heading font-black text-xs sm:text-sm text-emerald-800">
            อย.น้อยใช้ยาอย่างปลอดภัย
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* FDA Care Guidelines button */}
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenFdaCareGuide();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-2xl text-xs shadow-md border-2 border-indigo-400 transition-all"
            title="คลิกอ่านคู่มือ อย.น้อย ฉบับสมบูรณ์"
          >
            <BookOpen className="w-4 h-4 text-indigo-200" />
            <span>วิธีการดูแลของ อย.</span>
          </button>

          {/* Live Data Cloud Sync Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-white/95 border-2 border-sky-400 rounded-2xl text-xs font-bold text-sky-800 shadow-md">
            <Cloud className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>ซิงก์กับ Data Cloud</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenCloudRank();
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-2xl text-xs shadow-md border-2 border-white transition-all transform hover:scale-105"
          >
            <Trophy className="w-4 h-4 text-amber-900" />
            <span>อันดับ Data Cloud</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-2xl shadow-md border-2 border-slate-200 transition-colors"
            title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Title Logo Banner */}
      <div className="relative z-10 text-center space-y-1">
        <div className="inline-block bg-white/95 px-6 py-3.5 rounded-3xl shadow-xl border-4 border-amber-400 transform -rotate-1 hover:rotate-0 transition-transform">
          <span className="text-xs sm:text-sm font-black tracking-widest text-emerald-600 uppercase block">
            SUPER FIRST AID WORLD
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
            เกมตู้ยาสามัญประจำบ้าน <span className="text-blue-600">อย.น้อย</span>
          </h1>
          <p className="text-xs text-slate-600 font-semibold mt-0.5">
            เดินเก็บยา กระโดดขึ้นแท่น จัดเข้าชั้นมาตรฐาน อย.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="relative z-10 max-w-3xl mx-auto w-full space-y-4">
        {/* 1. Player Name Input Form (Requirement #1) */}
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-lg border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-800 block">
                ชื่อผู้เล่น (สำหรับบันทึกสถิติใน Data Cloud):
              </label>
              <span className="text-[11px] text-slate-500">
                สามารถเปลี่ยนชื่อเล่น หรือชื่อจริงของคุณได้
              </span>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={playerName}
              onChange={(e) => onChangePlayerName(e.target.value)}
              maxLength={25}
              placeholder="กรอกชื่อผู้เล่น..."
              className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* 2. Product Domain Selector (Requirement #8: เลือกโหมดยา หรือ โหมดผลิตภัณฑ์สุขภาพ อย.) */}
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-lg border-2 border-indigo-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>เลือกประเภทผลิตภัณฑ์: โหมดยา หรือ โหมดผลิตภัณฑ์สุขภาพ อย.</span>
            </label>
            <span className="text-[11px] font-bold text-indigo-700">คู่มือ อย.น้อย</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 1. โหมดยาสามัญประจำบ้าน */}
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectDomain('medicine');
              }}
              className={`p-3 rounded-2xl border-3 text-left transition-all ${
                domain === 'medicine'
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  💊 โหมดยาสามัญ
                </span>
                {domain === 'medicine' && <span className="text-xs text-blue-600 font-bold">✓ เลือก</span>}
              </div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                ตู้ยาสามัญประจำบ้าน
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                ยาใช้ภายใน ยาใช้ภายนอกฉลากแดง เวชภัณฑ์ปฐมพยาบาล ยาหมดอายุ (หน้า 111-125)
              </p>
            </button>

            {/* 2. โหมดผลิตภัณฑ์สุขภาพทุกประเภท 6 ด้าน */}
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectDomain('health_products');
              }}
              className={`p-3 rounded-2xl border-3 text-left transition-all ${
                domain === 'health_products'
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  🥗 ผลิตภัณฑ์สุขภาพ
                </span>
                {domain === 'health_products' && <span className="text-xs text-emerald-600 font-bold">✓ เลือก</span>}
              </div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                ผลิตภัณฑ์สุขภาพ 6 ด้าน
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                อาหาร อย. 13 หลัก, เครื่องสำอาง 10 หลัก, เครื่องมือแพทย์, วัตถุอันตราย วอส., ยาเสพติด
              </p>
            </button>

            {/* 3. รวมทุกประเภท */}
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectDomain('all');
              }}
              className={`p-3 rounded-2xl border-3 text-left transition-all ${
                domain === 'all'
                  ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  🌟 รวมทุกประเภท
                </span>
                {domain === 'all' && <span className="text-xs text-purple-600 font-bold">✓ เลือก</span>}
              </div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                ครบวงจรคู่มือ อย.น้อย
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                สุ่มตัวอย่างทั้งยาและผลิตภัณฑ์สุขภาพทุกหมวดหมู่ รวมทุกเคสทดสอบ
              </p>
            </button>
          </div>
        </div>

        {/* 3. Map Selection (Requirement #3 - มี Map ให้เลือกได้) */}
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-lg border-2 border-purple-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>เลือกแผนที่ (Map): ทางเดินและลูกเล่นที่หลากหลาย</span>
            </label>
            <span className="text-[11px] font-bold text-purple-700">3 ด่านผจญภัย</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(GAME_MAPS).map((mapConfig) => {
              const isSelected = selectedMapId === mapConfig.id;
              return (
                <button
                  key={mapConfig.id}
                  onClick={() => {
                    soundEffects.playSelect();
                    onSelectMap(mapConfig.id);
                  }}
                  className={`p-3 rounded-2xl border-3 text-left transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      {mapConfig.badge}
                    </span>
                    {isSelected && <span className="text-xs text-purple-600 font-bold">✓ เลือก</span>}
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {mapConfig.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {mapConfig.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Function Mode Selector (2 Functions) */}
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-lg border-2 border-blue-300 space-y-2.5">
          <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
            เลือกโหมดการเล่น (2 ฟังก์ชัน):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectMode('learning');
              }}
              className={`p-3.5 rounded-2xl border-3 text-left transition-all ${
                mode === 'learning'
                  ? 'border-blue-500 bg-blue-50/90 shadow-md ring-2 ring-blue-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>1. โหมดเรียนรู้</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ก่อนวางยาบนชั้น จะแสดงประเภทยาชัดเจน พร้อมกลุ่มอาการและคำแนะนำ เหมาะสำหรับผู้เริ่มต้น
              </p>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectMode('time_attack');
              }}
              className={`p-3.5 rounded-2xl border-3 text-left transition-all ${
                mode === 'time_attack'
                  ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-sm">
                <Zap className="w-4 h-4" />
                <span>2. การแข่งขันกับเวลา</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ไม่แสดงประเภทยาตอนถือ! จะเฉลยตอนวางบนชั้นวาง เพื่อทดสอบความรู้และบันทึกสถิติความเร็ว
              </p>
            </button>
          </div>
        </div>

        {/* 4. Level Selector */}
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-lg border-2 border-emerald-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
              เลือกระดับความยาก (Level):
            </label>
            <span className="text-[11px] font-semibold text-slate-500">
              สุ่มยาตามกลุ่มอาการและฉลากยาขนาดใหญ่
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectLevel(1);
              }}
              className={`py-2.5 px-2 rounded-2xl border-3 text-center transition-all ${
                level === 1
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black shadow-md ring-2 ring-emerald-300'
                  : 'border-slate-200 bg-white text-slate-700 font-bold hover:border-slate-300'
              }`}
            >
              <span className="text-sm sm:text-base block">🌱 LEVEL 1</span>
              <span className="text-xs text-emerald-700 font-extrabold block mt-0.5">5 ข้อ</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectLevel(2);
              }}
              className={`py-2.5 px-2 rounded-2xl border-3 text-center transition-all ${
                level === 2
                  ? 'border-blue-500 bg-blue-50 text-blue-950 font-black shadow-md ring-2 ring-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 font-bold hover:border-slate-300'
              }`}
            >
              <span className="text-sm sm:text-base block">⭐ LEVEL 2</span>
              <span className="text-xs text-blue-700 font-extrabold block mt-0.5">10 ข้อ</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onSelectLevel(3);
              }}
              className={`py-2.5 px-2 rounded-2xl border-3 text-center transition-all ${
                level === 3
                  ? 'border-purple-500 bg-purple-50 text-purple-950 font-black shadow-md ring-2 ring-purple-300'
                  : 'border-slate-200 bg-white text-slate-700 font-bold hover:border-slate-300'
              }`}
            >
              <span className="text-sm sm:text-base block">🔥 LEVEL 3</span>
              <span className="text-xs text-purple-700 font-extrabold block mt-0.5">15 ข้อ</span>
            </button>
          </div>
        </div>

        {/* Big Start Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <button
            onClick={() => {
              soundEffects.playFanfare();
              onStartGame();
            }}
            className="w-full sm:w-auto flex-1 px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black text-lg sm:text-xl rounded-2xl shadow-2xl border-4 border-amber-300 transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>เริ่มเล่นเกมมาริโอ้ตู้ยา ({GAME_MAPS[selectedMapId].name})</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenClinicRoom();
            }}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-heading font-black text-sm sm:text-base rounded-2xl shadow-xl border-4 border-emerald-300 transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>🏥</span>
            <span>เข้าสู่ห้องพยาบาลจริง (จัดตู้ยาไม้จริง)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
