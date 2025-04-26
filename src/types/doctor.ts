export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  experience: number;
  location: string;
  price: number;
  available: boolean;
  description: string;
}

export interface Consultation {
  id: string;
  uuid: string;
  name: string;
  assigned: Doctor[];
  status: 'active' | 'closed';
  createdAt: string;
  lastMessage?: string;
} 