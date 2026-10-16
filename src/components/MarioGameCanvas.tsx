import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Home,
  Clock,
  Sparkles,
  Trophy,
  AlertCircle,
  CheckCircle2,
  Flame,
  HelpCircle,
  Eye,
  ArrowUp,
  RotateCcw,
  User,
  Zap,
  Cloud,
  BookOpen,
} from 'lucide-react';
import { MedicineItem, MedicineCategory, ProductDomain } from '../types/medicine';
import { GameMode, GameLevel, GameMapId, PlatformBlock, SpawnedMedicine, PlayerCharacter } from '../types/game';
import { ALL_MEDICINES } from '../data/medicinesData';
import { ALL_HEALTH_PRODUCTS } from '../data/healthProductsData';
import { GAME_MAPS } from '../data/mapsData';
import { LargeDrugLabel } from './LargeDrugLabel';
import { FdaCareGuideModal } from './FdaCareGuideModal';
import { CloudRankService } from '../services/cloudRankService';
import { soundEffects } from '../utils/audio';
import { getItemVisualIcon } from '../utils/itemVisuals';

// Realistic Medicine Renderer on Canvas for authentic look & feel
const drawRealisticMedicine = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  item: MedicineItem
) => {
  ctx.save();

  if (item.id === 'cosmetic_mild_bodywash' || item.bottleShape === 'pump_bottle') {
    // 1. สบู่เหลวอาบน้ำ pH 5.5: Realistic Pump Bottle (ขวดสบู่เหลวหัวปั๊มฟองสบู่)
    // Spout nozzle extending left
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(x + w * 0.1, y, w * 0.55, 3.5, [2, 1, 1, 2]);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Spout curved tip downward
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x + w * 0.1, y + 2, 2.5, 2.5);

    // Piston neck stem
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x + w * 0.4, y + 3, w * 0.2, 3.5);

    // Collar
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(x + w * 0.28, y + 6, w * 0.44, 2.5);

    // Teal Translucent Bottle Body
    const bodyY = y + 8.5;
    const bodyH = h - 8.5;
    const bodyGrad = ctx.createLinearGradient(x, bodyY, x + w, bodyY + bodyH);
    bodyGrad.addColorStop(0, '#0d9488');
    bodyGrad.addColorStop(0.4, '#14b8a6');
    bodyGrad.addColorStop(0.8, '#0f766e');
    bodyGrad.addColorStop(1, '#115e59');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(x, bodyY, w, bodyH, [4, 4, 8, 8]);
    ctx.fill();
    ctx.strokeStyle = '#042f2e';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Bottle Sheen line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillRect(x + 2, bodyY + 2, 2.5, bodyH - 6);

    // Tiny soap bubbles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(x + w - 6, bodyY + 5, 1.8, 0, Math.PI * 2);
    ctx.arc(x + w - 9, bodyY + 9, 1.2, 0, Math.PI * 2);
    ctx.arc(x + 5, bodyY + bodyH - 6, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Label on bottle
    const labelH = bodyH * 0.55;
    const labelY = bodyY + bodyH * 0.22;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 2, labelY, w - 4, labelH);
    ctx.strokeStyle = '#99f6e4';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(x + 2, labelY, w - 4, labelH);

    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 7px Sarabun, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('สบู่เหลว', x + w / 2, labelY + labelH * 0.32);
    ctx.font = 'bold 5.5px Sarabun, sans-serif';
    ctx.fillStyle = '#0d9488';
    ctx.fillText('pH 5.5', x + w / 2, labelY + labelH * 0.72);
  } else if (item.id === 'food_danger_formalin_seafood' || item.bottleShape === 'fresh_tray') {
    // 2. อาหารทะเลแช่ฟอร์มาลีน: Supermarket Seafood Tray on Ice (ถาดโฟมอาหารทะเล หมึก/กุ้ง)
    // White foam tray
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, [3, 3, 3, 3]);
    ctx.fill();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Crushed ice base layer
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(x + 1.5, y + 1.5, w - 3, h * 0.55);

    // Ice crystals
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 3, y + 3, 2, 2);
    ctx.fillRect(x + w - 6, y + 4, 2, 2);
    ctx.fillRect(x + w / 2 - 1, y + 6, 2, 2);

    // Seafood icons
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦑', x + w * 0.35, y + h * 0.32);
    ctx.fillText('🦐', x + w * 0.68, y + h * 0.32);

    // Cling wrap sheen
    const filmGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    filmGrad.addColorStop(0, 'rgba(255,255,255,0.7)');
    filmGrad.addColorStop(0.5, 'rgba(239,68,68,0.08)');
    filmGrad.addColorStop(1, 'rgba(255,255,255,0.5)');
    ctx.fillStyle = filmGrad;
    ctx.fillRect(x + 1.5, y + 1.5, w - 3, h - 3);

    // Red warning sticker banner
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(x + 1, y + h - 11, w - 2, 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 6px Sarabun, sans-serif';
    ctx.fillText('ฟอร์มาลีน!', x + w / 2, y + h - 6);
  } else if (item.id === 'device_danger_fake_contactlens' || item.bottleShape === 'vial') {
    // 3. คอนแทคเลนส์เถื่อนตลาดนัด: Sterile Glass Vial Bottle with Contact Lens (ขวดแก้วคอนแทคเลนส์)
    const capW = w * 0.55;
    const capH = 4.5;
    const capX = x + (w - capW) / 2;

    // Purple rubber stopper & crimped aluminum collar
    ctx.fillStyle = '#7e22ce';
    ctx.fillRect(capX, y, capW, capH);
    ctx.strokeStyle = '#581c87';
    ctx.lineWidth = 1;
    ctx.strokeRect(capX, y, capW, capH);

    // Glass body
    const bodyY = y + capH;
    const bodyH = h - capH;
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(x + 1, bodyY, w - 2, bodyH);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 1, bodyY, w - 2, bodyH);

    // Glass sheen
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(x + 3, bodyY + 2, 2, bodyH - 4);

    // Saline solution meniscus
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(x + 2, bodyY + 3, w - 4, bodyH - 4);

    // Contact lens iris inside vial
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👁️', x + w / 2, bodyY + bodyH * 0.4);

    // Danger text
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 5.5px Sarabun, sans-serif';
    ctx.fillText('เลนส์เถื่อน', x + w / 2, bodyY + bodyH - 4);
  } else if (
    item.id === 'hazard_danger_toilet_acid' ||
    item.id === 'danger_chemical_cleaner' ||
    item.bottleShape === 'chemical_bottle'
  ) {
    // 4. น้ำยาล้างห้องน้ำกรดเกลือเข้มข้น: Angled Swan-Neck Heavy Chemical Bottle (ขวดคอห่านเอียงสีม่วงเข้ม)
    // Red Angled Directional Spout Tip
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(x + w * 0.2, y + 4);
    ctx.lineTo(x + w * 0.45, y);
    ctx.lineTo(x + w * 0.65, y + 3);
    ctx.lineTo(x + w * 0.45, y + 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Angled Neck
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(x + w * 0.32, y + 4, w * 0.32, 5);

    // Deep purple chemical bottle body
    const bodyY = y + 8;
    const bodyH = h - 8;
    ctx.fillStyle = '#3b0764';
    ctx.beginPath();
    ctx.roundRect(x, bodyY, w, bodyH, [4, 4, 6, 6]);
    ctx.fill();
    ctx.strokeStyle = '#1e1b4b';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Bottle handle cut notch on left side
    ctx.fillStyle = '#581c87';
    ctx.fillRect(x + 2, bodyY + 4, 3, bodyH * 0.45);

    // Yellow hazard warning diamond
    const midX = x + w / 2;
    const midY = bodyY + bodyH * 0.42;
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(midX, midY - 6);
    ctx.lineTo(midX + 7, midY);
    ctx.lineTo(midX, midY + 6);
    ctx.lineTo(midX - 7, midY);
    ctx.closePath();
    ctx.fill();

    // Corrosive/Skull symbol
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☠️', midX, midY);

    // Bottom warning label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px Sarabun, sans-serif';
    ctx.fillText('กรดเกลือ', midX, bodyY + bodyH - 4);
  } else if (item.id === 'food_milk_uht') {
    // กล่องนม UHT
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, w, h);

    // Top white flap
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, w, 5);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥛', x + w / 2, y + h * 0.45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 6.5px Sarabun';
    ctx.fillText('MILK', x + w / 2, y + h - 5);
  } else if (item.id === 'food_instant_noodle') {
    // ซองบะหมี่กึ่งสำเร็จรูป
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍜', x + w / 2, y + h * 0.45);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 6px Sarabun';
    ctx.fillText('GDA', x + w / 2, y + h - 5);
  } else if (item.id === 'food_canned_fish') {
    // ปลากระป๋อง
    ctx.fillStyle = '#be123c';
    ctx.fillRect(x, y + 2, w, h - 2);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y + 2, w, h - 2);

    // Lid ring
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x + w * 0.35, y, w * 0.3, 3);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐟', x + w / 2, y + h * 0.52);
  } else if (item.id === 'food_danger_borax_meatball') {
    // ลูกชิ้นบอแรกซ์
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍡', x + w / 2, y + h * 0.42);

    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 6px Sarabun';
    ctx.fillText('บอแรกซ์', x + w / 2, y + h - 5);
  } else if (item.id === 'cosmetic_sunscreen_tube') {
    // หลอดครีมกันแดด
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + w * 0.35, y, w * 0.3, 3);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(x, y + 3, w, h - 3);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + 3, w, h - 3);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☀️', x + w / 2, y + h * 0.45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 6px Sarabun';
    ctx.fillText('SPF50+', x + w / 2, y + h - 5);
  } else if (item.id === 'cosmetic_danger_mercury_whitening') {
    // กระปุกครีมหน้าขาวเถื่อน
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(x, y, w, 6);
    ctx.fillStyle = '#881337';
    ctx.fillRect(x, y + 6, w, h - 6);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚠️', x + w / 2, y + h * 0.55);
  } else if (item.id === 'device_surgical_mask') {
    // ซองหน้ากากอนามัย
    ctx.fillStyle = '#059669';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('😷', x + w / 2, y + h * 0.45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 6px Sarabun';
    ctx.fillText('MASK', x + w / 2, y + h - 5);
  } else if (item.id === 'device_atk_test_kit') {
    // ชุดตรวจ ATK
    ctx.fillStyle = '#0891b2';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧪', x + w / 2, y + h * 0.45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 6px Sarabun';
    ctx.fillText('ATK', x + w / 2, y + h - 5);
  } else if (item.id === 'hazard_dishwashing_liquid') {
    // น้ำยาล้างจาน
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(x + w * 0.35, y, w * 0.3, 3);
    ctx.fillStyle = '#84cc16';
    ctx.fillRect(x, y + 3, w, h - 3);
    ctx.strokeStyle = '#4d7c0f';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + 3, w, h - 3);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍋', x + w / 2, y + h * 0.5);
  } else if (item.id === 'hazard_mosquito_spray') {
    // สเปรย์กำจัดยุง
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x + w * 0.35, y, w * 0.3, 4);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(x, y + 4, w, h - 4);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + 4, w, h - 4);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦟', x + w / 2, y + h * 0.55);
  } else if (item.id === 'narcotic_danger_diet_pill_meth') {
    // ซองซิปล็อกยาชุด
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x, y, w, 3); // Red zip strip

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☠️', x + w / 2, y + h * 0.55);
  } else if (item.bottleShape === 'blister') {
    // Realistic Blister pack with metallic shine and pills
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, 'rgba(255,255,255,0.7)');
    grad.addColorStop(0.5, 'rgba(203,213,225,0.3)');
    grad.addColorStop(1, 'rgba(255,255,255,0.8)');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);

    const pillColor = item.id === 'med_cpm_tab' ? '#facc15' : item.id === 'med_charcoal_cap' ? '#18181b' : '#ffffff';
    const pillBorder = item.id === 'med_charcoal_cap' ? '#3f3f46' : '#94a3b8';
    const pills = [
      { px: x + w * 0.28, py: y + h * 0.28 },
      { px: x + w * 0.72, py: y + h * 0.28 },
      { px: x + w * 0.28, py: y + h * 0.72 },
      { px: x + w * 0.72, py: y + h * 0.72 },
    ];
    pills.forEach((p) => {
      ctx.fillStyle = pillColor;
      ctx.beginPath();
      ctx.arc(p.px, p.py, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = pillBorder;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });
  } else if (item.bottleShape === 'bottle' || item.bottleShape === 'syrup') {
    // Realistic Bottle with screw cap & FDA label
    const capW = w * 0.45;
    const capH = 4;
    const capX = x + (w - capW) / 2;
    const capY = y;

    // Screw cap
    ctx.fillStyle = item.labelType === 'red_external' && item.id === 'med_povidone_iodine' ? '#f59e0b' : '#ffffff';
    ctx.fillRect(capX, capY, capW, capH);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(capX, capY, capW, capH);

    // Body
    const bodyY = y + capH + 1;
    const bodyH = h - capH - 1;
    ctx.fillStyle =
      item.id === 'med_cardamom_syrup'
        ? '#451a03' // amber glass
        : item.id === 'med_alcohol_70'
        ? '#38bdf8' // clear cyan liquid
        : item.id === 'med_calamine_lotion'
        ? '#f472b6' // pink lotion
        : item.id === 'med_povidone_iodine'
        ? '#d97706' // iodine bottle
        : item.id === 'med_saline_solution'
        ? '#e0f2fe' // normal saline
        : '#f8fafc'; // white opaque
    ctx.fillRect(x, bodyY, w, bodyH);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, bodyY, w, bodyH);

    // Label
    const labelH = bodyH * 0.55;
    const labelY = bodyY + bodyH * 0.22;
    ctx.fillStyle = item.labelType === 'red_external' ? '#dc2626' : '#ffffff';
    ctx.fillRect(x + 2, labelY, w - 4, labelH);

    ctx.fillStyle = item.labelType === 'red_external' ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 7px Sarabun';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.labelType === 'red_external' ? 'ภายนอก' : 'อย.', x + w / 2, labelY + labelH / 2);
  } else if (item.bottleShape === 'sachet') {
    // Sachet (ORS)
    ctx.fillStyle = '#059669';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, w, h);

    // Tear notch
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + w - 4, y, 3, 2);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px Sarabun';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ORS', x + w / 2, y + h / 2);
  } else if (item.bottleShape === 'cream' || item.id === 'med_balm_jar') {
    // Balm jar
    const lidH = h * 0.45;
    ctx.fillStyle = '#d97706';
    ctx.fillRect(x, y, w, lidH);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, lidH);

    ctx.fillStyle = '#064e3b';
    ctx.fillRect(x + 1, y + lidH, w - 2, h - lidH);
    ctx.strokeStyle = '#022c22';
    ctx.strokeRect(x + 1, y + lidH, w - 2, h - lidH);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px Sarabun';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌿', x + w / 2, y + lidH / 2);
  } else if (item.bottleShape === 'ointment') {
    // Squeeze tube
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + w * 0.35, y, w * 0.3, 3);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x, y + 3, w, h - 5);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x, y + h - 2, w, 2);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 7px Sarabun';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌱', x + w / 2, y + h / 2);
  } else if (item.bottleShape === 'tool' || item.category === 'firstaid') {
    if (item.id === 'fa_thermometer') {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + w * 0.35, y, w * 0.3, h);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(x + w * 0.35, y, w * 0.3, h);

      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + w * 0.35, y, w * 0.3, 4);

      ctx.fillStyle = '#bef264';
      ctx.fillRect(x + w * 0.4, y + 8, w * 0.2, 7);
    } else if (item.id === 'fa_plaster_strip') {
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.roundRect(x, y + 4, w, h - 8, 4);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + w * 0.35, y + 5, w * 0.3, h - 10);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 11px Sarabun';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✚', x + w / 2, y + h / 2);
    }
  } else {
    // Smart Fallback based on Health Category (Never use pill for non-medicine!)
    const fallbackEmoji = getItemVisualIcon(item);
    const isHazard = item.labelType === 'danger' || item.isExpired || item.category === 'hazard';
    const isCosmetic = item.healthCategory === 'cosmetic';
    const isFood = item.healthCategory === 'food';
    const isDevice = item.healthCategory === 'med_device';

    const bgCol = isHazard
      ? '#7f1d1d'
      : isCosmetic
      ? '#be185d'
      : isFood
      ? '#0369a1'
      : isDevice
      ? '#047857'
      : item.labelType === 'red_external'
      ? '#dc2626'
      : '#2563eb';

    ctx.fillStyle = bgCol;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(x, y, w, h);
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fallbackEmoji, x + w / 2, y + h / 2);
  }

  ctx.restore();
};

