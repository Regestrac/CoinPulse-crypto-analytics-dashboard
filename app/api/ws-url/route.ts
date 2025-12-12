import { NextResponse } from 'next/server';

export async function GET() {
  const wsUrl = process.env.COINGECKO_WEBSOCKET_URL;
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!wsUrl || !apiKey) {
    return NextResponse.json(
      { error: 'WebSocket configuration missing' },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: `${wsUrl}?x_cg_pro_api_key=${apiKey}` });
}
