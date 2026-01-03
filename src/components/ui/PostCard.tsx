'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ImageIcon, ArrowRight } from 'lucide-react';
import { WPPost } from '@/lib/wordpress';
import { formatDate, stripHtml, truncate, calculateReadingTime } from '@/lib/utils';
import styles from './PostCard.module.css';

interface PostCardProps {
    post: WPPost;
    layout?: string;
    featured?: boolean;
    locale?: string;
}

export default function PostCard({ post, layout = 'grid', featured = false, locale = 'en' }: PostCardProps) {
    const readingTime = calculateReadingTime(post.content || post.excerpt);
    const category = post.categories?.nodes?.[0];

    // Determine card class based on layout
    const getCardClass = () => {
        if (layout === 'list') return styles.postCardList;
        if (layout === 'magazine' && featured) return styles.postCardMagazineFeatured;
        if (layout === 'magazine') return styles.postCardMagazine;
        return `${styles.postCard} ${featured ? styles.postCardFeatured : ''}`;
    };

    const cardClass = getCardClass();
    const isOverlay = layout === 'magazine';

    return (
        <article className={cardClass}>
            <Link href={post.uri || `/${post.slug}`}>
                <div className={styles.cardImage}>
                    {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className={styles.cardImagePlaceholder}>
                            <ImageIcon size={48} />
                        </div>
                    )}
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                        {category && (
                            <span className={styles.cardCategory}>{category.name}</span>
                        )}
                        <span className={styles.cardDate}>
                            {formatDate(post.date, locale)}
                        </span>
                    </div>

                    <h3 className={styles.cardTitle}>{post.title}</h3>

                    {/* Show excerpt only for non-magazine layouts or featured magazine */}
                    {(layout !== 'magazine' || featured) && (
                        <p className={styles.cardExcerpt}>
                            {truncate(stripHtml(post.excerpt), featured ? 150 : 100)}
                        </p>
                    )}

                    {/* Read Story link for featured magazine */}
                    {isOverlay && featured && (
                        <span className={styles.readStory}>
                            Read Story <ArrowRight size={16} />
                        </span>
                    )}

                    {/* Footer for non-overlay layouts */}
                    {!isOverlay && (
                        <div className={styles.cardFooter}>
                            {post.author?.node && (
                                <div className={styles.cardAuthor}>
                                    {post.author.node.avatar?.url && (
                                        <Image
                                            src={post.author.node.avatar.url}
                                            alt={post.author.node.name}
                                            width={28}
                                            height={28}
                                            className={styles.authorAvatar}
                                        />
                                    )}
                                    <span className={styles.authorName}>{post.author.node.name}</span>
                                </div>
                            )}
                            <span className={styles.readTime}>
                                <Clock size={14} />
                                {readingTime} min
                            </span>
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
}

// Skeleton component for loading state
export function PostCardSkeleton({ layout = 'grid' }: { layout?: string }) {
    return (
        <div className={layout === 'list' ? styles.postCardList : styles.postCard}>
            <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
            <div className={styles.cardContent}>
                <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                <div className={`${styles.skeleton} ${styles.skeletonText}`} />
            </div>
        </div>
    );
}
