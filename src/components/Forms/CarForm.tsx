// import React, { useState, useEffect } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Minus, Upload, X } from 'lucide-react';
// import { CreateCarRequest, UpdateCarRequest, Car } from '../../types/car';
// import Input from '../UI/Input';
// import Button from '../UI/Button';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// interface CarFormProps {
//   initialData?: Car;
//   onSubmit: (
//     data: CreateCarRequest | UpdateCarRequest,
//     images: File[],
//     existingImages: string[]
//   ) => Promise<void>;
// }

// export default function CarForm({ initialData, onSubmit }: CarFormProps) {
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [existingImages, setExistingImages] = useState<string[]>(initialData?.imageKeys || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<CreateCarRequest>({
//     defaultValues: {
//       title: initialData?.title || '',
//       make: initialData?.make || '',
//       description: initialData?.description || '',
//       price: initialData?.price || 0,
//       factoryOptions: initialData?.factoryOptions || [''],
//       highlights: initialData?.highlights || [''],
//       keyFeatures: initialData?.keyFeatures || [{ label: '', value: '' }],
//       specifications: initialData?.specifications || [{ label: '', value: '' }],
//       status: initialData?.status || 'unsold',
//     },
//   });

//   const {
//     fields: factoryOptionsFields,
//     append: appendFactoryOption,
//     remove: removeFactoryOption,
//   } = useFieldArray({ control, name: 'factoryOptions' });

//   const {
//     fields: highlightsFields,
//     append: appendHighlight,
//     remove: removeHighlight,
//   } = useFieldArray({ control, name: 'highlights' });

//   const {
//     fields: keyFeaturesFields,
//     append: appendKeyFeature,
//     remove: removeKeyFeature,
//   } = useFieldArray({ control, name: 'keyFeatures' });

//   const {
//     fields: specificationsFields,
//     append: appendSpecification,
//     remove: removeSpecification,
//   } = useFieldArray({ control, name: 'specifications' });

//   useEffect(() => {
//     if (initialData?.images) {
//       setImagePreviews(initialData.images);
//       setExistingImages(initialData.imageKeys);
//     }
//   }, [initialData]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setImages((prev) => [...prev, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prev) => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index: number) => {
//     if (index < existingImages.length) {
//       const newExistingImages = existingImages.filter((_, i) => i !== index);
//       setExistingImages(newExistingImages);
//       setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       const newImages = images.filter((_, i) => i !== index - existingImages.length);
//       setImages(newImages);
//       const newPreviews = imagePreviews.filter((_, i) => i !== index);
//       setImagePreviews(newPreviews);
//       URL.revokeObjectURL(imagePreviews[index]);
//     }
//   };

//   const handleFormSubmit = async (data: CreateCarRequest) => {
//     setIsSubmitting(true);
//     try {
//       await onSubmit(data, images, existingImages);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Minimal toolbar options
//   const quillModules = {
//     toolbar: [
//       ['bold', 'italic', 'underline'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'clean'],
//     ],
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Input
//           label="Title"
//           {...register('title', { required: 'Title is required' })}
//           error={errors.title?.message}
//         />
//         <Input
//           label="Make"
//           {...register('make', { required: 'Make is required' })}
//           error={errors.make?.message}
//         />
//         <Input
//           label="Price"
//           type="number"
//           {...register('price', {
//             required: 'Price is required',
//             min: { value: 0, message: 'Price must be positive' },
//           })}
//           error={errors.price?.message}
//         />
//         <div className="space-y-1">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             {...register('status')}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="unsold">Unsold</option>
//             <option value="sold">Sold</option>
//           </select>
//         </div>
//       </div>

//       {/* Description with ReactQuill */}
//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <ReactQuill
//           theme="snow"
//           value={watch('description')}
//           onChange={(value) => setValue('description', value, { shouldValidate: true })}
//           modules={quillModules}
//           className="bg-white rounded-lg"
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//         )}
//       </div>

//       {/* Images */}
//       <div className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Images</label>
//         <div className="flex items-center justify-center w-full">
//           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//               <Upload className="w-8 h-8 mb-4 text-gray-500" />
//               <p className="mb-2 text-sm text-gray-500">
//                 <span className="font-semibold">Click to upload</span> car images
//               </p>
//               <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
//             </div>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {imagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index + 1}`}
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Factory Options */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Factory Options</label>
//           <Button type="button" variant="secondary" size="sm" onClick={() => appendFactoryOption('')}>
//             Add Option
//           </Button>
//         </div>
//         {factoryOptionsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input {...register(`factoryOptions.${index}` as const)} placeholder="Factory option" className="flex-1" />
//             {factoryOptionsFields.length > 1 && (
//               <Button type="button" variant="danger" size="sm" onClick={() => removeFactoryOption(index)}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Highlights */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Highlights</label>
//           <Button type="button" variant="secondary" size="sm" onClick={() => appendHighlight('')}>
//             Add Highlight
//           </Button>
//         </div>
//         {highlightsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input {...register(`highlights.${index}` as const)} placeholder="Highlight" className="flex-1" />
//             {highlightsFields.length > 1 && (
//               <Button type="button" variant="danger" size="sm" onClick={() => removeHighlight(index)}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Key Features */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Key Features</label>
//           <Button type="button" variant="secondary" size="sm" onClick={() => appendKeyFeature({ label: '', value: '' })}>
//             Add Feature
//           </Button>
//         </div>
//         {keyFeaturesFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input {...register(`keyFeatures.${index}.label` as const)} placeholder="Feature name" className="flex-1" />
//             <Input {...register(`keyFeatures.${index}.value` as const)} placeholder="Feature value" className="flex-1" />
//             {keyFeaturesFields.length > 1 && (
//               <Button type="button" variant="danger" size="sm" onClick={() => removeKeyFeature(index)}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Specifications */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Specifications</label>
//           <Button type="button" variant="secondary" size="sm" onClick={() => appendSpecification({ label: '', value: '' })}>
//             Add Specification
//           </Button>
//         </div>
//         {specificationsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input {...register(`specifications.${index}.label` as const)} placeholder="Specification name" className="flex-1" />
//             <Input {...register(`specifications.${index}.value` as const)} placeholder="Specification value" className="flex-1" />
//             {specificationsFields.length > 1 && (
//               <Button type="button" variant="danger" size="sm" onClick={() => removeSpecification(index)}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end space-x-4">
//         <Button type="submit" disabled={isSubmitting} size="lg">
//           {isSubmitting ? 'Saving...' : initialData ? 'Update Car' : 'Create Car'}
//         </Button>
//       </div>
//     </form>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Minus, Upload, X } from 'lucide-react';
import { CreateCarRequest, UpdateCarRequest, Car } from '../../types/car';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CarFormProps {
  initialData?: Car;
  onSubmit: (
    data: CreateCarRequest | UpdateCarRequest,
    images: File[],
    videos: File[],
    existingImages: string[],
    existingVideos: string[],
    youtubeLinks: string[]
  ) => Promise<void>;
}

export default function CarForm({ initialData, onSubmit }: CarFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.imageKeys || []);
  const [existingVideos, setExistingVideos] = useState<string[]>(initialData?.videoKeys || []);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>(initialData?.youtubeLinks || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCarRequest>({
    defaultValues: {
      title: initialData?.title || '',
      make: initialData?.make || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      factoryOptions: initialData?.factoryOptions || [],
      highlights: initialData?.highlights || [],
      keyFeatures: initialData?.keyFeatures || [],
      specifications: initialData?.specifications || [],
      status: initialData?.status || 'unsold',
      youtubeLinks: initialData?.youtubeLinks || [],
    },
  });

  const {
    fields: factoryOptionsFields,
    append: appendFactoryOption,
    remove: removeFactoryOption,
  } = useFieldArray({ control, name: 'factoryOptions' });

  const {
    fields: highlightsFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: 'highlights' });

  const {
    fields: keyFeaturesFields,
    append: appendKeyFeature,
    remove: removeKeyFeature,
  } = useFieldArray({ control, name: 'keyFeatures' });

  const {
    fields: specificationsFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({ control, name: 'specifications' });

  const {
    fields: youtubeLinksFields,
    append: appendYoutubeLink,
    remove: removeYoutubeLink,
  } = useFieldArray({ control, name: 'youtubeLinks' });

  useEffect(() => {
    if (initialData?.images) {
      setImagePreviews(initialData.images);
      setExistingImages(initialData.imageKeys);
    }
    if (initialData?.videos) {
      setVideoPreviews(initialData.videos);
      setExistingVideos(initialData.videoKeys);
    }
    if (initialData?.youtubeLinks) {
      setYoutubeLinks(initialData.youtubeLinks);
      setValue('youtubeLinks', initialData.youtubeLinks);
    }
  }, [initialData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setVideos((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    if (index < existingImages.length) {
      const newExistingImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(newExistingImages);
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newImages = images.filter((_, i) => i !== index - existingImages.length);
      setImages(newImages);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(newPreviews);
      URL.revokeObjectURL(imagePreviews[index]);
    }
  };

  const removeVideo = (index: number) => {
    if (index < existingVideos.length) {
      const newExistingVideos = existingVideos.filter((_, i) => i !== index);
      setExistingVideos(newExistingVideos);
      setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newVideos = videos.filter((_, i) => i !== index - existingVideos.length);
      setVideos(newVideos);
      const newPreviews = videoPreviews.filter((_, i) => i !== index);
      setVideoPreviews(newPreviews);
      URL.revokeObjectURL(videoPreviews[index]);
    }
  };

  // const handleFormSubmit = async (data: CreateCarRequest) => {
  //   setIsSubmitting(true);
  //   try {
  //     await onSubmit(data, images, videos, existingImages, existingVideos, youtubeLinks);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleFormSubmit = async (data: CreateCarRequest) => {
  setIsSubmitting(true);
  try {
    // Filter out invalid or empty YouTube links
    const validYoutubeLinks = youtubeLinks.filter(link => link.trim() !== '' && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link));
    await onSubmit(
      {
        ...data,
        youtubeLinks: validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
      },
      images,
      videos,
      existingImages,
      existingVideos,
      validYoutubeLinks
    );
  } finally {
    setIsSubmitting(false);
  }
};
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
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
            min: { value: 0, message: 'Price must be positive' },
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

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <ReactQuill
          theme="snow"
          value={watch('description')}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
          modules={quillModules}
          className="bg-white rounded-lg"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> car images
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
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

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Image Preview ${index + 1}`}
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

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Videos</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> car videos
              </p>
              <p className="text-xs text-gray-500">MP4, AVI, MOV, or other video formats</p>
            </div>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </label>
        </div>

        {videoPreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videoPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <video
                  src={preview}
                  controls
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">YouTube Links</label>
          <Button type="button" variant="secondary" size="sm" onClick={() => appendYoutubeLink('')}>
            Add YouTube Link
          </Button>
        </div>
        {youtubeLinksFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`youtubeLinks.${index}` as const, {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                  message: 'Please enter a valid YouTube URL',
                },
              })}
              placeholder="YouTube video URL"
              className="flex-1"
              onChange={(e) => {
                const newLinks = [...youtubeLinks];
                newLinks[index] = e.target.value;
                setYoutubeLinks(newLinks);
              }}
            />
            <Button type="button" variant="danger" size="sm" onClick={() => {
              removeYoutubeLink(index);
              const newLinks = youtubeLinks.filter((_, i) => i !== index);
              setYoutubeLinks(newLinks);
            }}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {errors.youtubeLinks && (
          <p className="text-red-500 text-sm mt-1">{errors.youtubeLinks.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Factory Options</label>
          <Button type="button" variant="secondary" size="sm" onClick={() => appendFactoryOption('')}>
            Add Option
          </Button>
        </div>
        {factoryOptionsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input {...register(`factoryOptions.${index}` as const)} placeholder="Factory option" className="flex-1" />
            <Button type="button" variant="danger" size="sm" onClick={() => removeFactoryOption(index)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Highlights</label>
          <Button type="button" variant="secondary" size="sm" onClick={() => appendHighlight('')}>
            Add Highlight
          </Button>
        </div>
        {highlightsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input {...register(`highlights.${index}` as const)} placeholder="Highlight" className="flex-1" />
            <Button type="button" variant="danger" size="sm" onClick={() => removeHighlight(index)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Key Features</label>
          <Button type="button" variant="secondary" size="sm" onClick={() => appendKeyFeature({ label: '', value: '' })}>
            Add Feature
          </Button>
        </div>
        {keyFeaturesFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input {...register(`keyFeatures.${index}.label` as const)} placeholder="Feature name" className="flex-1" />
            <Input {...register(`keyFeatures.${index}.value` as const)} placeholder="Feature value" className="flex-1" />
            <Button type="button" variant="danger" size="sm" onClick={() => removeKeyFeature(index)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Specifications</label>
          <Button type="button" variant="secondary" size="sm" onClick={() => appendSpecification({ label: '', value: '' })}>
            Add Specification
          </Button>
        </div>
        {specificationsFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input {...register(`specifications.${index}.label` as const)} placeholder="Specification name" className="flex-1" />
            <Input {...register(`specifications.${index}.value` as const)} placeholder="Specification value" className="flex-1" />
            <Button type="button" variant="danger" size="sm" onClick={() => removeSpecification(index)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Car' : 'Create Car'}
        </Button>
      </div>
    </form>
  );
}