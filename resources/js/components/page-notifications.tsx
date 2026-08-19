import { useEffect } from 'react';
import { useNotification } from '@/hooks/use-notification';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

interface FlashData {
    success?: string | null;
    error?: string | null;
    warning?: string | null;
    info?: string | null;
}

/**
 * Reads flash messages from Inertia page props and converts them to toast notifications.
 * Must be rendered once at the app level (placed inside NotificationProvider).
 */
export default function PageNotifications() {
    const { flash } = usePage<SharedData & { flash: FlashData }>().props;
    const { success, error, warning, info } = useNotification();

    useEffect(() => {
        if (flash?.success) {
            success('Success', flash.success);
        }
        if (flash?.error) {
            error('Error', flash.error);
        }
        if (flash?.warning) {
            warning('Warning', flash.warning);
        }
        if (flash?.info) {
            info('Info', flash.info);
        }
    }, [flash?.success, flash?.error, flash?.warning, flash?.info, success, error, warning, info]);

    return null;
}

