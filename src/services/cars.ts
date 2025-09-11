
import api from './api';
import { Car, CreateCarRequest, UpdateCarRequest } from '../types/car';

export const carsService = {
  async getCars(): Promise<Car[]> {
    const response = await api.get<Car[]>('/cars/all');
    return response.data;
  },

  async getCar(id: string): Promise<Car> {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  async createCar(data: CreateCarRequest, images: File[]): Promise<Car> {
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('make', data.make);
    if (data.description) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.status) formData.append('status', data.status);
    
    data.factoryOptions
      ?.filter(option => option.trim() !== '')
      .forEach(option => formData.append('factoryOptions[]', option));
    
    data.highlights
      ?.filter(highlight => highlight.trim() !== '')
      .forEach(highlight => formData.append('highlights[]', highlight));
    
    data.keyFeatures
      ?.filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '')
      .forEach((feature, index) => {
        formData.append(`keyFeatures[${index}][label]`, feature.label);
        formData.append(`keyFeatures[${index}][value]`, feature.value);
      });
    
    data.specifications
      ?.filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '')
      .forEach((spec, index) => {
        formData.append(`specifications[${index}][label]`, spec.label);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    
    images.forEach(image => formData.append('images', image));

    const response = await api.post<Car>('/cars', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async updateCar(id: string, data: UpdateCarRequest & { imageKeys?: string[] }, images: File[] = []): Promise<Car> {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.make) formData.append('make', data.make);
    if (data.description) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.status) formData.append('status', data.status);
    
    if (data.factoryOptions) {
      data.factoryOptions
        .filter(option => option.trim() !== '')
        .forEach(option => formData.append('factoryOptions[]', option));
    }
    
    if (data.highlights) {
      data.highlights
        .filter(highlight => highlight.trim() !== '')
        .forEach(highlight => formData.append('highlights[]', highlight));
    }
    
    if (data.keyFeatures) {
      data.keyFeatures
        .filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '')
        .forEach((feature, index) => {
          formData.append(`keyFeatures[${index}][label]`, feature.label);
          formData.append(`keyFeatures[${index}][value]`, feature.value);
        });
    }
    
    if (data.specifications) {
      data.specifications
        .filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '')
        .forEach((spec, index) => {
          formData.append(`specifications[${index}][label]`, spec.label);
          formData.append(`specifications[${index}][value]`, spec.value);
        });
    }
    
    if (data.imageKeys && data.imageKeys.length > 0) {
      data.imageKeys
        .filter(image => image.trim() !== '')
        .forEach(image => formData.append('imageKeys[]', image));
    } else {
      formData.append('imageKeys[]', '');
    }

    images.forEach(image => formData.append('newImages', image));

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