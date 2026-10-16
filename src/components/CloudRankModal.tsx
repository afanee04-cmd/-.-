import React, { useState, useEffect } from 'react';
import { X, Trophy, Cloud, Medal, Clock, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { CloudRankEntry, GameMode, GameLevel } from '../types/game';
import { CloudRankService } from '../services/cloudRankService';
import { GAME_MAPS } from '../data/mapsData';

interface CloudRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightEntryId?: string;
}

export const CloudRankModal: React.FC<CloudRankModalProps> = ({
  isOpen,
  onClose,
  highlightEntryId,
}) => {
  const [rankings, setRankings] = useState<CloudRankEntry[]>([]);
  const [filterMode, setFilterMode] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const fetchRanks = async () => {
    setIsLoading(true);
    const data = await CloudRankService.getRankings();
    setRankings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchRanks();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = rankings.filter((r) => {
    const matchMode = filterMode === 'all' || r.mode === filterMode;
    const matchLevel = filterLevel === 'all' || r.level.toString() === filterLevel;
    return matchMode && matchLevel;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-xs">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  อันดับเกียรติยศ Data Cloud
                </h3>
                <span className="flex items-center space-x-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
                  <Cloud className="w-3.5 h-3.5 text-sky-200" />
                  <span>Cloud Synced</span>
                </span>
              </div>
              <p className="text-xs text-sky-100">
                คะแนนยอดเยี่ยมจากนักเรียน อย.น้อย ทั่วประเทศ
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={fetchRanks}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-slate-500 font-semibold mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> โหมด:
            </span>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilterMode('learning')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'learning' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              เรียนรู้
            </button>
            <button
              onClick={() => setFilterMode('time_attack')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'time_attack' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              แข่งขันกับเวลา
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-slate-500 font-semibold mr-1">ระดับ:</span>
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLevel === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilterLevel('1')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLevel === '1' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lvl 1 (5 ข้อ)
            </button>
            <button
              onClick={() => setFilterLevel('2')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLevel === '2' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lvl 2 (10 ข้อ)
            </button>
            <button
              onClick={() => setFilterLevel('3')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLevel === '3' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lvl 3 (15 ข้อ)
            </button>
          </div>
        </div>

        {/* Rankings List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              ยังไม่มีข้อมูลอันดับในหมวดนี้ เล่นให้จบเพื่อเป็นคนแรกที่บันทึกคะแนน!
            </div>
          ) : (
            filtered.map((item, index) => {
              const isHighlight = item.id === highlightEntryId;
              const rankNum = index + 1;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    isHighlight
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-md'
                      : rankNum === 1
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-xs'
                      : rankNum === 2
                      ? 'bg-slate-50 border-slate-300'
                      : rankNum === 3
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Left: Medal/Rank Number & Player info */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                        rankNum === 1
                          ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-white ring-2 ring-amber-200'
                          : rankNum === 2
                          ? 'bg-slate-300 text-slate-800'
                          : rankNum === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : rankNum === 3 ? '🥉' : rankNum}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-sm text-slate-900 truncate">
                          {item.playerName}
                        </span>
                        {isHighlight && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                            ของคุณ
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                        <span>
                          {item.domain === 'health_products'
                            ? '🥗 สุขภาพ'
                            : item.domain === 'all'
                            ? '🌟 รวมทุกด้าน'
                            : '💊 ยาสามัญ'}
                        </span>
                        <span>·</span>
                        <span>
                          {item.mode === 'time_attack' ? '⚡ แข่งเวลา' : '📖 เรียนรู้'}
                        </span>
                        <span>·</span>
                        <span>Level {item.level} ({item.totalItems} ข้อ)</span>
                        {item.mapId && GAME_MAPS[item.mapId] && (
                          <>
                            <span>·</span>
                            <span className="text-purple-600 font-semibold">{GAME_MAPS[item.mapId].name}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>{item.dateFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score & Time */}
                  <div className="text-right shrink-0 pl-3">
                    <div className="font-heading font-extrabold text-base text-blue-700">
                      {item.score} <span className="text-xs font-normal text-slate-500">แต้ม</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-end space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.timeSpentSeconds} วิ</span>
                      <span>·</span>
                      <span className="text-emerald-600 font-semibold">{item.correctItems}/{item.totalItems} ข้อ</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1 text-slate-500">
            <Cloud className="w-4 h-4 text-sky-600" />
            <span>ข้อมูลได้รับการบันทึกและเชื่อมโยงผ่าน Data Cloud เรียบร้อย</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
