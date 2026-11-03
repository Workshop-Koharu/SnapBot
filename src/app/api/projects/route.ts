import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const projects = await prisma.botProject.findMany({
      where: { ownerId: session.userId },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('프로젝트 목록 조회 오류:', error);
    // Return empty list if DB offline
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const { name, description, workspaceJson, compiledCode } = await req.json();

    const project = await prisma.botProject.create({
      data: {
        ownerId: session.userId,
        name: name || '새로운 디스코드 봇',
        description: description || 'SnapBot으로 제작된 봇',
        workspaceJson: workspaceJson || { version: 1, blocks: {}, variables: [] },
        compiledCode: compiledCode || '// Empty SnapBot',
        isPublic: false,
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('프로젝트 생성 오류:', error);
    return NextResponse.json({ error: '프로젝트를 생성할 수 없습니다.' }, { status: 500 });
  }
}
