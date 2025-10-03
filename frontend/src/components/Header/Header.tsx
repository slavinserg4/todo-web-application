'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import "./styleForHeader.css";

const HeaderContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value) {
            params.set('search', event.target.value);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.push(`/?${params.toString()}`);
    };

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value) {
            params.set('sort', event.target.value);
        } else {
            params.delete('sort');
        }
        router.push(`/?${params.toString()}`);
    };

    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value) {
            params.set('status', event.target.value);
        } else {
            params.delete('status');
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="header">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    onChange={handleSearch}
                    defaultValue={searchParams.get('search') || ''}
                    className="search-input"
                />

                <select
                    onChange={handleSort}
                    defaultValue={searchParams.get('sort') || ''}
                    className="filter-select"
                >
                    <option value="">Sort by priority</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                <select
                    onChange={handleStatus}
                    defaultValue={searchParams.get('status') || ''}
                    className="filter-select"
                >
                    <option value="all">All Tasks</option>
                    <option value="done">Completed</option>
                    <option value="undone">Active</option>
                </select>
            </div>
        </div>
    );
};

export default function Header() {
    return (
        <Suspense fallback={
            <div className="header">
                <div className="filters">
                    <div className="search-input loading"></div>
                    <div className="filter-select loading"></div>
                    <div className="filter-select loading"></div>
                </div>
            </div>
        }>
            <HeaderContent />
        </Suspense>
    );
}