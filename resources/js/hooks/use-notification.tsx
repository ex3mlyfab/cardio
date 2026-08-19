import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    ToastProvider as RadixToastProvider,
    ToastViewport,
} from '@/components/ui/toast';

interface Notification {
    id: string;
    title: string;
    description?: string;
    variant: 'default' | 'success' | 'destructive' | 'warning';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface NotificationContextType {
    notify: (notification: Omit<Notification, 'id'>) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

let notificationId = 0;

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

interface NotificationItemProps {
    notification: Notification;
    onDismiss: (id: string) => void;
}

function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
    const { id, title, description, variant, action } = notification;

    return (
        <Toast
            variant={variant}
            onOpenChange={(open: boolean) => {
                if (!open) onDismiss(id);
            }}
        >
            <div className="grid gap-1">
                <ToastTitle>{title}</ToastTitle>
                {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action && (
                <ToastAction
                    altText={action.label}
                    onClick={() => {
                        action.onClick();
                        onDismiss(id);
                    }}
                >
                    {action.label}
                </ToastAction>
            )}
            <ToastClose />
        </Toast>
    );
}

interface NotificationProviderProps {
    children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify = useCallback((notification: Omit<Notification, 'id'>) => {
        const id = String(++notificationId);
        const fullNotification: Notification = {
            ...notification,
            id,
            duration: notification.duration ?? 4000,
        };
        setNotifications((prev) => [...prev, fullNotification]);

        if (fullNotification.duration && fullNotification.duration > 0) {
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }, fullNotification.duration);
        }
    }, []);

    const success = useCallback(
        (title: string, description?: string) =>
            notify({ title, description, variant: 'success' }),
        [notify]
    );

    const error = useCallback(
        (title: string, description?: string) =>
            notify({ title, description, variant: 'destructive' }),
        [notify]
    );

    const warning = useCallback(
        (title: string, description?: string) =>
            notify({ title, description, variant: 'warning' }),
        [notify]
    );

    const info = useCallback(
        (title: string, description?: string) =>
            notify({ title, description, variant: 'default' }),
        [notify]
    );

    const dismiss = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ notify, success, error, warning, info }}>
            {children}
            <RadixToastProvider>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDismiss={dismiss}
                    />
                ))}
                <ToastViewport />
            </RadixToastProvider>
        </NotificationContext.Provider>
    );
}
