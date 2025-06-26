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
  order?: number;
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
  order?: number;
}

interface PiedavajumsHeader {
  _id?: string;
  header: string;
  introParagraph1: string;
  introParagraph2: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PiedavajumsContextType {
  piedavajumsSections: PiedavajumsSection[];
  piedavajumsHeader: PiedavajumsHeader | null;
  isLoading: boolean;
  error: string | null;
  addPiedavajumsSection: (section: PiedavajumsCreatePayload) => Promise<any>;
  updatePiedavajumsSection: (id: string, section: Partial<Omit<PiedavajumsSection, '_id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deletePiedavajumsSection: (id: string) => Promise<void>;
  updatePiedavajumsHeader: (header: Partial<Omit<PiedavajumsHeader, '_id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  reorderPiedavajumsSections: (sectionIds: string[]) => Promise<void>;
  movePiedavajumsSection: (id: string, direction: 'up' | 'down') => Promise<void>;
}

const PiedavajumsContext = createContext<PiedavajumsContextType | undefined>(undefined);

export function PiedavajumsProvider({ children }: { children: React.ReactNode }) {
  const [piedavajumsSections, setPiedavajumsSections] = useState<PiedavajumsSection[]>([]);
  const [piedavajumsHeader, setPiedavajumsHeader] = useState<PiedavajumsHeader | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch piedavajums sections on mount
  useEffect(() => {
    fetchPiedavajumsSections();
    fetchPiedavajumsHeader();
  }, []);

  const fetchPiedavajumsSections = async () => {
    try {
      console.log('Fetching piedavajums sections...');
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi`);
      
      console.log('Response status:', response.status);
      console.log('API URL:', `${API_BASE_URL}/api/piedavajumi`);
      
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
      // Sort sections by order field, with fallback to creation date
      const sortedData = data.sort((a: PiedavajumsSection, b: PiedavajumsSection) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        // Fallback to creation date if order is not set
        return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
      });
      setPiedavajumsSections(sortedData);
    } catch (err) {
      console.error('Error in fetchPiedavajumsSections:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch piedavajums sections');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPiedavajumsHeader = async () => {
    try {
      console.log('Fetching piedavajums header...');
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi/header`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Header doesn't exist yet, that's okay
          console.log('Piedavajums header not found, will be created when first updated');
          return;
        }
        throw new Error(`Failed to fetch piedavajums header: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Piedavajums header fetched successfully:', data);
      setPiedavajumsHeader(data);
    } catch (err) {
      console.error('Error in fetchPiedavajumsHeader:', err);
      // Don't set error for header fetch failure, as it might not exist yet
    }
  };

  const addPiedavajumsSection = async (sectionData: PiedavajumsCreatePayload) => {
    try {
      console.log('Attempting to create piedavajums section with data:', sectionData);
      
      // Assign order if not provided (add to end)
      const dataWithOrder = {
        ...sectionData,
        order: sectionData.order ?? piedavajumsSections.length
      };
      
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataWithOrder),
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
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete piedavajums section');
      await fetchPiedavajumsSections(); // Reload sections from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete piedavajums section');
      throw err;
    }
  };

  const updatePiedavajumsHeader = async (headerData: Partial<Omit<PiedavajumsHeader, '_id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/piedavajumi/header`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headerData),
      });
      if (!response.ok) throw new Error('Failed to update piedavajums header');
      const updatedHeader = await response.json();
      setPiedavajumsHeader(updatedHeader);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update piedavajums header');
      throw err;
    }
  };

  const reorderPiedavajumsSections = async (sectionIds: string[]) => {
    try {
      console.log('Reordering piedavajums sections:', sectionIds);
      
      // Update each section individually with its new order
      const updatePromises = sectionIds.map((id, index) => {
        console.log(`Updating section ${id} with order ${index}`);
        return updatePiedavajumsSection(id, { order: index });
      });
      
      await Promise.all(updatePromises);
      console.log('All sections reordered successfully');
      
      // Reload sections to get updated order
      await fetchPiedavajumsSections();
    } catch (err) {
      console.error('Error reordering piedavajums sections:', err);
      setError(err instanceof Error ? err.message : 'Failed to reorder piedavajums sections');
      throw err;
    }
  };

  const movePiedavajumsSection = async (id: string, direction: 'up' | 'down') => {
    try {
      const currentIndex = piedavajumsSections.findIndex(section => section._id === id);
      if (currentIndex === -1) {
        throw new Error('Section not found');
      }
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= piedavajumsSections.length) {
        throw new Error(`Cannot move section ${direction}`);
      }
      
      // Create new array with reordered sections
      const newSections = [...piedavajumsSections];
      const [movedSection] = newSections.splice(currentIndex, 1);
      newSections.splice(newIndex, 0, movedSection);
      
      // Extract IDs in new order
      const sectionIds = newSections.map(section => section._id!);
      
      // Call reorder API
      await reorderPiedavajumsSections(sectionIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move piedavajums section');
      throw err;
    }
  };

  return (
    <PiedavajumsContext.Provider value={{
      piedavajumsSections,
      piedavajumsHeader,
      isLoading,
      error,
      addPiedavajumsSection,
      updatePiedavajumsSection,
      deletePiedavajumsSection,
      updatePiedavajumsHeader,
      reorderPiedavajumsSections,
      movePiedavajumsSection,
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