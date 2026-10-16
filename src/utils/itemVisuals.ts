import { MedicineItem } from '../types/medicine';

/**
 * Returns a realistic emoji or visual icon for any health or medicine product.
 * Ensures non-medicine items (soap, seafood, contact lens, toilet cleaner, food, cosmetics, etc.)
 * NEVER show a medicine pill (💊) icon.
 */
export const getItemVisualIcon = (item: MedicineItem): string => {
  // 1. สบู่เหลวอาบน้ำ / สบู่ -> ขวดหัวปั๊มฟองสบู่
  if (item.id === 'cosmetic_mild_bodywash' || item.bottleShape === 'pump_bottle') {
    return '🧴';
  }

  // 2. อาหารทะเลสดแช่ฟอร์มาลีน -> อาหารทะเล (กุ้ง/หมึก)
  if (item.id === 'food_danger_formalin_seafood' || item.bottleShape === 'fresh_tray') {
    return '🦐';
  }

  // 3. คอนแทคเลนส์เถื่อนตลาดนัด -> ขวดเลนส์ / ดวงตา
  if (item.id === 'device_danger_fake_contactlens' || item.bottleShape === 'vial') {
    return '👁️';
  }

  // 4. น้ำยาล้างห้องน้ำกรดเกลือเข้มข้น -> ขวดคอห่าน/คอเป็ดสารเคมี
  if (
    item.id === 'hazard_danger_toilet_acid' ||
    item.id === 'danger_chemical_cleaner' ||
    item.bottleShape === 'chemical_bottle'
  ) {
    return '🧴';
  }

  // 5. น้ำยาล้างจาน -> มะนาว / ขวดน้ำยา
  if (item.id === 'hazard_dishwashing_liquid') {
    return '🍋';
  }

  // 6. หมวดอาหารและโภชนาการ
  if (item.id === 'food_milk_uht' || item.bottleShape === 'food_box') return '🥛';
  if (item.id === 'food_instant_noodle') return '🍜';
  if (item.id === 'food_canned_fish' || item.bottleShape === 'food_can') return '🐟';
  if (item.id === 'food_danger_borax_meatball') return '🍡';
  if (item.id === 'danger_candy_lookalike') return '🍬';

  // 7. หมวดเครื่องสำอาง
  if (item.id === 'cosmetic_sunscreen_tube' || item.bottleShape === 'cosmetic_tube') return '☀️';
  if (
    item.id === 'cosmetic_danger_mercury_whitening' ||
    item.id === 'danger_mercury_cream' ||
    item.bottleShape === 'cream'
  ) {
    return '🫙';
  }

  // 8. หมวดเครื่องมือแพทย์และเวชภัณฑ์
  if (item.id === 'device_surgical_mask') return '😷';
  if (item.id === 'device_atk_test_kit') return '🧪';
  if (item.id === 'fa_thermometer') return '🌡️';
  if (
    item.id === 'fa_plaster_strip' ||
    item.id === 'fa_elastic_bandage' ||
    item.id === 'fa_gauze_pad' ||
    item.id === 'fa_cotton_wool' ||
    item.category === 'firstaid'
  ) {
    return '🩹';
  }

  // 9. หมวดวัตถุอันตรายในบ้านเรือน
  if (item.id === 'hazard_mosquito_spray' || item.bottleShape === 'spray_can') return '🦟';

  // 10. ยาเสพติดและยาชุดอันตราย
  if (
    item.id === 'narcotic_danger_diet_pill_meth' ||
    item.id === 'danger_diet_pill' ||
    item.id === 'danger_fake_drug_pack'
  ) {
    return '☠️';
  }

  // 11. ยาใช้ภายนอก / ยาน้ำ / ยาหยอดตา
  if (item.id === 'danger_expired_eyedrop') return '👁️';
  if (item.id === 'danger_expired_syrup' || item.id === 'med_cardamom_syrup') return '🧴';
  if (
    item.id === 'med_alcohol_70' ||
    item.id === 'med_povidone_iodine' ||
    item.id === 'med_calamine_lotion' ||
    item.id === 'med_saline_solution'
  ) {
    return '🧴';
  }
  if (item.id === 'med_balm_jar') return '🌿';
  if (item.id === 'med_burn_ointment' || item.bottleShape === 'ointment') return '🌱';
  if (item.id === 'med_ors_sachet' || item.bottleShape === 'sachet') return '💧';

  // Fallbacks by FDA Health Category
  if (item.healthCategory === 'food') return '🥗';
  if (item.healthCategory === 'cosmetic') return '🧴';
  if (item.healthCategory === 'med_device') return '🩺';
  if (item.healthCategory === 'household_hazard') return '🧴';
  if (item.healthCategory === 'controlled_narcotic') return '⚠️';

  // Other Fallbacks
  if (item.labelType === 'red_external') return '🧴';
  if (item.category === 'hazard') return '⚠️';

  // ONLY actual oral tablets/capsules in blisters or medicine boxes:
  return '💊';
};

/**
 * Returns an accurate Thai label title according to FDA taxonomy and product characteristics
 */
export const getItemCategoryTitle = (item: MedicineItem): string => {
  if (item.healthCategory === 'food') return 'หมวดอาหาร (เลข อย. 13 หลัก)';
  if (item.healthCategory === 'cosmetic') return 'หมวดเครื่องสำอาง (เลขที่ใบรับแจ้ง 10 หลัก)';
  if (item.healthCategory === 'med_device') return 'หมวดเครื่องมือแพทย์ (ใบอนุญาต/จดแจ้ง อย.)';
  if (item.healthCategory === 'household_hazard') return 'หมวดวัตถุอันตรายในบ้านเรือน (เลข วอส. / ระบบ GHS)';
  if (item.healthCategory === 'controlled_narcotic') return 'หมวดวัตถุออกฤทธิ์และยาเสพติด (ต้องห้าม / ผิดกฎหมาย)';

  if (item.labelType === 'red_external') return 'ยาใช้ภายนอก (ฉลากสีแดง ห้ามรับประทาน)';
  if (item.category === 'firstaid') return 'เวชภัณฑ์และอุปกรณ์ปฐมพยาบาล';
  if (item.category === 'hazard') return 'สิ่งอันตราย / ยาหมดอายุ (ถังขยะอันตราย)';
  return 'ยาสามัญประจำบ้าน (ยาใช้ภายในสำหรับรับประทาน)';
};
