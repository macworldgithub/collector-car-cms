// // export interface Car {
// //   _id: string;
// //   title: string;
// //   make: string;
// //   description?: string;
// //   price: number;
// //   imageKeys: string[];
// //   images: string[];
// //   videoKeys: string[];
// //   videos: string[];
// //   youtubeLinks: string[];
// //   factoryOptions: string[];
// //   highlights: string[];
// //   keyFeatures: { label: string; value: string }[];
// //   specifications: { label: string; value: string }[];
// //   status: 'unsold' | 'sold';
// //   userId: string;
// //   slug: string;
// // }

// // export interface CreateCarRequest {
// //   title: string;
// //   make: string;
// //   description?: string;
// //   price?: number;
// //   factoryOptions?: string[];
// //   highlights?: string[];
// //   keyFeatures?: { label: string; value: string }[];
// //   specifications?: { label: string; value: string }[];
// //   status?: 'unsold' | 'sold';
// //   youtubeLinks?: string[];
// // }

// // export interface UpdateCarRequest {
// //   title?: string;
// //   make?: string;
// //   description?: string;
// //   price?: number;
// //   factoryOptions?: string[];
// //   highlights?: string[];
// //   keyFeatures?: { label: string; value: string }[];
// //   specifications?: { label: string; value: string }[];
// //   status?: 'unsold' | 'sold';
// //   imageKeys?: string[];
// //   videoKeys?: string[];
// //   youtubeLinks?: string[];
// // }
// export interface Car {
//   _id: string;
//   title: string;
//   make: string;
//   description?: string;
//   price: number;
//   imageKeys: string[];
//   images: string[];
//   videoKeys: string[];
//   videos: string[];
//   youtubeLinks: string[];
//   factoryOptions: string[];
//   highlights: string[];
//   keyFeatures: { label: string; value: string }[];
//   specifications: { label: string; value: string }[];
//   status: 'unsold' | 'sold' | 'deposit';
//   userId: string;
//   slug: string;
// }

// export interface CreateCarRequest {
//   title: string;
//   make: string;
//   description?: string;
//   price?: number;
//   factoryOptions?: string[];
//   highlights?: string[];
//   keyFeatures?: { label: string; value: string }[];
//   specifications?: { label: string; value: string }[];
//   status?: 'unsold' | 'sold' | 'deposit';
//   youtubeLinks?: string[];
// }

// export interface UpdateCarRequest {
//   title?: string;
//   make?: string;
//   description?: string;
//   price?: number;
//   factoryOptions?: string[];
//   highlights?: string[];
//   keyFeatures?: { label: string; value: string }[];
//   specifications?: { label: string; value: string }[];
//   status?: 'unsold' | 'sold' | 'deposit';
//   imageKeys?: string[];
//   videoKeys?: string[];
//   youtubeLinks?: string[];
// }
export interface Car {
  _id: string;
  title: string;
  make: string;
  description?: string;
  price: number;
  imageKeys: { key: string; orientation: 'portrait' | 'landscape' }[];
  images: string[];
  videoKeys: string[];
  videos: string[];
  youtubeLinks: string[];
  factoryOptions: string[];
  highlights: string[];
  keyFeatures: { label: string; value: string }[];
  specifications: { label: string; value: string }[];
  status: 'unsold' | 'sold' | 'deposit';
  userId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarRequest {
  title: string;
  make: string;
  description?: string;
  price?: number;
  factoryOptions?: string[];
  highlights?: string[];
  keyFeatures?: { label: string; value: string }[];
  specifications?: { label: string; value: string }[];
  status?: 'unsold' | 'sold' | 'deposit';
  youtubeLinks?: string[];
  imageKeys?: { key: string; orientation: 'portrait' | 'landscape' }[];
}

export interface UpdateCarRequest {
  title?: string;
  make?: string;
  description?: string;
  price?: number;
  factoryOptions?: string[];
  highlights?: string[];
  keyFeatures?: { label: string; value: string }[];
  specifications?: { label: string; value: string }[];
  status?: 'unsold' | 'sold' | 'deposit';
  imageKeys?: { key: string; orientation: 'portrait' | 'landscape' }[];
  videoKeys?: string[];
  youtubeLinks?: string[];
}