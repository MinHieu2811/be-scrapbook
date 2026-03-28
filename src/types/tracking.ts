// ============================================
// Tracking — TypeScript Interfaces
// ============================================

/** Payload for creating a new tracking event */
export interface CreateTrackingEventDto {
  sessionId: string;
  event: string;
  data?: Record<string, unknown>;
}

/** Row shape returned from Supabase `tracking_events` table */
export interface TrackingEventRow {
  id: string;
  session_id: string;
  event_name: string;
  data: Record<string, unknown> | null;
  created_at: string;
}

/** Camel-cased TS representation of a tracking event */
export interface TrackingEvent {
  id: string;
  sessionId: string;
  eventName: string;
  data: Record<string, unknown> | null;
  createdAt: string;
}