interface ShelfVisualConfig {
  label: string;
  subLabel: string;
  themeColor: string;
  headerTextColor: string;
  badge: string;
}

export const getShelfVisualConfig = (
  targetCategory: MedicineCategory | undefined,
  domain: ProductDomain
): ShelfVisualConfig => {
  if (targetCategory === 'internal') {
    if (domain === 'health_products') {
      return {
        label: 'ชั้น 1: อาหาร & เสริมอาหาร',
        subLabel: 'เลข อย. 13 หลัก',
        themeColor: '#0284c7', // Sky Blue
        headerTextColor: '#0369a1',
        badge: 'อาหาร & ผลิตภัณฑ์เสริมอาหาร',
      };
    }
    if (domain === 'all') {
      return {
        label: 'ชั้น 1: ยาภายใน & อาหาร',
        subLabel: 'ยากิน & อาหาร อย.',
        themeColor: '#2563eb', // Blue
        headerTextColor: '#1d4ed8',
        badge: 'ยาใช้ภายใน / อาหาร',
      };
    }
    return {
      label: 'ชั้น 1: ยาใช้ภายใน',
      subLabel: 'ฉลากสีน้ำเงิน (ยากิน)',
      themeColor: '#2563eb',
      headerTextColor: '#1e40af',
      badge: 'ยาสามัญสำหรับรับประทาน',
    };
  }

  if (targetCategory === 'external') {
    if (domain === 'health_products') {
      return {
        label: 'ชั้น 2: เครื่องสำอาง & เวชสำอาง',
        subLabel: 'ใบรับจดแจ้ง 10 หลัก',
        themeColor: '#e11d48', // Rose Red
        headerTextColor: '#be123c',
        badge: 'เครื่องสำอาง & เวชสำอาง',
      };
    }
    if (domain === 'all') {
      return {
        label: 'ชั้น 2: ยาภายนอก & เครื่องสำอาง',
        subLabel: 'ฉลากแดง & คอสเมติก',
        themeColor: '#dc2626',
        headerTextColor: '#b91c1c',
        badge: 'ยาใช้ภายนอก / เครื่องสำอาง',
      };
    }
    return {
      label: 'ชั้น 2: ยาใช้ภายนอก',
      subLabel: 'ฉลากสีแดง (ห้ามกิน)',
      themeColor: '#dc2626',
      headerTextColor: '#991b1b',
      badge: 'ยาใช้ภายนอกฉลากแดง',
    };
  }

  if (targetCategory === 'firstaid') {
    if (domain === 'health_products') {
      return {
        label: 'ชั้น 3: เครื่องมือแพทย์',
        subLabel: 'ใบอนุญาต/จดแจ้ง อย.',
        themeColor: '#059669', // Emerald
        headerTextColor: '#047857',
        badge: 'เครื่องมือแพทย์ & อุปกรณ์',
      };
    }
    if (domain === 'all') {
      return {
        label: 'ชั้น 3: เครื่องมือแพทย์ & เวชภัณฑ์',
        subLabel: 'ปฐมพยาบาล & เครื่องมือแพทย์',
        themeColor: '#16a34a',
        headerTextColor: '#15803d',
        badge: 'เครื่องมือแพทย์ & เวชภัณฑ์',
      };
    }
    return {
      label: 'ชั้น 3: เวชภัณฑ์ & ปฐมพยาบาล',
      subLabel: 'อุปกรณ์ทำแผล/วัดไข้',
      themeColor: '#16a34a',
      headerTextColor: '#166534',
      badge: 'เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล',
    };
  }

  if (targetCategory === 'hazard') {
    if (domain === 'health_products') {
      return {
        label: '🗑️ ขยะอันตราย & ของผิด อย.',
        subLabel: 'วอส. / สารปนเปื้อน / หมดอายุ',
        themeColor: '#991b1b',
        headerTextColor: '#7f1d1d',
        badge: 'วัตถุอันตรายในบ้านเรือน วอส.',
      };
    }
    if (domain === 'all') {
      return {
        label: '🗑️ ขยะอันตราย & วัตถุผิด อย.',
        subLabel: 'ยาหมดอายุ & สารเคมี วอส.',
        themeColor: '#991b1b',
        headerTextColor: '#7f1d1d',
        badge: 'ยาหมดอายุ / วัตถุอันตราย',
      };
    }
    return {
      label: '🗑️ ถังขยะอันตราย',
      subLabel: 'ยาหมดอายุ / เสื่อมสภาพ',
      themeColor: '#991b1b',
      headerTextColor: '#7f1d1d',
      badge: 'ยาหมดอายุและยาเสื่อมสภาพ',
    };
  }

  return {
    label: '',
    subLabel: '',
    themeColor: '#64748b',
    headerTextColor: '#334155',
    badge: '',
  };
};

