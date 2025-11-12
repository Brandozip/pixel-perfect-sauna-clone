import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { trackFormSubmission } from '@/utils/analytics';
import { useGeoCheck } from '@/hooks/useGeoCheck';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service_interested_in?: string;
  message: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service_interested_in: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const hasStartedForm = useRef(false);
  const { isAllowed, message: geoMessage, isLoading: geoLoading } = useGeoCheck();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Track form start on first interaction
    if (!hasStartedForm.current) {
      hasStartedForm.current = true;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service_interested_in: '',
      message: ''
    });
    hasStartedForm.current = false;
  };

  const contactSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
    phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional(),
    message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters'),
  });

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const firstError = result.error.issues[0];
      toast({
        title: 'Validation Error',
        description: firstError.message,
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const submitForm = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Check geo-location restriction
    if (!isAllowed) {
      toast({
        title: 'Service Unavailable',
        description: geoMessage || 'This service is only available to visitors from the United States.',
        variant: 'destructive',
      });
      return false;
    }

    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Submit to Supabase database for admin panel
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service_interested_in: formData.service_interested_in || null,
          message: formData.message,
        }])
        .select();

      if (error) {
        throw error;
      }

      // Also submit to Formspree for client email notifications
      const formspreeData = new FormData();
      formspreeData.append('name', formData.name);
      formspreeData.append('email', formData.email);
      if (formData.phone) formspreeData.append('phone', formData.phone);
      if (formData.service_interested_in) formspreeData.append('service', formData.service_interested_in);
      formspreeData.append('message', formData.message);

      await fetch('https://formspree.io/f/mkgrprdn', {
        method: 'POST',
        body: formspreeData,
        headers: {
          'Accept': 'application/json'
        }
      });

      toast({
        title: 'Message Sent!',
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      // Track successful form submission
      trackFormSubmission('contact_form');
      
      resetForm();
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    submitForm,
    resetForm,
    isGeoAllowed: isAllowed,
    geoMessage,
    isGeoLoading: geoLoading,
  };
}
