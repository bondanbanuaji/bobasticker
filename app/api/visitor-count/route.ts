/**
 * BobaSticker 3.0 - Visitor Counter API
 * 
 * Simple in-memory counter that increments on every POST request.
 * On Vercel serverless, this resets on cold starts — which is fine
 * because we seed it with a base number to keep it looking legit.
 */

let visitorCount = 0;

// Base number so it doesn't start from 0 on cold starts
const BASE_COUNT = 247;

export async function GET() {
  return Response.json({ count: BASE_COUNT + visitorCount });
}

export async function POST() {
  visitorCount++;
  return Response.json({ count: BASE_COUNT + visitorCount });
}
