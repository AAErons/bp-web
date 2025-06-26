import React, { createContext, useContext, useState, useEffect } from 'react';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

interface Testimonial {
  _id?: string;
  company: string;
  testimonial: string;
  signature: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialCreatePayload {
  company: string;
  testimonial: string;
  signature: string;
}

interface TestimonialsContextType {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  addTestimonial: (testimonial: TestimonialCreatePayload) => Promise<any>;
  updateTestimonial: (id: string, testimonial: Partial<Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined);

export function TestimonialsProvider({ children }: { children: React.ReactNode }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials on mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials...');
      const response = await fetch(`${API_BASE_URL}/api/testimonials`);
      
      console.log('Response status:', response.status);
      console.log('API URL:', `${API_BASE_URL}/api/testimonials`);
      
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('Testimonials fetched successfully:', data);
      setTestimonials(data);
    } catch (err) {
      console.error('Error in fetchTestimonials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const addTestimonial = async (testimonialData: TestimonialCreatePayload) => {
    try {
      console.log('Attempting to create testimonial with data:', testimonialData);
      const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to create testimonial: ${response.status} ${response.statusText}`);
      }
      
      const newTestimonial = await response.json();
      console.log('Testimonial created successfully:', newTestimonial);
      setTestimonials(prev => [...prev, newTestimonial]);
      return newTestimonial;
    } catch (err) {
      console.error('Error creating testimonial:', err);
      setError(err instanceof Error ? err.message : 'Failed to create testimonial');
      throw err;
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });
      if (!response.ok) throw new Error('Failed to update testimonial');
      const updatedTestimonial = await response.json();
      setTestimonials(prev => prev.map(testimonial => 
        testimonial._id === id ? updatedTestimonial : testimonial
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update testimonial');
      throw err;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete testimonial');
      await fetchTestimonials(); // Reload testimonials from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
      throw err;
    }
  };

  return (
    <TestimonialsContext.Provider value={{
      testimonials,
      isLoading,
      error,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
    }}>
      {children}
    </TestimonialsContext.Provider>
  );
}

export function useTestimonials() {
  const context = useContext(TestimonialsContext);
  if (context === undefined) {
    throw new Error('useTestimonials must be used within a TestimonialsProvider');
  }
  return context;
} 