import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

interface Companion {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color?: string;
  bookmarked?: boolean;
}

const CompanionsLibrary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [companions, setCompanions] = useState<Companion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.pathname === '/companions/create') {
            navigate('/companions/new');
            return;
        }

        const searchParams = new URLSearchParams(location.search);
        const subject = searchParams.get('subject') || '';
        const topic = searchParams.get('topic') || '';

        // Placeholder for getting companions - replace with actual API call
        const fetchCompanions = async () => {
            setLoading(true);
            try {
                // Mock data - replace with actual API call
                const mockCompanions: Companion[] = [
                    {
                        id: '1',
                        name: 'Math Tutor',
                        topic: 'Algebra',
                        subject: 'math',
                        duration: 30,
                        bookmarked: false
                    },
                    {
                        id: '2',
                        name: 'Science Helper',
                        topic: 'Chemistry',
                        subject: 'science',
                        duration: 45,
                        bookmarked: true
                    }
                ];
                
                const filteredCompanions = mockCompanions.filter(companion => {
                    if (subject && companion.subject !== subject) return false;
                    if (topic && !companion.topic.toLowerCase().includes(topic.toLowerCase())) return false;
                    return true;
                });
                
                setCompanions(filteredCompanions);
            } catch (error) {
                console.error('Error fetching companions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanions();
    }, [location.search, location.pathname, navigate]);

    if (loading) {
        return <div>Loading companions...</div>;
    }

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary
