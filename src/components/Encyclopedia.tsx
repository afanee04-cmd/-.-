import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ALL_MEDICINES } from '../data/medicinesData';
import { MedicineItem, MedicineCategory } from '../types/medicine';
import { VisualBottle } from './VisualBottle';
import { MedicineDetailModal } from './MedicineDetailModal';

export const Encyclopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedItem, setInspectedItem] = useState<MedicineItem | null>(null);

  const filteredItems = ALL_MEDICINES.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.thaiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 5 Golden Rules of Thai FDA Medicine Cabinet */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-emerald-300" />
          <h2 className="font-heading font-bold text-lg sm:text-xl">
            กฎเหล็ก 5 ข้อในการจัดตู้ยาสามัญประจำบ้าน (คู่มือ อย.น้อย)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-sm">1. พ้นมือเด็กเล็ก</span>
            <p className="text-white/80 leading-relaxed">
              ติดตั้งตู้ยาสูงจากพื้นอย่างน้อย 1.5 เมตร เพื่อป้องกันไม่ให้เด็กเล็กหยิบยากินเล่น
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-sm">2. เลี่ยงชื้นและแดด</span>
            <p className="text-white/80 leading-relaxed">
              ห้ามติดในห้องน้ำหรือที่แดดส่องถึง เพราะความชื้นและความร้อนจะทำให้ยาเสื่อมสภาพ
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-sm">3. แยกชั้นเด็ดขาด</span>
            <p className="text-white/80 leading-relaxed">
              แยกชั้นยาใช้ภายใน (กิน) และยาใช้ภายนอก (ฉลากแดง) ออกจากกัน ป้องกันหยิบผิด
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-sm">4. ตรวจ EXP ทุก 3 ด.</span>
            <p className="text-white/80 leading-relaxed">
              สำรวจวันหมดอายุและสภาพยาเป็นประจำ คัดแยกทิ้งทันทีหากยาหมดอายุหรือเปลี่ยนสภาพ
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-sm">5. ห้ามใส่ปน</span>
            <p className="text-white/80 leading-relaxed">
              ห้ามนำยาปฏิชีวนะ ยาอันตราย สารเคมี หรือขนมมาเก็บไว้ในตู้ยาสามัญประจำบ้าน
            </p>
          </div>
        </div>
      </div>

      {/* Encyclopedia List Section */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหายา สรรพคุณ หรือชื่อสามัญ..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full sm:w-auto overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({ALL_MEDICINES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('internal')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'internal'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ยาใช้ภายใน
            </button>
            <button
              onClick={() => setSelectedCategory('external')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'external'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ยาใช้ภายนอก
            </button>
            <button
              onClick={() => setSelectedCategory('firstaid')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'firstaid'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เวชภัณฑ์
            </button>
            <button
              onClick={() => setSelectedCategory('hazard')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'hazard'
                  ? 'bg-white text-red-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              สิ่งต้องห้าม / อันตราย
            </button>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setInspectedItem(item)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start space-x-3">
                <div className="shrink-0">
                  <VisualBottle item={item} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold ${
                        item.category === 'hazard'
                          ? 'bg-red-100 text-red-700'
                          : item.labelType === 'red_external'
                          ? 'bg-rose-100 text-rose-700'
                          : item.category === 'internal'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.category === 'hazard'
                        ? 'สิ่งต้องห้าม'
                        : item.labelType === 'red_external'
                        ? 'ยาใช้ภายนอก'
                        : item.category === 'internal'
                        ? 'ยาใช้ภายใน'
                        : 'เวชภัณฑ์'}
                    </span>
                    {item.regNumber && (
                      <span className="text-[9.5px] text-slate-400 truncate">
                        {item.regNumber}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">
                    {item.thaiName}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {item.genericName}
                  </p>
                </div>
              </div>

              {/* Quick Indication */}
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                <span className="font-semibold text-slate-700">สรรพคุณ: </span>
                {item.indication}
              </div>

              {/* Expiry and details link */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>EXP: {item.expiryDate}</span>
                <span className="text-emerald-700 font-semibold hover:underline">
                  ดูฉลากและวิธีใช้ →
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            ไม่พบข้อมูลยาที่ตรงกับคำค้นหา
          </div>
        )}
      </div>

      {/* Item details modal */}
      <MedicineDetailModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />
    </div>
  );
};
