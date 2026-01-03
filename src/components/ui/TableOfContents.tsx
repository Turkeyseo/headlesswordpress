'use client';

import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
    toc: { id: string; text: string; level: number }[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>('');

    // Scroll spy logic to highlight active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        const headings = document.querySelectorAll('h2, h3, h4');
        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, []);

    if (toc.length < 2) return null;

    return (
        <nav className={`${styles.toc} ${isOpen ? styles.open : ''}`}>
            <button
                className={styles.tocHeader}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className={styles.tocTitleWrapper}>
                    <List size={18} className={styles.tocIcon} />
                    <span className={styles.tocTitle}>İçindekiler</span>
                    <span className={styles.tocActiveTitle}>
                        {activeId ? toc.find(t => t.id === activeId)?.text || '' : ''}
                    </span>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <div className={styles.tocContent}>
                <ul className={styles.tocList}>
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            className={`${styles.tocItem} ${item.level === 3 ? styles.level3 : ''} ${item.level === 4 ? styles.level4 : ''}`}
                        >
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? styles.active : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(item.id);
                                    if (element) {
                                        const offset = 80; // Sticky header offset
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const elementRect = element.getBoundingClientRect().top;
                                        const elementPosition = elementRect - bodyRect;
                                        const offsetPosition = elementPosition - offset;

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                        setIsOpen(false); // Close on click
                                    }
                                }}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
