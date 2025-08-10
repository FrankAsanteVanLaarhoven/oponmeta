import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CompanionForm from "@/components/CompanionForm";

const NewCompanion = () => {
    const navigate = useNavigate();
    const [canCreateCompanion, setCanCreateCompanion] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock authentication check - replace with actual auth
        const checkAuth = async () => {
            setLoading(true);
            try {
                // Mock user check - replace with actual auth logic
                const mockUserId = 'user123';
                if (!mockUserId) {
                    navigate('/sign-in');
                    return;
                }

                // Mock permission check - replace with actual permission logic
                const mockCanCreate = true;
                setCanCreateCompanion(mockCanCreate);
            } catch (error) {
                console.error('Error checking permissions:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateCompanion ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Companion Builder</h1>
                    <CompanionForm />
                </article>
            ) : (
                <article className="companion-limit">
                    <img src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
                    <div className="cta-badge">
                        Upgrade your plan
                    </div>
                    <h1>You've Reached Your Limit</h1>
                    <p>You've reached your companion limit. Upgrade to create more companions and premium features.</p>
                    <Link to="/subscription" className="btn-primary w-full justify-center">
                        Upgrade My Plan
                    </Link>
                </article>
            )}
        </main>
    )
}

export default NewCompanion
