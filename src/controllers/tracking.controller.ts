import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse } from '../types/scrapbook';
import { CreateTrackingEventDto, TrackingEvent, TrackingEventRow } from '../types/tracking';

const TABLE = 'tracking_events';

/** Map a Supabase row (snake_case) → TrackingEvent (camelCase) */
const toTrackingEvent = (row: TrackingEventRow): TrackingEvent => ({
  id: row.id,
  sessionId: row.session_id,
  eventName: row.event_name,
  data: row.data,
  createdAt: row.created_at,
});

// ============================================
// POST /api/tracking
// ============================================
export const trackEvent = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as CreateTrackingEventDto;

  if (!body.sessionId || !body.event) {
    const response: ApiResponse = {
      success: false,
      error: 'Missing required fields: sessionId, eventName',
    };
    res.status(400).json(response);
    return;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      session_id: body.sessionId,
      event_name: body.event,
      data: body.data ?? null,
    })
    .select()
    .single();

  if (error) {
    const response: ApiResponse = { success: false, error: error.message };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<TrackingEvent> = {
    success: true,
    data: toTrackingEvent(data as TrackingEventRow),
    message: 'Event tracked successfully',
  };
  res.status(201).json(response);
};
