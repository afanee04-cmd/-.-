import { MedicineItem, MedicineCategory, ProductDomain, HealthProductCategory } from './medicine';

export type GameMode = 'learning' | 'time_attack';
export type GameLevel = 1 | 2 | 3;
export type GameMapId = 'school_clinic' | 'cabinet_tower' | 'health_park';

export interface GameMapConfig {
  id: GameMapId;
  name: string;
  tagline: string;
  badge: string;
  skyColor: string;
  groundColor: string;
  platforms: PlatformBlock[];
  description: string;
}

export interface CloudRankEntry {
  id: string;
  playerName: string;
  score: number;
  mode: GameMode;
  level: GameLevel;
  domain?: ProductDomain;
  mapId?: GameMapId;
  totalItems: number;
  correctItems: number;
  timeSpentSeconds: number;
  timestamp: number;
  dateFormatted: string;
}

export interface PlatformBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'brick' | 'question' | 'pipe' | 'shelf' | 'spring';
  targetCategory?: MedicineCategory;
  targetHealthCategory?: HealthProductCategory;
  shelfLabel?: string;
  bounceMultiplier?: number;
}

export interface SpawnedMedicine {
  id: string;
  item: MedicineItem;
  x: number;
  y: number;
  width: number;
  height: number;
  isPickedUp: boolean;
  isSorted: boolean;
  sortedCorrectly?: boolean;
}

export interface PlayerCharacter {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  isJumping: boolean;
  facing: 'left' | 'right';
  carryingItem: SpawnedMedicine | null;
}
