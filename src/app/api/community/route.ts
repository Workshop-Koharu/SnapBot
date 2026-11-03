import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const publicProjects = await prisma.botProject.findMany({
      where: { isPublic: true },
      include: {
        owner: {
          select: { nickname: true, avatarUrl: true },
        },
      },
      orderBy: { starsCount: 'desc' },
      take: 20,
    });

    return NextResponse.json({ projects: publicProjects });
  } catch (error) {
    return NextResponse.json({ projects: [] });
  }
}

