import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { NotificationProvider } from '@/hooks/use-notification';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<{ default: React.ComponentType }>(
    './pages/**/*.tsx',
    { eager: true },
);

function resolvePage(name: string) {
    const key = `./pages/${name}.tsx`;
    if (pages[key]) return pages[key];
    throw new Error(`Page not found: ${name}`);
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name: string) => Promise.resolve(resolvePage(name)),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <NotificationProvider>
                <App {...props} />
            </NotificationProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
