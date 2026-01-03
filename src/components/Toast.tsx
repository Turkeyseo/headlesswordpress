// Toast notification system
'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return <Check size={18} />;
            case 'error': return <X size={18} />;
            case 'warning': return <AlertTriangle size={18} />;
            case 'info': return <Info size={18} />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${styles.toast} ${styles[toast.type]}`}
                        onClick={() => removeToast(toast.id)}
                    >
                        <span className={styles.toastIcon}>{getIcon(toast.type)}</span>
                        <span className={styles.toastMessage}>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
