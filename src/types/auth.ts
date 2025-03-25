export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    username: string;
  };
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
