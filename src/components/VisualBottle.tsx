import React from 'react';
import { MedicineItem } from '../types/medicine';
import { getItemVisualIcon } from '../utils/itemVisuals';

interface VisualBottleProps {
  item: MedicineItem;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const VisualBottle: React.FC<VisualBottleProps> = ({ item, size = 'md', showDetails = false }) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  // Render individual realistic medicine visuals according to real medical packaging
  const renderRealisticItem = () => {
    switch (item.id) {
      // 1. พาราเซตามอล 500 มก. - แผงฟอยล์สีเงิน เม็ดขาว 500
      case 'med_para_tab':
        return (
          <div className="w-16 h-22 rounded-md bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 border border-slate-400 shadow-md p-1.5 flex flex-col justify-between relative overflow-hidden">
            {/* Metallic foil shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
            <div className="text-[6.5px] font-bold text-blue-900 border-b border-slate-300 pb-0.5 text-center leading-tight">
              PARACETAMOL 500
            </div>
            {/* Realistic blister bubbles with debossed tablets */}
            <div className="grid grid-cols-2 gap-1.5 my-auto justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-4.5 h-4.5 rounded-full bg-white border border-slate-300 shadow-inner flex items-center justify-center relative"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-400">
                    500
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[6px] text-slate-500 text-center font-mono truncate">1A 42/57</div>
          </div>
        );

      // 2. ผงเกลือแร่ ORS - ซองฟอยล์ฉีกซอง
      case 'med_ors_sachet':
        return (
          <div className="w-16 h-22 rounded-sm bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 border border-emerald-400 shadow-md p-1.5 flex flex-col justify-between text-white relative">
            {/* Tear notch on top edge */}
            <div className="absolute top-0 right-2 w-1.5 h-1 bg-amber-300 rounded-b-xs" />
            <div className="border-b border-emerald-400/80 pb-0.5 flex items-center justify-between">
              <span className="text-[6px] font-bold tracking-widest uppercase text-emerald-100">O.R.S.</span>
              <span className="text-[6px] text-amber-200">💧💧</span>
            </div>
            <div className="text-center my-auto">
              <div className="font-heading font-black text-[9px] leading-tight text-white drop-shadow-xs">ผงเกลือแร่</div>
              <div className="text-[6px] text-emerald-100 mt-0.5">ชดเชยน้ำ & เกลือแร่</div>
            </div>
            <div className="bg-white/20 rounded-xs py-0.5 text-center text-[5.5px] font-mono text-emerald-50">
              ละลายน้ำ 250 มล.
            </div>
          </div>
        );

      // 3. ยาผงถ่านคาร์บอน - แผงแคปซูลสีดำ
      case 'med_charcoal_cap':
        return (
          <div className="w-16 h-22 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-300 border border-zinc-400 shadow-md p-1.5 flex flex-col justify-between relative">
            <div className="text-[6.5px] font-black text-zinc-800 border-b border-zinc-400 pb-0.5 text-center">
              ACTIVATED CHARCOAL
            </div>
            <div className="grid grid-cols-2 gap-1.5 my-auto justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-4 h-6 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner flex flex-col items-center justify-center p-0.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-xs mb-0.5" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 shadow-xs" />
                </div>
              ))}
            </div>
            <div className="text-[6px] text-zinc-600 text-center font-bold">ดูดซับสารพิษ</div>
          </div>
        );

      // 4. ยาธาตุน้ำแดง - ขวดแก้วสีชา ฝาขาวเกลียว
      case 'med_cardamom_syrup':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            {/* White Ribbed Cap */}
            <div className="w-6 h-3 rounded-t-sm bg-white border border-slate-300 shadow-xs flex items-center justify-around px-0.5">
              <div className="w-0.5 h-2 bg-slate-200" />
              <div className="w-0.5 h-2 bg-slate-200" />
              <div className="w-0.5 h-2 bg-slate-200" />
            </div>
            {/* Glass Neck */}
            <div className="w-4 h-1.5 bg-amber-900 border-x border-amber-950" />
            {/* Amber Bottle Body with Reddish liquid */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border-2 border-amber-950 shadow-md flex flex-col items-center justify-center p-1 relative overflow-hidden">
              {/* Glass liquid shine reflection */}
              <div className="absolute top-1 left-1 bottom-1 w-1 bg-white/20 rounded-full" />
              {/* Label */}
              <div className="w-full bg-white/95 rounded-xs p-1 text-center shadow-xs border border-amber-200">
                <div className="text-[6px] font-bold text-red-600 leading-none">ยาสามัญประจำบ้าน</div>
                <div className="font-heading font-black text-[7.5px] text-amber-950 mt-0.5 leading-tight">ยาธาตุน้ำแดง</div>
                <div className="text-[5.5px] text-slate-600 leading-tight">ขับลม ท้องอืด</div>
              </div>
            </div>
          </div>
        );

      // 5. ยาแก้แพ้ CPM - แผงเม็ดกลมสีเหลือง
      case 'med_cpm_tab':
        return (
          <div className="w-16 h-22 rounded-md bg-gradient-to-b from-slate-200 to-slate-100 border border-slate-300 shadow-md p-1.5 flex flex-col justify-between">
            <div className="text-[6.5px] font-bold text-amber-900 border-b border-amber-200 pb-0.5 text-center">
              CHLORPHENIRAMINE 2mg
            </div>
            {/* Yellow round tablets in clear blister */}
            <div className="grid grid-cols-2 gap-1.5 my-auto justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 shadow-inner flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-xs" />
                </div>
              ))}
            </div>
            <div className="text-[6px] text-amber-800 text-center font-bold">ยาแก้แพ้ ลดน้ำมูก</div>
          </div>
        );

      // 6. ยาน้ำลดกรด Antacid - ขวดขาวนม แถบเขียวมิ้นท์
      case 'med_antacid_susp':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            <div className="w-6 h-3 rounded-t-sm bg-teal-600 border border-teal-700 shadow-xs" />
            <div className="w-4 h-1.5 bg-slate-200 border-x border-slate-300" />
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-slate-100 via-white to-slate-100 border-2 border-slate-300 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-teal-600 text-white text-[6px] font-bold text-center py-0.5 rounded-xs">
                ANTACID SUSPENSION
              </div>
              <div className="text-center my-auto">
                <div className="text-sm">🫄</div>
                <div className="font-heading font-black text-[7.5px] text-slate-800 leading-tight">ยาน้ำลดกรด</div>
                <div className="text-[5.5px] text-teal-700">เคลือบกระเพาะ</div>
              </div>
              <div className="text-[5.5px] text-slate-400 text-center">เขย่าขวดก่อนใช้</div>
            </div>
          </div>
        );

      // 7. แอลกอฮอล์ 70% - ขวดใส น้ำฟ้า ฉลากแดงใหญ่ "ยาใช้ภายนอก ห้ามรับประทาน"
      case 'med_alcohol_70':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            {/* White Twist Cap */}
            <div className="w-6 h-3 rounded-t-sm bg-white border border-slate-300 shadow-xs" />
            <div className="w-4 h-1.5 bg-sky-200 border-x border-sky-300" />
            {/* Bottle with blue tint liquid */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-sky-100 via-cyan-50 to-sky-100 border-2 border-slate-300 shadow-md flex flex-col items-center justify-between p-1 relative overflow-hidden">
              {/* Mandatory Thai FDA Red Warning Banner */}
              <div className="w-full bg-red-600 text-white text-center py-0.5 rounded-xs font-bold leading-tight">
                <span className="text-[6.5px] block font-black">ยาใช้ภายนอก</span>
                <span className="text-[5px] block font-bold tracking-tighter">ห้ามรับประทาน</span>
              </div>
              <div className="text-center my-auto">
                <div className="font-heading font-extrabold text-[8px] text-sky-900 leading-tight">แอลกอฮอล์</div>
                <div className="font-mono font-black text-[9px] text-red-600">70% v/v</div>
              </div>
              <div className="text-[5px] text-slate-500 font-semibold">เช็ดรอบแผล / ฆ่าเชื้อ</div>
            </div>
          </div>
        );

      // 8. โพวิโดน-ไอโอดีน (เบตาดีน) - ขวดสีเหลือง หัวหยด ป้ายแดง
      case 'med_povidone_iodine':
        return (
          <div className="w-13 h-23 flex flex-col items-center relative">
            {/* Dropper Tip Nozzle */}
            <div className="w-3 h-3 rounded-t-full bg-amber-400 border border-amber-500 shadow-xs" />
            <div className="w-5 h-2 bg-amber-300 border-x border-amber-400" />
            {/* Yellow plastic squeeze bottle with brown liquid label */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-amber-500 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-red-600 text-white text-center py-0.5 rounded-xs font-black text-[5.5px]">
                ยาใช้ภายนอก
              </div>
              <div className="text-center my-auto">
                <div className="w-4 h-4 mx-auto rounded-full bg-amber-900/80 flex items-center justify-center text-[7px] text-white font-bold">
                  I₂
                </div>
                <div className="font-heading font-black text-[7.5px] text-amber-950 mt-0.5 leading-tight">
                  โพวิโดน-ไอโอดีน
                </div>
              </div>
              <div className="text-[5px] text-amber-900 font-bold">ทาแผลสด ไม่แสบ</div>
            </div>
          </div>
        );

      // 9. คาราไมน์โลชั่น - ขวดโลชั่นสีชมพู ฉลากแดง
      case 'med_calamine_lotion':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            <div className="w-6 h-3 rounded-t-sm bg-white border border-slate-300 shadow-xs" />
            <div className="w-4 h-1.5 bg-pink-200 border-x border-pink-300" />
            {/* Bottle filled with pastel pink suspension */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 border-2 border-pink-300 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-red-600 text-white text-center py-0.5 rounded-xs font-black text-[5.5px]">
                ยาใช้ภายนอก
              </div>
              <div className="text-center my-auto">
                <div className="font-heading font-black text-[8px] text-pink-900 leading-tight">
                  คาราไมน์
                </div>
                <div className="text-[6px] text-pink-700 font-bold">CALAMINE</div>
              </div>
              <div className="text-[5px] text-pink-800 font-semibold">ทาแก้คัน ผื่น ยุงกัด</div>
            </div>
          </div>
        );

      // 10. น้ำเกลือล้างแผล 0.9% - ขวดใส ฝาฟ้า ระบุ 0.9% Normal Saline
      case 'med_saline_solution':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            <div className="w-6 h-3 rounded-t-sm bg-cyan-600 border border-cyan-700 shadow-xs" />
            <div className="w-4 h-1.5 bg-slate-200 border-x border-slate-300" />
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-cyan-50 via-white to-cyan-50 border-2 border-cyan-300 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-cyan-700 text-white text-center py-0.5 rounded-xs font-bold text-[5.5px]">
                NORMAL SALINE
              </div>
              <div className="text-center my-auto">
                <div className="font-heading font-black text-[7.5px] text-slate-800 leading-tight">น้ำเกลือล้างแผล</div>
                <div className="font-mono font-bold text-[7px] text-cyan-700">0.9% NaCl</div>
              </div>
              <div className="text-[5px] text-slate-500 font-medium">ปราศจากเชื้อ ไม่แสบ</div>
            </div>
          </div>
        );

      // 11. ยาหม่องขี้ผึ้ง - ตลับแก้วเขียว ฝาทอง/เขียว ลายสมุนไพร
      case 'med_balm_jar':
        return (
          <div className="w-16 h-16 flex flex-col items-center justify-center relative">
            {/* Tin Lid with golden rim and herbal leaf */}
            <div className="w-14 h-8 rounded-t-lg bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 border-2 border-amber-300 shadow-md flex items-center justify-center relative">
              <span className="text-sm">🌿</span>
              <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400" />
            </div>
            {/* Glass Jar Base */}
            <div className="w-13 h-7 rounded-b-lg bg-gradient-to-b from-emerald-800 to-emerald-950 border-x-2 border-b-2 border-emerald-900 shadow-inner flex flex-col items-center justify-center text-white">
              <span className="text-[7px] font-bold leading-tight">ยาหม่องสมุนไพร</span>
              <span className="text-[5.5px] text-emerald-200">ทาฟกช้ำ แมลงสัตว์กัด</span>
            </div>
          </div>
        );

      // 12. เจลว่านหางจระเข้ / ขี้ผึ้งแผลไฟไหม้ - หลอดบีบสีเงินลายเขียว
      case 'med_burn_gel':
        return (
          <div className="w-13 h-23 flex flex-col items-center justify-between relative">
            {/* Screw Cap */}
            <div className="w-5 h-3 rounded-t-sm bg-white border border-slate-300 shadow-xs" />
            {/* Squeeze Tube Body */}
            <div className="w-full flex-1 rounded-b-sm bg-gradient-to-b from-slate-100 via-emerald-50 to-slate-200 border-2 border-slate-300 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full h-1 bg-emerald-500 rounded-full" />
              <div className="text-center my-auto">
                <span className="text-sm">🌱</span>
                <div className="font-heading font-black text-[7px] text-emerald-900 leading-tight">เจลว่านหางจระเข้</div>
                <div className="text-[5.5px] text-emerald-700">แผลน้ำร้อนลวก</div>
              </div>
              {/* Crimped End */}
              <div className="w-full h-1.5 bg-slate-300 border-t border-slate-400" />
            </div>
          </div>
        );

      // 13. พลาสเตอร์ยาปิดแผล - แผ่นพลาสเตอร์สีเนื้อ รูระบาย ผ้าก๊อซตรงกลาง
      case 'fa_plaster_strip':
        return (
          <div className="w-18 h-18 flex items-center justify-center p-1">
            <div className="w-16 h-8 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border-2 border-amber-300 shadow-md flex items-center justify-center relative p-1">
              {/* Perforation dots on adhesive edges */}
              <div className="absolute left-1.5 inset-y-1 flex flex-col justify-around">
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
              </div>
              {/* Center Sterile Gauze Pad */}
              <div className="w-6 h-5 rounded-xs bg-white border border-amber-200 shadow-inner flex items-center justify-center">
                <span className="text-[6px] font-bold text-amber-700">🩹</span>
              </div>
              <div className="absolute right-1.5 inset-y-1 flex flex-col justify-around">
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>
        );

      // 14. ผ้าก๊อซปลอดเชื้อ - ซองสี่เหลี่ยม ขอบฟ้า กากบาทเขียว
      case 'fa_sterile_gauze':
        return (
          <div className="w-17 h-19 rounded-md bg-white border-2 border-slate-300 shadow-md p-1.5 flex flex-col justify-between relative">
            <div className="border-b border-blue-400 pb-0.5 flex items-center justify-between">
              <span className="text-[6px] font-bold text-blue-700 uppercase">STERILE GAUZE</span>
              <span className="text-[6px] text-blue-600 font-bold">✚</span>
            </div>
            {/* Woven mesh texture representation */}
            <div className="w-11 h-9 mx-auto bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center">
              <div className="text-[8px] text-slate-400 font-mono">3" x 3"</div>
            </div>
            <div className="text-[5.5px] text-slate-500 text-center font-bold">ผ้าก๊อซพับปลอดเชื้อ</div>
          </div>
        );

      // 15. สำลีก้อนปลอดเชื้อ - ถุงใส เห็นก้อนสำลีขาวปุกปุย
      case 'fa_cotton_ball':
        return (
          <div className="w-17 h-19 rounded-lg bg-white/80 border-2 border-slate-300 shadow-md p-1.5 flex flex-col justify-between backdrop-blur-xs">
            <div className="text-[6px] font-bold text-blue-800 text-center border-b border-blue-200 pb-0.5">
              STERILE COTTON
            </div>
            {/* Fluffy cotton balls representation */}
            <div className="grid grid-cols-2 gap-1 my-auto justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-4 h-4 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-100 to-white" />
                </div>
              ))}
            </div>
            <div className="text-[5.5px] text-slate-600 text-center font-bold">สำลีก้อนชุบทำแผล</div>
          </div>
        );

      // 16. เทปแต่งแผลไมโครพอร์ - ม้วนเทปกระดาษ แกนฟ้า
      case 'fa_micropore_tape':
        return (
          <div className="w-17 h-17 flex flex-col items-center justify-center p-1">
            <div className="w-14 h-14 rounded-full bg-white border-4 border-slate-200 shadow-md flex items-center justify-center relative">
              {/* Inner blue spool ring */}
              <div className="w-6 h-6 rounded-full bg-sky-500 border-2 border-sky-600 flex items-center justify-center shadow-inner">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>
            <span className="text-[6px] font-bold text-slate-700 mt-0.5">เทปไมโครพอร์</span>
          </div>
        );

      // 17. ปรอทวัดไข้ดิจิทัล - แท่งปากกา ปลายสแตนเลส จอ LCD
      case 'fa_thermometer':
        return (
          <div className="w-16 h-22 flex flex-col items-center justify-between p-1">
            <div className="w-5 h-20 rounded-full bg-white border-2 border-slate-300 shadow-md flex flex-col items-center justify-between p-1 relative">
              {/* Stainless Steel Probe Tip */}
              <div className="w-2.5 h-3.5 rounded-t-full bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 border border-slate-400 shadow-xs" />
              {/* LCD Screen Display */}
              <div className="w-3.5 h-6 rounded-xs bg-lime-100 border border-slate-400 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[4.5px] font-mono font-bold text-slate-900 leading-tight">36.8</span>
                <span className="text-[4px] text-slate-600 leading-none">°C</span>
              </div>
              {/* Power Button */}
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-xs mb-1" />
            </div>
            <span className="text-[6px] font-bold text-slate-700">ปรอทวัดไข้</span>
          </div>
        );

      // 18. ผ้ายืดพันแผล Elastic Bandage - ม้วนผ้ายืดสีกากี
      case 'fa_bandage_roller':
        return (
          <div className="w-16 h-20 flex flex-col items-center justify-center p-1">
            <div className="w-13 h-14 rounded-md bg-gradient-to-r from-amber-100 via-stone-200 to-amber-100 border-2 border-stone-300 shadow-md flex flex-col justify-between p-1 relative overflow-hidden">
              {/* Woven elastic stripes */}
              <div className="w-full h-0.5 bg-stone-300" />
              <div className="w-full h-0.5 bg-stone-300" />
              <div className="w-full h-0.5 bg-stone-300" />
              {/* Metal clip */}
              <div className="w-3 h-2 bg-slate-400 border border-slate-500 rounded-xs self-end shadow-xs" />
            </div>
            <span className="text-[6px] font-bold text-slate-700 mt-1">ผ้ายืดอีลาสติก</span>
          </div>
        );

      // 19. ยาปฏิชีวนะ อะม็อกซีซิลลิน - ยาอันตราย แคปซูลแดง-เหลือง
      case 'danger_amoxicillin':
        return (
          <div className="w-16 h-22 rounded-md bg-red-100 border-2 border-red-500 shadow-md p-1.5 flex flex-col justify-between animate-pulse">
            <div className="bg-red-600 text-white text-[6px] font-black text-center py-0.5 rounded-xs">
              ⚠️ ยาอันตราย
            </div>
            {/* Red & Yellow two-tone antibiotic capsules */}
            <div className="grid grid-cols-2 gap-1.5 my-auto justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-3.5 h-6 rounded-full border border-slate-400 shadow-xs flex flex-col overflow-hidden">
                  <div className="w-full h-3 bg-red-600" />
                  <div className="w-full h-3 bg-yellow-400" />
                </div>
              ))}
            </div>
            <div className="text-[5.5px] text-red-700 font-bold text-center">ห้ามเป็นยาสามัญ!</div>
          </div>
        );

      // 20. ยาน้ำลดกรดหมดอายุ ตกตะกอน - สีขุ่น แยกชั้นเป็นลิ่ม
      case 'danger_expired_syrup':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative opacity-85">
            <div className="w-6 h-3 rounded-t-sm bg-stone-600 border border-stone-700" />
            <div className="w-4 h-1.5 bg-stone-300 border-x border-stone-400" />
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-b from-stone-200 via-stone-300 to-amber-900/60 border-2 border-red-500 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-red-600 text-white text-[5.5px] font-black text-center py-0.5 rounded-xs">
                EXP: 02/2021
              </div>
              <div className="text-center my-auto">
                <span className="text-xs">⚠️</span>
                <div className="font-heading font-black text-[7px] text-red-800 leading-tight">ยาหมดอายุ!</div>
                <div className="text-[5px] text-stone-600">ตกตะกอนเป็นลิ่ม</div>
              </div>
              <div className="text-[5px] text-red-600 font-bold">ทิ้งถังขยะอันตราย</div>
            </div>
          </div>
        );

      // 21. น้ำยาล้างห้องน้ำกรดเข้มข้น - ขวดคอห่านเอียงสีม่วงเข้ม กะโหลกพิษ
      case 'danger_chemical_cleaner':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            {/* Angled Swan-Neck Spout */}
            <div className="w-6 h-4 relative flex items-center justify-center">
              <div className="w-3.5 h-2.5 bg-red-600 rounded-t-md transform -rotate-25 border border-red-700 shadow-xs flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="w-4 h-2 bg-purple-900 border-x border-purple-950 mt-1" />
            </div>
            {/* Heavy-duty Purple Chemical Bottle */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-2 border-purple-950 shadow-md flex flex-col items-center justify-between p-1 text-white relative overflow-hidden">
              <div className="flex items-center justify-between w-full border-b border-purple-800 pb-0.5">
                <span className="text-[5px] font-black bg-yellow-400 text-slate-950 px-1 rounded-xs">วอส. 99/2550</span>
                <span className="text-[8px]">☠️</span>
              </div>
              <div className="text-center my-auto">
                <div className="text-xs">🧪</div>
                <div className="font-heading font-black text-[7px] text-amber-300 leading-tight">
                  น้ำยาล้างห้องน้ำ
                </div>
                <div className="text-[5px] text-purple-200 font-bold">กรดเกลือเข้มข้น</div>
              </div>
              <div className="w-full bg-red-600 text-white text-[4.5px] font-black text-center py-0.5 rounded-xs">
                กัดกร่อน! ห้ามไว้ใกล้ตู้ยา
              </div>
            </div>
          </div>
        );

      // 22. ยาชุด ยาผีบอก - ถุงซิปล็อกปนเม็ดยาสีแปลกๆ
      case 'danger_fake_drug_pack':
        return (
          <div className="w-15 h-20 rounded-md bg-white/70 border-2 border-red-600 shadow-md p-1 flex flex-col justify-between backdrop-blur-xs">
            <div className="w-full h-1 bg-red-500 rounded-full mb-1" />
            <div className="grid grid-cols-2 gap-1 my-auto justify-items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-black shadow-xs" />
            </div>
            <div className="text-[5.5px] font-black text-red-700 text-center leading-tight">
              ยาชุด สเตียรอยด์
            </div>
          </div>
        );

      // 23. ลูกอมขนมหวาน - ซองขนมหวาน
      case 'danger_candy_lookalike':
        return (
          <div className="w-16 h-18 flex flex-col items-center justify-center p-1">
            <div className="text-2xl animate-bounce">🍬</div>
            <span className="text-[6.5px] font-black text-pink-700">ลูกอมขนมหวาน</span>
            <span className="text-[5px] text-red-600 font-bold">ห้ามใส่ในตู้ยา</span>
          </div>
        );

      // 24. ครีมหน้าขาวเถื่อน ผสมสารปรอท
      case 'danger_mercury_cream':
        return (
          <div className="w-16 h-18 flex flex-col items-center justify-between p-1">
            <div className="w-14 h-7 rounded-t-lg bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-red-500 shadow-md flex items-center justify-center">
              <span className="text-[7px] font-black text-red-700">☠️ ปรอท</span>
            </div>
            <div className="w-13 h-7 rounded-b-lg bg-amber-100 border-x-2 border-b-2 border-red-500 shadow-inner flex flex-col items-center justify-center">
              <span className="text-[6.5px] font-bold text-red-800">ครีมหน้าขาวเถื่อน</span>
              <span className="text-[5px] text-red-600 font-semibold">ไร้ อย. หน้าพัง</span>
            </div>
          </div>
        );

      // 25. ยาชุดลดความอ้วน แอบผสมยาบ้า (เฟนเตอมีน)
      case 'danger_diet_pill':
        return (
          <div className="w-15 h-20 rounded-md bg-white/80 border-2 border-red-600 shadow-md p-1 flex flex-col justify-between">
            <div className="w-full h-1 bg-red-600 rounded-full mb-0.5" />
            <div className="text-[6px] font-black text-red-700 text-center leading-tight">ยาชุดลดความอ้วน</div>
            <div className="grid grid-cols-2 gap-1 my-auto justify-items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-xs flex items-center justify-center text-[5px] text-white">❤️</div>
              <div className="w-3.5 h-5 rounded-full bg-pink-500 shadow-xs flex flex-col overflow-hidden"><div className="w-full h-2.5 bg-pink-400"/><div className="w-full h-2.5 bg-pink-700"/></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-xs" />
              <div className="w-3.5 h-5 rounded-full bg-blue-600 shadow-xs flex flex-col overflow-hidden"><div className="w-full h-2.5 bg-sky-300"/><div className="w-full h-2.5 bg-blue-700"/></div>
            </div>
            <div className="text-[5px] font-bold text-red-600 text-center">ยาเสพติด อันตราย!</div>
          </div>
        );

      // 26. ยาหยอดตาเปิดใช้แล้วเกิน 1 เดือน (หมดอายุ)
      case 'danger_expired_eyedrop':
        return (
          <div className="w-13 h-22 flex flex-col items-center justify-between relative opacity-85">
            <div className="w-4 h-5 rounded-t-sm bg-white border border-slate-300 shadow-xs flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-300"/>
            </div>
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-red-500 shadow-md flex flex-col items-center justify-between p-1">
              <div className="w-full bg-red-600 text-white text-[5px] font-black text-center rounded-xs">
                เปิดเกิน 30 วัน
              </div>
              <div className="text-center my-auto">
                <span className="text-sm">👁️</span>
                <div className="font-heading font-black text-[6.5px] text-red-800 leading-tight">ยาหยอดตาหมดอายุ</div>
              </div>
              <div className="text-[4.5px] text-red-600 font-bold">เสี่ยงติดเชื้อตาบอด</div>
            </div>
          </div>
        );

      // --- หมวดอาหาร (Food) ---
      case 'food_milk_uht':
        return (
          <div className="w-15 h-23 rounded-sm bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 border border-sky-300 shadow-md p-1 flex flex-col justify-between text-white relative">
            <div className="flex items-center justify-between border-b border-white/30 pb-0.5">
              <span className="text-[5.5px] font-bold bg-white text-blue-700 px-1 rounded-xs">MILK</span>
              <span className="text-[5px] text-amber-200 font-bold">100%</span>
            </div>
            <div className="text-center my-auto">
              <div className="text-sm">🥛</div>
              <div className="font-heading font-black text-[7px] leading-tight drop-shadow-xs">นมพาสเจอร์ไรส์</div>
              <div className="text-[4.5px] text-sky-100">ตราทางเลือกสุขภาพ</div>
            </div>
            <div className="bg-white/20 rounded-xs text-[5px] text-center font-mono py-0.5">
              10-1-04741
            </div>
          </div>
        );

      case 'food_instant_noodle':
        return (
          <div className="w-16 h-20 rounded-md bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 border border-amber-300 shadow-md p-1 flex flex-col justify-between text-white relative">
            <div className="flex justify-between items-center text-[5px]">
              <span className="font-black bg-red-700 px-1 rounded-xs">GDA</span>
              <span className="font-bold">ต้มยำกุ้ง</span>
            </div>
            <div className="text-center my-auto">
              <div className="text-base">🍜</div>
              <div className="font-heading font-black text-[7.5px] leading-tight">บะหมี่กึ่งสำเร็จรูป</div>
              <div className="text-[4.5px] text-amber-100">ตรวจโซเดียมก่อนทาน</div>
            </div>
            <div className="text-[4.5px] text-center bg-black/30 rounded-xs py-0.5">
              อย. 12-1-02235
            </div>
          </div>
        );

      case 'food_canned_fish':
        return (
          <div className="w-16 h-18 rounded-lg bg-gradient-to-b from-red-600 via-rose-700 to-red-800 border-2 border-slate-300 shadow-md p-1 flex flex-col justify-between text-white relative">
            {/* Pull ring lid on top */}
            <div className="w-8 h-2 mx-auto rounded-full bg-slate-300 border border-slate-400 shadow-xs flex items-center justify-center">
              <div className="w-2 h-1 bg-slate-500 rounded-full"/>
            </div>
            <div className="text-center my-auto">
              <span className="text-sm">🐟</span>
              <div className="font-heading font-black text-[7px] leading-tight">ปลากระป๋อง</div>
              <div className="text-[5px] text-rose-200">ซอสมะเขือเทศ</div>
            </div>
            <div className="text-[4.5px] text-center font-mono text-slate-200">
              กระป๋องไม่บุบ/บวม
            </div>
          </div>
        );

      // ลูกชิ้นผสมสารบอแรกซ์
      case 'food_danger_borax_meatball':
        return (
          <div className="w-16 h-21 rounded-md bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-red-500 shadow-md p-1 flex flex-col justify-between text-slate-800 relative">
            <div className="flex justify-between items-center text-[5px]">
              <span className="font-black bg-red-600 text-white px-1 rounded-xs animate-pulse">สารบอแรกซ์!</span>
              <span className="font-bold text-red-700">ผงกรอบห้ามใช้</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-base">🍡</span>
              <div className="font-heading font-black text-[7px] text-red-950 leading-tight">
                ลูกชิ้นเด้งผสมบอแรกซ์
              </div>
              <div className="text-[4.5px] text-red-700 font-bold">ไตวาย ทางเดินอาหารทะลุ</div>
            </div>
            <div className="text-[4.5px] text-center bg-red-600 text-white font-bold rounded-xs py-0.5">
              ตรวจด้วยชุดทดสอบ อย.
            </div>
          </div>
        );

      // อาหารทะเลแช่สารฟอร์มาลีน (ถาดโฟมอาหารทะเล หมึก/กุ้ง)
      case 'food_danger_formalin_seafood':
        return (
          <div className="w-16 h-22 rounded-md bg-gradient-to-b from-slate-100 via-white to-slate-200 border-2 border-red-500 shadow-md p-1 flex flex-col justify-between relative overflow-hidden">
            {/* Plastic wrap shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between border-b border-red-300 pb-0.5 z-10">
              <span className="text-[5px] font-black bg-red-600 text-white px-1 rounded-xs animate-pulse">
                สารฟอร์มาลีน!
              </span>
              <span className="text-[5px] font-bold text-slate-600">SEAFOOD</span>
            </div>
            <div className="text-center my-auto z-10">
              <div className="flex items-center justify-center space-x-1 text-base">
                <span>🦑</span>
                <span>🦐</span>
              </div>
              <div className="font-heading font-black text-[6.5px] text-red-950 leading-tight mt-0.5">
                อาหารทะเลแช่ฟอร์มาลีน
              </div>
              <div className="text-[4.5px] text-red-700 font-bold">
                เนื้อเด้ง ไร้กลิ่นคาว (น้ำยาดองศพ)
              </div>
            </div>
            <div className="w-full bg-red-700 text-white text-[5px] font-black text-center py-0.5 rounded-xs z-10">
              ห้ามรับประทาน! ส่งตรวจ อย.
            </div>
          </div>
        );

      // --- หมวดเครื่องสำอาง (Cosmetics) ---
      case 'cosmetic_sunscreen_tube':
        return (
          <div className="w-13 h-23 flex flex-col items-center justify-between relative">
            <div className="w-5 h-3 rounded-t-sm bg-white border border-slate-300 shadow-xs" />
            <div className="w-full flex-1 rounded-b-sm bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 border-2 border-amber-500 shadow-md flex flex-col items-center justify-between p-1 text-slate-900">
              <div className="w-full bg-slate-900 text-amber-300 text-[5px] font-black text-center py-0.5 rounded-xs">
                SPF 50+
              </div>
              <div className="text-center my-auto">
                <span className="text-xs">☀️</span>
                <div className="font-heading font-black text-[6.5px] leading-tight">ครีมกันแดด</div>
                <div className="text-[5px] text-slate-700 font-bold">PA++++</div>
              </div>
              <div className="text-[4.5px] font-mono text-slate-600">จดแจ้ง 10 หลัก</div>
            </div>
          </div>
        );

      // สบู่เหลวอาบน้ำ (ขวดหัวปั๊มฟองสบู่)
      case 'cosmetic_mild_bodywash':
        return (
          <div className="w-14 h-24 flex flex-col items-center justify-between relative">
            {/* Realistic Pump Dispenser Head */}
            <div className="w-7 h-4 flex flex-col items-center">
              <div className="w-6 h-1.5 bg-slate-100 rounded-l-full border border-slate-300 shadow-xs flex items-center justify-start pl-0.5">
                <div className="w-1 h-1 bg-teal-500 rounded-full" />
              </div>
              <div className="w-2.5 h-2 bg-slate-300 border-x border-slate-400" />
              <div className="w-5 h-1 bg-slate-200 rounded-t-xs border border-slate-300" />
            </div>
            {/* Translucent Teal Body Wash Bottle with Bubbles */}
            <div className="w-full flex-1 rounded-b-2xl bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 border-2 border-teal-600 shadow-md flex flex-col items-center justify-between p-1 text-white relative overflow-hidden">
              <div className="absolute top-1 left-1 bottom-2 w-1.5 bg-white/30 rounded-full" />
              <div className="absolute top-2 right-1 text-[8px] opacity-75">🫧</div>
              <div className="w-full bg-white/95 text-teal-900 rounded-xs p-0.5 text-center shadow-xs border border-teal-200 z-10">
                <div className="text-[5.5px] font-extrabold text-teal-700 leading-none">BODY WASH</div>
                <div className="font-heading font-black text-[7px] text-teal-950 mt-0.5 leading-tight">สบู่เหลวอาบน้ำ</div>
                <div className="text-[5px] text-teal-800 font-bold">pH 5.5 สูตรอ่อนโยน</div>
              </div>
              <div className="text-[4.5px] font-mono bg-teal-950/40 px-1 rounded-xs text-teal-100 z-10">
                11-1-6600010234
              </div>
            </div>
          </div>
        );

      // ครีมหน้าขาวเถื่อน สารปรอท
      case 'cosmetic_danger_mercury_whitening':
        return (
          <div className="w-15 h-20 flex flex-col items-center justify-between relative">
            {/* Metallic Golden Lid */}
            <div className="w-13 h-4 rounded-t-lg bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 border border-amber-500 shadow-xs flex items-center justify-center">
              <div className="w-8 h-1 bg-white/70 rounded-full" />
            </div>
            {/* Fancy Cream Jar with Mercury Warning */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-rose-900 via-pink-950 to-rose-900 border-2 border-red-500 shadow-md flex flex-col items-center justify-between p-1 text-white">
              <span className="text-[5px] font-black bg-red-600 text-white px-1 rounded-xs animate-pulse">สารปรอทห้ามใช้</span>
              <div className="text-center my-auto">
                <span className="text-xs">⚠️</span>
                <div className="font-heading font-black text-[6.5px] text-pink-200 leading-tight">
                  ครีมหน้าขาวเถื่อน
                </div>
                <div className="text-[4.5px] text-red-300 font-bold">หน้าพังถาวร / ไตวาย</div>
              </div>
              <div className="text-[4.5px] text-center font-bold text-red-200">ไร้เลขจดแจ้ง อย.</div>
            </div>
          </div>
        );

      // --- หมวดเครื่องมือแพทย์ (Medical Devices) ---
      case 'device_surgical_mask':
        return (
          <div className="w-17 h-18 rounded-md bg-gradient-to-br from-emerald-500 to-teal-700 border-2 border-emerald-300 shadow-md p-1.5 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between border-b border-emerald-300 pb-0.5 text-[5px]">
              <span className="font-bold">MEDICAL</span>
              <span className="font-bold">✚ กท. 15</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-base">😷</span>
              <div className="font-heading font-black text-[7px] leading-tight">หน้ากากอนามัย 3 ชั้น</div>
              <div className="text-[5px] text-emerald-100">BFE 99% ปลอดเชื้อ</div>
            </div>
            <div className="text-[4.5px] text-center bg-black/20 rounded-xs py-0.5">ใช้ครั้งเดียวทิ้ง</div>
          </div>
        );

      case 'device_atk_test_kit':
        return (
          <div className="w-16 h-18 rounded-md bg-gradient-to-br from-cyan-600 to-blue-800 border-2 border-cyan-300 shadow-md p-1 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center text-[5px] font-bold">
              <span className="bg-white text-cyan-800 px-1 rounded-xs">ATK</span>
              <span>15 min</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-sm">🧪</span>
              <div className="font-heading font-black text-[7px] leading-tight">ชุดตรวจโควิด-19</div>
              <div className="text-[5px] text-cyan-200">ผ่านการประเมิน อย.</div>
            </div>
            <div className="text-[4.5px] text-center font-mono">เลข T 6400012</div>
          </div>
        );

      // คอนแทคเลนส์เถื่อนตลาดนัด (ขวดแก้วแช่เลนส์ พร้อมฝายาง)
      case 'device_danger_fake_contactlens':
        return (
          <div className="w-13 h-23 flex flex-col items-center justify-between relative">
            {/* Rubber Stopper + Aluminum Crimped Cap */}
            <div className="w-6 h-3.5 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 rounded-t-sm border border-purple-900 shadow-xs flex items-center justify-center">
              <div className="w-2.5 h-1 bg-purple-300 rounded-full" />
            </div>
            {/* Glass Neck */}
            <div className="w-4 h-1 bg-slate-300 border-x border-slate-400" />
            {/* Clear Glass Sterile Vial with Blue Contact Lens Inside */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-sky-100 via-sky-50 to-indigo-100 border-2 border-red-500 shadow-md flex flex-col items-center justify-between p-1 relative overflow-hidden">
              <div className="absolute top-1 left-1 bottom-1 w-1 bg-white/60 rounded-full" />
              <div className="text-center my-auto relative">
                <div className="w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 border-2 border-dashed border-indigo-600 flex items-center justify-center shadow-inner">
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-white" />
                </div>
                <div className="font-heading font-black text-[6px] text-red-900 leading-tight mt-0.5">
                  คอนแทคเลนส์เถื่อน
                </div>
              </div>
              <div className="w-full bg-red-600 text-white text-[4.5px] font-black text-center py-0.5 rounded-xs">
                ไร้ อย. เสี่ยงตาบอด
              </div>
            </div>
          </div>
        );

      // --- หมวดวัตถุอันตรายในบ้าน (Household Chemicals) ---
      case 'hazard_dishwashing_liquid':
        return (
          <div className="w-14 h-23 flex flex-col items-center justify-between relative">
            <div className="w-4 h-3 rounded-t-sm bg-lime-700 border border-lime-800 shadow-xs" />
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-b from-lime-400 via-lime-500 to-lime-600 border-2 border-lime-600 shadow-md flex flex-col items-center justify-between p-1 text-slate-900">
              <div className="w-full bg-lime-800 text-white text-[5px] font-bold text-center py-0.5 rounded-xs">
                วอส. 120/2561
              </div>
              <div className="text-center my-auto">
                <span className="text-xs">🍋</span>
                <div className="font-heading font-black text-[7px] leading-tight text-white">น้ำยาล้างจาน</div>
                <div className="text-[5px] text-lime-100">สูตรมะนาวแท้</div>
              </div>
              <div className="text-[4.5px] text-lime-950 font-bold">ห้ามรับประทาน!</div>
            </div>
          </div>
        );

      case 'hazard_mosquito_spray':
        return (
          <div className="w-13 h-24 flex flex-col items-center relative">
            {/* Spray nozzle */}
            <div className="w-4 h-3 bg-red-600 rounded-t-sm border border-red-700 shadow-xs flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"/>
            </div>
            <div className="w-full flex-1 rounded-b-md bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-2 border-amber-900 shadow-md flex flex-col items-center justify-between p-1 text-white">
              <div className="text-[5px] font-black bg-red-600 text-white px-1 rounded-xs">วอส. 45/2560</div>
              <div className="text-center my-auto">
                <span className="text-xs">🦟</span>
                <div className="font-heading font-black text-[6.5px] leading-tight">สเปรย์กำจัดยุง</div>
                <div className="text-[4.5px] text-amber-200">ระบบ GHS ไวไฟ</div>
              </div>
              <div className="text-[4.5px] text-amber-300 font-bold">ห้ามฉีดโดนอาหาร</div>
            </div>
          </div>
        );

      // น้ำยาล้างห้องน้ำกรดเกลือเข้มข้น (ขวดคอห่านเอียงสีม่วงเข้ม)
      case 'hazard_danger_toilet_acid':
        return (
          <div className="w-14 h-24 flex flex-col items-center relative">
            {/* Angled Swan-Neck Spout */}
            <div className="w-6 h-4 relative flex items-center justify-center">
              <div className="w-3.5 h-2.5 bg-red-600 rounded-t-md transform -rotate-25 border border-red-700 shadow-xs flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="w-4 h-2 bg-purple-900 border-x border-purple-950 mt-1" />
            </div>
            {/* Heavy-duty Purple Chemical Bottle */}
            <div className="w-full flex-1 rounded-b-xl bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-2 border-purple-950 shadow-md flex flex-col items-center justify-between p-1 text-white relative overflow-hidden">
              <div className="flex items-center justify-between w-full border-b border-purple-800 pb-0.5">
                <span className="text-[5px] font-black bg-yellow-400 text-slate-950 px-1 rounded-xs">วอส. 99/2550</span>
                <span className="text-[8px]">☠️</span>
              </div>
              <div className="text-center my-auto">
                <div className="text-xs">🧪</div>
                <div className="font-heading font-black text-[7px] text-amber-300 leading-tight">
                  น้ำยาล้างห้องน้ำ
                </div>
                <div className="text-[5px] text-purple-200 font-bold">กรดเกลือเข้มข้น</div>
              </div>
              <div className="w-full bg-red-600 text-white text-[4.5px] font-black text-center py-0.5 rounded-xs">
                กัดกร่อน! ห้ามไว้ใกล้ตู้ยา
              </div>
            </div>
          </div>
        );

      // ยาชุดลดความอ้วนไซบูทรามีน (ซองซิปล็อกยาชุดผิดกฎหมาย)
      case 'narcotic_danger_diet_pill_meth':
        return (
          <div className="w-15 h-21 rounded-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-600 shadow-md p-1 flex flex-col justify-between text-white relative">
            <div className="w-full h-1.5 bg-red-600 rounded-t-xs flex items-center justify-center">
              <div className="w-full h-0.5 bg-white/60" />
            </div>
            <div className="flex justify-between items-center text-[5px] pt-0.5">
              <span className="bg-red-700 px-1 rounded-xs font-black">ยาชุดเถื่อน</span>
              <span className="text-red-400 font-bold">ยาเสพติด</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-sm">☠️</span>
              <div className="font-heading font-black text-[6.5px] text-red-400 leading-tight">
                ยาชุดลดความอ้วน
              </div>
              <div className="text-[4.5px] text-slate-300">ผสมไซบูทรามีน/ยาบ้า</div>
            </div>
            <div className="text-[4.5px] bg-red-950 text-red-300 text-center font-bold py-0.5 rounded-xs border border-red-800">
              หัวใจวาย / ผิดกฎหมาย
            </div>
          </div>
        );

      // Default fallback - Smart category-aware icon (NO generic pill for non-drugs!)
      default: {
        const fallbackIcon = getItemVisualIcon(item);

        return (
          <div className="w-14 h-22 rounded-lg bg-white border-2 border-slate-300 shadow-md flex flex-col items-center justify-between p-1 text-center">
            <div className="w-full text-[5.5px] font-bold text-slate-500 border-b pb-0.5 truncate">{item.regNumber || 'อย.'}</div>
            <span className="text-xl my-auto">{fallbackIcon}</span>
            <span className="text-[6.5px] font-bold text-slate-800 line-clamp-2 leading-tight">
              {item.thaiName}
            </span>
          </div>
        );
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-transform hover:scale-105 ${
        isSm ? 'scale-90' : isLg ? 'scale-110' : ''
      }`}
    >
      {/* Category Indicator Dot */}
      {item.category === 'hazard' ? (
        <span className="absolute -top-1.5 -right-1.5 z-10 w-4.5 h-4.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
          !
        </span>
      ) : item.labelType === 'red_external' ? (
        <span className="absolute -top-1.5 -right-1.5 z-10 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-xs">
          ภ
        </span>
      ) : item.category === 'internal' ? (
        <span className="absolute -top-1.5 -right-1.5 z-10 w-4.5 h-4.5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-xs">
          น
        </span>
      ) : (
        <span className="absolute -top-1.5 -right-1.5 z-10 w-4.5 h-4.5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-xs">
          ว
        </span>
      )}

      {/* Realistic Visual Rendering */}
      {renderRealisticItem()}

      {showDetails && (
        <div className="mt-1 text-center max-w-[105px]">
          <div className="text-xs font-bold text-slate-800 truncate" title={item.name}>
            {item.thaiName}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            {item.expiryDate}
          </div>
        </div>
      )}
    </div>
  );
};
