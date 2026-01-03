'use client';

import { WPPost } from '@/lib/wordpress';
import PostCard, { PostCardSkeleton } from './PostCard';
import styles from './PostGrid.module.css';

interface PostGridProps {
    posts: WPPost[];
    layout?: string;
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    loadMoreText?: string;
}

export default function PostGrid({
    posts,
    layout = 'grid',
    loading = false,
    hasMore = false,
    onLoadMore,
    loadMoreText = 'Load More',
}: PostGridProps) {
    // Map layout prop to CSS class
    const getGridClass = () => {
        switch (layout) {
            case 'list':
                return styles.listGrid;
            case 'magazine':
                return styles.magazineGrid;
            case 'carousel':
                return styles.carouselGrid;
            case 'masonry':
                return styles.masonryGrid;
            case 'overlay':
                return styles.overlayGrid;
            case 'cards':
                return styles.cardsGrid;
            default:
                return styles.postGrid;
        }
    };

    const gridClass = getGridClass();

    // Loading state
    if (loading && posts.length === 0) {
        return (
            <div className={gridClass}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <PostCardSkeleton key={i} layout={layout} />
                ))}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={gridClass}>
                {posts.map((post, index) => {
                    // Determine item layout based on grid layout and position
                    let itemLayout = layout;
                    let isFeatured = false;

                    if (layout === 'magazine') {
                        // First item in magazine is featured (large)
                        isFeatured = index === 0;
                        itemLayout = 'magazine';
                    } else if (layout === 'overlay') {
                        itemLayout = 'magazine';
                    }

                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                            layout={itemLayout}
                            featured={isFeatured}
                        />
                    );
                })}
            </div>

            {hasMore && onLoadMore && (
                <div className={styles.loadMore}>
                    <button
                        className="btn btn-outline"
                        onClick={onLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : loadMoreText}
                    </button>
                </div>
            )}
        </div>
    );
}
