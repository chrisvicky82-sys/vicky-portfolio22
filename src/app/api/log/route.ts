import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const logPath = path.join(process.cwd(), 'browser_logs.txt');
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${JSON.stringify(body, null, 2)}\n---\n`;
    fs.appendFileSync(logPath, logLine);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}
