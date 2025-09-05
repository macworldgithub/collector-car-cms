import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Minus, Upload, X } from 'lucide-react';
import { CreateCarRequest, UpdateCarRequest, Car } from '../../types/car';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: CreateCarRequest | UpdateCarRequest, images: File[]) => Promise<void>;
}

export default function CarForm({ initialData, onSubmit }: CarFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, formState: { errors } } = useForm<CreateCarRequest>({
    defaultValues: {
      title: initialData?.title || '',
      make: initialData?.make || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      factoryOptions: initialData?.factoryOptions || [''],
      highlights: initialData?.highlights || [''],
      keyFeatures: initialData?.keyFeatures || [{ label: '', value: '' }],
      specifications: initialData?.specifications || [{ label: '', value: '' }],
      status: initialData?.status || 'unsold',
    },
  });

  const {
    fields: factoryOptionsFields,
    append: appendFactoryOption,
    remove: removeFactoryOption,
  } = useFieldArray({
    control,
    name: 'factoryOptions',
  });

  const {
    fields: highlightsFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: 'highlights',
  });

  const {
    fields: keyFeaturesFields,
    append: appendKeyFeature,
    remove: removeKeyFeature,
  } = useFieldArray({
    control,
    name: 'keyFeatures',
  });

  const {
    fields: specificationsFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control,
    name: 'specifications',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleFormSubmit = async (data: CreateCarRequest) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data, images);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
        <Input
          label="Make"
          {...register('make', { required: 'Make is required' })}
          error={errors.make?.message}
        />
        <Input
          label="Price"
          type="number"
          {...register('price', { 
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' }
          })}
          error={errors.price?.message}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="unsold">Unsold</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <Textarea
        label="Description"
        rows={4}
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
      />

      {/* Images */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> car images
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 10 files)</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Factory Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Factory Options</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendFactoryOption('')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Option
          </Button>
        </div>
        {factoryOptionsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`factoryOptions.${index}` as const)}
              placeholder="Factory option"
              className="flex-1"
            />
            {factoryOptionsFields.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => removeFactoryOption(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Highlights</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendHighlight('')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Highlight
          </Button>
        </div>
        {highlightsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`highlights.${index}` as const)}
              placeholder="Highlight"
              className="flex-1"
            />
            {highlightsFields.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => removeHighlight(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Key Features</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendKeyFeature({ label: '', value: '' })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Feature
          </Button>
        </div>
        {keyFeaturesFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`keyFeatures.${index}.label` as const)}
              placeholder="Feature name"
              className="flex-1"
            />
            <Input
              {...register(`keyFeatures.${index}.value` as const)}
              placeholder="Feature value"
              className="flex-1"
            />
            {keyFeaturesFields.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => removeKeyFeature(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Specifications</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendSpecification({ label: '', value: '' })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Specification
          </Button>
        </div>
        {specificationsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`specifications.${index}.label` as const)}
              placeholder="Specification name"
              className="flex-1"
            />
            <Input
              {...register(`specifications.${index}.value` as const)}
              placeholder="Specification value"
              className="flex-1"
            />
            {specificationsFields.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => removeSpecification(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Car' : 'Create Car'}
        </Button>
      </div>
    </form>
  );
}