/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MainMenu } from './components/MainMenu';
import { MarioGameCanvas } from './components/MarioGameCanvas';
import { RealisticClinicRoom } from './components/RealisticClinicRoom';
import { CloudRankModal } from './components/CloudRankModal';
import { FdaCareGuideModal } from './components/FdaCareGuideModal';
import { GameMode, GameLevel, GameMapId } from './types/game';
import { ProductDomain } from './types/medicine';
import { soundEffects } from './utils/audio';
import { Home, Trophy, Volume2, VolumeX, ShieldCheck, User, HeartPulse, Cloud, BookOpen } from 'lucide-react';

const SAVED_PLAYER_NAME_KEY = 'mario_fda_player_name';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'mario_game' | 'clinic_room'>('menu');
  const [domain, setDomain] = useState<ProductDomain>('medicine');
  const [mode, setMode] = useState<GameMode>('learning');
  const [level, setLevel] = useState<GameLevel>(1);
  const [selectedMapId, setSelectedMapId] = useState<GameMapId>('school_clinic');
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem(SAVED_PLAYER_NAME_KEY) || 'นักเรียน อย.น้อย';
  });
  const [isCloudRankOpen, setIsCloudRankOpen] = useState(false);
  const [isFdaGuideOpen, setIsFdaGuideOpen] = useState(false);
  const [highlightEntryId, setHighlightEntryId] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);

  const handleUpdatePlayerName = (name: string) => {
    setPlayerName(name);
    localStorage.setItem(SAVED_PLAYER_NAME_KEY, name);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEffects.setMuted(nextMuted);
  };

  const handleOpenCloudRank = (highlightId?: string) => {
    setHighlightEntryId(highlightId);
    setIsCloudRankOpen(true);
  };

  const handleGoHome = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="min-h-screen bg-[#5c94fc] text-slate-800 flex flex-col font-sans select-none">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-400 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Home Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                soundEffects.playSelect();
                handleGoHome();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all"
              title="ย้อนกลับหน้าแรก หน้าหลัก"
            >
              <Home className="w-4 h-4" />
              <span>หน้าหลัก (Home)</span>
            </button>

            {/* Quick Switch Button to Real Clinic Room */}
            <button
              onClick={() => {
                soundEffects.playSelect();
                setCurrentScreen('clinic_room');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border-2 transition-all shadow-xs ${
                currentScreen === 'clinic_room'
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <span>ห้องพยาบาลจริง (ตู้ยาไม้)</span>
            </button>

            {/* Quick Button to Open FDA Care Guide */}
            <button
              onClick={() => {
                soundEffects.playSelect();
                setIsFdaGuideOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-2 border-indigo-300 font-bold rounded-2xl text-xs transition-all shadow-xs"
              title="คู่มือวิธีการดูแลและตรวจสอบของ อย."
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">วิธีการดูแลของ อย.</span>
            </button>

            <div className="hidden lg:flex items-center space-x-2 border-l-2 border-slate-200 pl-3">
              <span className="text-[11px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-lg flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>อย.น้อยใช้ยาอย่างปลอดภัย</span>
              </span>
            </div>
          </div>

          {/* Right Controls: Player Badge & Live Cloud Sync & Cloud Leaderboard & Sound Toggle */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-900">
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span className="max-w-[120px] truncate">{playerName}</span>
            </div>

            {/* Live Data Cloud Sync Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-sky-50 border border-sky-300 rounded-2xl text-xs font-bold text-sky-800 shadow-xs">
              <Cloud className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>ซิงก์กับ Data Cloud</span>
            </div>

            <button
              onClick={() => {
                soundEffects.playSelect();
                handleOpenCloudRank();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-2xl text-xs shadow-md border-2 border-amber-500 transition-all transform hover:scale-105"
            >
              <Trophy className="w-4 h-4 text-amber-900" />
              <span className="hidden sm:inline">อันดับใน Data Cloud</span>
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors"
              title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6">
        {currentScreen === 'menu' && (
          <MainMenu
            playerName={playerName}
            onChangePlayerName={handleUpdatePlayerName}
            domain={domain}
            mode={mode}
            level={level}
            selectedMapId={selectedMapId}
            onSelectDomain={setDomain}
            onSelectMode={setMode}
            onSelectLevel={setLevel}
            onSelectMap={setSelectedMapId}
            onStartGame={() => setCurrentScreen('mario_game')}
            onOpenClinicRoom={() => setCurrentScreen('clinic_room')}
            onOpenCloudRank={() => handleOpenCloudRank()}
            onOpenFdaCareGuide={() => setIsFdaGuideOpen(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {currentScreen === 'mario_game' && (
          <MarioGameCanvas
            mode={mode}
            level={level}
            mapId={selectedMapId}
            playerName={playerName}
            domain={domain}
            onGoHome={handleGoHome}
            onOpenCloudRank={handleOpenCloudRank}
          />
        )}

        {currentScreen === 'clinic_room' && (
          <RealisticClinicRoom
            playerName={playerName}
            initialDomain={domain}
            onGoHome={handleGoHome}
            onOpenCloudRank={() => handleOpenCloudRank()}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white/80 py-3.5 px-4 text-xs border-t-4 border-amber-400">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
              อย
            </span>
            <span className="font-semibold text-slate-200">
              อย.น้อยใช้ยาอย่างปลอดภัย (FDA Junior First Aid & Medicine Cabinet)
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-sky-300 font-bold text-[11px] bg-slate-800/90 px-3 py-1 rounded-xl border border-slate-700">
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span>ซิงก์กับ Data Cloud อัตโนมัติ</span>
          </div>
        </div>
      </footer>

      {/* Cloud Rank Modal */}
      <CloudRankModal
        isOpen={isCloudRankOpen}
        onClose={() => setIsCloudRankOpen(false)}
        highlightEntryId={highlightEntryId}
      />

      {/* FDA Care & Safe Consumer Guidelines Modal */}
      <FdaCareGuideModal
        isOpen={isFdaGuideOpen}
        onClose={() => setIsFdaGuideOpen(false)}
      />
    </div>
  );
}
