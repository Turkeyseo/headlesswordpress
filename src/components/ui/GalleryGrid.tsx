'use client';

import React from 'react';
import ImageWithLightbox from './ImageWithLightbox';

export interface GalleryImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface GalleryGridProps {
    images: GalleryImage[];
    columns?: 1 | 2 | 3 | 4;
}

/**
 * GalleryGrid - Displays images in a responsive grid layout
 * Used for WordPress galleries (wp-block-gallery, classic gallery, detected galleries)
 */
export default function GalleryGrid({ images, columns = 1 }: GalleryGridProps) {
    if (!images || images.length === 0) return null;

    // Dynamic column classes based on prop
    const getGridClass = () => {
        switch (columns) {
            case 2:
                return 'grid-cols-1 sm:grid-cols-2';
            case 3:
                return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
            case 4:
                return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
            case 1:
            default:
                return 'grid-cols-1';
        }
    };

    return (
        <div className={`grid ${getGridClass()} gap-6 my-8 w-full`}>
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className="relative w-full rounded-lg bg-transparent"
                >
                    <ImageWithLightbox
                        src={img.src}
                        alt={img.alt || `Gallery Image ${idx + 1}`}
                        width={img.width || 800}
                        height={img.height || 600}
                        className="w-full h-auto rounded-lg"
                        style={{ width: '100%', height: 'auto' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                    />
                </div>
            ))}
        </div>
    );
}
