import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentSession } from '@/lib/auth/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.botProject.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: { nickname: true, email: true, avatarUrl: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: '프로젝트 조회 실패' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const { name, description, workspaceJson, compiledCode, isPublic } = await req.json();

    const existing = await prisma.botProject.findUnique({
      where: { id: params.id },
    });

    if (!existing || existing.ownerId !== session.userId) {
      return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 });
    }

    const updated = await prisma.botProject.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name : existing.name,
        description: description !== undefined ? description : existing.description,
        workspaceJson: workspaceJson !== undefined ? workspaceJson : existing.workspaceJson,
        compiledCode: compiledCode !== undefined ? compiledCode : existing.compiledCode,
        isPublic: isPublic !== undefined ? isPublic : existing.isPublic,
      },
    });

    return NextResponse.json({ project: updated });
  } catch (error) {
    return NextResponse.json({ error: '프로젝트 저장 실패' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const existing = await prisma.botProject.findUnique({
      where: { id: params.id },
    });

    if (!existing || existing.ownerId !== session.userId) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
    }

    await prisma.botProject.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: '프로젝트가 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '프로젝트 삭제 실패' }, { status: 500 });
  }
}
