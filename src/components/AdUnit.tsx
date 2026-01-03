'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    slotId: string;
    className?: string;
    config: {
        id: string;
        code: string;
        active: boolean;
    } | undefined;
}

export default function AdUnit({ slotId, className = '', config }: AdUnitProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!config?.active || !config?.code || !containerRef.current) return;

        const container = containerRef.current;

        // Clear previous content
        container.innerHTML = '';

        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = config.code;

        // Execute scripts
        Array.from(temp.querySelectorAll('script')).forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode?.replaceChild(newScript, oldScript);
        });

        // Append processed content
        Array.from(temp.childNodes).forEach(node => container.appendChild(node));

    }, [config?.active, config?.code]);

    if (!config?.active || !config?.code) return null;

    return (
        <div
            className={`ad-unit ad-unit-${slotId} ${className}`}
            ref={containerRef}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1.5rem 0',
                minHeight: '90px',
                overflow: 'hidden'
            }}
        />
    );
}
