'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StorageManager from '@/components/StorageManager/StorageManager';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex gap-6">
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/products'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Все товары
            </Link>
            <Link
              href="/create-product"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/create-product'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Создать товар
            </Link>
          </div>

          <StorageManager />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
