import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, currentViews } = await request.json();
    
    if (!id || typeof currentViews !== 'number') {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    
    await writeClient.patch(id).set({ views: currentViews + 1 }).commit();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
} 