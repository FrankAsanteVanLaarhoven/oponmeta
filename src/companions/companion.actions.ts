'use client';

// React-compatible companion actions
// Note: Replace with actual API calls when backend is implemented

export interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}

export interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string;
    topic?: string;
}

export const createCompanion = async (formData: CreateCompanion) => {
    // Mock implementation - replace with actual API call
    console.log('Creating companion:', formData);
    return {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        author: 'user123'
    };
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    // Mock implementation - replace with actual API call
    const mockCompanions = [
        {
            id: '1',
            name: 'Math Tutor',
            subject: 'math',
            topic: 'Algebra',
            duration: 30,
            author: 'user123'
        },
        {
            id: '2',
            name: 'Science Helper',
            subject: 'science',
            topic: 'Chemistry',
            duration: 45,
            author: 'user123'
        }
    ];

    let filteredCompanions = mockCompanions;

    if (subject) {
        filteredCompanions = filteredCompanions.filter(c => c.subject.includes(subject));
    }

    if (topic) {
        filteredCompanions = filteredCompanions.filter(c => 
            c.topic.toLowerCase().includes(topic.toLowerCase()) || 
            c.name.toLowerCase().includes(topic.toLowerCase())
        );
    }

    return filteredCompanions.slice((page - 1) * limit, page * limit);
}

export const getCompanion = async (id: string) => {
    // Mock implementation - replace with actual API call
    const mockCompanion = {
        id,
        name: 'Math Tutor',
        subject: 'math',
        topic: 'Algebra',
        duration: 30,
        author: 'user123'
    };

    return mockCompanion;
}

export const addToSessionHistory = async (companionId: string) => {
    // Mock implementation - replace with actual API call
    console.log('Adding to session history:', companionId);
    return { id: Math.random().toString(36).substr(2, 9) };
}

export const getRecentSessions = async (limit = 10) => {
    // Mock implementation - replace with actual API call
    return [
        {
            id: '1',
            name: 'Math Tutor',
            subject: 'math',
            topic: 'Algebra',
            duration: 30
        }
    ];
}

export const getUserSessions = async (userId: string, limit = 10) => {
    // Mock implementation - replace with actual API call
    return [
        {
            id: '1',
            name: 'Math Tutor',
            subject: 'math',
            topic: 'Algebra',
            duration: 30
        }
    ];
}

export const getUserCompanions = async (userId: string) => {
    // Mock implementation - replace with actual API call
    return [
        {
            id: '1',
            name: 'Math Tutor',
            subject: 'math',
            topic: 'Algebra',
            duration: 30
        },
        {
            id: '2',
            name: 'Science Helper',
            subject: 'science',
            topic: 'Chemistry',
            duration: 45
        }
    ];
}

export const newCompanionPermissions = async () => {
    // Mock implementation - replace with actual permission check
    return true;
}

export const addBookmark = async (companionId: string, path: string) => {
    // Mock implementation - replace with actual API call
    console.log('Adding bookmark:', companionId, path);
    return { success: true };
}

export const removeBookmark = async (companionId: string, path: string) => {
    // Mock implementation - replace with actual API call
    console.log('Removing bookmark:', companionId, path);
    return { success: true };
}

export const getBookmarkedCompanions = async (userId: string) => {
    // Mock implementation - replace with actual API call
    return [
        {
            id: '2',
            name: 'Science Helper',
            subject: 'science',
            topic: 'Chemistry',
            duration: 45
        }
    ];
}
