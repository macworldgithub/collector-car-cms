import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { testimonialsService } from '../../services/testimonials';
import { Testimonial } from '../../types/testimonial';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

interface TestimonialFormProps {
  initialData?: Testimonial;
}

interface FormData {
  name: string;
  location?: string;
  message: string;
  highlight?: string;
}

export default function TestimonialForm({ initialData }: TestimonialFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id && !initialData);
  const [testimonialData, setTestimonialData] = useState<Testimonial | null>(initialData || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: testimonialData?.name || '',
      location: testimonialData?.location || '',
      message: testimonialData?.message || '',
      highlight: testimonialData?.highlight || '',
    },
  });

  useEffect(() => {
    if (id && !initialData) {
      const fetchTestimonial = async () => {
        try {
          setIsLoading(true);
          const data = await testimonialsService.getTestimonial(id);
          setTestimonialData(data);
          reset({
            name: data.name,
            location: data.location || '',
            message: data.message,
            highlight: data.highlight || '',
          });
        } catch (error: any) {
          toast.error('Failed to load testimonial');
          navigate('/testimonials');
        } finally {
          setIsLoading(false);
        }
      };
      fetchTestimonial();
    }
  }, [id, initialData, reset, navigate]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (id || initialData) {
        const testimonialId = id || initialData?._id;
        await testimonialsService.updateTestimonial(testimonialId!, data);
        toast.success('Testimonial updated successfully!');
      } else {
        await testimonialsService.createTestimonial(data);
        toast.success('Testimonial created successfully!');
      }
      navigate('/testimonials');
    } catch (error: any) {
      toast.error('Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {(id || initialData) ? 'Edit Testimonial' : 'Create Testimonial'}
      </h1>

      <Input
        label="Name"
        {...register('name', { required: 'Name is required', setValueAs: (v) => v.trim() })}
        error={errors.name?.message}
      />
      <Input
        label="Location (Optional)"
        {...register('location', { setValueAs: (v) => v.trim() })}
        error={errors.location?.message}
      />
      <Input
        label="Highlight (Optional)"
        {...register('highlight', { setValueAs: (v) => v.trim() })}
        error={errors.highlight?.message}
      />

      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          {...register('message', { required: 'Message is required', setValueAs: (v) => v.trim() })}
          className={`w-full p-2 border rounded-md ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={6}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/testimonials')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (id || initialData) ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </div>
    </form>
  );
}