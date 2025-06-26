import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TeamMember } from '../types';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

interface TeamMemberCreatePayload {
  name: string;
  description: string;
  smallImage: string;
  fullImage: string;
}

interface TeamContextType {
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  addTeamMember: (member: TeamMemberCreatePayload) => Promise<any>;
  updateTeamMember: (id: string, member: Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt' | '_id'>>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members on mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      console.log('Fetching team members...');
      const response = await fetch(`${API_BASE_URL}/api/team-members`);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('API URL:', `${API_BASE_URL}/api/team-members`);
      
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('Team members fetched successfully:', data);
      setTeamMembers(data);
    } catch (err) {
      console.error('Error in fetchTeamMembers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setIsLoading(false);
    }
  };

  const addTeamMember = async (memberData: TeamMemberCreatePayload) => {
    try {
      console.log('Attempting to create team member with data:', memberData);
      const response = await fetch(`${API_BASE_URL}/api/team-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to create team member: ${response.status} ${response.statusText}`);
      }
      
      const newMember = await response.json();
      console.log('Team member created successfully:', newMember);
      setTeamMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (err) {
      console.error('Error creating team member:', err);
      setError(err instanceof Error ? err.message : 'Failed to create team member');
      throw err;
    }
  };

  const updateTeamMember = async (id: string, memberData: Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt' | '_id'>>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) throw new Error('Failed to update team member');
      const updatedMember = await response.json();
      setTeamMembers(prev => prev.map(member => 
        member._id === id ? updatedMember : member
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team member');
      throw err;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team-members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      await fetchTeamMembers(); // Reload team members from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete team member');
      throw err;
    }
  };

  return (
    <TeamContext.Provider value={{
      teamMembers,
      isLoading,
      error,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
} 