'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [verify, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async (token: string) => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (err: any) {
            console.log(err.response?.data || err.message);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
            verifyUserEmail(urlToken); // ✅ pass token correctly
        }
    }, [searchParams]);

    return (
        <div className="p-6 text-center">
            {verify && (
                <>
                    <h2 className="text-green-600">✅ Email Verified Successfully!</h2>
                    <Link href="/login" className="text-blue-600 underline mt-2 block">
                        Login
                    </Link>
                </>
            )}

            {error && <h2 className="text-red-600">❌ {error}</h2>}

            {!verify && !error && <h2>⏳ Verifying your email...</h2>}
        </div>

    );
}

export default VerifyEmailPage;
