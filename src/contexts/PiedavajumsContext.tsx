import React, { createContext, useContext, useState, useEffect } from 'react';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

interface PiedavajumsSection {
  _id?: string;
  title: string;
  duration: string;
  description: string;
  additionalTitle: string;
  additionalDescription: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PiedavajumsCreatePayload {
  title: string;
  duration: string;
  description: string;
  additionalTitle: string;
  additionalDescription: string;
  image: string;
}

interface PiedavajumsContextType {
  piedavajumsSections: PiedavajumsSection[];
  isLoading: boolean;
  error: string | null;
  addPiedavajumsSection: (section: PiedavajumsCreatePayload) => Promise<any>;
  updatePiedavajumsSection: (id: string, section: Partial<Omit<PiedavajumsSection, '_id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deletePiedavajumsSection: (id: string) => Promise<void>;
}

const PiedavajumsContext = createContext<PiedavajumsContextType | undefined>(undefined);

export function PiedavajumsProvider({ children }: { children: React.ReactNode }) {
  const [piedavajumsSections, setPiedavajumsSections] = useState<PiedavajumsSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch piedavajums sections on mount
  useEffect(() => {
    fetchPiedavajumsSections();
  }, []);

  const fetchPiedavajumsSections = async () => {
    try {
      console.log('Fetching piedavajums sections...');
      const response = await fetch(`${API_BASE_URL}/api/piedavajums`);
      
      console.log('Response status:', response.status);
      console.log('API URL:', `${API_BASE_URL}/api/piedavajums`);
      
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch piedavajums sections: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('Piedavajums sections fetched successfully:', data);
      setPiedavajumsSections(data);
    } catch (err) {
      console.error('Error in fetchPiedavajumsSections:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch piedavajums sections');
    } finally {
      setIsLoading(false);
    }
  };

  const addPiedavajumsSection = async (sectionData: PiedavajumsCreatePayload) => {
    try {
      console.log('Attempting to create piedavajums section with data:', sectionData);
      const response = await fetch(`${API_BASE_URL}/api/piedavajums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to create piedavajums section: ${response.status} ${response.statusText}`);
      }
      
      const newSection = await response.json();
      console.log('Piedavajums section created successfully:', newSection);
      setPiedavajumsSections(prev => [...prev, newSection]);
      return newSection;
    } catch (err) {
      console.error('Error creating piedavajums section:', err);
      setError(err instanceof Error ? err.message : 'Failed to create piedavajums section');
      throw err;
    }
  };

  const updatePiedavajumsSection = async (id: string, sectionData: Partial<Omit<PiedavajumsSection, '_id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/piedavajums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData),
      });
      if (!response.ok) throw new Error('Failed to update piedavajums section');
      const updatedSection = await response.json();
      setPiedavajumsSections(prev => prev.map(section => 
        section._id === id ? updatedSection : section
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update piedavajums section');
      throw err;
    }
  };

  const deletePiedavajumsSection = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/piedavajums/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete piedavajums section');
      await fetchPiedavajumsSections(); // Reload sections from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete piedavajums section');
      throw err;
    }
  };

  return (
    <PiedavajumsContext.Provider value={{
      piedavajumsSections,
      isLoading,
      error,
      addPiedavajumsSection,
      updatePiedavajumsSection,
      deletePiedavajumsSection,
    }}>
      {children}
    </PiedavajumsContext.Provider>
  );
}

export function usePiedavajums() {
  const context = useContext(PiedavajumsContext);
  if (context === undefined) {
    throw new Error('usePiedavajums must be used within a PiedavajumsProvider');
  }
  return context;
} 