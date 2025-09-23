
// import api from './api';
// import { Car, CreateCarRequest, UpdateCarRequest } from '../types/car';

// export const carsService = {
//   // async getCars(): Promise<Car[]> {
//   //   const response = await api.get<Car[]>('/cars/all');
//   //   return response.data;
//   // },
//   async getCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/all');
//     return response.data;
//   },

//   async getSoldCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars/sold');
//     return response.data;
//   },

//   async getUnsoldCars(): Promise<{ data: Car[] }> {
//     const response = await api.get<{ data: Car[] }>('/cars');
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

//   // async updateCar(id: string, data: UpdateCarRequest & { imageKeys?: string[], videoKeys?: string[], youtubeLinks?: string[] }, images: File[] = [], videos: File[] = []): Promise<Car> {
//   //   const formData = new FormData();
    
//   //   if (data.title) formData.append('title', data.title);
//   //   if (data.make) formData.append('make', data.make);
//   //   if (data.description) formData.append('description', data.description);
//   //   if (data.price !== undefined) formData.append('price', data.price.toString());
//   //   if (data.status) formData.append('status', data.status);
    
//   //   if (data.factoryOptions) {
//   //     const filteredFactoryOptions = data.factoryOptions.filter(option => option.trim() !== '');
//   //     if (filteredFactoryOptions.length > 0) {
//   //       filteredFactoryOptions.forEach(option => formData.append('factoryOptions[]', option));
//   //     } else {
//   //       formData.append('factoryOptions[]', '');
//   //     }
//   //   }
    
//   //   if (data.highlights) {
//   //     const filteredHighlights = data.highlights.filter(highlight => highlight.trim() !== '');
//   //     if (filteredHighlights.length > 0) {
//   //       filteredHighlights.forEach(highlight => formData.append('highlights[]', highlight));
//   //     } else {
//   //       formData.append('highlights[]', '');
//   //     }
//   //   }
    
//   //   if (data.keyFeatures) {
//   //     const filteredKeyFeatures = data.keyFeatures.filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '');
//   //     if (filteredKeyFeatures.length > 0) {
//   //       filteredKeyFeatures.forEach((feature, index) => {
//   //         formData.append(`keyFeatures[${index}][label]`, feature.label);
//   //         formData.append(`keyFeatures[${index}][value]`, feature.value);
//   //       });
//   //     } else {
//   //       formData.append(`keyFeatures[0][label]`, '');
//   //       formData.append(`keyFeatures[0][value]`, '');
//   //     }
//   //   }
    
//   //   if (data.specifications) {
//   //     const filteredSpecifications = data.specifications.filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '');
//   //     if (filteredSpecifications.length > 0) {
//   //       filteredSpecifications.forEach((spec, index) => {
//   //         formData.append(`specifications[${index}][label]`, spec.label);
//   //         formData.append(`specifications[${index}][value]`, spec.value);
//   //       });
//   //     } else {
//   //       formData.append(`specifications[0][label]`, '');
//   //       formData.append(`specifications[0][value]`, '');
//   //     }
//   //   }
    
//   //   const filteredImageKeys = data.imageKeys ? data.imageKeys.filter(image => image.trim() !== '') : [];
//   //   if (filteredImageKeys.length > 0) {
//   //     filteredImageKeys.forEach(image => formData.append('imageKeys[]', image));
//   //   } else {
//   //     formData.append('imageKeys[]', '');
//   //   }

//   //   const filteredVideoKeys = data.videoKeys ? data.videoKeys.filter(video => video.trim() !== '') : [];
//   //   if (filteredVideoKeys.length > 0) {
//   //     filteredVideoKeys.forEach(video => formData.append('videoKeys[]', video));
//   //   } else {
//   //     formData.append('videoKeys[]', '');
//   //   }

//   //   if (data.youtubeLinks) {
//   //     const filteredYoutubeLinks = data.youtubeLinks.filter(link => link.trim() !== '');
//   //     if (filteredYoutubeLinks.length > 0) {
//   //       filteredYoutubeLinks.forEach(link => formData.append('youtubeLinks[]', link));
//   //     } else {
//   //       formData.append('youtubeLinks[]', '');
//   //     }
//   //   }

//   //   images.forEach(image => formData.append('newImages', image));
//   //   videos.forEach(video => formData.append('newVideos', video));

//   //   const response = await api.patch<Car>(`/cars/${id}`, formData, {
//   //     headers: { 'Content-Type': 'multipart/form-data' }
//   //   });
//   //   return response.data;
//   // },
//   async updateCar(id: string, data: UpdateCarRequest & { imageKeys?: string[], videoKeys?: string[], youtubeLinks?: string[] }, images: File[] = [], videos: File[] = []): Promise<Car> {
//   const formData = new FormData();

//   if (data.title) formData.append('title', data.title);
//   if (data.make) formData.append('make', data.make);
//   if (data.description) formData.append('description', data.description);
//   if (data.price !== undefined) formData.append('price', data.price.toString());
//   if (data.status) formData.append('status', data.status);

//   if (data.factoryOptions) {
//     const filteredFactoryOptions = data.factoryOptions.filter(option => option.trim() !== '');
//     if (filteredFactoryOptions.length > 0) {
//       filteredFactoryOptions.forEach(option => formData.append('factoryOptions[]', option));
//     }
//   }

//   if (data.highlights) {
//     const filteredHighlights = data.highlights.filter(highlight => highlight.trim() !== '');
//     if (filteredHighlights.length > 0) {
//       filteredHighlights.forEach(highlight => formData.append('highlights[]', highlight));
//     }
//   }

