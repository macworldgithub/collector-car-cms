// // // import React, { useState, useEffect } from "react";
// // // import { useForm, useFieldArray } from "react-hook-form";
// // // import { Minus, Upload, X } from "lucide-react";
// // // import { CreateCarRequest, UpdateCarRequest, Car } from "../../types/car";
// // // import Input from "../UI/Input";
// // // import Button from "../UI/Button";
// // // import ReactQuill from "react-quill";
// // // import "react-quill/dist/quill.snow.css";

// // // interface CarFormProps {
// // //   initialData?: Car;
// // //   onSubmit: (
// // //     data: CreateCarRequest | UpdateCarRequest,
// // //     images: File[],
// // //     videos: File[],
// // //     existingImages: string[],
// // //     existingVideos: string[],
// // //     youtubeLinks: string[]
// // //   ) => Promise<void>;
// // // }

// // // export default function CarForm({ initialData, onSubmit }: CarFormProps) {
// // //   const [images, setImages] = useState<File[]>([]);
// // //   const [videos, setVideos] = useState<File[]>([]);
// // //   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
// // //   const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
// // //   const [existingImages, setExistingImages] = useState<string[]>(
// // //     initialData?.imageKeys || []
// // //   );
// // //   const [existingVideos, setExistingVideos] = useState<string[]>(
// // //     initialData?.videoKeys || []
// // //   );
// // //   const [youtubeLinks, setYoutubeLinks] = useState<string[]>(
// // //     initialData?.youtubeLinks || []
// // //   );
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   const {
// // //     register,
// // //     control,
// // //     handleSubmit,
// // //     formState: { errors },
// // //     setValue,
// // //     watch,
// // //   } = useForm<CreateCarRequest>({
// // //     defaultValues: {
// // //       title: initialData?.title || "",
// // //       make: initialData?.make || "",
// // //       description: initialData?.description || "",
// // //       price: initialData?.price || 0,
// // //       factoryOptions: initialData?.factoryOptions || [],
// // //       highlights: initialData?.highlights || [],
// // //       keyFeatures: initialData?.keyFeatures || [
// // //         { label: "Exterior Colour", value: "" },
// // //         { label: "Interior", value: "" },
// // //         { label: "Suspension", value: "" },
// // //         { label: "Wheels", value: "" },
// // //       ],
// // //       specifications: initialData?.specifications || [
// // //         { label: "Make/Model", value: "" },
// // //         { label: "Mileage", value: "" },
// // //         { label: "Engine", value: "" },
// // //         { label: "Transmission", value: "" },
// // //       ],
// // //       status: initialData?.status || "unsold",
// // //       youtubeLinks: initialData?.youtubeLinks || [],
// // //     },
// // //   });

// // //   const {
// // //     fields: factoryOptionsFields,
// // //     append: appendFactoryOption,
// // //     remove: removeFactoryOption,
// // //   } = useFieldArray({ control, name: "factoryOptions" });

// // //   const {
// // //     fields: highlightsFields,
// // //     append: appendHighlight,
// // //     remove: removeHighlight,
// // //   } = useFieldArray({ control, name: "highlights" });

// // //   const {
// // //     fields: keyFeaturesFields,
// // //     append: appendKeyFeature,
// // //     remove: removeKeyFeature,
// // //   } = useFieldArray({ control, name: "keyFeatures" });

// // //   const {
// // //     fields: specificationsFields,
// // //     append: appendSpecification,
// // //     remove: removeSpecification,
// // //   } = useFieldArray({ control, name: "specifications" });

// // //   const {
// // //     fields: youtubeLinksFields,
// // //     append: appendYoutubeLink,
// // //     remove: removeYoutubeLink,
// // //   } = useFieldArray({ control, name: "youtubeLinks" });

// // //   useEffect(() => {
// // //     if (initialData?.images) {
// // //       setImagePreviews(initialData.images);
// // //       setExistingImages(initialData.imageKeys || []);
// // //     }
// // //     if (initialData?.videos) {
// // //       setVideoPreviews(initialData.videos);
// // //       setExistingVideos(initialData.videoKeys || []);
// // //     }
// // //     if (initialData?.youtubeLinks) {
// // //       setYoutubeLinks(initialData.youtubeLinks);
// // //       setValue("youtubeLinks", initialData.youtubeLinks);
// // //     }
// // //   }, [initialData, setValue]);

// // //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = Array.from(e.target.files || []);
// // //     setImages((prev) => [...prev, ...files]);
// // //     const newPreviews = files.map((file) => URL.createObjectURL(file));
// // //     setImagePreviews((prev) => [...prev, ...newPreviews]);
// // //   };

// // //   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = Array.from(e.target.files || []);
// // //     setVideos((prev) => [...prev, ...files]);
// // //     const newPreviews = files.map((file) => URL.createObjectURL(file));
// // //     setVideoPreviews((prev) => [...prev, ...newPreviews]);
// // //   };

// // //   const removeImage = (index: number) => {
// // //     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
// // //     if (index < existingImages.length) {
// // //       // Remove from existing images
// // //       setExistingImages((prev) => prev.filter((_, i) => i !== index));
// // //     } else {
// // //       // Remove from new images
// // //       const newImageIndex = index - existingImages.length;
// // //       setImages((prev) => prev.filter((_, i) => i !== newImageIndex));
// // //       URL.revokeObjectURL(imagePreviews[index]);
// // //     }
// // //   };

// // //   const removeVideo = (index: number) => {
// // //     setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
// // //     if (index < existingVideos.length) {
// // //       // Remove from existing videos
// // //       setExistingVideos((prev) => prev.filter((_, i) => i !== index));
// // //     } else {
// // //       // Remove from new videos
// // //       const newVideoIndex = index - existingVideos.length;
// // //       setVideos((prev) => prev.filter((_, i) => i !== newVideoIndex));
// // //       URL.revokeObjectURL(videoPreviews[index]);
// // //     }
// // //   };

// // //   const handleFormSubmit = async (data: CreateCarRequest) => {
// // //     setIsSubmitting(true);
// // //     try {
// // //       const validYoutubeLinks = youtubeLinks.filter(
// // //         (link) =>
// // //           link.trim() !== "" &&
// // //           /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
// // //       );
// // //       await onSubmit(
// // //         {
// // //           ...data,
// // //           imageKeys: existingImages, // Send current existingImages
// // //           videoKeys: existingVideos, // Send current existingVideos
// // //           youtubeLinks:
// // //             validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
// // //         } as UpdateCarRequest,
// // //         images,
// // //         videos,
// // //         existingImages,
// // //         existingVideos,
// // //         validYoutubeLinks
// // //       );
// // //     } catch (error) {
// // //       console.error("Form submission error:", error);
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const quillModules = {
// // //     toolbar: [
// // //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
// // //       [{ size: [] }],
// // //       ["bold", "italic", "underline", "strike"],
// // //       [{ color: [] }, { background: [] }],
// // //       [{ script: "sub" }, { script: "super" }],
// // //       [{ list: "ordered" }, { list: "bullet" }],
// // //       [{ indent: "-1" }, { indent: "+1" }],
// // //       [{ align: [] }],
// // //       ["blockquote", "code-block"],
// // //       ["clean"],
// // //     ],
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         <Input
// // //           label="Title"
// // //           {...register("title", {
// // //             required: "Title is required",
// // //             setValueAs: (v) => v.trim(),
// // //           })}
// // //           error={errors.title?.message}
// // //         />
// // //         <Input
// // //           label="Make"
// // //           {...register("make", {
// // //             required: "Make is required",
// // //             setValueAs: (v) => v.trim(),
// // //           })}
// // //           error={errors.make?.message}
// // //         />
// // //         <Input
// // //           label="Price"
// // //           type="number"
// // //           {...register("price", {
// // //             required: "Price is required",
// // //             min: { value: 0, message: "Price must be positive" },
// // //           })}
// // //           error={errors.price?.message}
// // //         />
// // //         <div className="space-y-1">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Status
// // //           </label>
// // //           <select
// // //             {...register("status")}
// // //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //           >
// // //             <option value="unsold">Available</option>
// // //             <option value="deposit">Deposit Taken</option>
// // //             <option value="sold">Sold</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       <div className="space-y-1">
// // //         <label className="block text-sm font-medium text-gray-700">
// // //           Description
// // //         </label>
// // //         <ReactQuill
// // //           theme="snow"
// // //           value={watch("description")}
// // //           onChange={(value) =>
// // //             setValue("description", value, { shouldValidate: true })
// // //           }
// // //           modules={quillModules}
// // //           className="bg-white rounded-lg"
// // //         />
// // //         {errors.description && (
// // //           <p className="text-red-500 text-sm mt-1">
// // //             {errors.description.message}
// // //           </p>
// // //         )}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <label className="block text-sm font-medium text-gray-700">
// // //           Images
// // //         </label>
// // //         <div className="flex items-center justify-center w-full">
// // //           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
// // //             <div className="flex flex-col items-center justify-center pt-5 pb-6">
// // //               <Upload className="w-8 h-8 mb-4 text-gray-500" />
// // //               <p className="mb-2 text-sm text-gray-500">
// // //                 <span className="font-semibold">Click to upload</span> car
// // //                 images
// // //               </p>
// // //               <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
// // //             </div>
// // //             <input
// // //               type="file"
// // //               multiple
// // //               accept="image/*"
// // //               onChange={handleImageChange}
// // //               className="hidden"
// // //             />
// // //           </label>
// // //         </div>

// // //         {imagePreviews.length > 0 && (
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {imagePreviews.map((preview, index) => (
// // //               <div key={index} className="relative">
// // //                 <img
// // //                   src={preview}
// // //                   alt={`Image Preview ${index + 1}`}
// // //                   className="w-full h-32 object-cover rounded-lg"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => removeImage(index)}
// // //                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// // //                 >
// // //                   <X className="h-4 w-4" />
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <label className="block text-sm font-medium text-gray-700">
// // //           Videos
// // //         </label>
// // //         <div className="flex items-center justify-center w-full">
// // //           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
// // //             <div className="flex flex-col items-center justify-center pt-5 pb-6">
// // //               <Upload className="w-8 h-8 mb-4 text-gray-500" />
// // //               <p className="mb-2 text-sm text-gray-500">
// // //                 <span className="font-semibold">Click to upload</span> car
// // //                 videos
// // //               </p>
// // //               <p className="text-xs text-gray-500">
// // //                 MP4, AVI, MOV, or other video formats
// // //               </p>
// // //             </div>
// // //             <input
// // //               type="file"
// // //               multiple
// // //               accept="video/*"
// // //               onChange={handleVideoChange}
// // //               className="hidden"
// // //             />
// // //           </label>
// // //         </div>

// // //         {videoPreviews.length > 0 && (
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {videoPreviews.map((preview, index) => (
// // //               <div key={index} className="relative">
// // //                 <video
// // //                   src={preview}
// // //                   controls
// // //                   className="w-full h-32 object-cover rounded-lg"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => removeVideo(index)}
// // //                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// // //                 >
// // //                   <X className="h-4 w-4" />
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <div className="flex items-center justify-between">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             YouTube Links
// // //           </label>
// // //           <Button
// // //             type="button"
// // //             variant="secondary"
// // //             size="sm"
// // //             onClick={() => appendYoutubeLink("")}
// // //           >
// // //             Add YouTube Link
// // //           </Button>
// // //         </div>
// // //         {youtubeLinksFields.map((field, index) => (
// // //           <div key={field.id} className="flex space-x-2">
// // //             <Input
// // //               {...register(`youtubeLinks.${index}` as const, {
// // //                 pattern: {
// // //                   value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
// // //                   message: "Please enter a valid YouTube URL",
// // //                 },
// // //               })}
// // //               placeholder="YouTube video URL"
// // //               className="flex-1"
// // //               onChange={(e) => {
// // //                 const newLinks = [...youtubeLinks];
// // //                 newLinks[index] = e.target.value;
// // //                 setYoutubeLinks(newLinks);
// // //               }}
// // //             />
// // //             <Button
// // //               type="button"
// // //               variant="danger"
// // //               size="sm"
// // //               onClick={() => {
// // //                 removeYoutubeLink(index);
// // //                 const newLinks = youtubeLinks.filter((_, i) => i !== index);
// // //                 setYoutubeLinks(newLinks);
// // //               }}
// // //             >
// // //               <Minus className="h-4 w-4" />
// // //             </Button>
// // //           </div>
// // //         ))}
// // //         {errors.youtubeLinks && (
// // //           <p className="text-red-500 text-sm mt-1">
// // //             {errors.youtubeLinks.message}
// // //           </p>
// // //         )}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <div className="flex items-center justify-between">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Factory Options
// // //           </label>
// // //           <Button
// // //             type="button"
// // //             variant="secondary"
// // //             size="sm"
// // //             onClick={() => appendFactoryOption("")}
// // //           >
// // //             Add Option
// // //           </Button>
// // //         </div>
// // //         {factoryOptionsFields.map((field, index) => (
// // //           <div key={field.id} className="flex space-x-2">
// // //             <Input
// // //               {...register(`factoryOptions.${index}` as const)}
// // //               placeholder="Factory option"
// // //               className="flex-1"
// // //             />
// // //             <Button
// // //               type="button"
// // //               variant="danger"
// // //               size="sm"
// // //               onClick={() => removeFactoryOption(index)}
// // //             >
// // //               <Minus className="h-4 w-4" />
// // //             </Button>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <div className="flex items-center justify-between">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Highlights
// // //           </label>
// // //           <Button
// // //             type="button"
// // //             variant="secondary"
// // //             size="sm"
// // //             onClick={() => appendHighlight("")}
// // //           >
// // //             Add Highlight
// // //           </Button>
// // //         </div>
// // //         {highlightsFields.map((field, index) => (
// // //           <div key={field.id} className="flex space-x-2">
// // //             <Input
// // //               {...register(`highlights.${index}` as const)}
// // //               placeholder="Highlight"
// // //               className="flex-1"
// // //             />
// // //             <Button
// // //               type="button"
// // //               variant="danger"
// // //               size="sm"
// // //               onClick={() => removeHighlight(index)}
// // //             >
// // //               <Minus className="h-4 w-4" />
// // //             </Button>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <div className="flex items-center justify-between">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Key Features
// // //           </label>
// // //           <Button
// // //             type="button"
// // //             variant="secondary"
// // //             size="sm"
// // //             onClick={() => appendKeyFeature({ label: "", value: "" })}
// // //           >
// // //             Add Feature
// // //           </Button>
// // //         </div>
// // //         {keyFeaturesFields.map((field, index) => (
// // //           <div key={field.id} className="flex space-x-2">
// // //             <Input
// // //               {...register(`keyFeatures.${index}.label` as const)}
// // //               placeholder="Feature name"
// // //               className="flex-1"
// // //             />
// // //             <Input
// // //               {...register(`keyFeatures.${index}.value` as const)}
// // //               placeholder="Feature value"
// // //               className="flex-1"
// // //             />
// // //             <Button
// // //               type="button"
// // //               variant="danger"
// // //               size="sm"
// // //               onClick={() => removeKeyFeature(index)}
// // //             >
// // //               <Minus className="h-4 w-4" />
// // //             </Button>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="space-y-4">
// // //         <div className="flex items-center justify-between">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Specifications
// // //           </label>
// // //           <Button
// // //             type="button"
// // //             variant="secondary"
// // //             size="sm"
// // //             onClick={() => appendSpecification({ label: "", value: "" })}
// // //           >
// // //             Add Specification
// // //           </Button>
// // //         </div>
// // //         {specificationsFields.map((field, index) => (
// // //           <div key={field.id} className="flex space-x-2">
// // //             <Input
// // //               {...register(`specifications.${index}.label` as const)}
// // //               placeholder="Specification name"
// // //               className="flex-1"
// // //             />
// // //             <Input
// // //               {...register(`specifications.${index}.value` as const)}
// // //               placeholder="Specification value"
// // //               className="flex-1"
// // //             />
// // //             <Button
// // //               type="button"
// // //               variant="danger"
// // //               size="sm"
// // //               onClick={() => removeSpecification(index)}
// // //             >
// // //               <Minus className="h-4 w-4" />
// // //             </Button>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="flex justify-end space-x-4">
// // //         <Button type="submit" disabled={isSubmitting} size="lg">
// // //           {isSubmitting
// // //             ? "Saving..."
// // //             : initialData
// // //             ? "Update Car"
// // //             : "Create Car"}
// // //         </Button>
// // //       </div>
// // //     </form>
// // //   );
// // // }
// // import React, { useState, useEffect, useRef } from "react";
// // import { useForm, useFieldArray } from "react-hook-form";
// // import { Minus, Upload, X } from "lucide-react";
// // import { CreateCarRequest, UpdateCarRequest, Car } from "../../types/car";
// // import Input from "../UI/Input";
// // import Button from "../UI/Button";
// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";
// // import { toast } from "react-hot-toast";

// // interface CarFormProps {
// //   initialData?: Car;
// //   onSubmit: (
// //     data: CreateCarRequest | UpdateCarRequest,
// //     images: File[],
// //     videos: File[],
// //     existingImages: string[],
// //     existingVideos: string[],
// //     youtubeLinks: string[]
// //   ) => Promise<void>;
// // }

// // /* ----------------- Simple IndexedDB helper ----------------- */
// // /* DB name: 'carDrafts', store: 'files' */
// // const DB_NAME = "carDrafts";
// // const STORE_NAME = "files";
// // const DB_VERSION = 1;

// // function openDB(): Promise<IDBDatabase> {
// //   return new Promise((resolve, reject) => {
// //     const req = indexedDB.open(DB_NAME, DB_VERSION);
// //     req.onupgradeneeded = () => {
// //       const db = req.result;
// //       if (!db.objectStoreNames.contains(STORE_NAME)) {
// //         const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
// //         store.createIndex("draftKey", "draftKey", { unique: false });
// //       }
// //     };
// //     req.onsuccess = () => resolve(req.result);
// //     req.onerror = () => reject(req.error);
// //   });
// // }

// // async function idbPut(item: any) {
// //   const db = await openDB();
// //   return new Promise<void>((resolve, reject) => {
// //     const tx = db.transaction(STORE_NAME, "readwrite");
// //     const store = tx.objectStore(STORE_NAME);
// //     const r = store.put(item);
// //     r.onsuccess = () => resolve();
// //     r.onerror = () => reject(r.error);
// //   });
// // }

// // async function idbGetById(id: string) {
// //   const db = await openDB();
// //   return new Promise<any>((resolve, reject) => {
// //     const tx = db.transaction(STORE_NAME, "readonly");
// //     const store = tx.objectStore(STORE_NAME);
// //     const r = store.get(id);
// //     r.onsuccess = () => resolve(r.result);
// //     r.onerror = () => reject(r.error);
// //   });
// // }

// // async function idbDeleteById(id: string) {
// //   const db = await openDB();
// //   return new Promise<void>((resolve, reject) => {
// //     const tx = db.transaction(STORE_NAME, "readwrite");
// //     const store = tx.objectStore(STORE_NAME);
// //     const r = store.delete(id);
// //     r.onsuccess = () => resolve();
// //     r.onerror = () => reject(r.error);
// //   });
// // }

// // async function idbGetByDraftKey(draftKey: string) {
// //   const db = await openDB();
// //   return new Promise<any[]>((resolve, reject) => {
// //     const tx = db.transaction(STORE_NAME, "readonly");
// //     const store = tx.objectStore(STORE_NAME);
// //     const idx = store.index("draftKey");
// //     const r = idx.getAll(draftKey);
// //     r.onsuccess = () => resolve(r.result || []);
// //     r.onerror = () => reject(r.error);
// //   });
// // }

// // async function idbDeleteByDraftKey(draftKey: string) {
// //   const items = await idbGetByDraftKey(draftKey);
// //   await Promise.all(items.map((it) => idbDeleteById(it.id)));
// // }

// // /* ----------------- Helper ----------------- */
// // const uid = () =>
// //   Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

// // /* ----------------- CarForm component ----------------- */
// // export default function CarForm({ initialData, onSubmit }: CarFormProps) {
// //   const [images, setImages] = useState<File[]>([]);
// //   const [videos, setVideos] = useState<File[]>([]);
// //   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
// //   const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
// //   const [imageFileIds, setImageFileIds] = useState<string[]>([]); // ids in IDB
// //   const [videoFileIds, setVideoFileIds] = useState<string[]>([]);
// //   const [existingImages, setExistingImages] = useState<string[]>(
// //     initialData?.imageKeys || []
// //   );
// //   const [existingVideos, setExistingVideos] = useState<string[]>(
// //     initialData?.videoKeys || []
// //   );
// //   const [youtubeLinks, setYoutubeLinks] = useState<string[]>(
// //     initialData?.youtubeLinks || []
// //   );
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const {
// //     register,
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //     setValue,
// //     watch,
// //     getValues,
// //   } = useForm<CreateCarRequest>({
// //     defaultValues: {
// //       title: initialData?.title || "",
// //       make: initialData?.make || "",
// //       description: initialData?.description || "",
// //       price: initialData?.price || 0,
// //       factoryOptions: initialData?.factoryOptions || [],
// //       highlights: initialData?.highlights || [],
// //       keyFeatures: initialData?.keyFeatures || [
// //         { label: "Exterior Colour", value: "" },
// //         { label: "Interior", value: "" },
// //         { label: "Suspension", value: "" },
// //         { label: "Wheels", value: "" },
// //       ],
// //       specifications: initialData?.specifications || [
// //         { label: "Make/Model", value: "" },
// //         { label: "Mileage", value: "" },
// //         { label: "Engine", value: "" },
// //         { label: "Transmission", value: "" },
// //       ],
// //       status: initialData?.status || "unsold",
// //       youtubeLinks: initialData?.youtubeLinks || [],
// //     },
// //   });

// //   /* field arrays */
// //   const {
// //     fields: factoryOptionsFields,
// //     append: appendFactoryOption,
// //     remove: removeFactoryOption,
// //   } = useFieldArray({ control, name: "factoryOptions" });

// //   const {
// //     fields: highlightsFields,
// //     append: appendHighlight,
// //     remove: removeHighlight,
// //   } = useFieldArray({ control, name: "highlights" });

// //   const {
// //     fields: keyFeaturesFields,
// //     append: appendKeyFeature,
// //     remove: removeKeyFeature,
// //   } = useFieldArray({ control, name: "keyFeatures" });

// //   const {
// //     fields: specificationsFields,
// //     append: appendSpecification,
// //     remove: removeSpecification,
// //   } = useFieldArray({ control, name: "specifications" });

// //   const {
// //     fields: youtubeLinksFields,
// //     append: appendYoutubeLink,
// //     remove: removeYoutubeLink,
// //   } = useFieldArray({ control, name: "youtubeLinks" });

// //   /* draft keys */
// //   const formId = initialData?._id || "new";
// //   const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
// //   const draftKey = `carFormDraft:${formId}:${today}`;
// //   const mountedRef = useRef(false);

// //   /* Clean up old drafts (metadata + files) older than 24 hours */
// //   useEffect(() => {
// //     const cleanupOldDrafts = async () => {
// //       try {
// //         const now = Date.now();
// //         Object.keys(localStorage)
// //           .filter((k) => k.startsWith("carFormDraft:"))
// //           .forEach(async (k) => {
// //             try {
// //               const raw = localStorage.getItem(k);
// //               if (!raw) return localStorage.removeItem(k);
// //               const parsed = JSON.parse(raw);
// //               if (
// //                 !parsed?.timestamp ||
// //                 now - parsed.timestamp > 24 * 60 * 60 * 1000
// //               ) {
// //                 // remove associated IDB files too
// //                 await idbDeleteByDraftKey(k);
// //                 localStorage.removeItem(k);
// //               }
// //             } catch {
// //               localStorage.removeItem(k);
// //             }
// //           });
// //       } catch (e) {
// //         // ignore
// //       }
// //     };
// //     cleanupOldDrafts();
// //   }, []);

// //   /* Load today's draft (metadata + files) */
// //   useEffect(() => {
// //     let cancelled = false;
// //     const loadDraft = async () => {
// //       try {
// //         const raw = localStorage.getItem(draftKey);
// //         if (!raw) return;
// //         const draft = JSON.parse(raw);
// //         if (!draft) return;

// //         if (cancelled) return;
// //         // load form values
// //         if (draft.values) {
// //           Object.entries(draft.values).forEach(([k, v]) => {
// //             try {
// //               setValue(k as any, v);
// //             } catch {}
// //           });
// //         }
// //         // existing server images/videos
// //         if (draft.existingImages) {
// //           setExistingImages(draft.existingImages);
// //           setImagePreviews(draft.existingImages);
// //         }
// //         if (draft.existingVideos) {
// //           setExistingVideos(draft.existingVideos);
// //           setVideoPreviews(draft.existingVideos);
// //         }

// //         // load saved files from IDB (if any)
// //         const imgIds: string[] = draft.imageFileIds || [];
// //         const vidIds: string[] = draft.videoFileIds || [];

// //         const loadedImgs: File[] = [];
// //         const imgPreviews: string[] = [];
// //         for (const id of imgIds) {
// //           try {
// //             const rec = await idbGetById(id);
// //             if (rec?.blob) {
// //               const blob: Blob = rec.blob;
// //               const file = new File([blob], rec.name || `image-${id}`, {
// //                 type: rec.mime || blob.type,
// //               });
// //               loadedImgs.push(file);
// //               imgPreviews.push(URL.createObjectURL(blob));
// //             }
// //           } catch {}
// //         }

// //         const loadedVids: File[] = [];
// //         const vidPreviews: string[] = [];
// //         for (const id of vidIds) {
// //           try {
// //             const rec = await idbGetById(id);
// //             if (rec?.blob) {
// //               const blob: Blob = rec.blob;
// //               const file = new File([blob], rec.name || `video-${id}`, {
// //                 type: rec.mime || blob.type,
// //               });
// //               loadedVids.push(file);
// //               vidPreviews.push(URL.createObjectURL(blob));
// //             }
// //           } catch {}
// //         }

// //         if (!cancelled) {
// //           if (loadedImgs.length > 0) {
// //             setImages(loadedImgs);
// //             setImageFileIds(imgIds);
// //             setImagePreviews((prev) => [
// //               ...(draft.existingImages || []),
// //               ...imgPreviews,
// //             ]);
// //           }
// //           if (loadedVids.length > 0) {
// //             setVideos(loadedVids);
// //             setVideoFileIds(vidIds);
// //             setVideoPreviews((prev) => [
// //               ...(draft.existingVideos || []),
// //               ...vidPreviews,
// //             ]);
// //           }
// //         }

// //         // if (!cancelled)
// //         //   toast("Restored draft including files (today)", { icon: "💾" });
// //       } catch (err) {
// //         // ignore load errors
// //       }
// //     };

// //     loadDraft();
// //     return () => {
// //       cancelled = true;
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [initialData, draftKey, setValue]);

// //   /* Auto-save draft (debounced) */
// //   const watched = watch();
// //   useEffect(() => {
// //     const id = window.setTimeout(() => saveDraft(false), 1500);
// //     return () => clearTimeout(id);
// //     // include file meta lengths so it saves their ids
// //   }, [
// //     watched,
// //     existingImages,
// //     existingVideos,
// //     youtubeLinks,
// //     imageFileIds,
// //     videoFileIds,
// //     images.length,
// //     videos.length,
// //   ]);

// //   /* Save draft metadata (localStorage) */
// //   const saveDraft = (notify = true) => {
// //     try {
// //       const values = getValues();
// //       const draft = {
// //         values,
// //         existingImages,
// //         existingVideos,
// //         youtubeLinks,
// //         imageFileIds,
// //         videoFileIds,
// //         timestamp: Date.now(),
// //       };
// //       localStorage.setItem(draftKey, JSON.stringify(draft));
// //       if (notify) toast.success("Draft saved locally");
// //     } catch (e) {
// //       if (notify) toast.error("Could not save draft locally");
// //     }
// //   };

// //   const clearDraft = async () => {
// //     try {
// //       localStorage.removeItem(draftKey);
// //       await idbDeleteByDraftKey(draftKey);
// //       // revoke object URLs
// //       imagePreviews.forEach((u) => {
// //         try {
// //           URL.revokeObjectURL(u);
// //         } catch {}
// //       });
// //       videoPreviews.forEach((u) => {
// //         try {
// //           URL.revokeObjectURL(u);
// //         } catch {}
// //       });
// //       setImages([]);
// //       setVideos([]);
// //       setImagePreviews([]);
// //       setVideoPreviews([]);
// //       setImageFileIds([]);
// //       setVideoFileIds([]);
// //       toast.success("Draft cleared");
// //     } catch {
// //       toast.error("Could not clear draft");
// //     }
// //   };

// //   /* Initialize initialData images/videos */
// //   useEffect(() => {
// //     if (initialData?.images) {
// //       setImagePreviews(initialData.images);
// //       setExistingImages(initialData.imageKeys || []);
// //     }
// //     if (initialData?.videos) {
// //       setVideoPreviews(initialData.videos);
// //       setExistingVideos(initialData.videoKeys || []);
// //     }
// //     if (initialData?.youtubeLinks) {
// //       setYoutubeLinks(initialData.youtubeLinks);
// //       setValue("youtubeLinks", initialData.youtubeLinks);
// //     }
// //   }, [initialData, setValue]);

// //   /* When user selects images: save files to IDB and update lists */
// //   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || []);
// //     if (files.length === 0) return;

// //     const newFiles: File[] = [];
// //     const newPreviews: string[] = [];
// //     const newIds: string[] = [];

// //     for (const file of files) {
// //       const id = `${draftKey}:img:${uid()}`;
// //       try {
// //         // store blob + metadata
// //         await idbPut({
// //           id,
// //           draftKey,
// //           kind: "image",
// //           name: file.name,
// //           mime: file.type,
// //           blob: await file
// //             .arrayBuffer()
// //             .then((buf) => new Blob([buf], { type: file.type })),
// //         });
// //         newFiles.push(file);
// //         const url = URL.createObjectURL(file);
// //         newPreviews.push(url);
// //         newIds.push(id);
// //       } catch (err) {
// //         console.error("Failed to save image to IndexedDB", err);
// //       }
// //     }

// //     setImages((prev) => [...prev, ...newFiles]);
// //     setImagePreviews((prev) => [...prev, ...newPreviews]);
// //     setImageFileIds((prev) => [...prev, ...newIds]);
// //     // persist metadata immediately
// //     saveDraft(false);
// //   };

// //   const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || []);
// //     if (files.length === 0) return;

// //     const newFiles: File[] = [];
// //     const newPreviews: string[] = [];
// //     const newIds: string[] = [];

// //     for (const file of files) {
// //       const id = `${draftKey}:vid:${uid()}`;
// //       try {
// //         await idbPut({
// //           id,
// //           draftKey,
// //           kind: "video",
// //           name: file.name,
// //           mime: file.type,
// //           blob: await file
// //             .arrayBuffer()
// //             .then((buf) => new Blob([buf], { type: file.type })),
// //         });
// //         newFiles.push(file);
// //         const url = URL.createObjectURL(file);
// //         newPreviews.push(url);
// //         newIds.push(id);
// //       } catch (err) {
// //         console.error("Failed to save video to IndexedDB", err);
// //       }
// //     }

// //     setVideos((prev) => [...prev, ...newFiles]);
// //     setVideoPreviews((prev) => [...prev, ...newPreviews]);
// //     setVideoFileIds((prev) => [...prev, ...newIds]);
// //     saveDraft(false);
// //   };

// //   /* Remove image by index (taking into account existingImages first) */
// //   const removeImage = (index: number) => {
// //     // If index refers to existingImages (server URLs)
// //     if (index < existingImages.length) {
// //       setExistingImages((prev) => prev.filter((_, i) => i !== index));
// //       setImagePreviews((prev) => prev.filter((_, i) => i !== index));
// //     } else {
// //       const newIndex = index - existingImages.length;
// //       // remove from images[] and delete id from IDB using imageFileIds
// //       const idToDelete = imageFileIds[newIndex];
// //       if (idToDelete) {
// //         idbDeleteById(idToDelete).catch(() => {});
// //       }
// //       setImages((prev) => prev.filter((_, i) => i !== newIndex));
// //       setImageFileIds((prev) => prev.filter((_, i) => i !== newIndex));
// //       // release object URL
// //       const previewIdx = index;
// //       try {
// //         URL.revokeObjectURL(imagePreviews[previewIdx]);
// //       } catch {}
// //       setImagePreviews((prev) => prev.filter((_, i) => i !== previewIdx));
// //     }
// //     saveDraft(false);
// //   };

// //   const removeVideo = (index: number) => {
// //     if (index < existingVideos.length) {
// //       setExistingVideos((prev) => prev.filter((_, i) => i !== index));
// //       setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
// //     } else {
// //       const newIndex = index - existingVideos.length;
// //       const idToDelete = videoFileIds[newIndex];
// //       if (idToDelete) {
// //         idbDeleteById(idToDelete).catch(() => {});
// //       }
// //       setVideos((prev) => prev.filter((_, i) => i !== newIndex));
// //       setVideoFileIds((prev) => prev.filter((_, i) => i !== newIndex));
// //       const previewIdx = index;
// //       try {
// //         URL.revokeObjectURL(videoPreviews[previewIdx]);
// //       } catch {}
// //       setVideoPreviews((prev) => prev.filter((_, i) => i !== previewIdx));
// //     }
// //     saveDraft(false);
// //   };

// //   /* Form submit */
// //   const handleFormSubmit = async (data: CreateCarRequest) => {
// //     setIsSubmitting(true);
// //     try {
// //       const validYoutubeLinks = youtubeLinks.filter(
// //         (link) =>
// //           link.trim() !== "" &&
// //           /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
// //       );

// //       // IMPORTANT: when calling onSubmit we pass the File[] arrays reconstructed from state (these are real File objects).
// //       await onSubmit(
// //         {
// //           ...data,
// //           imageKeys: existingImages.length > 0 ? existingImages : undefined,
// //           videoKeys: existingVideos.length > 0 ? existingVideos : undefined,
// //           youtubeLinks:
// //             validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
// //         } as UpdateCarRequest,
// //         images,
// //         videos,
// //         existingImages,
// //         existingVideos,
// //         validYoutubeLinks
// //       );

// //       // clear draft on success (metadata + files)
// //       try {
// //         localStorage.removeItem(draftKey);
// //         await idbDeleteByDraftKey(draftKey);
// //       } catch {}
// //     } catch (error: any) {
// //       console.error("Form submission error:", error);
// //       toast.error(error?.response?.data?.message || "Failed to save car");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   useEffect(() => {
// //     mountedRef.current = true;
// //     return () => {
// //       // cleanup object URLs
// //       imagePreviews.forEach((u) => {
// //         try {
// //           URL.revokeObjectURL(u);
// //         } catch {}
// //       });
// //       videoPreviews.forEach((u) => {
// //         try {
// //           URL.revokeObjectURL(u);
// //         } catch {}
// //       });
// //       mountedRef.current = false;
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const quillModules = {
// //     toolbar: [
// //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
// //       [{ size: [] }],
// //       ["bold", "italic", "underline", "strike"],
// //       [{ color: [] }, { background: [] }],
// //       [{ script: "sub" }, { script: "super" }],
// //       [{ list: "ordered" }, { list: "bullet" }],
// //       [{ indent: "-1" }, { indent: "+1" }],
// //       [{ align: [] }],
// //       ["blockquote", "code-block"],
// //       ["clean"],
// //     ],
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <Input
// //           label="Title"
// //           {...register("title", {
// //             required: "Title is required",
// //             setValueAs: (v) => v.trim(),
// //           })}
// //           error={errors.title?.message}
// //         />
// //         <Input
// //           label="Make"
// //           {...register("make", {
// //             required: "Make is required",
// //             setValueAs: (v) => v.trim(),
// //           })}
// //           error={errors.make?.message}
// //         />
// //         <Input
// //           label="Price"
// //           type="number"
// //           {...register("price", {
// //             required: "Price is required",
// //             min: { value: 0, message: "Price must be positive" },
// //           })}
// //           error={errors.price?.message}
// //         />
// //         <div className="space-y-1">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Status
// //           </label>
// //           <select
// //             {...register("status")}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           >
// //             <option value="unsold">Available</option>
// //             <option value="deposit">Deposit Taken</option>
// //             <option value="sold">Sold</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="space-y-1">
// //         <label className="block text-sm font-medium text-gray-700">
// //           Description
// //         </label>
// //         <ReactQuill
// //           theme="snow"
// //           value={watch("description")}
// //           onChange={(value) =>
// //             setValue("description", value, { shouldValidate: true })
// //           }
// //           modules={quillModules}
// //           className="bg-white rounded-lg"
// //         />
// //         {errors.description && (
// //           <p className="text-red-500 text-sm mt-1">
// //             {errors.description.message}
// //           </p>
// //         )}
// //       </div>

// //       {/* Images */}
// //       <div className="space-y-4">
// //         <label className="block text-sm font-medium text-gray-700">
// //           Images
// //         </label>
// //         <div className="flex items-center justify-center w-full">
// //           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
// //             <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //               <Upload className="w-8 h-8 mb-4 text-gray-500" />
// //               <p className="mb-2 text-sm text-gray-500">
// //                 <span className="font-semibold">Click to upload</span> car
// //                 images
// //               </p>
// //               <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
// //             </div>
// //             <input
// //               type="file"
// //               multiple
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               className="hidden"
// //             />
// //           </label>
// //         </div>

// //         {imagePreviews.length > 0 && (
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {imagePreviews.map((preview, index) => (
// //               <div key={index} className="relative">
// //                 <img
// //                   src={preview}
// //                   alt={`Image Preview ${index + 1}`}
// //                   className="w-full h-32 object-cover rounded-lg"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => removeImage(index)}
// //                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Videos */}
// //       <div className="space-y-4">
// //         <label className="block text-sm font-medium text-gray-700">
// //           Videos
// //         </label>
// //         <div className="flex items-center justify-center w-full">
// //           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
// //             <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //               <Upload className="w-8 h-8 mb-4 text-gray-500" />
// //               <p className="mb-2 text-sm text-gray-500">
// //                 <span className="font-semibold">Click to upload</span> car
// //                 videos
// //               </p>
// //               <p className="text-xs text-gray-500">
// //                 MP4, AVI, MOV, or other video formats
// //               </p>
// //             </div>
// //             <input
// //               type="file"
// //               multiple
// //               accept="video/*"
// //               onChange={handleVideoChange}
// //               className="hidden"
// //             />
// //           </label>
// //         </div>

// //         {videoPreviews.length > 0 && (
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {videoPreviews.map((preview, index) => (
// //               <div key={index} className="relative">
// //                 <video
// //                   src={preview}
// //                   controls
// //                   className="w-full h-32 object-cover rounded-lg"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => removeVideo(index)}
// //                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* YouTube Links */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <label className="block text-sm font-medium text-gray-700">
// //             YouTube Links
// //           </label>
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="sm"
// //             onClick={() => appendYoutubeLink("")}
// //           >
// //             Add YouTube Link
// //           </Button>
// //         </div>
// //         {youtubeLinksFields.map((field, index) => (
// //           <div key={field.id} className="flex space-x-2">
// //             <Input
// //               {...register(`youtubeLinks.${index}` as const, {
// //                 pattern: {
// //                   value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
// //                   message: "Please enter a valid YouTube URL",
// //                 },
// //               })}
// //               placeholder="YouTube video URL"
// //               className="flex-1"
// //               onChange={(e) => {
// //                 const newLinks = [...youtubeLinks];
// //                 newLinks[index] = e.target.value;
// //                 setYoutubeLinks(newLinks);
// //               }}
// //             />
// //             <Button
// //               type="button"
// //               variant="danger"
// //               size="sm"
// //               onClick={() => {
// //                 removeYoutubeLink(index);
// //                 const newLinks = youtubeLinks.filter((_, i) => i !== index);
// //                 setYoutubeLinks(newLinks);
// //               }}
// //             >
// //               <Minus className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //         {errors.youtubeLinks && (
// //           <p className="text-red-500 text-sm mt-1">
// //             {errors.youtubeLinks.message}
// //           </p>
// //         )}
// //       </div>

// //       {/* Factory Options */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Factory Options
// //           </label>
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="sm"
// //             onClick={() => appendFactoryOption("")}
// //           >
// //             Add Option
// //           </Button>
// //         </div>
// //         {factoryOptionsFields.map((field, index) => (
// //           <div key={field.id} className="flex space-x-2">
// //             <Input
// //               {...register(`factoryOptions.${index}` as const)}
// //               placeholder="Factory option"
// //               className="flex-1"
// //             />
// //             <Button
// //               type="button"
// //               variant="danger"
// //               size="sm"
// //               onClick={() => removeFactoryOption(index)}
// //             >
// //               <Minus className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Highlights */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Highlights
// //           </label>
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="sm"
// //             onClick={() => appendHighlight("")}
// //           >
// //             Add Highlight
// //           </Button>
// //         </div>
// //         {highlightsFields.map((field, index) => (
// //           <div key={field.id} className="flex space-x-2">
// //             <Input
// //               {...register(`highlights.${index}` as const)}
// //               placeholder="Highlight"
// //               className="flex-1"
// //             />
// //             <Button
// //               type="button"
// //               variant="danger"
// //               size="sm"
// //               onClick={() => removeHighlight(index)}
// //             >
// //               <Minus className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Key Features */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Key Features
// //           </label>
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="sm"
// //             onClick={() => appendKeyFeature({ label: "", value: "" })}
// //           >
// //             Add Feature
// //           </Button>
// //         </div>
// //         {keyFeaturesFields.map((field, index) => (
// //           <div key={field.id} className="flex space-x-2">
// //             <Input
// //               {...register(`keyFeatures.${index}.label` as const)}
// //               placeholder="Feature name"
// //               className="flex-1"
// //             />
// //             <Input
// //               {...register(`keyFeatures.${index}.value` as const)}
// //               placeholder="Feature value"
// //               className="flex-1"
// //             />
// //             <Button
// //               type="button"
// //               variant="danger"
// //               size="sm"
// //               onClick={() => removeKeyFeature(index)}
// //             >
// //               <Minus className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Specifications */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Specifications
// //           </label>
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="sm"
// //             onClick={() => appendSpecification({ label: "", value: "" })}
// //           >
// //             Add Specification
// //           </Button>
// //         </div>
// //         {specificationsFields.map((field, index) => (
// //           <div key={field.id} className="flex space-x-2">
// //             <Input
// //               {...register(`specifications.${index}.label` as const)}
// //               placeholder="Specification name"
// //               className="flex-1"
// //             />
// //             <Input
// //               {...register(`specifications.${index}.value` as const)}
// //               placeholder="Specification value"
// //               className="flex-1"
// //             />
// //             <Button
// //               type="button"
// //               variant="danger"
// //               size="sm"
// //               onClick={() => removeSpecification(index)}
// //             >
// //               <Minus className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Draft controls + Submit */}
// //       <div className="flex justify-between items-center">
// //         <div className="flex gap-2">
// //           <Button
// //             type="button"
// //             variant="secondary"
// //             size="md"
// //             onClick={() => saveDraft(true)}
// //           >
// //             Save Draft
// //           </Button>
// //           <Button type="button" variant="danger" size="md" onClick={clearDraft}>
// //             Clear Draft
// //           </Button>
// //           <span className="text-sm text-gray-500 self-center">
// //             Drafts auto-expire after 24 hours
// //           </span>
// //         </div>

// //         <div className="flex justify-end space-x-4">
// //           <Button type="submit" disabled={isSubmitting} size="lg">
// //             {isSubmitting
// //               ? "Saving..."
// //               : initialData
// //               ? "Update Car"
// //               : "Create Car"}
// //           </Button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Minus, Upload, X, RotateCcw } from "lucide-react";
// import { CreateCarRequest, UpdateCarRequest, Car } from "../../types/car";
// import Input from "../UI/Input";
// import Button from "../UI/Button";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-hot-toast";

// interface CarFormProps {
//   initialData?: Car;
//   onSubmit: (
//     data: CreateCarRequest | UpdateCarRequest,
//     images: File[],
//     videos: File[],
//     existingImages: { key: string; orientation: 'portrait' | 'landscape' }[],
//     existingVideos: string[],
//     youtubeLinks: string[]
//   ) => Promise<void>;
// }

// /* ----------------- Simple IndexedDB helper ----------------- */
// const DB_NAME = "carDrafts";
// const STORE_NAME = "files";
// const DB_VERSION = 1;

// function openDB(): Promise<IDBDatabase> {
//   return new Promise((resolve, reject) => {
//     const req = indexedDB.open(DB_NAME, DB_VERSION);
//     req.onupgradeneeded = () => {
//       const db = req.result;
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
//         store.createIndex("draftKey", "draftKey", { unique: false });
//       }
//     };
//     req.onsuccess = () => resolve(req.result);
//     req.onerror = () => reject(req.error);
//   });
// }

// async function idbPut(item: any) {
//   const db = await openDB();
//   return new Promise<void>((resolve, reject) => {
//     const tx = db.transaction(STORE_NAME, "readwrite");
//     const store = tx.objectStore(STORE_NAME);
//     const r = store.put(item);
//     r.onsuccess = () => resolve();
//     r.onerror = () => reject(r.error);
//   });
// }

// async function idbGetById(id: string) {
//   const db = await openDB();
//   return new Promise<any>((resolve, reject) => {
//     const tx = db.transaction(STORE_NAME, "readonly");
//     const store = tx.objectStore(STORE_NAME);
//     const r = store.get(id);
//     r.onsuccess = () => resolve(r.result);
//     r.onerror = () => reject(r.error);
//   });
// }

// async function idbDeleteById(id: string) {
//   const db = await openDB();
//   return new Promise<void>((resolve, reject) => {
//     const tx = db.transaction(STORE_NAME, "readwrite");
//     const store = tx.objectStore(STORE_NAME);
//     const r = store.delete(id);
//     r.onsuccess = () => resolve();
//     r.onerror = () => reject(r.error);
//   });
// }

// async function idbGetByDraftKey(draftKey: string) {
//   const db = await openDB();
//   return new Promise<any[]>((resolve, reject) => {
//     const tx = db.transaction(STORE_NAME, "readonly");
//     const store = tx.objectStore(STORE_NAME);
//     const idx = store.index("draftKey");
//     const r = idx.getAll(draftKey);
//     r.onsuccess = () => resolve(r.result || []);
//     r.onerror = () => reject(r.error);
//   });
// }

// async function idbDeleteByDraftKey(draftKey: string) {
//   try {
//     const items = await idbGetByDraftKey(draftKey);
//     await Promise.all(items.map((it) => idbDeleteById(it.id).catch(() => {})));
//   } catch (error) {
//     // Ignore errors during cleanup
//   }
// }

// /* ----------------- Helper ----------------- */
// const uid = () =>
//   Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

// /* ----------------- CarForm component ----------------- */
// export default function CarForm({ initialData, onSubmit }: CarFormProps) {
//   const [images, setImages] = useState<File[]>([]);
//   const [videos, setVideos] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
//   const [imageFileIds, setImageFileIds] = useState<string[]>([]);
//   const [videoFileIds, setVideoFileIds] = useState<string[]>([]);
//   const [imageOrientations, setImageOrientations] = useState<{ 
//     [key: number]: 'portrait' | 'landscape' 
//   }>({});
//   const [existingImages, setExistingImages] = useState<{ key: string; orientation: 'portrait' | 'landscape' }[]>(
//     initialData?.imageKeys?.map(key => ({ key, orientation: 'landscape' })) || []
//   );
//   const [existingVideos, setExistingVideos] = useState<string[]>(
//     initialData?.videoKeys || []
//   );
//   const [youtubeLinks, setYoutubeLinks] = useState<string[]>(
//     initialData?.youtubeLinks || []
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//     getValues,
//     reset,
//   } = useForm<CreateCarRequest>({
//     defaultValues: {
//       title: initialData?.title || "",
//       make: initialData?.make || "",
//       description: initialData?.description || "",
//       price: initialData?.price || 0,
//       factoryOptions: initialData?.factoryOptions || [],
//       highlights: initialData?.highlights || [],
//       keyFeatures: initialData?.keyFeatures || [
//         { label: "Exterior Colour", value: "" },
//         { label: "Interior", value: "" },
//         { label: "Suspension", value: "" },
//         { label: "Wheels", value: "" },
//       ],
//       specifications: initialData?.specifications || [
//         { label: "Make/Model", value: "" },
//         { label: "Mileage", value: "" },
//         { label: "Engine", value: "" },
//         { label: "Transmission", value: "" },
//       ],
//       status: initialData?.status || "unsold",
//       youtubeLinks: initialData?.youtubeLinks || [],
//     },
//   });

//   /* field arrays */
//   const {
//     fields: factoryOptionsFields,
//     append: appendFactoryOption,
//     remove: removeFactoryOption,
//   } = useFieldArray({ control, name: "factoryOptions" });

//   const {
//     fields: highlightsFields,
//     append: appendHighlight,
//     remove: removeHighlight,
//   } = useFieldArray({ control, name: "highlights" });

//   const {
//     fields: keyFeaturesFields,
//     append: appendKeyFeature,
//     remove: removeKeyFeature,
//   } = useFieldArray({ control, name: "keyFeatures" });

//   const {
//     fields: specificationsFields,
//     append: appendSpecification,
//     remove: removeSpecification,
//   } = useFieldArray({ control, name: "specifications" });

//   const {
//     fields: youtubeLinksFields,
//     append: appendYoutubeLink,
//     remove: removeYoutubeLink,
//   } = useFieldArray({ control, name: "youtubeLinks" });

//   /* draft keys */
//   const formId = initialData?._id || "new";
//   const today = new Date().toISOString().slice(0, 10);
//   const draftKey = `carFormDraft:${formId}:${today}`;
//   const mountedRef = useRef(false);

//   /* Clean up old drafts */
//   useEffect(() => {
//     const cleanupOldDrafts = async () => {
//       try {
//         const now = Date.now();
//         Object.keys(localStorage)
//           .filter((k) => k.startsWith("carFormDraft:"))
//           .forEach(async (k) => {
//             try {
//               const raw = localStorage.getItem(k);
//               if (!raw) return localStorage.removeItem(k);
//               const parsed = JSON.parse(raw);
//               if (
//                 !parsed?.timestamp ||
//                 now - parsed.timestamp > 24 * 60 * 60 * 1000
//               ) {
//                 await idbDeleteByDraftKey(k);
//                 localStorage.removeItem(k);
//               }
//             } catch {
//               localStorage.removeItem(k);
//             }
//           });
//       } catch (e) {}
//     };
//     cleanupOldDrafts();
//   }, []);

//   /* Load today's draft */
//   useEffect(() => {
//     let cancelled = false;
//     const loadDraft = async () => {
//       try {
//         const raw = localStorage.getItem(draftKey);
//         if (!raw) return;
//         const draft = JSON.parse(raw);
//         if (!draft) return;

//         if (cancelled) return;
        
//         if (draft.values) {
//           Object.entries(draft.values).forEach(([k, v]) => {
//             try {
//               setValue(k as any, v);
//             } catch {}
//           });
//         }
        
//         if (draft.existingImages) {
//           setExistingImages(draft.existingImages);
//         }
//         if (draft.existingVideos) {
//           setExistingVideos(draft.existingVideos);
//           setVideoPreviews(draft.existingVideos.map(() => ""));
//         }
//         if (draft.youtubeLinks) {
//           setYoutubeLinks(draft.youtubeLinks);
//         }
//         if (draft.imageOrientations) {
//           setImageOrientations(draft.imageOrientations);
//         }

//         const imgIds: string[] = draft.imageFileIds || [];
//         const vidIds: string[] = draft.videoFileIds || [];

//         const loadedImgs: File[] = [];
//         const imgPreviews: string[] = [];
//         for (const id of imgIds) {
//           try {
//             const rec = await idbGetById(id);
//             if (rec?.blob) {
//               const blob: Blob = rec.blob;
//               const file = new File([blob], rec.name || `image-${id}`, {
//                 type: rec.mime || blob.type,
//               });
//               loadedImgs.push(file);
//               imgPreviews.push(URL.createObjectURL(blob));
//             }
//           } catch {}
//         }

//         const loadedVids: File[] = [];
//         const vidPreviews: string[] = [];
//         for (const id of vidIds) {
//           try {
//             const rec = await idbGetById(id);
//             if (rec?.blob) {
//               const blob: Blob = rec.blob;
//               const file = new File([blob], rec.name || `video-${id}`, {
//                 type: rec.mime || blob.type,
//               });
//               loadedVids.push(file);
//               vidPreviews.push(URL.createObjectURL(blob));
//             }
//           } catch {}
//         }

//         if (!cancelled) {
//           if (loadedImgs.length > 0) {
//             setImages(loadedImgs);
//             setImageFileIds(imgIds);
//             setImagePreviews((prev) => [...prev, ...imgPreviews]);
//           }
//           if (loadedVids.length > 0) {
//             setVideos(loadedVids);
//             setVideoFileIds(vidIds);
//             setVideoPreviews((prev) => [...prev, ...vidPreviews]);
//           }
//         }
//       } catch (err) {}
//     };

//     loadDraft();
//     return () => { cancelled = true; };
//   }, [initialData, draftKey, setValue]);

//   /* Auto-save draft */
//   const watched = watch();
//   useEffect(() => {
//     const id = window.setTimeout(() => saveDraft(false), 1500);
//     return () => clearTimeout(id);
//   }, [
//     watched,
//     existingImages,
//     existingVideos,
//     youtubeLinks,
//     imageFileIds,
//     videoFileIds,
//     images.length,
//     videos.length,
//     imageOrientations,
//   ]);

//   const saveDraft = (notify = true) => {
//     try {
//       const values = getValues();
//       const draft = {
//         values,
//         existingImages,
//         existingVideos,
//         youtubeLinks,
//         imageFileIds,
//         videoFileIds,
//         imageOrientations,
//         timestamp: Date.now(),
//       };
//       localStorage.setItem(draftKey, JSON.stringify(draft));
//       if (notify) toast.success("Draft saved locally");
//     } catch (e) {
//       if (notify) toast.error("Could not save draft locally");
//     }
//   };

//   // Safe URL revocation
//   const revokeUrlsSafely = (urls: string[]) => {
//     urls.forEach((url) => {
//       if (url && url.startsWith('blob:')) {
//         try {
//           URL.revokeObjectURL(url);
//         } catch (error) {
//           // Silent fail
//         }
//       }
//     });
//   };

//   // Clear draft
//   const clearDraft = async () => {
//     try {
//       reset({
//         title: "",
//         make: "",
//         description: "",
//         price: 0,
//         factoryOptions: [],
//         highlights: [],
//         keyFeatures: [],
//         specifications: [],
//         status: "unsold",
//         youtubeLinks: [],
//       });

//       setImages([]);
//       setVideos([]);
//       setImagePreviews([]);
//       setVideoPreviews([]);
//       setImageFileIds([]);
//       setVideoFileIds([]);
//       setImageOrientations({});
//       setExistingImages([]);
//       setExistingVideos([]);
//       setYoutubeLinks([]);

//       const clearFieldArray = (fields: any[], removeFn: (indices: number[]) => void) => {
//         if (fields.length > 0 && removeFn) {
//           removeFn(fields.map((_, i) => i));
//         }
//       };

//       clearFieldArray(factoryOptionsFields, removeFactoryOption);
//       clearFieldArray(highlightsFields, removeHighlight);
//       clearFieldArray(keyFeaturesFields, removeKeyFeature);
//       clearFieldArray(specificationsFields, removeSpecification);
//       clearFieldArray(youtubeLinksFields, removeYoutubeLink);

//       localStorage.removeItem(draftKey);
//       await idbDeleteByDraftKey(draftKey);

//       revokeUrlsSafely(imagePreviews);
//       revokeUrlsSafely(videoPreviews);

//       toast.success("Draft cleared successfully");
//     } catch (error) {
//       console.error("Error clearing draft:", error);
//       toast.error("Could not clear draft");
//     }
//   };

//   /* Initialize initialData images/videos */
//   useEffect(() => {
//     if (initialData?.images) {
//       setImagePreviews(initialData.images);
//     }
//     if (initialData?.videos) {
//       setVideoPreviews(initialData.videos);
//     }
//     if (initialData?.youtubeLinks) {
//       setYoutubeLinks(initialData.youtubeLinks);
//       setValue("youtubeLinks", initialData.youtubeLinks);
//     }
//     if (initialData?.imageKeys) {
//       setExistingImages(initialData.imageKeys);
//       const initialOrientations = initialData.imageKeys.reduce((acc, img, index) => ({
//         ...acc,
//         [index]: img.orientation || 'landscape'
//       }), {});
//       setImageOrientations(initialOrientations);
//     }
//   }, [initialData, setValue]);

//   /* Toggle image orientation */
//   const toggleImageOrientation = (index: number) => {
//     setImageOrientations(prev => {
//       const current = prev[index] || 'landscape';
//       const newOrientation = current === 'portrait' ? 'landscape' : 'portrait';
//       const newOrientations = { ...prev, [index]: newOrientation };
//       saveDraft(false);
//       return newOrientations;
//     });
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const newFiles: File[] = [];
//     const newPreviews: string[] = [];
//     const newIds: string[] = [];
//     const newOrientations: { [key: number]: 'portrait' | 'landscape' } = {};

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const id = `${draftKey}:img:${uid()}`;
//       try {
//         await idbPut({
//           id,
//           draftKey,
//           kind: "image",
//           name: file.name,
//           mime: file.type,
//           blob: await file
//             .arrayBuffer()
//             .then((buf) => new Blob([buf], { type: file.type })),
//         });
//         newFiles.push(file);
//         const url = URL.createObjectURL(file);
//         newPreviews.push(url);
//         newIds.push(id);
//         newOrientations[images.length + i] = 'landscape';
//       } catch (err) {
//         console.error("Failed to save image to IndexedDB", err);
//       }
//     }

//     setImages((prev) => [...prev, ...newFiles]);
//     setImagePreviews((prev) => [...prev, ...newPreviews]);
//     setImageFileIds((prev) => [...prev, ...newIds]);
//     setImageOrientations(prev => ({ ...prev, ...newOrientations }));
//     saveDraft(false);
//   };

//   const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const newFiles: File[] = [];
//     const newPreviews: string[] = [];
//     const newIds: string[] = [];

//     for (const file of files) {
//       const id = `${draftKey}:vid:${uid()}`;
//       try {
//         await idbPut({
//           id,
//           draftKey,
//           kind: "video",
//           name: file.name,
//           mime: file.type,
//           blob: await file
//             .arrayBuffer()
//             .then((buf) => new Blob([buf], { type: file.type })),
//         });
//         newFiles.push(file);
//         const url = URL.createObjectURL(file);
//         newPreviews.push(url);
//         newIds.push(id);
//       } catch (err) {
//         console.error("Failed to save video to IndexedDB", err);
//       }
//     }

//     setVideos((prev) => [...prev, ...newFiles]);
//     setVideoPreviews((prev) => [...prev, ...newPreviews]);
//     setVideoFileIds((prev) => [...prev, ...newIds]);
//     saveDraft(false);
//   };

//   const removeImage = (index: number) => {
//     setImageOrientations(prev => {
//       const newOrientations = { ...prev };
//       delete newOrientations[index];
//       return newOrientations;
//     });

//     if (index < existingImages.length) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index));
//       setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       const newIndex = index - existingImages.length;
//       const idToDelete = imageFileIds[newIndex];
//       if (idToDelete) {
//         idbDeleteById(idToDelete).catch(() => {});
//       }
//       setImages((prev) => prev.filter((_, i) => i !== newIndex));
//       setImageFileIds((prev) => prev.filter((_, i) => i !== newIndex));
//       if (imagePreviews[index]) {
//         revokeUrlsSafely([imagePreviews[index]]);
//       }
//       setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//     }
    
//     setImageOrientations(prev => {
//       const newOrientations: { [key: number]: 'portrait' | 'landscape' } = {};
//       Object.entries(prev).forEach(([key, value]) => {
//         const numKey = parseInt(key);
//         if (numKey < index) {
//           newOrientations[numKey] = value;
//         } else if (numKey > index) {
//           newOrientations[numKey - 1] = value;
//         }
//       });
//       return newOrientations;
//     });
//     saveDraft(false);
//   };

//   const removeVideo = (index: number) => {
//     if (index < existingVideos.length) {
//       setExistingVideos((prev) => prev.filter((_, i) => i !== index));
//       setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       const newIndex = index - existingVideos.length;
//       const idToDelete = videoFileIds[newIndex];
//       if (idToDelete) {
//         idbDeleteById(idToDelete).catch(() => {});
//       }
//       setVideos((prev) => prev.filter((_, i) => i !== newIndex));
//       setVideoFileIds((prev) => prev.filter((_, i) => i !== newIndex));
//       if (videoPreviews[index]) {
//         revokeUrlsSafely([videoPreviews[index]]);
//       }
//       setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
//     }
//     saveDraft(false);
//   };

//   const handleFormSubmit = async (data: CreateCarRequest) => {
//     setIsSubmitting(true);
//     try {
//       const validYoutubeLinks = youtubeLinks.filter(
//         (link) =>
//           link.trim() !== "" &&
//           /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
//       );

//       // Combine existing images with their orientations
//       const allExistingImagesWithOrientation = existingImages.map((img, index) => ({
//         key: img.key,
//         orientation: imageOrientations[index] || img.orientation || 'landscape'
//       }));

//       // Map new images to include their orientations (no actual keys yet, backend will generate)
//       const newImagesWithOrientation = images.map((_, index) => ({
//         key: `new-image-${index}`, // Temporary placeholder key for new images
//         orientation: imageOrientations[existingImages.length + index] || 'landscape'
//       }));

//       // Combine existing and new images for submission
//       const allImageKeys = [...allExistingImagesWithOrientation, ...newImagesWithOrientation];

//       await onSubmit(
//         {
//           ...data,
//           imageKeys: allImageKeys.length > 0 ? allImageKeys : undefined,
//           videoKeys: existingVideos.length > 0 ? existingVideos : undefined,
//           youtubeLinks: validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
//         } as UpdateCarRequest,
//         images,
//         videos,
//         allExistingImagesWithOrientation,
//         existingVideos,
//         validYoutubeLinks
//       );

//       try {
//         localStorage.removeItem(draftKey);
//         await idbDeleteByDraftKey(draftKey);
//       } catch {}
//     } catch (error: any) {
//       console.error("Form submission error:", error);
//       toast.error(error?.response?.data?.message || "Failed to save car");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     mountedRef.current = true;
//     return () => {
//       revokeUrlsSafely(imagePreviews);
//       revokeUrlsSafely(videoPreviews);
//       mountedRef.current = false;
//     };
//   }, [imagePreviews, videoPreviews]);

//   const quillModules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["clean"],
//     ],
//   };

//   const allImagePreviews = [...imagePreviews];

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Input
//           label="Title"
//           {...register("title", {
//             required: "Title is required",
//             setValueAs: (v) => v.trim(),
//           })}
//           error={errors.title?.message}
//         />
//         <Input
//           label="Make"
//           {...register("make", {
//             required: "Make is required",
//             setValueAs: (v) => v.trim(),
//           })}
//           error={errors.make?.message}
//         />
//         <Input
//           label="Price"
//           type="number"
//           {...register("price", {
//             required: "Price is required",
//             min: { value: 0, message: "Price must be positive" },
//           })}
//           error={errors.price?.message}
//         />
//         <div className="space-y-1">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             {...register("status")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="unsold">Available</option>
//             <option value="deposit">Deposit Taken</option>
//             <option value="sold">Sold</option>
//           </select>
//         </div>
//       </div>

//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <ReactQuill
//           theme="snow"
//           value={watch("description")}
//           onChange={(value) =>
//             setValue("description", value, { shouldValidate: true })
//           }
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

//         {allImagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {allImagePreviews.map((preview, index) => {
//               const orientation = imageOrientations[index] || 'landscape';
//               return (
//                 <div key={index} className="relative">
//                   <img
//                     src={preview}
//                     alt={`Image Preview ${index + 1}`}
//                     className={`w-full h-32 rounded-lg ${
//                       orientation === 'portrait' ? 'object-contain' : 'object-cover'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleImageOrientation(index)}
//                     className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition-colors"
//                     title="Toggle Orientation"
//                   >
//                     <RotateCcw className="h-3 w-3" />
//                   </button>
//                   <div className="absolute bottom-2 left-2">
//                     <span className={`px-2 py-0.5 text-xs rounded-full ${
//                       orientation === 'portrait'
//                         ? 'bg-purple-100 text-purple-800'
//                         : 'bg-green-100 text-green-800'
//                     }`}>
//                       {orientation.toUpperCase()}
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Videos */}
//       <div className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Videos</label>
//         <div className="flex items-center justify-center w-full">
//           <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//               <Upload className="w-8 h-8 mb-4 text-gray-500" />
//               <p className="mb-2 text-sm text-gray-500">
//                 <span className="font-semibold">Click to upload</span> car videos
//               </p>
//               <p className="text-xs text-gray-500">MP4, AVI, MOV, or other video formats</p>
//             </div>
//             <input
//               type="file"
//               multiple
//               accept="video/*"
//               onChange={handleVideoChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {videoPreviews.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {videoPreviews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <video
//                   src={preview}
//                   controls
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeVideo(index)}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* YouTube Links */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">YouTube Links</label>
//           <Button
//             type="button"
//             variant="secondary"
//             size="sm"
//             onClick={() => appendYoutubeLink("")}
//           >
//             Add YouTube Link
//           </Button>
//         </div>
//         {youtubeLinksFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input
//               {...register(`youtubeLinks.${index}` as const, {
//                 pattern: {
//                   value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
//                   message: "Please enter a valid YouTube URL",
//                 },
//               })}
//               placeholder="YouTube video URL"
//               className="flex-1"
//               onChange={(e) => {
//                 const newLinks = [...youtubeLinks];
//                 newLinks[index] = e.target.value;
//                 setYoutubeLinks(newLinks);
//               }}
//             />
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => {
//                 removeYoutubeLink(index);
//                 const newLinks = youtubeLinks.filter((_, i) => i !== index);
//                 setYoutubeLinks(newLinks);
//               }}
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Factory Options */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Factory Options</label>
//           <Button
//             type="button"
//             variant="secondary"
//             size="sm"
//             onClick={() => appendFactoryOption("")}
//           >
//             Add Option
//           </Button>
//         </div>
//         {factoryOptionsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input
//               {...register(`factoryOptions.${index}` as const)}
//               placeholder="Factory option"
//               className="flex-1"
//             />
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => removeFactoryOption(index)}
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Highlights */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Highlights</label>
//           <Button
//             type="button"
//             variant="secondary"
//             size="sm"
//             onClick={() => appendHighlight("")}
//           >
//             Add Highlight
//           </Button>
//         </div>
//         {highlightsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input
//               {...register(`highlights.${index}` as const)}
//               placeholder="Highlight"
//               className="flex-1"
//             />
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => removeHighlight(index)}
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Key Features */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Key Features</label>
//           <Button
//             type="button"
//             variant="secondary"
//             size="sm"
//             onClick={() => appendKeyFeature({ label: "", value: "" })}
//           >
//             Add Feature
//           </Button>
//         </div>
//         {keyFeaturesFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input
//               {...register(`keyFeatures.${index}.label` as const)}
//               placeholder="Feature name"
//               className="flex-1"
//             />
//             <Input
//               {...register(`keyFeatures.${index}.value` as const)}
//               placeholder="Feature value"
//               className="flex-1"
//             />
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => removeKeyFeature(index)}
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Specifications */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">Specifications</label>
//           <Button
//             type="button"
//             variant="secondary"
//             size="sm"
//             onClick={() => appendSpecification({ label: "", value: "" })}
//           >
//             Add Specification
//           </Button>
//         </div>
//         {specificationsFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2">
//             <Input
//               {...register(`specifications.${index}.label` as const)}
//               placeholder="Specification name"
//               className="flex-1"
//             />
//             <Input
//               {...register(`specifications.${index}.value` as const)}
//               placeholder="Specification value"
//               className="flex-1"
//             />
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => removeSpecification(index)}
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Draft controls + Submit */}
//       <div className="flex justify-between items-center">
//         <div className="flex gap-2">
//           <Button
//             type="button"
//             variant="secondary"
//             size="md"
//             onClick={() => saveDraft(true)}
//           >
//             Save Draft
//           </Button>
//           <Button type="button" variant="danger" size="md" onClick={clearDraft}>
//             Clear Draft
//           </Button>
//           <span className="text-sm text-gray-500 self-center">
//             Drafts auto-expire after 24 hours
//           </span>
//         </div>

//         <div className="flex justify-end space-x-4">
//           <Button type="submit" disabled={isSubmitting} size="lg">
//             {isSubmitting
//               ? "Saving..."
//               : initialData
//               ? "Update Car"
//               : "Create Car"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Minus, Upload, X, RotateCcw } from "lucide-react";
import { CreateCarRequest, UpdateCarRequest, Car } from "../../types/car";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

interface CarFormProps {
  initialData?: Car;
  onSubmit: (
    data: CreateCarRequest | UpdateCarRequest,
    images: File[],
    videos: File[],
    existingImages: { key: string; orientation: 'portrait' | 'landscape' }[],
    existingVideos: string[],
    youtubeLinks: string[]
  ) => Promise<void>;
  onPublish?: () => Promise<void>;
  isNew?: boolean;
  isDraft?: boolean;
}

/* ----------------- Simple IndexedDB helper ----------------- */
const DB_NAME = "carDrafts";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("draftKey", "draftKey", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(item: any) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const r = store.put(item);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
}

async function idbGetById(id: string) {
  const db = await openDB();
  return new Promise<any>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const r = store.get(id);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

async function idbDeleteById(id: string) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const r = store.delete(id);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
}

async function idbGetByDraftKey(draftKey: string) {
  const db = await openDB();
  return new Promise<any[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const idx = store.index("draftKey");
    const r = idx.getAll(draftKey);
    r.onsuccess = () => resolve(r.result || []);
    r.onerror = () => reject(r.error);
  });
}

async function idbDeleteByDraftKey(draftKey: string) {
  try {
    const items = await idbGetByDraftKey(draftKey);
    await Promise.all(items.map((it) => idbDeleteById(it.id).catch(() => {})));
  } catch (error) {
    // Ignore errors during cleanup
  }
}

/* ----------------- Helper ----------------- */
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

/* ----------------- CarForm component ----------------- */
export default function CarForm({ initialData, onSubmit, onPublish, isNew = false, isDraft = false }: CarFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [imageFileIds, setImageFileIds] = useState<string[]>([]);
  const [videoFileIds, setVideoFileIds] = useState<string[]>([]);
  const [imageOrientations, setImageOrientations] = useState<{ 
    [key: number]: 'portrait' | 'landscape' 
  }>({});
  const [existingImages, setExistingImages] = useState<{ key: string; orientation: 'portrait' | 'landscape' }[]>(
    initialData?.imageKeys?.map(key => ({ key: key.key || key, orientation: key.orientation || 'landscape' })) || []
  );
  const [existingVideos, setExistingVideos] = useState<string[]>(
    initialData?.videoKeys || []
  );
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>(
    initialData?.youtubeLinks || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<CreateCarRequest>({
    defaultValues: {
      title: initialData?.title || "",
      make: initialData?.make || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      factoryOptions: initialData?.factoryOptions || [],
      highlights: initialData?.highlights || [],
      keyFeatures: initialData?.keyFeatures || [
        { label: "Exterior Colour", value: "" },
        { label: "Interior", value: "" },
        { label: "Suspension", value: "" },
        { label: "Wheels", value: "" },
      ],
      specifications: initialData?.specifications || [
        { label: "Make/Model", value: "" },
        { label: "Mileage", value: "" },
        { label: "Engine", value: "" },
        { label: "Transmission", value: "" },
      ],
      status: initialData?.status || "unsold",
      isDraft: initialData?.isDraft || false,
      youtubeLinks: initialData?.youtubeLinks || [],
    },
  });

  /* field arrays */
  const {
    fields: factoryOptionsFields,
    append: appendFactoryOption,
    remove: removeFactoryOption,
  } = useFieldArray({ control, name: "factoryOptions" });

  const {
    fields: highlightsFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlights" });

  const {
    fields: keyFeaturesFields,
    append: appendKeyFeature,
    remove: removeKeyFeature,
  } = useFieldArray({ control, name: "keyFeatures" });

  const {
    fields: specificationsFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({ control, name: "specifications" });

  const {
    fields: youtubeLinksFields,
    append: appendYoutubeLink,
    remove: removeYoutubeLink,
  } = useFieldArray({ control, name: "youtubeLinks" });

  /* draft keys */
  const formId = initialData?._id || "new";
  const today = new Date().toISOString().slice(0, 10);
  const draftKey = `carFormDraft:${formId}:${today}`;
  const mountedRef = useRef(false);

  /* Clean up old drafts */
  useEffect(() => {
    const cleanupOldDrafts = async () => {
      try {
        const now = Date.now();
        Object.keys(localStorage)
          .filter((k) => k.startsWith("carFormDraft:"))
          .forEach(async (k) => {
            try {
              const raw = localStorage.getItem(k);
              if (!raw) return localStorage.removeItem(k);
              const parsed = JSON.parse(raw);
              if (
                !parsed?.timestamp ||
                now - parsed.timestamp > 24 * 60 * 60 * 1000
              ) {
                await idbDeleteByDraftKey(k);
                localStorage.removeItem(k);
              }
            } catch {
              localStorage.removeItem(k);
            }
          });
      } catch (e) {}
    };
    cleanupOldDrafts();
  }, []);

  /* Load today's draft */
  useEffect(() => {
    let cancelled = false;
    const loadDraft = async () => {
      try {
        const raw = localStorage.getItem(draftKey);
        if (!raw) return;
        const draft = JSON.parse(raw);
        if (!draft) return;

        if (cancelled) return;
        
        if (draft.values) {
          Object.entries(draft.values).forEach(([k, v]) => {
            try {
              setValue(k as any, v);
            } catch {}
          });
        }
        
        if (draft.existingImages) {
          setExistingImages(draft.existingImages);
        }
        if (draft.existingVideos) {
          setExistingVideos(draft.existingVideos);
          setVideoPreviews(draft.existingVideos.map(() => ""));
        }
        if (draft.youtubeLinks) {
          setYoutubeLinks(draft.youtubeLinks);
        }
        if (draft.imageOrientations) {
          setImageOrientations(draft.imageOrientations);
        }

        const imgIds: string[] = draft.imageFileIds || [];
        const vidIds: string[] = draft.videoFileIds || [];

        const loadedImgs: File[] = [];
        const imgPreviews: string[] = [];
        for (const id of imgIds) {
          try {
            const rec = await idbGetById(id);
            if (rec?.blob) {
              const blob: Blob = rec.blob;
              const file = new File([blob], rec.name || `image-${id}`, {
                type: rec.mime || blob.type,
              });
              loadedImgs.push(file);
              imgPreviews.push(URL.createObjectURL(blob));
            }
          } catch {}
        }

        const loadedVids: File[] = [];
        const vidPreviews: string[] = [];
        for (const id of vidIds) {
          try {
            const rec = await idbGetById(id);
            if (rec?.blob) {
              const blob: Blob = rec.blob;
              const file = new File([blob], rec.name || `video-${id}`, {
                type: rec.mime || blob.type,
              });
              loadedVids.push(file);
              vidPreviews.push(URL.createObjectURL(blob));
            }
          } catch {}
        }

        if (!cancelled) {
          if (loadedImgs.length > 0) {
            setImages(loadedImgs);
            setImageFileIds(imgIds);
            setImagePreviews((prev) => [...prev, ...imgPreviews]);
          }
          if (loadedVids.length > 0) {
            setVideos(loadedVids);
            setVideoFileIds(vidIds);
            setVideoPreviews((prev) => [...prev, ...vidPreviews]);
          }
        }
      } catch (err) {}
    };

    loadDraft();
    return () => { cancelled = true; };
  }, [initialData, draftKey, setValue]);

  /* Auto-save draft */
  const watched = watch();
  useEffect(() => {
    const id = window.setTimeout(() => saveDraft(false), 1500);
    return () => clearTimeout(id);
  }, [
    watched,
    existingImages,
    existingVideos,
    youtubeLinks,
    imageFileIds,
    videoFileIds,
    images.length,
    videos.length,
    imageOrientations,
  ]);

  const saveDraft = (notify = true) => {
    try {
      const values = getValues();
      const draft = {
        values,
        existingImages,
        existingVideos,
        youtubeLinks,
        imageFileIds,
        videoFileIds,
        imageOrientations,
        timestamp: Date.now(),
      };
      localStorage.setItem(draftKey, JSON.stringify(draft));
      if (notify) toast.success("Draft saved locally");
    } catch (e) {
      if (notify) toast.error("Could not save draft locally");
    }
  };

  // Safe URL revocation
  const revokeUrlsSafely = (urls: string[]) => {
    urls.forEach((url) => {
      if (url && url.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(url);
        } catch (error) {
          // Silent fail
        }
      }
    });
  };

  // Clear draft
  const clearDraft = async () => {
    try {
      reset({
        title: "",
        make: "",
        description: "",
        price: 0,
        factoryOptions: [],
        highlights: [],
        keyFeatures: [],
        specifications: [],
        status: "unsold",
        isDraft: false,
        youtubeLinks: [],
      });

      setImages([]);
      setVideos([]);
      setImagePreviews([]);
      setVideoPreviews([]);
      setImageFileIds([]);
      setVideoFileIds([]);
      setImageOrientations({});
      setExistingImages([]);
      setExistingVideos([]);
      setYoutubeLinks([]);

      const clearFieldArray = (fields: any[], removeFn: (indices: number[]) => void) => {
        if (fields.length > 0 && removeFn) {
          removeFn(fields.map((_, i) => i));
        }
      };

      clearFieldArray(factoryOptionsFields, removeFactoryOption);
      clearFieldArray(highlightsFields, removeHighlight);
      clearFieldArray(keyFeaturesFields, removeKeyFeature);
      clearFieldArray(specificationsFields, removeSpecification);
      clearFieldArray(youtubeLinksFields, removeYoutubeLink);

      localStorage.removeItem(draftKey);
      await idbDeleteByDraftKey(draftKey);

      revokeUrlsSafely(imagePreviews);
      revokeUrlsSafely(videoPreviews);

      // toast.success("Draft cleared successfully");
    } catch (error) {
      console.error("Error clearing draft:", error);
      toast.error("Could not clear draft");
    }
  };

  /* Initialize initialData images/videos */
  useEffect(() => {
    if (initialData?.images) {
      setImagePreviews(initialData.images);
    }
    if (initialData?.videos) {
      setVideoPreviews(initialData.videos);
    }
    if (initialData?.youtubeLinks) {
      setYoutubeLinks(initialData.youtubeLinks);
      setValue("youtubeLinks", initialData.youtubeLinks);
    }
    if (initialData?.imageKeys) {
      setExistingImages(initialData.imageKeys.map(ik => ({
        key: typeof ik === 'string' ? ik : ik.key,
        orientation: typeof ik === 'string' ? 'landscape' : ik.orientation
      })));
      const initialOrientations = initialData.imageKeys.reduce((acc, ik, index) => {
        const orientation = typeof ik === 'string' ? 'landscape' : ik.orientation || 'landscape';
        return { ...acc, [index]: orientation };
      }, {});
      setImageOrientations(initialOrientations);
    }
  }, [initialData, setValue]);

  /* Toggle image orientation */
  const toggleImageOrientation = (index: number) => {
    setImageOrientations(prev => {
      const current = prev[index] || 'landscape';
      const newOrientation = current === 'portrait' ? 'landscape' : 'portrait';
      const newOrientations = { ...prev, [index]: newOrientation };
      saveDraft(false);
      return newOrientations;
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    const newIds: string[] = [];
    const newOrientations: { [key: number]: 'portrait' | 'landscape' } = {};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = `${draftKey}:img:${uid()}`;
      try {
        await idbPut({
          id,
          draftKey,
          kind: "image",
          name: file.name,
          mime: file.type,
          blob: await file
            .arrayBuffer()
            .then((buf) => new Blob([buf], { type: file.type })),
        });
        newFiles.push(file);
        const url = URL.createObjectURL(file);
        newPreviews.push(url);
        newIds.push(id);
        newOrientations[existingImages.length + images.length + i] = 'landscape';
      } catch (err) {
        console.error("Failed to save image to IndexedDB", err);
      }
    }

    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setImageFileIds((prev) => [...prev, ...newIds]);
    setImageOrientations(prev => ({ ...prev, ...newOrientations }));
    saveDraft(false);
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    const newIds: string[] = [];

    for (const file of files) {
      const id = `${draftKey}:vid:${uid()}`;
      try {
        await idbPut({
          id,
          draftKey,
          kind: "video",
          name: file.name,
          mime: file.type,
          blob: await file
            .arrayBuffer()
            .then((buf) => new Blob([buf], { type: file.type })),
        });
        newFiles.push(file);
        const url = URL.createObjectURL(file);
        newPreviews.push(url);
        newIds.push(id);
      } catch (err) {
        console.error("Failed to save video to IndexedDB", err);
      }
    }

    setVideos((prev) => [...prev, ...newFiles]);
    setVideoPreviews((prev) => [...prev, ...newPreviews]);
    setVideoFileIds((prev) => [...prev, ...newIds]);
    saveDraft(false);
  };

  const removeImage = (index: number) => {
    setImageOrientations(prev => {
      const newOrientations = { ...prev };
      delete newOrientations[index];
      return newOrientations;
    });

    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      const idToDelete = imageFileIds[newIndex];
      if (idToDelete) {
        idbDeleteById(idToDelete).catch(() => {});
      }
      setImages((prev) => prev.filter((_, i) => i !== newIndex));
      setImageFileIds((prev) => prev.filter((_, i) => i !== newIndex));
      if (imagePreviews[index]) {
        revokeUrlsSafely([imagePreviews[index]]);
      }
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
    
    setImageOrientations(prev => {
      const newOrientations: { [key: number]: 'portrait' | 'landscape' } = {};
      Object.entries(prev).forEach(([key, value]) => {
        const numKey = parseInt(key);
        if (numKey < index) {
          newOrientations[numKey] = value;
        } else if (numKey > index) {
          newOrientations[numKey - 1] = value;
        }
      });
      return newOrientations;
    });
    saveDraft(false);
  };

  const removeVideo = (index: number) => {
    if (index < existingVideos.length) {
      setExistingVideos((prev) => prev.filter((_, i) => i !== index));
      setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingVideos.length;
      const idToDelete = videoFileIds[newIndex];
      if (idToDelete) {
        idbDeleteById(idToDelete).catch(() => {});
      }
      setVideos((prev) => prev.filter((_, i) => i !== newIndex));
      setVideoFileIds((prev) => prev.filter((_, i) => i !== newIndex));
      if (videoPreviews[index]) {
        revokeUrlsSafely([videoPreviews[index]]);
      }
      setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    }
    saveDraft(false);
  };

  const handleFormSubmit = async (formData: CreateCarRequest) => {
    setIsSubmitting(true);
    try {
      const validYoutubeLinks = youtubeLinks.filter(
        (link) =>
          link.trim() !== "" &&
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
      );

      // Combine existing images with their orientations
      const allExistingImagesWithOrientation = existingImages.map((img, index) => ({
        key: img.key,
        orientation: imageOrientations[index] || img.orientation || 'landscape'
      }));

      // Map new images to include their orientations (temporary keys)
      const newImagesWithOrientation = images.map((_, index) => ({
        key: `new-image-${index}`,
        orientation: imageOrientations[existingImages.length + index] || 'landscape'
      }));

      const allImageKeys = [...allExistingImagesWithOrientation, ...newImagesWithOrientation];

      const data = {
        ...formData,
        isDraft: false,
        imageKeys: allImageKeys.length > 0 ? allImageKeys : undefined,
        videoKeys: existingVideos.length > 0 ? existingVideos : undefined,
        youtubeLinks: validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
      } as CreateCarRequest | UpdateCarRequest;

      await onSubmit(
        data,
        images,
        videos,
        allExistingImagesWithOrientation,
        existingVideos,
        validYoutubeLinks
      );

      await clearDraft();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to save car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsSubmitting(true);
    try {
      const formData = getValues();
      const validYoutubeLinks = youtubeLinks.filter(
        (link) =>
          link.trim() !== "" &&
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(link)
      );

      const allExistingImagesWithOrientation = existingImages.map((img, index) => ({
        key: img.key,
        orientation: imageOrientations[index] || img.orientation || 'landscape'
      }));

      const newImagesWithOrientation = images.map((_, index) => ({
        key: `new-image-${index}`,
        orientation: imageOrientations[existingImages.length + index] || 'landscape'
      }));

      const allImageKeys = [...allExistingImagesWithOrientation, ...newImagesWithOrientation];

      const data = {
        ...formData,
        isDraft: true,
        imageKeys: allImageKeys.length > 0 ? allImageKeys : undefined,
        videoKeys: existingVideos.length > 0 ? existingVideos : undefined,
        youtubeLinks: validYoutubeLinks.length > 0 ? validYoutubeLinks : undefined,
      } as CreateCarRequest | UpdateCarRequest;

      await onSubmit(
        data,
        images,
        videos,
        allExistingImagesWithOrientation,
        existingVideos,
        validYoutubeLinks
      );

      await clearDraft();
    } catch (error: any) {
      console.error("Draft save error:", error);
      toast.error(error?.response?.data?.message || "Failed to save draft");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishClick = async () => {
    if (onPublish) {
      setIsSubmitting(true);
      try {
        await onPublish();
        await clearDraft();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to publish car");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      revokeUrlsSafely(imagePreviews);
      revokeUrlsSafely(videoPreviews);
      mountedRef.current = false;
    };
  }, [imagePreviews, videoPreviews]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const allImagePreviews = [...imagePreviews];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          {...register("title", {
            required: "Title is required",
            setValueAs: (v) => v.trim(),
          })}
          error={errors.title?.message}
        />
        <Input
          label="Make"
          {...register("make", {
            required: "Make is required",
            setValueAs: (v) => v.trim(),
          })}
          error={errors.make?.message}
        />
        <Input
          label="Price"
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          })}
          error={errors.price?.message}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="unsold">Available</option>
            <option value="deposit">Deposit Taken</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <ReactQuill
          theme="snow"
          value={watch("description")}
          onChange={(value) =>
            setValue("description", value, { shouldValidate: true })
          }
          modules={quillModules}
          className="bg-white rounded-lg"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

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

        {allImagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allImagePreviews.map((preview, index) => {
              const orientation = imageOrientations[index] || 'landscape';
              return (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Image Preview ${index + 1}`}
                    className={`w-full h-32 rounded-lg ${
                      orientation === 'portrait' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleImageOrientation(index)}
                    className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition-colors"
                    title="Toggle Orientation"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      orientation === 'portrait'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {orientation.toUpperCase()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Videos */}
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
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* YouTube Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">YouTube Links</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendYoutubeLink("")}
          >
            Add YouTube Link
          </Button>
        </div>
        {youtubeLinksFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <Input
              {...register(`youtubeLinks.${index}` as const, {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                  message: "Please enter a valid YouTube URL",
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
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                removeYoutubeLink(index);
                const newLinks = youtubeLinks.filter((_, i) => i !== index);
                setYoutubeLinks(newLinks);
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Factory Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Factory Options</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendFactoryOption("")}
          >
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
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeFactoryOption(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
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
            onClick={() => appendHighlight("")}
          >
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
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeHighlight(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
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
            onClick={() => appendKeyFeature({ label: "", value: "" })}
          >
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
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeKeyFeature(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
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
            onClick={() => appendSpecification({ label: "", value: "" })}
          >
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
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeSpecification(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Local Draft controls + Submit */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => saveDraft(true)}
          >
            Save Local Draft
          </Button>
          <Button type="button" variant="danger" size="md" onClick={clearDraft}>
            Clear Local Draft
          </Button>
          <span className="text-sm text-gray-500 self-center">
            Local drafts auto-save and expire after 24 hours
          </span>
        </div>
        <div className="flex justify-end space-x-4">
          {(isNew || isDraft) && (
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
          )}
          <Button
            type={isDraft ? "button" : "submit"}
            disabled={isSubmitting}
            onClick={isDraft ? handlePublishClick : undefined}
          >
            {isSubmitting
              ? "Saving..."
              : isNew
              ? "Create Car"
              : isDraft
              ? "Publish Car"
              : "Update Car"}
          </Button>
        </div>
      </div>
    </form>
  );
}