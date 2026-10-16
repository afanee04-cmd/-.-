import { GameMapConfig, GameMapId } from '../types/game';

export const GAME_MAPS: Record<GameMapId, GameMapConfig> = {
  school_clinic: {
    id: 'school_clinic',
    name: 'แผนที่ 1: ห้องพยาบาลโรงเรียน',
    tagline: 'เส้นทางพื้นฐาน วิ่งกระโดดง่าย เข้าถึงตู้ยาได้สะดวก',
    badge: '🏥 ด่านมาตรฐาน',
    skyColor: '#5c94fc', // Classic Mario Sky Blue
    groundColor: '#d86800',
    description: 'จำลองห้องพยาบาลโรงเรียน มีขั้นบันไดอิฐและโต๊ะตรวจยา เหมาะสำหรับฝึกฝนการเดินและการจัดตู้ยา',
    platforms: [
      // Ground floor
      { x: 0, y: 460, width: 960, height: 60, type: 'ground' },

      // Left Shelf 1: Internal Medicine (ยาใช้ภายใน) - Elevated Blue
      { x: 50, y: 230, width: 180, height: 24, type: 'shelf', targetCategory: 'internal', shelfLabel: 'ชั้น 1: ยาใช้ภายใน' },

      // Center-Left Shelf 2: External Medicine (ยาใช้ภายนอก) - Elevated Red
      { x: 280, y: 160, width: 180, height: 24, type: 'shelf', targetCategory: 'external', shelfLabel: 'ชั้น 2: ยาใช้ภายนอก' },

      // Center-Right Shelf 3: First Aid (เวชภัณฑ์) - Elevated Green
      { x: 510, y: 230, width: 180, height: 24, type: 'shelf', targetCategory: 'firstaid', shelfLabel: 'ชั้น 3: เวชภัณฑ์' },

      // Right Shelf 4: Hazard Bin / Pipe (ถังขยะอันตราย) - Pipe Zone
      { x: 750, y: 340, width: 160, height: 120, type: 'pipe', targetCategory: 'hazard', shelfLabel: 'ถังขยะอันตราย' },

      // Jumping Stepping Blocks
      { x: 180, y: 350, width: 70, height: 20, type: 'brick' },
      { x: 380, y: 300, width: 80, height: 20, type: 'question' },
      { x: 590, y: 350, width: 70, height: 20, type: 'brick' },
    ],
  },

  cabinet_tower: {
    id: 'cabinet_tower',
    name: 'แผนที่ 2: หอคอยตู้ยาผจญภัย',
    tagline: 'ด่านแนวตั้งสูง มีสปริงเด้งดึ๋ง กระโดดลอยตัวขึ้นสู่ยอดหอคอย',
    badge: '🗼 กระโดดสูง & สปริง',
    skyColor: '#38bdf8', // Vibrant Sky Blue
    groundColor: '#c2410c',
    description: 'หอคอยหลายชั้น ต้องใช้ทักษะการกระโดดไต่ระดับ มีแท่นสปริงเด้งดึ๋ง (Spring Pad) ส่งตัวขึ้นชั้นบนสุดอย่างรวดเร็ว',
    platforms: [
      // Ground floor
      { x: 0, y: 460, width: 960, height: 60, type: 'ground' },

      // Spring pads on the ground that bounce player high up!
      { x: 220, y: 440, width: 50, height: 20, type: 'spring', bounceMultiplier: 1.5, shelfLabel: 'สปริงเด้งดึ๋ง' },
      { x: 680, y: 440, width: 50, height: 20, type: 'spring', bounceMultiplier: 1.5, shelfLabel: 'สปริงเด้งดึ๋ง' },

      // Low Tier Shelf 3: First Aid (เวชภัณฑ์) - Near ground left
      { x: 60, y: 340, width: 170, height: 24, type: 'shelf', targetCategory: 'firstaid', shelfLabel: 'ชั้น 3: เวชภัณฑ์' },

      // Mid Tier Shelf 1: Internal Medicine (ยาใช้ภายใน) - Middle
      { x: 360, y: 260, width: 180, height: 24, type: 'shelf', targetCategory: 'internal', shelfLabel: 'ชั้น 1: ยาใช้ภายใน' },

      // High Top Tier Shelf 2: External Medicine (ยาใช้ภายนอก) - High Up
      { x: 210, y: 130, width: 180, height: 24, type: 'shelf', targetCategory: 'external', shelfLabel: 'ชั้น 2: ยาใช้ภายนอก' },

      // High Hazard Bin / Pipe on floating block
      { x: 740, y: 210, width: 160, height: 80, type: 'pipe', targetCategory: 'hazard', shelfLabel: 'ถังขยะอันตราย' },

      // Stepping brick stairs to climb
      { x: 580, y: 360, width: 70, height: 20, type: 'brick' },
      { x: 670, y: 290, width: 70, height: 20, type: 'question' },
      { x: 440, y: 180, width: 70, height: 20, type: 'brick' },
      { x: 120, y: 210, width: 60, height: 20, type: 'brick' },
    ],
  },

  health_park: {
    id: 'health_park',
    name: 'แผนที่ 3: สวนสุขภาพโรงเรียนลอยฟ้า',
    tagline: 'เกาะลอยฟ้าเชื่อมสะพานอิฐ ทางเดินกว้าง วิ่งพริ้วได้หลายเส้นทาง',
    badge: '🌿 สวนลอยฟ้ามาริโอ้',
    skyColor: '#60a5fa', // Deep Mario World Blue
    groundColor: '#15803d',
    description: 'เกาะลอยฟ้ามีท่อและสะพานเชื่อมต่อ เดินอ้อมได้หลายทิศทาง มีบล็อกเครื่องหมายคำถาม [ ? ] กระจายทั่วแผนที่',
    platforms: [
      // Ground floor with gap in middle
      { x: 0, y: 460, width: 420, height: 60, type: 'ground' },
      { x: 540, y: 460, width: 420, height: 60, type: 'ground' },

      // Mid floating bridge connecting gaps
      { x: 400, y: 390, width: 160, height: 20, type: 'brick' },

      // Floating Sky Island Left: Shelf 1 (ยาใช้ภายใน)
      { x: 70, y: 180, width: 180, height: 24, type: 'shelf', targetCategory: 'internal', shelfLabel: 'ชั้น 1: ยาใช้ภายใน' },

      // Floating Sky Island Center: Shelf 2 (ยาใช้ภายนอก)
      { x: 390, y: 150, width: 180, height: 24, type: 'shelf', targetCategory: 'external', shelfLabel: 'ชั้น 2: ยาใช้ภายนอก' },

      // Floating Sky Island Right: Shelf 3 (เวชภัณฑ์)
      { x: 700, y: 180, width: 180, height: 24, type: 'shelf', targetCategory: 'firstaid', shelfLabel: 'ชั้น 3: เวชภัณฑ์' },

      // Pipe on Ground Left: Hazard Bin
      { x: 260, y: 340, width: 140, height: 120, type: 'pipe', targetCategory: 'hazard', shelfLabel: 'ถังขยะอันตราย' },

      // Stepping clouds / Question blocks
      { x: 140, y: 310, width: 60, height: 20, type: 'question' },
      { x: 450, y: 270, width: 60, height: 20, type: 'question' },
      { x: 760, y: 310, width: 60, height: 20, type: 'question' },
      { x: 610, y: 380, width: 70, height: 20, type: 'brick' },
    ],
  },
};
