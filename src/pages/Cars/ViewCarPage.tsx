
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { carsService } from '../../services/cars';
import { Car } from '../../types/car';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function ViewCarPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchCar = async () => {
    try {
      if (!id) return;
      const data = await carsService.getCar(id);
      setCar(data);
    } catch (error: any) {
      toast.error('Failed to fetch car');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard">
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link to={`/cars/${car._id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Car
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {car.images.length > 0 && (
          <div className="relative h-96 bg-gray-200">
            <img
              src={car.images[currentImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover"
            />
            {car.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {car.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  car.status === 'sold'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {car.status === 'sold' ? 'SOLD' : 'AVAILABLE'}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-xl text-gray-600">{car.make}</span>
              <span className="text-3xl font-bold text-blue-600">
                ${car.price.toLocaleString()}
              </span>
            </div>
          </div>

          {car.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{car.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {car.factoryOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Factory Options</h3>
                <ul className="list-disc list-inside space-y-1">
                  {car.factoryOptions.map((option, index) => (
                    <li key={index} className="text-gray-700">{option}</li>
                  ))}
                </ul>
              </div>
            )}

            {car.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                <ul className="list-disc list-inside space-y-1">
                  {car.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-700">{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {car.keyFeatures.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  {car.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-900">{feature.label}:</span>
                      <span className="text-gray-700">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {car.specifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="space-y-2">
                  {car.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-900">{spec.label}:</span>
                      <span className="text-gray-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}