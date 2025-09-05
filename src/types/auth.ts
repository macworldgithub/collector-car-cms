export interface User {
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}