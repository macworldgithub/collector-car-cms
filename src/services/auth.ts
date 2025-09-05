import api from './api';
import { AuthResponse, SignupRequest, SigninRequest } from '../types/auth';

export const authService = {
  async signup(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', { email, password, name });
    return response.data;
  },

  async signin(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', { email, password });
    return response.data;
  },
};