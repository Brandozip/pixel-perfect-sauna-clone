import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/hooks/useContactForm";
import LoadingSpinner from "@/components/ui/loading-spinner";

const ContactForm: React.FC = () => {
  const { formData, isSubmitting, handleChange, submitForm } = useContactForm();

  return (
    <form 
      onSubmit={submitForm} 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name*
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address*
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="service_interested_in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Interested In
          </label>
          <select
            id="service_interested_in"
            name="service_interested_in"
            value={formData.service_interested_in}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a Service</option>
            <option value="Traditional Finnish Sauna">Traditional Finnish Sauna</option>
            <option value="Infrared Sauna">Infrared Sauna</option>
            <option value="Custom Sauna Design">Custom Sauna Design</option>
            <option value="Residential Sauna">Residential Sauna</option>
            <option value="Commercial Sauna">Commercial Sauna</option>
            <option value="Outdoor Sauna">Outdoor Sauna</option>
            <option value="Steam Shower">Steam Shower</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message*
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us about your project..."
          className="w-full min-h-[120px]"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
};

export default ContactForm;
