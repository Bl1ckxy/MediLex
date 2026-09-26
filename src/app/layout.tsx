import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Medilex',
    description:
        'MediLex (न्यायसेतु) is an AI-powered platform for Indian law firms to manage medical negligence cases, from intake through filing.',
    icons: {
        icon: [
            { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
            { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}