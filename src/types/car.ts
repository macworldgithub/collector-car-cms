// export interface KeyFeature {
//   label: string;
//   value: string;
// }

// export interface Specification {
//   label: string;
//   value: string;
// }

// export interface Car {
//   _id: string;
//   title: string;
//   make: string;
//   description: string;
//   price: number;
//   factoryOptions: string[];
//   highlights: string[];
//   keyFeatures: KeyFeature[];
//   specifications: Specification[];
//   status: 'unsold' | 'sold';
//   images: string[];
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateCarRequest {
//   title: string;
//   make: string;
//   description: string;
//   price: number;
//   factoryOptions: string[];
//   highlights: string[];
//   keyFeatures: KeyFeature[];
//   specifications: Specification[];
//   status: 'unsold' | 'sold';
// }

// export interface UpdateCarRequest extends Partial<CreateCarRequest> {
//   images?: string[];
// }
export interface Car {
  _id: string;
  title: string;
  make: string;
  description?: string;
  price: number;
  imageKeys: string[];
  images: string[];
  factoryOptions: string[];
  highlights: string[];
  keyFeatures: { label: string; value: string }[];
  specifications: { label: string; value: string }[];
  status: 'unsold' | 'sold';
  userId: string;
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
  status?: 'unsold' | 'sold';
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
  status?: 'unsold' | 'sold';
  imageKeys?: string[];
}