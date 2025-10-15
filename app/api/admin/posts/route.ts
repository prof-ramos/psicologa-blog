import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const postSchema = z.object({
  slug: z.string().min(1, 'Slug é obrigatório'),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  zodiacSign: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  humorLevel: z.enum(['none', 'subtle', 'moderate', 'savage']).optional(),
  targetAudience: z.string().optional(),
  readingTime: z.number().optional(),
  published: z.boolean().default(false),
  coverImage: z.string().optional(),
  pubDate: z.string().datetime().optional(),
});

// GET /api/admin/posts - List all posts (including drafts)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Prisma.PostWhereInput = {};

    if (published !== null) {
      where.published = published === 'true';
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { updatedDate: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = postSchema.parse(body);

    // Check if slug already exists
    const existing = await prisma.post.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug já existe' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...data,
        pubDate: data.pubDate ? new Date(data.pubDate) : new Date(),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    );
  }
}
