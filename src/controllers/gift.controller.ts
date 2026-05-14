import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse, GiftData, GiftDataRow, CreateGiftDataDto } from '../types/scrapbook';

const TABLE = 'gifts';

/** Map a Supabase row (snake_case) → GiftData (camelCase) */
const toGiftData = (row: GiftDataRow): GiftData => ({
  id: row.id,
  senderName: row.sender_name,
  receiverName: row.receiver_name,
  message: row.message,
  photos: row.photos,
  birthdayDate: row.birthday_date,
  lockUntilBirthday: row.lock_until_birthday,
  giftBoxType: row.gift_box_type,
  createdAt: row.created_at,
});

// ============================================
// POST /api/gifts
// ============================================
export const createGift = async (req: Request, res: Response): Promise<void> => {
  const body: CreateGiftDataDto = req.body;

  // Basic validation
  if (
    !body.senderName ||
    !body.receiverName ||
    !body.message ||
    !body.birthdayDate ||
    !body.giftBoxType
  ) {
    const response: ApiResponse = {
      success: false,
      error:
        'Missing required fields: senderName, receiverName, message, birthdayDate, giftBoxType',
    };
    res.status(400).json(response);
    return;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      sender_name: body.senderName,
      receiver_name: body.receiverName,
      message: body.message,
      photos: body.photos ?? [],
      birthday_date: body.birthdayDate,
      lock_until_birthday: body.lockUntilBirthday ?? false,
      gift_box_type: body.giftBoxType,
    })
    .select()
    .single();

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<GiftData> = {
    success: true,
    data: toGiftData(data as GiftDataRow),
    message: 'Gift created successfully',
  };
  res.status(201).json(response);
};

// ============================================
// GET /api/gifts/:id
// ============================================
export const getGiftById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: status === 404 ? 'Gift not found' : error.message,
    };
    res.status(status).json(response);
    return;
  }

  const response: ApiResponse<GiftData> = {
    success: true,
    data: toGiftData(data as GiftDataRow),
  };
  res.status(200).json(response);
};

// ============================================
// GET /api/gifts
// ============================================
export const getAllGifts = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<GiftData[]> = {
    success: true,
    data: (data as GiftDataRow[]).map(toGiftData),
  };
  res.status(200).json(response);
};
