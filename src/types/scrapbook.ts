// ============================================
// Scrapbook — TypeScript Interfaces
// ============================================

/** Row shape returned from Supabase `scrapbooks` table */
export interface Scrapbook {
  id: string;
  title: string;
  recipient_name: string;
  birthday_date: string;
  message: string | null;
  photos: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
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
