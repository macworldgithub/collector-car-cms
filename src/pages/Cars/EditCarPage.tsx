
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { carsService } from '../../services/cars';
// import { Car, UpdateCarRequest } from '../../types/car';
// import CarForm from '../../components/Forms/CarForm';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// export default function EditCarPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [car, setCar] = useState<Car | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCar = async () => {
//     try {
//       if (!id) {
//         toast.error('Invalid car ID');
//         navigate('/dashboard');
//         return;
//       }
//       const data = await carsService.getCar(id);
//       setCar(data);
//     } catch (error: any) {
//       toast.error('Failed to fetch car');
//       navigate('/dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (
//     data: UpdateCarRequest,
//     images: File[],
//     videos: File[],
//     existingImages: { key: string; orientation: 'portrait' | 'landscape' }[],
//     existingVideos: string[],
//     youtubeLinks: string[]
//   ) => {
//     try {
//       if (!id) {
//         toast.error('Invalid car ID');
//         return;
//       }
//       await carsService.updateCar(id, {
//         ...data,
//         imageKeys: existingImages.length > 0 ? existingImages : undefined,
//         videoKeys: existingVideos.length > 0 ? existingVideos : undefined,
//         youtubeLinks: youtubeLinks.length > 0 ? youtubeLinks : undefined,
//       }, images, videos);
//       toast.success('Car updated successfully!');
//       navigate('/dashboard');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to update car');
//     }
//   };

//   useEffect(() => {
//     fetchCar();
//   }, [id]);

//   if (loading) return <LoadingSpinner />;
//   if (!car) return <div>Car not found</div>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <CarForm initialData={car} onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { carsService } from '../../services/cars';
import { Car, UpdateCarRequest } from '../../types/car';
import CarForm from '../../components/Forms/CarForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCar = async () => {
    try {
      if (!id) {
        toast.error('Invalid car ID');
        navigate('/dashboard');
        return;
      }
      const data = await carsService.getCar(id);
      setCar(data);
    } catch (error: any) {
      toast.error('Failed to fetch car');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    data: UpdateCarRequest,
    images: File[] = [],
    videos: File[] = []
  ) => {
    try {
      if (!id) {
        toast.error('Invalid car ID');
        return;
      }
      await carsService.updateCar(id, data, images, videos);
      toast.success(data.isDraft ? 'Draft updated successfully!' : 'Car updated successfully!');
      navigate(data.isDraft ? '/drafts' : '/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update car');
    }
  };

  const handlePublish = async () => {
    try {
      if (!id) {
        toast.error('Invalid car ID');
        return;
      }
      await carsService.publish(id);
      toast.success('Car published successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to publish car');
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <CarForm 
          initialData={car} 
          onSubmit={handleSubmit} 
          onPublish={car.isDraft ? handlePublish : undefined}
          isNew={false}
          isDraft={car.isDraft}
        />
      </div>
    </div>
  );
}