interface MarioGameCanvasProps {
  mode: GameMode;
  level: GameLevel;
  mapId: GameMapId;
  playerName: string;
  domain?: ProductDomain;
  onGoHome: () => void;
  onOpenCloudRank: (highlightId?: string) => void;
}

export const MarioGameCanvas: React.FC<MarioGameCanvasProps> = ({
  mode,
  level,
  mapId,
  playerName,
  domain = 'medicine',
  onGoHome,
  onOpenCloudRank,
}) => {
  const [activeDomain, setActiveDomain] = useState<ProductDomain>(domain);

  useEffect(() => {
    setActiveDomain(domain);
  }, [domain]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentMap = GAME_MAPS[mapId] || GAME_MAPS.school_clinic;

  // Level configuration
  const totalItemsCount = level === 1 ? 5 : level === 2 ? 10 : 15;

  // Game state
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentPlayerName, setCurrentPlayerName] = useState(playerName || 'นักเรียน อย.น้อย');
  const [savedRankInfo, setSavedRankInfo] = useState<{ rank: number; id: string } | null>(null);
  const [activeCarryingItem, setActiveCarryingItem] = useState<MedicineItem | null>(null);
  const [showLargeLabel, setShowLargeLabel] = useState(true);
  const [isFdaGuideOpen, setIsFdaGuideOpen] = useState(false);

  // Shelf contents placed
  const [placedShelves, setPlacedShelves] = useState<Record<MedicineCategory, MedicineItem[]>>({
    internal: [],
    external: [],
    firstaid: [],
    hazard: [],
  });

  // Feedback Toast for sorting result
  const [sortFeedback, setSortFeedback] = useState<{
    type: 'correct' | 'wrong';
    title: string;
    detail: string;
  } | null>(null);

  // Medicines pool for this game session
  const [roundMedicines, setRoundMedicines] = useState<MedicineItem[]>([]);
  const [currentMedicineIndex, setCurrentMedicineIndex] = useState(0);

  // Active spawned pickup in game world
  const currentItemRef = useRef<SpawnedMedicine | null>(null);

  // Player physics state in ref for 60fps render loop
  const playerRef = useRef<PlayerCharacter>({
    x: 100,
    y: 380,
    width: 32,
    height: 44,
    vx: 0,
    vy: 0,
    isGrounded: false,
    isJumping: false,
    facing: 'right',
    carryingItem: null,
  });

  // Keys held state (with sprint support)
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean; sprint: boolean; action: boolean }>({
    left: false,
    right: false,
    jump: false,
    sprint: false,
    action: false,
  });

  // Level platforms layout loaded from chosen map
  const platformsRef = useRef<PlatformBlock[]>(currentMap.platforms);

  // Initialize round medicines
  const initGame = (targetDom = activeDomain) => {
    // Update platforms for chosen map
    platformsRef.current = GAME_MAPS[mapId]?.platforms || GAME_MAPS.school_clinic.platforms;

    // Shuffle and pick balanced mix for level
    let pool: MedicineItem[] = [];
    if (targetDom === 'health_products') {
      pool = ALL_HEALTH_PRODUCTS;
    } else if (targetDom === 'all') {
      pool = [...ALL_MEDICINES, ...ALL_HEALTH_PRODUCTS];
    } else {
      pool = ALL_MEDICINES;
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, totalItemsCount);

    setRoundMedicines(selected);
    setCurrentMedicineIndex(0);
    setScore(0);
    setCombo(0);
    setTimeSeconds(0);
    setIsGameOver(false);
    setSavedRankInfo(null);
    setActiveCarryingItem(null);
    setSortFeedback(null);
    setPlacedShelves({
      internal: [],
      external: [],
      firstaid: [],
      hazard: [],
    });

    // Reset player position
    playerRef.current = {
      x: 120,
      y: 400,
      width: 32,
      height: 44,
      vx: 0,
      vy: 0,
      isGrounded: false,
      isJumping: false,
      facing: 'right',
      carryingItem: null,
    };

    // Spawn first medicine in center
    if (selected.length > 0) {
      currentItemRef.current = {
        id: selected[0].id,
        item: selected[0],
        x: 400,
        y: 420,
        width: 30,
        height: 36,
        isPickedUp: false,
        isSorted: false,
      };
    }
  };

  useEffect(() => {
    initGame(activeDomain);
  }, [mode, level, mapId, activeDomain]);

  // Timer loop
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  // Handle Pick Up / Place Item Logic
  const handleAction = () => {
    const player = playerRef.current;
    const currentItem = currentItemRef.current;

    // 1. If NOT carrying anything: Check proximity to item to pick it up!
    if (!player.carryingItem && currentItem && !currentItem.isPickedUp) {
      const dist = Math.hypot(
        player.x + player.width / 2 - (currentItem.x + currentItem.width / 2),
        player.y + player.height / 2 - (currentItem.y + currentItem.height / 2)
      );

      if (dist < 65) {
        soundEffects.playSelect();
        currentItem.isPickedUp = true;
        player.carryingItem = currentItem;
        setActiveCarryingItem(currentItem.item);
        setShowLargeLabel(true);
        return;
      }
    }

    // 2. If CARRYING an item: Check proximity to any of the 4 shelves / pipes to place it!
    if (player.carryingItem) {
      const carried = player.carryingItem;
      let matchedPlatform: PlatformBlock | null = null;

      for (const p of platformsRef.current) {
        if (p.targetCategory) {
          const isNearX = player.x + player.width > p.x - 25 && player.x < p.x + p.width + 25;
          const isNearY = Math.abs(player.y + player.height - p.y) < 70 || (player.y >= p.y - 45 && player.y <= p.y + p.height + 30);

          if (isNearX && isNearY) {
            matchedPlatform = p;
            break;
          }
        }
      }

      if (matchedPlatform && matchedPlatform.targetCategory) {
        const targetCategory = matchedPlatform.targetCategory;
        const itemObj = carried.item;

        if (itemObj.category === targetCategory) {
          // CORRECT!
          soundEffects.playCorrect();
          const newCombo = combo + 1;
          setCombo(newCombo);
          const comboBonus = newCombo * 25;
          const timeBonus = mode === 'time_attack' ? Math.max(50 - timeSeconds, 10) : 0;
          const pointsEarned = 100 + comboBonus + timeBonus;

          setScore((prev) => prev + pointsEarned);

          setPlacedShelves((prev) => ({
            ...prev,
            [targetCategory]: [...prev[targetCategory], itemObj],
          }));

          let catName = '';
          if (activeDomain === 'health_products') {
            if (itemObj.category === 'internal') catName = 'หมวดอาหาร & เสริมอาหาร (มีเลข อย. 13 หลัก)';
            else if (itemObj.category === 'external') catName = 'หมวดเครื่องสำอาง (มีเลขที่ใบรับจดแจ้ง 10 หลัก)';
            else if (itemObj.category === 'firstaid') catName = 'หมวดเครื่องมือแพทย์ (มีใบอนุญาต/จดแจ้ง อย.)';
            else catName = 'หมวดวัตถุอันตรายในบ้าน วอส. หรือสารปนเปื้อน อย. (ทิ้งลงถังขยะอันตราย)';
          } else if (activeDomain === 'all') {
            if (itemObj.category === 'internal') catName = itemObj.healthCategory === 'food' ? 'หมวดอาหาร/เสริมอาหาร (เลข อย. 13 หลัก)' : 'หมวดยาใช้ภายใน (สำหรับรับประทาน)';
            else if (itemObj.category === 'external') catName = itemObj.healthCategory === 'cosmetic' ? 'หมวดเครื่องสำอาง (เลขจดแจ้ง 10 หลัก)' : 'หมวดยาใช้ภายนอก (ฉลากสีแดง ห้ามรับประทาน)';
            else if (itemObj.category === 'firstaid') catName = itemObj.healthCategory === 'med_device' ? 'หมวดเครื่องมือแพทย์ อย.' : 'หมวดเวชภัณฑ์และอุปกรณ์ปฐมพยาบาล';
            else catName = 'หมวดของอันตราย/ยาหมดอายุ/วัตถุผิดกฎหมาย อย.';
          } else {
            if (itemObj.category === 'internal') catName = 'ยาใช้ภายใน (สำหรับรับประทาน)';
            else if (itemObj.category === 'external') catName = 'ยาใช้ภายนอก (ฉลากสีแดง ห้ามรับประทาน)';
            else if (itemObj.category === 'firstaid') catName = 'เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล';
            else catName = 'ยาหมดอายุ/เสื่อมสภาพ/ยาอันตราย';
          }

          setSortFeedback({
            type: 'correct',
            title: `วางถูกชั้นแล้ว! (+${pointsEarned} แต้ม)`,
            detail: `${catName} — ${itemObj.explanation}`,
          });

          // Clear carrying
          player.carryingItem = null;
          setActiveCarryingItem(null);

          const nextIdx = currentMedicineIndex + 1;
          setCurrentMedicineIndex(nextIdx);

          if (nextIdx >= roundMedicines.length) {
            setIsGameOver(true);
            soundEffects.playFanfare();
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
            });
            handleSaveToCloudRank(score + pointsEarned, nextIdx);
          } else {
            // Spawn next medicine at dynamic spot
            const spawnX = 260 + Math.random() * 340;
            currentItemRef.current = {
              id: roundMedicines[nextIdx].id,
              item: roundMedicines[nextIdx],
              x: spawnX,
              y: 420,
              width: 30,
              height: 36,
              isPickedUp: false,
              isSorted: false,
            };
          }
        } else {
          // WRONG SHELF!
          soundEffects.playWrong();
          setCombo(0);

          let hint = '';
          if (activeDomain === 'health_products') {
            if (itemObj.category === 'hazard') {
              hint = `ระวัง! "${itemObj.name}" เป็นวัตถุอันตรายในบ้านเรือน (วอส.) หรือผลิตภัณฑ์ผิดกฎหมาย/สารปนเปื้อนอันตราย (บอแรกซ์/ฟอร์มาลิน/ปรอท/ไซบูทรามีน) ต้องทิ้งลงถังขยะอันตรายสีแดง!`;
            } else if (itemObj.category === 'external') {
              hint = `สังเกตเลขจดแจ้ง 10 หลัก! "${itemObj.name}" เป็นเครื่องสำอางที่ปลอดภัย ต้องจัดวางบนชั้นที่ 2 (เครื่องสำอาง & เวชสำอาง)`;
            } else if (itemObj.category === 'internal') {
              hint = `สังเกตเลข อย. 13 หลัก หรือตราทางเลือกสุขภาพ! "${itemObj.name}" เป็นอาหารและเครื่องดื่มที่ปลอดภัย ต้องจัดวางบนชั้นที่ 1 (อาหาร & เสริมอาหาร)`;
            } else {
              hint = `สังเกตใบอนุญาต/จดแจ้ง อย.! "${itemObj.name}" เป็นเครื่องมือแพทย์และอุปกรณ์มาตรฐาน ต้องจัดวางบนชั้นที่ 3 (เครื่องมือแพทย์)`;
            }
          } else if (activeDomain === 'all') {
            if (itemObj.category === 'hazard') {
              hint = `ระวัง! "${itemObj.name}" เป็นของอันตราย ยาหมดอายุ หรือวัตถุอันตราย วอส. ต้องทิ้งลงถังขยะอันตรายสีแดง!`;
            } else if (itemObj.category === 'external') {
              hint = `"${itemObj.name}" เป็นยาใช้ภายนอก (ฉลากสีแดง) หรือเครื่องสำอาง ต้องจัดวางชั้นที่ 2`;
            } else if (itemObj.category === 'internal') {
              hint = `"${itemObj.name}" เป็นยาสำหรับรับประทาน หรืออาหารเสริมที่มี อย. ต้องจัดวางชั้นที่ 1`;
            } else {
              hint = `"${itemObj.name}" เป็นเครื่องมือแพทย์หรือเวชภัณฑ์ปฐมพยาบาล ต้องจัดวางชั้นที่ 3`;
            }
          } else {
            if (itemObj.category === 'hazard') {
              hint = `ระวัง! "${itemObj.name}" เป็นยาหมดอายุหรือยาเสื่อมสภาพ ต้องทิ้งลงถังขยะอันตรายสีแดง!`;
            } else if (itemObj.category === 'external') {
              hint = `สังเกตฉลากสีแดง! "${itemObj.name}" เป็นยาใช้ภายนอก ห้ามรับประทาน ต้องวางบนชั้นที่ 2`;
            } else if (itemObj.category === 'internal') {
              hint = `"${itemObj.name}" เป็นยาสามัญสำหรับรับประทาน (ยาใช้ภายใน) ต้องวางบนชั้นที่ 1`;
            } else {
              hint = `"${itemObj.name}" เป็นเวชภัณฑ์และอุปกรณ์ปฐมพยาบาล ต้องวางบนชั้นที่ 3`;
            }
          }

          setSortFeedback({
            type: 'wrong',
            title: mode === 'time_attack' ? 'วางผิดชั้น! (เปิดเผยคำใบ้ อย.)' : 'ยังไม่ถูกต้องนะ!',
            detail: hint,
          });
        }
      }
    }
  };

  // Save to Cloud Rank
  const handleSaveToCloudRank = async (finalScore: number, solvedCount: number) => {
    const res = await CloudRankService.saveRank({
      playerName: currentPlayerName.trim() || 'นักเรียน อย.น้อย',
      score: finalScore,
      mode,
      level,
      domain: activeDomain,
      mapId,
      totalItems: totalItemsCount,
      correctItems: solvedCount,
      timeSpentSeconds: timeSeconds,
    });
    setSavedRankInfo({ rank: res.rank, id: res.entry.id });
  };

  // Keyboard controls listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = true;
      }
      if (e.key === 'Shift') {
        keysRef.current.sprint = true;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        keysRef.current.action = true;
        handleAction();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false;
      }
      if (e.key === 'Shift') {
        keysRef.current.sprint = false;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        keysRef.current.action = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [currentMedicineIndex, roundMedicines, score, combo, timeSeconds, mode, mapId]);

  // Main 60fps Game Loop & Rendering
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cloudX1 = 50;
    let cloudX2 = 450;
    let cloudX3 = 800;

    const gameLoop = () => {
      const player = playerRef.current;
      const keys = keysRef.current;

      // Dynamic Sprint Speed calculation
      const isSprinting = keys.sprint;
      const ACCEL = isSprinting ? 1.2 : 0.8;
      const MAX_SPEED = isSprinting ? 7.2 : 4.8;
      const FRICTION = 0.82;
      const GRAVITY = 0.65;
      const JUMP_FORCE = -12.5;

      if (keys.left) {
        player.vx = Math.max(player.vx - ACCEL, -MAX_SPEED);
        player.facing = 'left';
      } else if (keys.right) {
        player.vx = Math.min(player.vx + ACCEL, MAX_SPEED);
        player.facing = 'right';
      } else {
        player.vx *= FRICTION;
      }

      // Jump
      if (keys.jump && player.isGrounded) {
        player.vy = JUMP_FORCE;
        player.isGrounded = false;
        soundEffects.playSelect();
      }

      // Apply gravity
      player.vy += GRAVITY;

      // Update positions
      player.x += player.vx;
      player.y += player.vy;

      // Screen boundaries
      if (player.x < 10) player.x = 10;
      if (player.x > 960 - player.width - 10) player.x = 960 - player.width - 10;

      // Fall recovery if falling through gaps in health park map
      if (player.y > 520) {
        player.x = 100;
        player.y = 380;
        player.vy = 0;
      }

      // Platform & Spring Collisions
      player.isGrounded = false;
      for (const p of platformsRef.current) {
        const prevY = player.y - player.vy;
        const isWithinX = player.x + player.width > p.x && player.x < p.x + p.width;

        if (isWithinX) {
          // Landing on top of platform
          if (prevY + player.height <= p.y + 6 && player.y + player.height >= p.y) {
            // Check if this is a Trampoline / Spring Pad!
            if (p.type === 'spring') {
              soundEffects.playSelect();
              player.vy = JUMP_FORCE * (p.bounceMultiplier || 1.5);
              player.isGrounded = false;
            } else {
              player.y = p.y - player.height;
              player.vy = 0;
              player.isGrounded = true;
            }
          }
        }
      }

      // --- 2. Render Frame ---
      ctx.clearRect(0, 0, 960, 520);

      // Map Sky Color
      ctx.fillStyle = currentMap.skyColor || '#5c94fc';
      ctx.fillRect(0, 0, 960, 520);

      // Drifting Pixel Clouds
      cloudX1 = (cloudX1 + 0.3) % 1100;
      cloudX2 = (cloudX2 + 0.25) % 1100;
      cloudX3 = (cloudX3 + 0.35) % 1100;

      const drawCloud = (cx: number, cy: number, scale: number = 1) => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 20 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 25 * scale, cy - 8 * scale, 24 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 55 * scale, cy, 20 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx - 5 * scale, cy, 65 * scale, 20 * scale);
      };

      drawCloud(cloudX1 - 100, 60, 1.2);
      drawCloud(cloudX2 - 100, 110, 0.9);
      drawCloud(cloudX3 - 100, 75, 1.1);

      // Rolling Hills in Background
      ctx.fillStyle = mapId === 'health_park' ? '#166534' : '#00a800';
      ctx.beginPath();
      ctx.arc(160, 460, 120, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(680, 460, 150, Math.PI, 0);
      ctx.fill();

      // Bushes
      ctx.fillStyle = '#00d000';
      ctx.beginPath();
      ctx.arc(440, 460, 45, Math.PI, 0);
      ctx.arc(480, 460, 60, Math.PI, 0);
      ctx.arc(520, 460, 45, Math.PI, 0);
      ctx.fill();

      // Render Platforms & Shelves
      for (const p of platformsRef.current) {
        if (p.type === 'ground') {
          ctx.fillStyle = currentMap.groundColor || '#d86800';
          ctx.fillRect(p.x, p.y, p.width, p.height);

          // Top grass border
          ctx.fillStyle = '#00a800';
          ctx.fillRect(p.x, p.y, p.width, 10);
          ctx.fillStyle = '#00d000';
          ctx.fillRect(p.x, p.y, p.width, 3);

          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.5;
          for (let gx = p.x; gx < p.x + p.width; gx += 32) {
            ctx.strokeRect(gx, p.y + 10, 32, 25);
            ctx.strokeRect(gx + 16, p.y + 35, 32, 25);
          }
        } else if (p.type === 'spring') {
          // Springboard / Trampoline Pad
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.width, p.height);

          // Spring coils
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(p.x + 4, p.y + 2, p.width - 8, 4);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px Sarabun';
          ctx.textAlign = 'center';
          ctx.fillText('⬆ เด้งดึ๋ง', p.x + p.width / 2, p.y + 14);
        } else if (p.type === 'shelf') {
          const cfg = getShelfVisualConfig(p.targetCategory, activeDomain);

          // Top Shelf accent bar
          ctx.fillStyle = cfg.themeColor;
          ctx.fillRect(p.x - 6, p.y - 12, p.width + 12, 14);

          // Wood shelf body
          ctx.fillStyle = '#854d0e';
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.width, p.height);

          // Shelf Title Label Plaque (Made taller with 2 lines: Title + Subtitle)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(p.x + 4, p.y - 32, p.width - 8, 22, 5);
          ctx.fill();
          ctx.strokeStyle = cfg.themeColor;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = cfg.headerTextColor;
          ctx.font = 'bold 10px Sarabun, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(cfg.label, p.x + p.width / 2, p.y - 20);

          ctx.fillStyle = '#64748b';
          ctx.font = 'bold 8px Sarabun, sans-serif';
          ctx.fillText(cfg.subLabel, p.x + p.width / 2, p.y - 12);

          const count = p.targetCategory ? placedShelves[p.targetCategory].length : 0;
          if (count > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(p.x + p.width - 12, p.y + 12, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = cfg.headerTextColor;
            ctx.font = 'bold 10px Sarabun';
            ctx.fillText(`${count}`, p.x + p.width - 12, p.y + 15);
          }
        } else if (p.type === 'pipe') {
          const cfg = getShelfVisualConfig('hazard', activeDomain);

          ctx.fillStyle = '#991b1b';
          ctx.fillRect(p.x + 12, p.y + 24, p.width - 24, p.height - 24);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x + 12, p.y + 24, p.width - 24, p.height - 24);

          ctx.fillStyle = '#b91c1c';
          ctx.fillRect(p.x, p.y, p.width, 24);
          ctx.strokeRect(p.x, p.y, p.width, 24);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Sarabun';
          ctx.textAlign = 'center';
          ctx.fillText(cfg.label, p.x + p.width / 2, p.y + 11);

          ctx.fillStyle = '#fecaca';
          ctx.font = 'bold 7.5px Sarabun';
          ctx.fillText(cfg.subLabel, p.x + p.width / 2, p.y + 20);

          const hazardCount = placedShelves.hazard.length;
          if (hazardCount > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px Sarabun';
            ctx.fillText(`ทิ้ง ${hazardCount} ชิ้น`, p.x + p.width / 2, p.y + 44);
          }
        } else if (p.type === 'question') {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.width, p.height);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('?', p.x + p.width / 2, p.y + 15);
        } else {
          ctx.fillStyle = '#b45309';
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.width, p.height);
        }
      }

      // Render Active Spawned Medicine Pickup in World (Realistic Shape)
      const curItem = currentItemRef.current;
      if (curItem && !curItem.isPickedUp) {
        const bounce = Math.sin(Date.now() / 150) * 4;
        const iy = curItem.y + bounce;

        // Glowing aura ring around item
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(curItem.x + curItem.width / 2, iy + curItem.height / 2, 22, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Authentic Medicine Object
        drawRealisticMedicine(ctx, curItem.x, iy, curItem.width, curItem.height, curItem.item);

        // Floating medicine info bubble above item
        const badgeWidth = Math.max(90, curItem.item.thaiName.length * 10);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.beginPath();
        ctx.roundRect(curItem.x + curItem.width / 2 - badgeWidth / 2, iy - 26, badgeWidth, 18, 6);
        ctx.fill();
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9.5px Sarabun';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(curItem.item.thaiName, curItem.x + curItem.width / 2, iy - 17);
      }

      // Render Character Sprite
      const px = player.x;
      const py = player.y;

      ctx.save();
      if (player.facing === 'left') {
        ctx.translate(px + player.width, py);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(px, py);
      }

      // Shadow on ground
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(player.width / 2, player.height + 2, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shoes
      ctx.fillStyle = '#78350f';
      const walkAnim = Math.sin(Date.now() / (isSprinting ? 50 : 80)) * (Math.abs(player.vx) > 0.5 ? 4 : 0);
      ctx.fillRect(4, player.height - 8 + walkAnim, 10, 8);
      ctx.fillRect(player.width - 14, player.height - 8 - walkAnim, 10, 8);

      // Blue Overalls
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(6, player.height - 22, player.width - 12, 16);

      // Yellow buttons
      ctx.fillStyle = '#facc15';
      ctx.fillRect(9, player.height - 20, 3, 3);
      ctx.fillRect(player.width - 12, player.height - 20, 3, 3);

      // Red Shirt Body
      ctx.fillStyle = isSprinting ? '#ea580c' : '#dc2626';
      ctx.fillRect(4, player.height - 30, player.width - 8, 12);

      // Face
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(8, 6, player.width - 16, 16);

      // Eye
      ctx.fillStyle = '#000000';
      ctx.fillRect(player.width - 14, 11, 3, 5);

      // Mustache
      ctx.fillStyle = '#451a03';
      ctx.fillRect(player.width - 16, 17, 8, 3);

      // Red Cap
      ctx.fillStyle = isSprinting ? '#ea580c' : '#dc2626';
      ctx.fillRect(6, 0, player.width - 12, 8);
      ctx.fillRect(10, 5, player.width - 8, 4);

      // Hands
      if (player.carryingItem) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(2, -8, 6, 8);
        ctx.fillRect(player.width - 8, -8, 6, 8);
      }

      ctx.restore();

      // Render Carried Medicine Above Head (Realistic Shape)
      if (player.carryingItem) {
        const itemObj = player.carryingItem.item;
        const carryX = player.x + player.width / 2 - 16;
        const carryY = player.y - 28;

        // Subtle border frame
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.roundRect(carryX - 2, carryY - 2, 36, 26, 4);
        ctx.fill();

        // Authentic Realistic Item
        drawRealisticMedicine(ctx, carryX, carryY, 32, 22, itemObj);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [placedShelves, mapId]);

  return (
    <div className="space-y-4">
      {/* Top Mario HUD Bar with Player Name, Map, Score, Items */}
      <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-lg flex flex-wrap items-center justify-between gap-3 border-2 border-amber-400">
        {/* Left: Home Button + Player Badge + Map */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onGoHome();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            title="กลับหน้าหลัก"
          >
            <Home className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg font-black flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{currentPlayerName}</span>
            </span>

            <span className="hidden md:inline-block bg-purple-600 text-white px-2 py-1 rounded-lg font-bold">
              {currentMap.name}
            </span>

            {/* In-Game Domain Switcher Ribbon */}
            <div className="flex items-center space-x-1 bg-slate-800/90 p-0.5 rounded-xl border border-slate-700">
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setActiveDomain('medicine');
                }}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  activeDomain === 'medicine'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="สลับเป็นโหมดยาสามัญประจำบ้าน"
              >
                💊 ยาสามัญ
              </button>
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setActiveDomain('health_products');
                }}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  activeDomain === 'health_products'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="สลับเป็นโหมดผลิตภัณฑ์สุขภาพ 6 ด้าน (อาหาร/เครื่องสำอาง/เครื่องมือแพทย์/วอส.)"
              >
                🥗 สุขภาพ 6 ด้าน
              </button>
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setActiveDomain('all');
                }}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  activeDomain === 'all'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="สลับเป็นโหมดรวมทุกประเภท"
              >
                🌟 รวมทุกหมวด
              </button>
            </div>
          </div>
        </div>

        {/* Center: Score, Items Left, Timer */}
        <div className="flex items-center space-x-4 text-xs font-bold">
          <div className="flex items-center space-x-1 text-amber-300">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="font-heading text-sm sm:text-base">{score} แต้ม</span>
          </div>

          <div className="text-slate-300">
            <span>{activeDomain === 'health_products' ? 'ผลิตภัณฑ์ที่: ' : activeDomain === 'all' ? 'รายการที่: ' : 'ยาชิ้นที่: '}</span>
            <span className="text-emerald-400 font-extrabold text-sm">
              {Math.min(currentMedicineIndex + 1, totalItemsCount)} / {totalItemsCount}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-sky-300">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>{timeSeconds} วิ</span>
          </div>

          {combo > 1 && (
            <span className="hidden sm:inline-block bg-orange-500 text-white px-2 py-0.5 rounded-full text-[11px] animate-pulse">
              🔥 x{combo}
            </span>
          )}
        </div>

        {/* Right: FDA Guide, Cloud Sync Status & Leaderboard Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setIsFdaGuideOpen(true);
            }}
            className="flex items-center space-x-1 px-2.5 py-1 bg-indigo-700/80 hover:bg-indigo-600 text-white rounded-xl text-[11px] font-bold shadow-xs border border-indigo-400"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            <span>วิธีการดูแลของ อย.</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-sky-950/80 border border-sky-400/60 rounded-xl text-[11px] font-bold text-sky-200 shadow-xs">
            <Cloud className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>ซิงก์กับ Data Cloud</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenCloudRank();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">อันดับ Data Cloud</span>
          </button>
        </div>
      </div>

      {/* Sorting Feedback Alert */}
      {sortFeedback && (
        <div
          className={`p-3 sm:p-4 rounded-2xl border-2 flex items-start space-x-3 text-xs animate-in fade-in duration-200 ${
            sortFeedback.type === 'correct'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-rose-50 border-rose-400 text-rose-950'
          }`}
        >
          {sortFeedback.type === 'correct' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-bold text-sm">{sortFeedback.title}</div>
            <div className="mt-0.5 leading-relaxed">{sortFeedback.detail}</div>
          </div>
        </div>
      )}

      {/* Main Mario Game Stage Canvas Container */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-[#5c94fc]">
        <canvas
          ref={canvasRef}
          width={960}
          height={520}
          className="w-full h-auto block aspect-[960/520] select-none"
        />

        {/* Overlaid Large Drug Label */}
        {activeCarryingItem && showLargeLabel && (
          <div className="absolute top-4 right-4 z-20 max-w-sm sm:max-w-md w-full animate-in slide-in-from-right-4 duration-150">
            <LargeDrugLabel
              item={activeCarryingItem}
              mode={mode}
              onClose={() => setShowLargeLabel(false)}
            />
          </div>
        )}

        {/* Quick Label Re-open button */}
        {activeCarryingItem && !showLargeLabel && (
          <button
            onClick={() => setShowLargeLabel(true)}
            className="absolute top-4 right-4 z-20 px-3 py-2 bg-white/95 text-blue-900 border-2 border-blue-400 rounded-xl font-bold text-xs shadow-lg flex items-center space-x-1.5"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>{activeDomain === 'health_products' ? 'ดูฉลากและวิธีตรวจสอบ อย.' : 'ดูฉลากยาและกลุ่มอาการ'}</span>
          </button>
        )}

        {/* Game Over Victory Modal */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-30 animate-in zoom-in-95">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 border-4 border-amber-400 shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center text-4xl shadow-md ring-4 ring-amber-200">
                🏆
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                  {activeDomain === 'health_products'
                    ? 'อย.น้อยเรียนรู้ผลิตภัณฑ์สุขภาพ 6 ด้าน สำเร็จยอดเยี่ยม!'
                    : activeDomain === 'all'
                    ? 'อย.น้อยจัดหมวดหมู่ผลิตภัณฑ์สุขภาพและยา ครบถ้วนถูกต้อง!'
                    : 'อย.น้อยใช้ยาอย่างปลอดภัย สำเร็จยอดเยี่ยม!'}
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                  ผ่านด่าน {currentMap.name} (Level {level})
                </h3>
                <p className="text-xs text-slate-600">
                  ผู้เล่น: <span className="font-bold text-slate-900">{currentPlayerName}</span> · {activeDomain === 'health_products' ? 'จัดหมวดหมู่ผลิตภัณฑ์สุขภาพครบ' : 'จัดยาและผลิตภัณฑ์ครบ'} {totalItemsCount} รายการ ในเวลา {timeSeconds} วินาที
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="text-xs text-amber-800 font-bold">คะแนนรวมทั้งหมด</span>
                <div className="font-heading font-black text-3xl text-amber-600">
                  {score} แต้ม
                </div>
              </div>

              {/* Player Name & Cloud Rank Status */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-700 block">
                  ชื่อผู้เล่นที่บันทึกลง Data Cloud:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentPlayerName}
                    onChange={(e) => setCurrentPlayerName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="พิมพ์ชื่อผู้เล่น..."
                  />
                  <button
                    onClick={() => handleSaveToCloudRank(score, totalItemsCount)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    อัปเดตชื่อ
                  </button>
                </div>
                {savedRankInfo && (
                  <div className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <span>☁️ ซิงค์กับ Data Cloud แล้ว!</span>
                    <span className="text-amber-800 font-extrabold">อันดับที่ #{savedRankInfo.rank}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onOpenCloudRank(savedRankInfo?.id)}
                  className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <Trophy className="w-4 h-4" />
                  <span>ดูอันดับ Cloud</span>
                </button>
                <button
                  onClick={() => initGame(activeDomain)}
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>เล่นใหม่อีกรอบ</span>
                </button>
              </div>

              <button
                onClick={onGoHome}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-screen Controls (Direction, Sprint, Jump, Pick/Place) */}
      <div className="bg-slate-800 text-white p-3 rounded-2xl flex flex-wrap items-center justify-between max-w-2xl mx-auto shadow-md border border-slate-700 gap-2">
        {/* Left Direction buttons */}
        <div className="flex items-center space-x-2">
          <button
            onPointerDown={() => (keysRef.current.left = true)}
            onPointerUp={() => (keysRef.current.left = false)}
            onPointerLeave={() => (keysRef.current.left = false)}
            className="w-13 h-12 bg-slate-700 active:bg-blue-600 rounded-xl flex items-center justify-center text-lg font-black border-2 border-slate-600 select-none touch-none shadow-xs"
          >
            ◀
          </button>
          <button
            onPointerDown={() => (keysRef.current.right = true)}
            onPointerUp={() => (keysRef.current.right = false)}
            onPointerLeave={() => (keysRef.current.right = false)}
            className="w-13 h-12 bg-slate-700 active:bg-blue-600 rounded-xl flex items-center justify-center text-lg font-black border-2 border-slate-600 select-none touch-none shadow-xs"
          >
            ▶
          </button>
        </div>

        {/* Sprint / Dash Button for diverse agile movement! */}
        <button
          onPointerDown={() => (keysRef.current.sprint = true)}
          onPointerUp={() => (keysRef.current.sprint = false)}
          onPointerLeave={() => (keysRef.current.sprint = false)}
          className="px-3 h-12 bg-cyan-600 active:bg-cyan-700 text-white rounded-xl flex items-center space-x-1 text-xs font-bold border-2 border-cyan-400 select-none touch-none shadow-xs"
          title="กดค้างเพื่อวิ่งเร็ว"
        >
          <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
          <span>วิ่งสปีด</span>
        </button>

        {/* Action buttons (Jump, Pick/Drop) */}
        <div className="flex items-center space-x-2">
          <button
            onPointerDown={() => {
              keysRef.current.jump = true;
              setTimeout(() => (keysRef.current.jump = false), 150);
            }}
            className="w-13 h-12 bg-amber-600 active:bg-amber-700 rounded-xl flex flex-col items-center justify-center text-xs font-bold border-2 border-amber-500 select-none touch-none shadow-xs"
          >
            <ArrowUp className="w-4 h-4" />
            <span>กระโดด</span>
          </button>

          <button
            onClick={handleAction}
            className={`px-3.5 h-12 rounded-xl flex items-center justify-center space-x-1 text-xs font-bold border-2 select-none touch-none shadow-xs transition-colors ${
              activeCarryingItem
                ? 'bg-rose-600 active:bg-rose-700 border-rose-500 text-white'
                : 'bg-emerald-600 active:bg-emerald-700 border-emerald-500 text-white'
            }`}
          >
            <span>
              {activeCarryingItem
                ? '🟢 วางบนชั้น / ทิ้งถัง'
                : activeDomain === 'health_products'
                ? '🖐️ หยิบผลิตภัณฑ์'
                : activeDomain === 'all'
                ? '🖐️ หยิบชิ้นนี้'
                : '🖐️ หยิบยา'}
            </span>
          </button>
        </div>
      </div>

      {/* FDA Care Guide Modal */}
      <FdaCareGuideModal
        isOpen={isFdaGuideOpen}
        onClose={() => setIsFdaGuideOpen(false)}
      />
    </div>
  );
};
