import { getSiteConfig } from '@/lib/config';
import { getPosts } from '@/lib/wordpress';
import { stripHtml } from '@/lib/utils';

export async function GET() {
    const config = getSiteConfig();

    if (!config.wordpressUrl) {
        return new Response('Site not configured', { status: 500 });
    }

    const { posts } = await getPosts(config.wordpressUrl, { first: 20 });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${stripHtml(post.excerpt).slice(0, 300)}]]></description>
      ${post.categories?.nodes?.[0] ? `<category>${post.categories.nodes[0].name}</category>` : ''}
      ${post.author?.node?.name ? `<author>${post.author.node.name}</author>` : ''}
    </item>
  `).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.siteName}</title>
    <link>${baseUrl}</link>
    <description>Powered by WordPress and Next.js</description>
    <language>${config.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
