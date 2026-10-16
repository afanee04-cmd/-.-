import React from 'react';
import { X, AlertTriangle, ShieldCheck, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { MedicineItem } from '../types/medicine';
import { VisualBottle } from './VisualBottle';
import { getItemVisualIcon, getItemCategoryTitle } from '../utils/itemVisuals';

interface MedicineDetailModalProps {
  item: MedicineItem | null;
  onClose: () => void;
  onSortToCategory?: (category: MedicineItem['category']) => void;
}

export const MedicineDetailModal: React.FC<MedicineDetailModalProps> = ({
  item,
  onClose,
  onSortToCategory,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Ribbon */}
        <div className={`p-4 flex items-start justify-between ${
          item.category === 'hazard'
            ? 'bg-red-700 text-white'
            : item.labelType === 'red_external'
            ? 'bg-rose-600 text-white'
            : item.healthCategory === 'food'
            ? 'bg-blue-600 text-white'
            : item.healthCategory === 'med_device'
            ? 'bg-teal-700 text-white'
            : 'bg-emerald-700 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-lg">
              {getItemVisualIcon(item)}
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold block">
                {getItemCategoryTitle(item)}
              </span>
              <h3 className="font-heading font-bold text-lg text-white leading-tight">
                {item.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4 text-sm text-slate-700">
          {/* Top visual & basic metadata */}
          <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="shrink-0">
              <VisualBottle item={item} size="lg" />
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">{item.genericName}</div>
              {item.regNumber && (
                <div className="text-slate-600 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>เลขทะเบียน/อย.: <strong className="font-mono text-slate-800">{item.regNumber}</strong></span>
                </div>
              )}
              {item.healthCategory && (
                <div className="text-slate-600 flex items-center space-x-1">
                  <span className="text-xs">🏷️</span>
                  <span>หมวด อย.: </span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                    {item.healthCategory === 'food'
                      ? 'อาหาร (เลข อย. 13 หลัก)'
                      : item.healthCategory === 'cosmetic'
                      ? 'เครื่องสำอาง (ใบรับจดแจ้ง 10 หลัก)'
                      : item.healthCategory === 'med_device'
                      ? 'เครื่องมือแพทย์'
                      : item.healthCategory === 'household_hazard'
                      ? 'วัตถุอันตรายในบ้าน (ตรา วอส.)'
                      : item.healthCategory === 'controlled_narcotic'
                      ? 'วัตถุออกฤทธิ์/ยาเสพติด (ห้ามใช้)'
                      : 'ยา'}
                  </span>
                </div>
              )}
              {item.pdfReferencePage && (
                <div className="text-slate-500 flex items-center space-x-1 text-[11px]">
                  <span>📖</span>
                  <span>อ้างอิง: <strong className="text-slate-700">{item.pdfReferencePage}</strong></span>
                </div>
              )}
              <div className="text-slate-600 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>วันหมดอายุ (EXP): </span>
                <span className={`font-semibold ${item.isExpired ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
                  {item.expiryDate}
                </span>
              </div>
            </div>
          </div>

          {/* Indication (สรรพคุณ) */}
          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wide flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>สรรพคุณ / ประโยชน์ / ข้อบ่งใช้</span>
            </h4>
            <p className="text-slate-800 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 leading-relaxed text-xs">
              {item.indication}
            </p>
          </div>

          {/* Usage (วิธีใช้) */}
          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wide flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>ขนาด วิธีใช้ / วิธีบริโภคที่ถูกต้อง</span>
            </h4>
            <p className="text-slate-800 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 leading-relaxed text-xs">
              {item.usage}
            </p>
          </div>

          {/* Warning (คำเตือน อย.น้อย) */}
          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-rose-600 uppercase tracking-wide flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>คำเตือนสำคัญ อย.น้อย</span>
            </h4>
            <p className="text-rose-900 bg-rose-50 p-2.5 rounded-lg border border-rose-200 leading-relaxed text-xs font-medium">
              {item.warning}
            </p>
          </div>

          {/* Storage Method (วิธีการดูแลและจัดเก็บอย่างถูกวิธี) */}
          {item.storageMethod && (
            <div className="space-y-1">
              <h4 className="font-semibold text-xs text-sky-600 uppercase tracking-wide flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>วิธีการดูแลและจัดเก็บอย่างถูกวิธี</span>
              </h4>
              <p className="text-sky-900 bg-sky-50 p-2.5 rounded-lg border border-sky-200 leading-relaxed text-xs">
                {item.storageMethod}
              </p>
            </div>
          )}

          {/* Cabinet Tip */}
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center space-x-1 text-amber-800">
              <span>💡 คำแนะนำและการดูแลของ อย.น้อย:</span>
            </span>
            <p>{item.cabinetTip}</p>
          </div>
        </div>

        {/* Quick action buttons if sorting in progress */}
        {onSortToCategory && (
          <div className="p-3 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => {
                onSortToCategory('internal');
                onClose();
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              จัดเข้าชั้น 1 (ยาใน)
            </button>
            <button
              onClick={() => {
                onSortToCategory('external');
                onClose();
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              จัดเข้าชั้น 2 (ยาภายนอก)
            </button>
            <button
              onClick={() => {
                onSortToCategory('firstaid');
                onClose();
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              จัดเข้าชั้น 3 (เวชภัณฑ์)
            </button>
            <button
              onClick={() => {
                onSortToCategory('hazard');
                onClose();
              }}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-900 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              ทิ้งถังขยะอันตราย
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
