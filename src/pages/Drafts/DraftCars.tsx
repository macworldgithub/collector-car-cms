import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { carsService } from "../../services/cars";
import { Car } from "../../types/car";
import Button from "../../components/UI/Button";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

export default function Drafts() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await carsService.getDrafts();
      setCars(
        Array.isArray(response.data) ? response.data : response.data?.data || []
      );
    } catch (error: any) {
      toast.error("Failed to fetch drafts");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    if (!window.confirm("Are you sure you want to publish this draft?")) return;

    try {
      await carsService.publish(id);
      setCars((prev) => prev.filter((car) => car._id !== id));
      toast.success("Car published successfully!");
    } catch (error: any) {
      toast.error("Failed to publish car");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;

    try {
      await carsService.deleteCar(id);
      setCars((prev) => prev.filter((car) => car._id !== id));
      toast.success("Draft deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete draft");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Draft Cars</h1>
        <Link to="/cars/create">
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2 hidden sm:inline" />
            Add New Car
          </Button>
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No drafts found. Start by creating a new draft!
          </p>
          <Link to="/cars/create" className="mt-4 inline-block">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {car.images.length > 0 ? (
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    DRAFT
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {car.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{car.make}</p>
                <p className="text-xl font-bold text-blue-600 mb-4">
                  ${car.price.toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/cars/${car._id}/edit`}>
                    <Button size="sm" variant="secondary">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handlePublish(car._id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Publish
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(car._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}