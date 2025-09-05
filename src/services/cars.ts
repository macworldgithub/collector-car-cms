import api from './api';
import { Car, CreateCarRequest, UpdateCarRequest } from '../types/car';

export const carsService = {
  async getCars(): Promise<Car[]> {
    const response = await api.get<Car[]>('/cars');
    return response.data;
  },

  async getCar(id: string): Promise<Car> {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  async createCar(data: CreateCarRequest, images: File[]): Promise<Car> {
    const formData = new FormData();
    
    // Append basic fields
    formData.append('title', data.title);
    formData.append('make', data.make);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('status', data.status);
    
    // Append factoryOptions as array
    data.factoryOptions
      .filter(option => option.trim() !== '')
      .forEach(option => formData.append('factoryOptions[]', option));
    
    // Append highlights as array
    data.highlights
      .filter(highlight => highlight.trim() !== '')
      .forEach(highlight => formData.append('highlights[]', highlight));
    
    // Append keyFeatures as array of objects
    data.keyFeatures
      .filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '')
      .forEach((feature, index) => {
        formData.append(`keyFeatures[${index}][label]`, feature.label);
        formData.append(`keyFeatures[${index}][value]`, feature.value);
      });
    
    // Append specifications as array of objects
    data.specifications
      .filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '')
      .forEach((spec, index) => {
        formData.append(`specifications[${index}][label]`, spec.label);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    
    // Append images
    images.forEach(image => formData.append('images', image));

    const response = await api.post<Car>('/cars', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async updateCar(id: string, data: UpdateCarRequest, images?: File[]): Promise<Car> {
    const formData = new FormData();
    
    // Append updated data (only if provided)
    if (data.title) formData.append('title', data.title);
    if (data.make) formData.append('make', data.make);
    if (data.description) formData.append('description', data.description);
    if (data.price) formData.append('price', data.price.toString());
    if (data.status) formData.append('status', data.status);
    
    // Append factoryOptions as array (only if provided)
    if (data.factoryOptions) {
      data.factoryOptions
        .filter(option => option.trim() !== '')
        .forEach(option => formData.append('factoryOptions[]', option));
    }
    
    // Append highlights as array (only if provided)
    if (data.highlights) {
      data.highlights
        .filter(highlight => highlight.trim() !== '')
        .forEach(highlight => formData.append('highlights[]', highlight));
    }
    
    // Append keyFeatures as array of objects (only if provided)
    if (data.keyFeatures) {
      data.keyFeatures
        .filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '')
        .forEach((feature, index) => {
          formData.append(`keyFeatures[${index}][label]`, feature.label);
          formData.append(`keyFeatures[${index}][value]`, feature.value);
        });
    }
    
    // Append specifications as array of objects (only if provided)
    if (data.specifications) {
      data.specifications
        .filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '')
        .forEach((spec, index) => {
          formData.append(`specifications[${index}][label]`, spec.label);
          formData.append(`specifications[${index}][value]`, spec.value);
        });
    }
    
    // Append new images if provided
    if (images) {
      images.forEach(image => formData.append('images', image));
    }

    const response = await api.patch<Car>(`/cars/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async markAsSold(id: string): Promise<Car> {
    const response = await api.patch<Car>(`/cars/${id}/sold`);
    return response.data;
  },

  async deleteCar(id: string): Promise<void> {
    await api.delete(`/cars/${id}`);
  },
};