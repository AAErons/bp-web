import React, { createContext, useContext, useState, useEffect } from 'react';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

interface Partner {
  _id?: string;
  name: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PartnerCreatePayload {
  name: string;
  logo: string;
}

interface PartnersContextType {
  partners: Partner[];
  isLoading: boolean;
  error: string | null;
  addPartner: (partner: PartnerCreatePayload) => Promise<any>;
  updatePartner: (id: string, partner: Partial<Omit<Partner, '_id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export function PartnersProvider({ children }: { children: React.ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch partners on mount
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      console.log('Fetching partners...');
      const response = await fetch(`${API_BASE_URL}/api/partners`);
      
      console.log('Response status:', response.status);
      console.log('API URL:', `${API_BASE_URL}/api/partners`);
      
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch partners: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('Partners fetched successfully:', data);
      setPartners(data);
    } catch (err) {
      console.error('Error in fetchPartners:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch partners');
    } finally {
      setIsLoading(false);
    }
  };

  const addPartner = async (partnerData: PartnerCreatePayload) => {
    try {
      console.log('Attempting to create partner with data:', partnerData);
      const response = await fetch(`${API_BASE_URL}/api/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to create partner: ${response.status} ${response.statusText}`);
      }
      
      const newPartner = await response.json();
      console.log('Partner created successfully:', newPartner);
      setPartners(prev => [...prev, newPartner]);
      return newPartner;
    } catch (err) {
      console.error('Error creating partner:', err);
      setError(err instanceof Error ? err.message : 'Failed to create partner');
      throw err;
    }
  };

  const updatePartner = async (id: string, partnerData: Partial<Omit<Partner, '_id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData),
      });
      if (!response.ok) throw new Error('Failed to update partner');
      const updatedPartner = await response.json();
      setPartners(prev => prev.map(partner => 
        partner._id === id ? updatedPartner : partner
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update partner');
      throw err;
    }
  };

  const deletePartner = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/partners/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete partner');
      await fetchPartners(); // Reload partners from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete partner');
      throw err;
    }
  };

  return (
    <PartnersContext.Provider value={{
      partners,
      isLoading,
      error,
      addPartner,
      updatePartner,
      deletePartner,
    }}>
      {children}
    </PartnersContext.Provider>
  );
}

export function usePartners() {
  const context = useContext(PartnersContext);
  if (context === undefined) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
} 