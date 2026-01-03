import { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/config';
import { getPosts, getCategories, getPageBySlug } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const config = getSiteConfig();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const sitemap: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    if (!config.wordpressUrl) {
        return sitemap;
    }

    try {
        // Add posts
        const { posts } = await getPosts(config.wordpressUrl, { first: 100 });
        for (const post of posts) {
            sitemap.push({
                url: `${baseUrl}/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        }

        // Add categories
        const categories = await getCategories(config.wordpressUrl);
        for (const category of categories) {
            sitemap.push({
                url: `${baseUrl}/category/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        }
    } catch (error) {
        console.error('Sitemap generation error:', error);
    }

    return sitemap;
}