//   if (data.keyFeatures) {
//     const filteredKeyFeatures = data.keyFeatures.filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '');
//     if (filteredKeyFeatures.length > 0) {
//       filteredKeyFeatures.forEach((feature, index) => {
//         formData.append(`keyFeatures[${index}][label]`, feature.label);
//         formData.append(`keyFeatures[${index}][value]`, feature.value);
//       });
//     }
//   }

//   if (data.specifications) {
//     const filteredSpecifications = data.specifications.filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '');
//     if (filteredSpecifications.length > 0) {
//       filteredSpecifications.forEach((spec, index) => {
//         formData.append(`specifications[${index}][label]`, spec.label);
//         formData.append(`specifications[${index}][value]`, spec.value);
//       });
//     }
//   }

//   const filteredImageKeys = data.imageKeys ? data.imageKeys.filter(image => image.trim() !== '') : [];
//   if (filteredImageKeys.length > 0) {
//     filteredImageKeys.forEach(image => formData.append('imageKeys[]', image));
//   }

//   const filteredVideoKeys = data.videoKeys ? data.videoKeys.filter(video => video.trim() !== '') : [];
//   if (filteredVideoKeys.length > 0) {
//     filteredVideoKeys.forEach(video => formData.append('videoKeys[]', video));
//   }

//   // Only append youtubeLinks if there are valid URLs
//   if (data.youtubeLinks) {
//     const filteredYoutubeLinks = data.youtubeLinks.filter(link => link.trim() !== '' && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link));
//     if (filteredYoutubeLinks.length > 0) {
//       filteredYoutubeLinks.forEach(link => formData.append('youtubeLinks[]', link));
//     }
//   }

//   images.forEach(image => formData.append('newImages', image));
//   videos.forEach(video => formData.append('newVideos', video));

//   const response = await api.patch<Car>(`/cars/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// },
//   async markAsSold(id: string): Promise<Car> {
//     const response = await api.patch<Car>(`/cars/${id}/sold`);
//     return response.data;
//   },

//   async deleteCar(id: string): Promise<void> {
//     await api.delete(`/cars/${id}`);
//   },

//   async toggleSoldStatus(id: string): Promise<Car> {
//     const response = await api.patch<Car>(`/cars/${id}/sold`);
//     return response.data;
//   }
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
    const response = await api.get<{ data: Car[] }>('/cars');
    return response.data;
  },

  async getDepositCars(): Promise<{ data: Car[] }> {
    const response = await api.get<{ data: Car[] }>('/cars/deposit');
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

   async updateCar(id: string, data: UpdateCarRequest & { imageKeys?: string[], videoKeys?: string[], youtubeLinks?: string[] }, images: File[] = [], videos: File[] = []): Promise<Car> {
  const formData = new FormData();

  if (data.title) formData.append('title', data.title);
  if (data.make) formData.append('make', data.make);
  if (data.description) formData.append('description', data.description);
  if (data.price !== undefined) formData.append('price', data.price.toString());
  if (data.status) formData.append('status', data.status);

  if (data.factoryOptions) {
    const filteredFactoryOptions = data.factoryOptions.filter(option => option.trim() !== '');
    if (filteredFactoryOptions.length > 0) {
      filteredFactoryOptions.forEach(option => formData.append('factoryOptions[]', option));
    }
  }

  if (data.highlights) {
    const filteredHighlights = data.highlights.filter(highlight => highlight.trim() !== '');
    if (filteredHighlights.length > 0) {
      filteredHighlights.forEach(highlight => formData.append('highlights[]', highlight));
    }
  }

  if (data.keyFeatures) {
    const filteredKeyFeatures = data.keyFeatures.filter(feature => feature.label.trim() !== '' && feature.value.trim() !== '');
    if (filteredKeyFeatures.length > 0) {
      filteredKeyFeatures.forEach((feature, index) => {
        formData.append(`keyFeatures[${index}][label]`, feature.label);
        formData.append(`keyFeatures[${index}][value]`, feature.value);
      });
    }
  }

  if (data.specifications) {
    const filteredSpecifications = data.specifications.filter(spec => spec.label.trim() !== '' && spec.value.trim() !== '');
    if (filteredSpecifications.length > 0) {
      filteredSpecifications.forEach((spec, index) => {
        formData.append(`specifications[${index}][label]`, spec.label);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    }
  }

  const filteredImageKeys = data.imageKeys ? data.imageKeys.filter(image => image.trim() !== '') : [];
  if (filteredImageKeys.length > 0) {
    filteredImageKeys.forEach(image => formData.append('imageKeys[]', image));
  }

  const filteredVideoKeys = data.videoKeys ? data.videoKeys.filter(video => video.trim() !== '') : [];
  if (filteredVideoKeys.length > 0) {
    filteredVideoKeys.forEach(video => formData.append('videoKeys[]', video));
  }

  // Only append youtubeLinks if there are valid URLs
  if (data.youtubeLinks) {
    const filteredYoutubeLinks = data.youtubeLinks.filter(link => link.trim() !== '' && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link));
    if (filteredYoutubeLinks.length > 0) {
      filteredYoutubeLinks.forEach(link => formData.append('youtubeLinks[]', link));
    }
  }

  images.forEach(image => formData.append('newImages', image));
  videos.forEach(video => formData.append('newVideos', video));

  const response = await api.patch<Car>(`/cars/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
},

  async cycleStatus(id: string): Promise<Car> {
    const response = await api.patch<Car>(`/cars/${id}/status`);
    return response.data;
  },

  async deleteCar(id: string): Promise<void> {
    await api.delete(`/cars/${id}`);
  },
};