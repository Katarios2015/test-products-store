import React from 'react';
import Layout from '@/components/Layout/Layout';
import './globals.css';

export const metadata = {
  title: 'Products App',
  description: 'Тестовое задание для продуктового приложения',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
