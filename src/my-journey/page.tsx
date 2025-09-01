import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompanionsList from "@/components/CompanionsList";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  emailAddresses: Array<{ emailAddress: string }>;
}

interface Companion {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [sessionHistory, setSessionHistory] = useState<Companion[]>([]);
  const [bookmarkedCompanions, setBookmarkedCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user data - replace with actual authentication
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      imageUrl: '/images/default-avatar.png',
      emailAddresses: [{ emailAddress: 'john.doe@example.com' }]
    };

    // Mock data - replace with actual API calls
    const mockCompanions: Companion[] = [
      { id: '1', name: 'Math Tutor', topic: 'Algebra', subject: 'math', duration: 30 },
      { id: '2', name: 'Science Helper', topic: 'Chemistry', subject: 'science', duration: 45 }
    ];

    const mockSessions: Companion[] = [
      { id: '1', name: 'Math Tutor', topic: 'Algebra', subject: 'math', duration: 30 }
    ];

    const mockBookmarked: Companion[] = [
      { id: '2', name: 'Science Helper', topic: 'Chemistry', subject: 'science', duration: 45 }
    ];

    setUser(mockUser);
    setCompanions(mockCompanions);
    setSessionHistory(mockSessions);
    setBookmarkedCompanions(mockBookmarked);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <img
            src={user.imageUrl}
            alt={user.firstName}
            width={110}
            height={110}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <img
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <div>Lessons completed</div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <img src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>Companions created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
