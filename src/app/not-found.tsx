import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.notFoundContent}>
                <div className={styles.notFoundIcon}>
                    <FileQuestion size={48} />
                </div>

                <div className={styles.notFoundCode}>404</div>

                <h1 className={styles.notFoundTitle}>Page Not Found</h1>

                <p className={styles.notFoundDescription}>
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    It might have been removed, renamed, or perhaps it never existed in the first place.
                </p>

                <div className={styles.notFoundActions}>
                    <Link href="/" className="btn btn-primary btn-lg">
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <Link href="/category" className="btn btn-outline btn-lg">
                        <Search size={18} />
                        Browse Categories
                    </Link>
                </div>
            </div>
        </div>
    );
}
