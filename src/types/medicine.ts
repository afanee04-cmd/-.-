export type MedicineCategory = 'internal' | 'external' | 'firstaid' | 'hazard';

export type HealthProductCategory =
  | 'food'              // อาหาร
  | 'drug'              // ยา
  | 'cosmetic'          // เครื่องสำอาง
  | 'med_device'        // เครื่องมือแพทย์
  | 'household_hazard'  // วัตถุอันตรายในบ้านเรือน
  | 'controlled_narcotic'; // วัตถุออกฤทธิ์และยาเสพติด

export type BottleShape =
  | 'box'
  | 'syrup'
  | 'bottle'
  | 'blister'
  | 'cream'
  | 'ointment'
  | 'sachet'
  | 'tool'
  | 'danger_bottle'
  | 'food_box'
  | 'food_can'
  | 'cosmetic_tube'
  | 'cosmetic_lipstick'
  | 'device_pack'
  | 'spray_can'
  | 'pump_bottle'
  | 'fresh_tray'
  | 'vial'
  | 'chemical_bottle';

export type ProductDomain = 'medicine' | 'health_products' | 'all';

export interface MedicineItem {
  id: string;
  name: string;
  thaiName: string;
  genericName: string;
  category: MedicineCategory;
  healthCategory?: HealthProductCategory; // หมวดหมู่ผลิตภัณฑ์สุขภาพ 6 ด้าน
  domain?: ProductDomain;
  bottleShape: BottleShape;
  colorScheme: {
    primary: string;
    border: string;
    accent: string;
    badgeBg: string;
  };
  labelType: 'normal' | 'red_external' | 'danger' | 'expired';
  symptomGroup: string; // กลุ่มอาการ หรือ กลุ่มคุณประโยชน์
  indication: string; // สรรพคุณ / ประโยชน์
  usage: string; // วิธีใช้ / วิธีบริโภค
  warning: string; // คำเตือน อย.น้อย
  expiryDate: string; // วันหมดอายุ (EXP) / วันควรบริโภคก่อน (BBE)
  isExpired: boolean;
  regNumber?: string; // เลข อย. เช่น 10-1-04741-1-0001, 1A 42/57, วอส. 99/2550, 10-1-6200012
  fdaNumberType?: 'food_13' | 'drug_reg' | 'cosmetic_10' | 'hazardous_wos' | 'device_reg' | 'illegal_none';
  pdfReferencePage?: string; // หน้าอ้างอิงในคู่มือ อย.น้อย
  productClassification?: string; // การจัดกลุ่มผลิตภัณฑ์สุขภาพตามกฎหมาย อย.
  explanation: string; // คำอธิบายสำหรับผู้เรียน
  cabinetTip: string; // เคล็ดลับและการดูแลของ อย.
  storageMethod?: string; // วิธีการดูแลและจัดเก็บอย่างถูกวิธี
  isSafeProduct?: boolean; // ปลอดภัยผ่านเกณฑ์ อย. หรือเป็นของผิดกฎหมาย/อันตราย
}

export interface PlayerScore {
  score: number;
  combo: number;
  maxCombo: number;
  correctCount: number;
  wrongCount: number;
  timeSpentSeconds: number;
}
