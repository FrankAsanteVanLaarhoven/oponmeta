import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getSubjectColor} from "@/lib/utils";
import CompanionComponent from "@/components/CompanionComponent";

interface Companion {
    id: string;
    name: string;
    subject: string;
    title: string;
    topic: string;
    duration: number;
}

interface User {
    firstName: string;
    imageUrl: string;
}

const CompanionSession = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [companion, setCompanion] = useState<Companion | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API calls
        const fetchCompanion = async () => {
            setLoading(true);
            try {
                // Mock companion data
                const mockCompanion: Companion = {
                    id: id || '1',
                    name: 'Math Tutor',
                    subject: 'math',
                    title: 'Algebra Basics',
                    topic: 'Linear Equations',
                    duration: 30
                };

                // Mock user data
                const mockUser: User = {
                    firstName: 'John',
                    imageUrl: '/images/default-avatar.png'
                };

                setCompanion(mockCompanion);
                setUser(mockUser);
            } catch (error) {
                console.error('Error fetching companion:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCompanion();
        }
    }, [id]);

    if (loading) {
        return <div>Loading companion...</div>;
    }

    if (!user) {
        navigate('/sign-in');
        return null;
    }

    if (!companion || !companion.name) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-3xl font-bold mb-4 text-cyan-300">Companion Not Found</h1>
                <p className="mb-4 text-white">The requested companion does not exist or has been removed.</p>
                <button onClick={() => navigate('/companions')} className="btn-primary">
                    Back to Companions
                </button>
            </main>
        );
    }

    const { name, subject, topic, duration } = companion;

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <img src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id || ''}
                userName={user.firstName}
                userImage={user.imageUrl}
            />
        </main>
    )
}

export default CompanionSession
