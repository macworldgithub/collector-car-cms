import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { testimonialsService } from '../../services/testimonials';
import { Testimonial } from '../../types/testimonial';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsService.getTestimonials(page, limit);
      setTestimonials(response.data);
      setTotal(response.total);
    } catch (error: any) {
      toast.error('Failed to fetch testimonials');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialsService.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id));
      toast.success('Testimonial deleted successfully!');
    } catch (error: any) {
      toast.error('Failed to delete testimonial');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Testimonials</h1>
        <Link to="/testimonials/create">
          <Button className="flex items-center w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add New Testimonial
          </Button>
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">No testimonials found. Start by adding your first testimonial!</p>
          <Link to="/testimonials/create" className="mt-4 inline-block">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="space-y-4">
                <div className="w-full">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {testimonial.name}
                    {testimonial.location && ` - ${testimonial.location}`}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-3 sm:line-clamp-2">
                    {testimonial.message}
                  </p>
                  {testimonial.highlight && (
                    <p className="text-blue-600 font-semibold mt-2 text-sm sm:text-base truncate">
                      {testimonial.highlight}
                    </p>
                  )}
                </div>
                <div className="flex justify-between sm:flex-row sm:gap-3 sm:justify-end">
                  <Link to={`/testimonials/${testimonial._id}/edit`}>
                    <Button size="sm" variant="secondary" className="min-w-[80px]">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(testimonial._id)}
                    className="min-w-[80px]"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {total > limit && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <Button
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1)}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              <Button
                disabled={page * limit >= total}
                onClick={() => setPage(prev => prev + 1)}
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}