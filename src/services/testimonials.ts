import api from './api';
import { Testimonial } from '../types/testimonial';

export const testimonialsService = {
  async getTestimonials(page?: number, limit?: number): Promise<{ data: Testimonial[]; total: number }> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    const response = await api.get<{ data: Testimonial[]; total: number }>(`/testimonials?${params.toString()}`);
    return response.data;
  },

  async getTestimonial(id: string): Promise<Testimonial> {
    const response = await api.get<Testimonial>(`/testimonials/${id}`);
    return response.data;
  },

  async createTestimonial(data: { name: string; location?: string; message: string; highlight?: string }): Promise<Testimonial> {
    const response = await api.post<Testimonial>('/testimonials', data);
    return response.data;
  },

  async updateTestimonial(id: string, data: { name?: string; location?: string; message?: string; highlight?: string }): Promise<Testimonial> {
    const response = await api.patch<Testimonial>(`/testimonials/${id}`, data);
    return response.data;
  },

  async deleteTestimonial(id: string): Promise<void> {
    await api.delete(`/testimonials/${id}`);
  },
};