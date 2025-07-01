'use client';

import { useContext, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

const GoogleAuthContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { login } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            login(token);
        }
    }, [token, login]);

    return (
        <div>
            {token ? (
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