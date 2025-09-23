export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  message: string;
  highlight?: string;
  userId: string;
}