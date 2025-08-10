import React from 'react';
import { useParams } from 'react-router-dom';
import CompanionComponent from '../companions/CompanionComponent';
import { useAppContext } from '@/context/AppContext';

// Mock companion data - in a real app this would come from an API
const COMPANIONS_DATA = {
  "1": {
    id: "1",
    name: "Alex the Project Manager",
    topic: "Project Management Fundamentals",
    subject: "business",
    style: "formal",
    voice: "male"
  },
  "2": {
    id: "2",
    name: "Lina the Golf Coach",
    topic: "Golf Techniques & Strategy",
    subject: "sports",
    style: "casual",
    voice: "female"
  },
  "3": {
    id: "3",
    name: "Ming the Mandarin Tutor",
    topic: "Chinese Language & Culture",
    subject: "language",
    style: "casual",
    voice: "female"
  },
  "4": {
    id: "4",
    name: "Neura the Brainy Explorer",
    topic: "Neural Networks & AI",
    subject: "science",
    style: "formal",
    voice: "female"
  },
  "5": {
    id: "5",
    name: "Codey the Logic Hacker",
    topic: "Programming Fundamentals",
    subject: "coding",
    style: "casual",
    voice: "male"
  },
  "6": {
    id: "6",
    name: "Vita the Wellness Coach",
    topic: "Health & Nutrition",
    subject: "health",
    style: "casual",
    voice: "female"
  }
};

const CompanionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { companions } = useAppContext();
  
  // Combine default companions with user-created companions
  const allCompanions = { ...COMPANIONS_DATA };
  companions.forEach(comp => {
    allCompanions[comp.id] = comp;
  });
  
  const companion = allCompanions[id as keyof typeof allCompanions];

  if (!companion) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Companion Not Found</h1>
          <p className="text-gray-600">The companion you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <CompanionComponent
      companionId={companion.id}
      subject={companion.subject}
      topic={companion.topic}
      name={companion.name}
      userName="User"
      userImage=""
      style={companion.style}
      voice={companion.voice}
    />
  );
};

export default CompanionPage;
