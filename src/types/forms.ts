export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
} 