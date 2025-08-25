'use client';

import { useContext, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { useWishlist } from '@/hooks/useWishlist';

const GoogleAuthContent = () => {
    const searchParams = useSearchParams();
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const { login } = useContext(AuthContext);
    const { loadWishlist } = useWishlist()

    useEffect(() => {
        if (accessToken && refreshToken) {
            loadWishlist(accessToken);
            login(accessToken, refreshToken);
        }
    }, [accessToken, refreshToken, login, loadWishlist]);

    return (
        <div>
            {accessToken ? (
                <p>Authenticating...</p>
            ) : (
                <p>No token found in URL.</p>
            )}
        </div>
    );
};

const GoogleAuthPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleAuthContent />
        </Suspense>
    );
};

export default GoogleAuthPage;