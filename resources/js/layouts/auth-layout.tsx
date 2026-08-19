// import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import PageNotifications from '@/components/page-notifications';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <>
            <PageNotifications />
            <AuthSplitLayout title={title} description={description} {...props}>
                {children}
            </AuthSplitLayout>
        </>
    );
}
