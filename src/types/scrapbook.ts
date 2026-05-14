// ============================================
// Scrapbook — TypeScript Interfaces
// ============================================

/** Row shape returned from Supabase `scrapbooks` table */
export interface Scrapbook {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export type GiftBoxType = 'box2d' | 'box3d' | 'letter' | 'egg';

export interface GiftData {
  id: string;
  senderName: string;
  receiverName: string;
  message: string;
  photos: string[]; // base64 data URLs
  birthdayDate: string; // YYYY-MM-DD
  lockUntilBirthday: boolean;
  giftBoxType: GiftBoxType;
  createdAt: string;
}

/** Payload for creating a new gift */
export interface CreateGiftDataDto {
  senderName: string;
  receiverName: string;
  message: string;
  photos: string[];
  birthdayDate: string;
  lockUntilBirthday: boolean;
  giftBoxType: GiftBoxType;
}

/** Row shape returned from Supabase `gifts` table */
export interface GiftDataRow {
  id: string;
  sender_name: string;
  receiver_name: string;
  message: string;
  photos: string[];
  birthday_date: string;
  lock_until_birthday: boolean;
  gift_box_type: GiftBoxType;
  created_at: string;
}

/** Payload for creating a new scrapbook */
export interface CreateScrapbookDto {
  title: string;
  recipient_name: string;
  birthday_date: string;
  message?: string;
  photos?: string[];
  created_by?: string;
}

/** Payload for updating an existing scrapbook */
export interface UpdateScrapbookDto {
  title?: string;
  recipient_name?: string;
  birthday_date?: string;
  message?: string;
  photos?: string[];
  created_by?: string;
}

/** Standard API response envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
