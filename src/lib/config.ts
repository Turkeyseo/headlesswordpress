// Server-only config utilities
// This file should only be imported in server components or API routes

import fs from 'fs';
import path from 'path';

// Re-export types from config-types (safe for both client and server)
export * from './config-types';
export type { SiteConfig, MenuItem, HomepageSection, SectionType } from './config-types';

import type { SiteConfig, MenuItem } from './config-types';

const CONFIG_PATH = path.join(process.cwd(), 'site-config.json');

const DEFAULT_CONFIG: SiteConfig = {
  wordpressUrl: "",
  installed: false,
  colors: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0a0a0a",
    primaryForeground: "#fafafa",
    secondary: "#f4f4f5",
    secondaryForeground: "#18181b",
    accent: "#6366f1",
    accentForeground: "#ffffff",
    muted: "#f4f4f5",
    border: "#e4e4e7",
    card: "#ffffff",
  },
  siteName: "My Headless WP",
  logoUrl: "",
  homeTemplate: "grid",
  homeCategory: 0,
  homepageSections: [],
  menus: { primary: [], footer: [] },
  language: "en",
  topBar: {
    enabled: true,
    statusText: "✨ New features available! Explore now.",
    statusLinkText: "Learn More",
    statusLinkUrl: "/about",
  },
  headerCta: {
    text: "Get Started",
    url: "/contact",
  },
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
  ],
  seo: {
    homepageTitle: '',
    homepageDescription: '',
    urlStructure: '/%postname%/',
    categoryBase: 'category',
    tagBase: 'tag'
  },
  postSettings: {
    relatedPosts: {
      enabled: true,
      title: "Related Posts",
      count: 3
    }
  },
};

export const getSiteConfig = (): SiteConfig => {
  let config = DEFAULT_CONFIG;

  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const fileContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
      config = { ...DEFAULT_CONFIG, ...JSON.parse(fileContent) };
    } catch (error) {
      console.error("Failed to parse site-config.json:", error);
    }
  }

  // Override with environment variables (critical for Vercel)
  const envUrl = process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (envUrl) {
    config.wordpressUrl = envUrl;
    // If we have a URL from env, treat as installed unless explicitly false
    if (config.installed === false) {
      config.installed = true;
    }
  }

  return config;
};

export const updateSiteConfig = (newConfig: Partial<SiteConfig>): SiteConfig => {
  const currentConfig = getSiteConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };

  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2));
  } catch (error) {
    console.error("Failed to write site-config.json:", error);
    throw new Error("Failed to save configuration");
  }

  return updatedConfig;
};

// Helper to auto-fetch menu if empty
export const getEnhancedSiteConfig = async (): Promise<SiteConfig> => {
  const config = getSiteConfig();

  // If menu is empty, fetch top categories
  if ((!config.menus.primary || config.menus.primary.length === 0) && config.wordpressUrl) {
    try {
      // Dynamic import to avoid circular dep issues if any
      const { getCategories } = await import('@/lib/wordpress');
      const categories = await getCategories(config.wordpressUrl);

      const topCategories = categories
        .filter(c => (c.count || 0) > 0)
        .sort((a, b) => (b.count || 0) - (a.count || 0))
        .slice(0, 5);

      const autoMenu: MenuItem[] = topCategories.map(cat => ({
        id: `cat-${cat.databaseId}`,
        label: cat.name,
        url: `/category/${cat.slug}`,
      }));

      return {
        ...config,
        menus: {
          ...config.menus,
          primary: autoMenu,
        },
      };

    } catch (e) {
      console.error('Failed to auto-fetch menu:', e);
    }
  }

  return config;
};

export const isInstalled = (): boolean => {
  const config = getSiteConfig();
  return config.installed && !!config.wordpressUrl;
};
