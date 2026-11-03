import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentSession } from '@/lib/auth/session';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: '리믹스하려면 로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const original = await prisma.botProject.findUnique({
      where: { id: params.id },
    });

    if (!original) {
      return NextResponse.json({ error: '원본 프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    // Increment remix count on original
    await prisma.botProject.update({
      where: { id: original.id },
      data: { remixCount: { increment: 1 } },
    });

    // Create cloned project for the user
    const remixed = await prisma.botProject.create({
      data: {
        ownerId: session.userId,
        name: `${original.name} (Remix)`,
        description: `리믹스된 봇 (원본: ${original.name})`,
        workspaceJson: original.workspaceJson as any,
        compiledCode: original.compiledCode,
        isPublic: false,
      },
    });

    return NextResponse.json({ project: remixed });
  } catch (error) {
    return NextResponse.json({ error: '리믹스 실패' }, { status: 500 });
  }
}

