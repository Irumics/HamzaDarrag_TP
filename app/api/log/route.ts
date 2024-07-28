import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs.log');

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const logEntry = `${new Date().toISOString()} - ${message}\n`;

        fs.appendFileSync(logFilePath, logEntry, 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to write log:', error);
        return NextResponse.json({ error: 'Failed to write log' }, { status: 500 });
    }
}
