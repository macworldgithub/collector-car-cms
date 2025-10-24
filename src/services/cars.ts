
// import api from './api';
// import { Car, CreateCarRequest, UpdateCarRequest } from '../types/car';

// export const carsService = {
//   async getCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/all');
//     return response.data;
//   },

//   async getSoldCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/sold');
//     return response.data;
//   },

//   async getUnsoldCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/unsold-strict');
//     return response.data;
//   },

//   async getDepositCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/deposit');
//     return response.data;
//   },

//   async getCar(id: string): Promise<Car> {
//     const response = await api.get<Car>(`/cars/${id}`);
//     return response.data;
//   },

//   async createCar(data: CreateCarRequest, images: File[], videos: File[]): Promise<Car> {
//     const formData = new FormData();
    
//     formData.append('title', data.title);
//     formData.append('make', data.make);
//     if (data.description) formData.append('description', data.description);
//     if (data.price !== undefined) formData.append('price', data.price.toString());
//     if (data.status) formData.append('status', data.status);
    
//     data.factoryOptions
//       ?.filter(option => option.trim() !== '')
//       .forEach(option => formData.append('factoryOptions[]', option));
    
//     data.highlights
//       ?.filter(highlight => highlight.trim() !== '')
//       .forEach(highlight => formData.append('highlights[]', highlight));
    
//     data.keyFeatures
//       ?.filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '')
//       .forEach((feature, index) => {
//         formData.append(`keyFeatures[${index}][label]`, feature.label);
//         formData.append(`keyFeatures[${index}][value]`, feature.value);
//       });
    
//     data.specifications
//       ?.filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '')
//       .forEach((spec, index) => {
//         formData.append(`specifications[${index}][label]`, spec.label);
//         formData.append(`specifications[${index}][value]`, spec.value);
//       });
    
//     // Append existing imageKeys as objects
//     data.imageKeys
//       ?.filter(img => img.key.trim() !== '')
//       .forEach((img, index) => {
//         formData.append(`imageKeys[${index}][key]`, img.key);
//         formData.append(`imageKeys[${index}][orientation]`, img.orientation);
//       });
    
//     images.forEach(image => formData.append('images', image));
//     videos.forEach(video => formData.append('videos', video));
    
//     if (data.youtubeLinks && data.youtubeLinks.length > 0) {
//       data.youtubeLinks
//         .filter(link => link.trim() !== '')
//         .forEach(link => formData.append('youtubeLinks[]', link));
//     }

//     const response = await api.post<Car>('/cars', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },

//   async updateCar(
//     id: string,
//     data: UpdateCarRequest,
//     images: File[] = [],
//     videos: File[] = []
//   ): Promise<Car> {
//     const formData = new FormData();

//     if (data.title) formData.append('title', data.title);
//     if (data.make) formData.append('make', data.make);
//     if (data.description) formData.append('description', data.description);
//     if (data.price !== undefined) formData.append('price', data.price.toString());
//     if (data.status) formData.append('status', data.status);

//     if (data.factoryOptions) {
//       const filteredFactoryOptions = data.factoryOptions.filter((option) => option.trim() !== '');
//       filteredFactoryOptions.forEach((option) => formData.append('factoryOptions[]', option));
//     }

//     if (data.highlights) {
//       const filteredHighlights = data.highlights.filter((highlight) => highlight.trim() !== '');
//       filteredHighlights.forEach((highlight) => formData.append('highlights[]', highlight));
//     }

//     if (data.keyFeatures) {
//       const filteredKeyFeatures = data.keyFeatures.filter(
//         (feature) => feature.label.trim() !== '' && feature.value.trim() !== ''
//       );
//       filteredKeyFeatures.forEach((feature, index) => {
//         formData.append(`keyFeatures[${index}][label]`, feature.label);
//         formData.append(`keyFeatures[${index}][value]`, feature.value);
//       });
//     }

//     if (data.specifications) {
//       const filteredSpecifications = data.specifications.filter(
//         (spec) => spec.label.trim() !== '' && spec.value.trim() !== ''
//       );
//       filteredSpecifications.forEach((spec, index) => {
//         formData.append(`specifications[${index}][label]`, spec.label);
//         formData.append(`specifications[${index}][value]`, spec.value);
//       });
//     }

//     // Append retained imageKeys as objects
//     (data.imageKeys || []).forEach((img, index) => {
//       formData.append(`imageKeys[${index}][key]`, img.key);
//       formData.append(`imageKeys[${index}][orientation]`, img.orientation);
//     });

//     // Append retained videoKeys
//     (data.videoKeys || []).forEach((video) => formData.append('videoKeys[]', video));

//     // Append youtubeLinks if valid
//     if (data.youtubeLinks) {
//       const filteredYoutubeLinks = data.youtubeLinks.filter(
//         (link) => link.trim() !== '' && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
//       );
//       filteredYoutubeLinks.forEach((link) => formData.append('youtubeLinks[]', link));
//     }

