'use client';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newSearchParams = new URLSearchParams(location.search);
                newSearchParams.set('topic', searchQuery);
                navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
            } else {
                if(location.pathname === '/companions') {
                    const newSearchParams = new URLSearchParams(location.search);
                    newSearchParams.delete('topic');
                    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, navigate, location]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <img src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}
export default SearchInput
