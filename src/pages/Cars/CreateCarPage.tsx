
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { carsService } from '../../services/cars';
import { CreateCarRequest } from '../../types/car';
import CarForm from '../../components/Forms/CarForm';

export default function CreateCarPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateCarRequest, images: File[], existingImages: string[]) => {
    try {
      await carsService.createCar(data, images);
      toast.success('Car created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create car');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <CarForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}