//     images.forEach((image) => formData.append('newImages', image));
//     videos.forEach((video) => formData.append('newVideos', video));

//     const response = await api.patch<Car>(`/cars/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   },

//   async cycleStatus(id: string): Promise<Car> {
//     const response = await api.patch<Car>(`/cars/${id}/status`);
//     return response.data;
//   },

//   async deleteCar(id: string): Promise<void> {
//     await api.delete(`/cars/${id}`);
//   },
// };
import api from './api';
import { Car, CreateCarRequest, UpdateCarRequest } from '../types/car';

export const carsService = {
  async getCars(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/all');
    return response.data;
  },

  async getSoldCars(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/sold');
    return response.data;
  },

  async getUnsoldCars(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/unsold-strict');
    return response.data;
  },

  async getDepositCars(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/deposit');
    return response.data;
  },

  async getDrafts(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/drafts');
    return response.data;
  },

  async getCar(id: string): Promise<Car> {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  async createCar(data: CreateCarRequest, images: File[], videos: File[]): Promise<Car> {
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('make', data.make);
    if (data.description) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.status) formData.append('status', data.status);
    if (data.isDraft !== undefined) formData.append('isDraft', data.isDraft.toString());
    
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
    
    // Append existing imageKeys as objects
    data.imageKeys
      ?.filter(img => img.key.trim() !== '')
      .forEach((img, index) => {
        formData.append(`imageKeys[${index}][key]`, img.key);
        formData.append(`imageKeys[${index}][orientation]`, img.orientation);
      });
    
    images.forEach(image => formData.append('images', image));
    videos.forEach(video => formData.append('videos', video));
    
    if (data.youtubeLinks && data.youtubeLinks.length > 0) {
      data.youtubeLinks
        .filter(link => link.trim() !== '')
        .forEach(link => formData.append('youtubeLinks[]', link));
    }

    const response = await api.post<Car>('/cars', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async updateCar(
    id: string,
    data: UpdateCarRequest,
    images: File[] = [],
    videos: File[] = []
  ): Promise<Car> {
    const formData = new FormData();

    if (data.title) formData.append('title', data.title);
    if (data.make) formData.append('make', data.make);
    if (data.description) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.status) formData.append('status', data.status);
    if (data.isDraft !== undefined) formData.append('isDraft', data.isDraft.toString());

    if (data.factoryOptions) {
      const filteredFactoryOptions = data.factoryOptions.filter((option) => option.trim() !== '');
      filteredFactoryOptions.forEach((option) => formData.append('factoryOptions[]', option));
    }

    if (data.highlights) {
      const filteredHighlights = data.highlights.filter((highlight) => highlight.trim() !== '');
      filteredHighlights.forEach((highlight) => formData.append('highlights[]', highlight));
    }

    if (data.keyFeatures) {
      const filteredKeyFeatures = data.keyFeatures.filter(
        (feature) => feature.label.trim() !== '' && feature.value.trim() !== ''
      );
      filteredKeyFeatures.forEach((feature, index) => {
        formData.append(`keyFeatures[${index}][label]`, feature.label);
        formData.append(`keyFeatures[${index}][value]`, feature.value);
      });
    }

    if (data.specifications) {
      const filteredSpecifications = data.specifications.filter(
        (spec) => spec.label.trim() !== '' && spec.value.trim() !== ''
      );
      filteredSpecifications.forEach((spec, index) => {
        formData.append(`specifications[${index}][label]`, spec.label);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    }

    // Append retained imageKeys as objects
    (data.imageKeys || []).forEach((img, index) => {
      formData.append(`imageKeys[${index}][key]`, img.key);
      formData.append(`imageKeys[${index}][orientation]`, img.orientation);
    });

    // Append retained videoKeys
    (data.videoKeys || []).forEach((video) => formData.append('videoKeys[]', video));

    // Append youtubeLinks if valid
    if (data.youtubeLinks) {
      const filteredYoutubeLinks = data.youtubeLinks.filter(
        (link) => link.trim() !== '' && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
      );
      filteredYoutubeLinks.forEach((link) => formData.append('youtubeLinks[]', link));
    }

    images.forEach((image) => formData.append('newImages', image));
    videos.forEach((video) => formData.append('newVideos', video));

    const response = await api.patch<Car>(`/cars/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async cycleStatus(id: string): Promise<Car> {
    const response = await api.patch<Car>(`/cars/${id}/status`);
    return response.data;
  },

  async publish(id: string): Promise<Car> {
    const response = await api.patch<Car>(`/cars/${id}/publish`);
    return response.data;
  },

  async deleteCar(id: string): Promise<void> {
    await api.delete(`/cars/${id}`);
  },
};