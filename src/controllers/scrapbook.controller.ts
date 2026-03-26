import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse, Scrapbook, CreateScrapbookDto, UpdateScrapbookDto } from '../types/scrapbook';

const TABLE = 'scrapbooks';

// ============================================
// GET /api/scrapbooks
// ============================================
export const getAllScrapbooks = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<Scrapbook[]> = { success: true, data };
  res.status(200).json(response);
};

// ============================================
// GET /api/scrapbooks/:id
// ============================================
export const getScrapbookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: status === 404 ? 'Scrapbook not found' : error.message,
    };
    res.status(status).json(response);
    return;
  }

  const response: ApiResponse<Scrapbook> = { success: true, data };
  res.status(200).json(response);
};

// ============================================
// POST /api/scrapbooks
// ============================================
export const createScrapbook = async (req: Request, res: Response): Promise<void> => {
  const body: CreateScrapbookDto = req.body;

  // Basic validation
  if (!body.title || !body.recipient_name || !body.birthday_date) {
    const response: ApiResponse = {
      success: false,
      error: 'Missing required fields: title, recipient_name, birthday_date',
    };
    res.status(400).json(response);
    return;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      title: body.title,
      recipient_name: body.recipient_name,
      birthday_date: body.birthday_date,
      message: body.message ?? null,
      photos: body.photos ?? [],
      created_by: body.created_by ?? null,
    })
    .select()
    .single();

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<Scrapbook> = {
    success: true,
    data,
    message: 'Scrapbook created successfully',
  };
  res.status(201).json(response);
};

// ============================================
// PUT /api/scrapbooks/:id
// ============================================
export const updateScrapbook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const body: UpdateScrapbookDto = req.body;

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: status === 404 ? 'Scrapbook not found' : error.message,
    };
    res.status(status).json(response);
    return;
  }

  const response: ApiResponse<Scrapbook> = {
    success: true,
    data,
    message: 'Scrapbook updated successfully',
  };
  res.status(200).json(response);
};

// ============================================
// DELETE /api/scrapbooks/:id
// ============================================
export const deleteScrapbook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase.from(TABLE).delete().eq('id', id);

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'Scrapbook deleted successfully',
  };
  res.status(200).json(response);
};
