import { CloudRankEntry, GameMode, GameLevel, GameMapId } from '../types/game';
import { ProductDomain } from '../types/medicine';

const CLOUD_STORAGE_KEY = 'mario_fda_cloud_rankings_v1';

// Seed default benchmark cloud leaderboard entries so the board is active and competitive immediately
const SEED_BENCHMARKS: CloudRankEntry[] = [
  {
    id: 'rank_seed_1',
    playerName: 'น้องปัญญ์ อย.น้อย',
    score: 1850,
    mode: 'time_attack',
    level: 3,
    mapId: 'cabinet_tower',
    totalItems: 15,
    correctItems: 15,
    timeSpentSeconds: 68,
    timestamp: Date.now() - 3600000 * 2,
    dateFormatted: 'วันนี้ 12:45',
  },
  {
    id: 'rank_seed_2',
    playerName: 'ด.ช. ภูผา โรงเรียนวัดดอน',
    score: 1420,
    mode: 'time_attack',
    level: 2,
    mapId: 'health_park',
    totalItems: 10,
    correctItems: 10,
    timeSpentSeconds: 42,
    timestamp: Date.now() - 3600000 * 5,
    dateFormatted: 'วันนี้ 09:30',
  },
  {
    id: 'rank_seed_3',
    playerName: 'ด.ญ. มะลิ พิทักษ์ตู้ยา',
    score: 1100,
    mode: 'learning',
    level: 2,
    mapId: 'school_clinic',
    totalItems: 10,
    correctItems: 10,
    timeSpentSeconds: 58,
    timestamp: Date.now() - 3600000 * 12,
    dateFormatted: 'เมื่อวานนี้',
  },
  {
    id: 'rank_seed_4',
    playerName: 'กัปตันต้นกล้า ป.4/1',
    score: 750,
    mode: 'learning',
    level: 1,
    mapId: 'school_clinic',
    totalItems: 5,
    correctItems: 5,
    timeSpentSeconds: 24,
    timestamp: Date.now() - 3600000 * 24,
    dateFormatted: 'เมื่อวานนี้',
  },
  {
    id: 'rank_seed_5',
    playerName: 'น้องบีม หมอน้อยมือไว',
    score: 690,
    mode: 'time_attack',
    level: 1,
    mapId: 'school_clinic',
    totalItems: 5,
    correctItems: 5,
    timeSpentSeconds: 19,
    timestamp: Date.now() - 3600000 * 36,
    dateFormatted: '2 วันก่อน',
  },
];

export class CloudRankService {
  // Retrieve all rankings from cloud storage
  public static async getRankings(): Promise<CloudRankEntry[]> {
    try {
      const dataStr = localStorage.getItem(CLOUD_STORAGE_KEY);
      if (!dataStr) {
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(SEED_BENCHMARKS));
        return SEED_BENCHMARKS;
      }
      const parsed: CloudRankEntry[] = JSON.parse(dataStr);
      return parsed.sort((a, b) => b.score - a.score);
    } catch {
      return SEED_BENCHMARKS;
    }
  }

  // Save new score to cloud data
  public static async saveRank(entry: {
    playerName: string;
    score: number;
    mode: GameMode;
    level: GameLevel;
    domain?: ProductDomain;
    mapId?: GameMapId;
    totalItems: number;
    correctItems: number;
    timeSpentSeconds: number;
  }): Promise<{ rank: number; entry: CloudRankEntry }> {
    const existing = await this.getRankings();

    const now = new Date();
    const dateFormatted = `${now.getDate()}/${now.getMonth() + 1} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry: CloudRankEntry = {
      id: `rank_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      playerName: entry.playerName.trim() || 'นักเรียน อย.น้อย',
      score: entry.score,
      mode: entry.mode,
      level: entry.level,
      domain: entry.domain || 'medicine',
      mapId: entry.mapId,
      totalItems: entry.totalItems,
      correctItems: entry.correctItems,
      timeSpentSeconds: entry.timeSpentSeconds,
      timestamp: Date.now(),
      dateFormatted,
    };

    const updated = [...existing, newEntry].sort((a, b) => b.score - a.score);
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(updated));

    const rank = updated.findIndex((item) => item.id === newEntry.id) + 1;
    return { rank, entry: newEntry };
  }

  // Reset or clear rankings if needed
  public static clearLocalCache(): void {
    localStorage.removeItem(CLOUD_STORAGE_KEY);
  }
}
