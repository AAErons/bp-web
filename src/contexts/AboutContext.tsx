import React, { createContext, useContext, useState, useEffect } from 'react';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

interface AboutText {
  _id?: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AboutContextType {
  aboutText: string;
  isLoading: boolean;
  error: string | null;
  updateAboutText: (text: string) => Promise<void>;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export function AboutProvider({ children }: { children: React.ReactNode }) {
  const [aboutText, setAboutText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about text on mount
  useEffect(() => {
    fetchAboutText();
  }, []);

  const fetchAboutText = async () => {
    try {
      console.log('Fetching about text...');
      const response = await fetch(`${API_BASE_URL}/api/about-text`);
      
      console.log('Response status:', response.status);
      console.log('API URL:', `${API_BASE_URL}/api/about-text`);
      
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch about text: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('About text fetched successfully:', data);
      // If there's no about text in the database, use a default
      setAboutText(data?.text || '"Brīvrunu Projekts" ir pirmais un vienīgais repa improvizācijas kolektīvs Latvijā. Skatītāju ieteikumus, vidi un notikuma tematiku "Brīvrunu Projekts" pārvērš repa improvizācijas etīdēs, kas rada pacilājošas emocijas un pasākuma pievienoto vērtību. Astoņu gadu laikā izkoptie formāti uzrunā plašu auditoriju, neatkarīgi no vecuma vai izpratnes par repu.');
    } catch (err) {
      console.error('Error in fetchAboutText:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch about text');
      // Set default text on error
      setAboutText('"Brīvrunu Projekts" ir pirmais un vienīgais repa improvizācijas kolektīvs Latvijā. Skatītāju ieteikumus, vidi un notikuma tematiku "Brīvrunu Projekts" pārvērš repa improvizācijas etīdēs, kas rada pacilājošas emocijas un pasākuma pievienoto vērtību. Astoņu gadu laikā izkoptie formāti uzrunā plašu auditoriju, neatkarīgi no vecuma vai izpratnes par repu.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAboutText = async (text: string) => {
    try {
      console.log('Attempting to update about text with:', text);
      const response = await fetch(`${API_BASE_URL}/api/about-text`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to update about text: ${response.status} ${response.statusText}`);
      }
      
      const updatedData = await response.json();
      console.log('About text updated successfully:', updatedData);
      setAboutText(text);
    } catch (err) {
      console.error('Error updating about text:', err);
      setError(err instanceof Error ? err.message : 'Failed to update about text');
      throw err;
    }
  };

  return (
    <AboutContext.Provider value={{
      aboutText,
      isLoading,
      error,
      updateAboutText,
    }}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
} 