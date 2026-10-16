import React from 'react';
import { MedicineItem } from '../types/medicine';
import { GameMode } from '../types/game';
import { AlertTriangle, ShieldCheck, HeartPulse, Sparkles, X } from 'lucide-react';
import { VisualBottle } from './VisualBottle';
import { getItemVisualIcon, getItemCategoryTitle } from '../utils/itemVisuals';

interface LargeDrugLabelProps {
  item: MedicineItem;
  mode: GameMode;
  onClose?: () => void;
  isFloating?: boolean;
}

export const LargeDrugLabel: React.FC<LargeDrugLabelProps> = ({
  item,
  mode,
  onClose,
  isFloating = false,
}) => {
  const isTimeAttack = mode === 'time_attack';

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border-4 transition-all overflow-hidden ${
        item.labelType === 'red_external' && !isTimeAttack
          ? 'border-red-500 ring-2 ring-red-300'
          : item.category === 'hazard' && !isTimeAttack
          ? 'border-red-700 ring-2 ring-red-400'
          : 'border-blue-400 ring-2 ring-blue-200'
      } ${isFloating ? 'max-w-md w-full animate-in zoom-in-95 duration-150' : 'w-full'}`}
    >
      {/* Top Banner Ribbon */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between text-white ${
          isTimeAttack
            ? 'bg-gradient-to-r from-amber-600 to-amber-700'
            : item.labelType === 'red_external'
            ? 'bg-gradient-to-r from-red-600 to-rose-700'
            : item.category === 'hazard'
            ? 'bg-gradient-to-r from-red-800 to-zinc-900'
            : 'bg-gradient-to-r from-blue-600 to-sky-700'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl">
            {isTimeAttack ? '⚡' : getItemVisualIcon(item)}
          </span>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-white/90 block">
              {isTimeAttack
                ? 'โหมดแข่งขันกับเวลา (ซ่อนประเภท - ต้องคิดเอง!)'
                : getItemCategoryTitle(item)}
            </span>
            <span className="text-xs font-bold text-white">
              {item.domain === 'health_products' ? 'ฉลากผลิตภัณฑ์กำลังถืออยู่' : 'ฉลากยากำลังถืออยู่'}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3 text-slate-800">
        {/* Large Drug Name Header with Realistic Product Visual */}
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
              {item.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {item.genericName} {item.regNumber ? `· ทะเบียน: ${item.regNumber}` : ''}
            </p>
          </div>
          <div className="shrink-0 p-1 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <VisualBottle item={item} size="sm" />
          </div>
        </div>

        {/* Symptom Group Indicator (กลุ่มอาการ) - Prominently Highlighted */}
        <div className="p-3 bg-amber-50 rounded-xl border-2 border-amber-300 shadow-xs space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-amber-900">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span>กลุ่มอาการและสรรพคุณ:</span>
          </div>
          <p className="text-sm font-bold text-amber-950 leading-snug">
            {item.symptomGroup}
          </p>
        </div>

        {/* External Red Label Warning (Shown only in learning mode) */}
        {!isTimeAttack && item.labelType === 'red_external' && (
          <div className="p-2.5 bg-red-600 text-white rounded-xl text-center shadow-xs">
            <span className="font-heading font-black text-sm tracking-wider uppercase block">
              ⚠️ ยาใช้ภายนอก ห้ามรับประทาน! ⚠️
            </span>
            <span className="text-[11px] text-white/90 block mt-0.5">
              (ตามกฎหมาย อย. ต้องพิมพ์ตัวอักษรสีแดงขนาดใหญ่เห็นชัด)
            </span>
          </div>
        )}

        {/* Indication & Usage details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
            <span className="font-bold text-slate-700 block text-[11px]">วิธีใช้:</span>
            <p className="text-slate-600 line-clamp-3 leading-relaxed">{item.usage}</p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
            <span className="font-bold text-slate-700 block text-[11px]">วันหมดอายุ (EXP):</span>
            <p className={`font-mono font-bold ${item.isExpired ? 'text-red-600' : 'text-slate-800'}`}>
              {item.expiryDate}
            </p>
            {item.isExpired && (
              <span className="text-[10px] text-red-600 font-bold block">
                * ยาหมดอายุแล้ว ต้องทิ้งถังขยะอันตราย!
              </span>
            )}
          </div>
        </div>

        {/* Warning text */}
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">คำเตือน อย.น้อย: </span>
            <span className="text-rose-800">{item.warning}</span>
          </div>
        </div>

        {/* Destination hint footer */}
        <div className="text-center pt-1">
          <span className="text-xs font-semibold text-slate-500">
            🏃 เดินนำยาไปวางที่ชั้นวางที่ถูกต้อง หรือทิ้งลงถังขยะอันตราย!
          </span>
        </div>
      </div>
    </div>
  );
};
