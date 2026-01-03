import { NextRequest, NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/config';
import { searchPosts } from '@/lib/wordpress';

// Search API endpoint
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    const config = getSiteConfig();

    if (!config.wordpressUrl) {
        return NextResponse.json({ error: 'WordPress not configured' }, { status: 500 });
    }

    try {
        const posts = await searchPosts(config.wordpressUrl, query, limit);

        // Return simplified results for client
        const results = posts.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            date: post.date,
            featuredImage: post.featuredImage?.node?.sourceUrl || null,
            category: post.categories?.nodes?.[0]?.name || null,
        }));

        return NextResponse.json({
            query,
            count: results.length,
            results,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Search failed' },
            { status: 500 }
        );
    }
}
