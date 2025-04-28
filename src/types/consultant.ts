export interface Consultant {
    id: number;
    name: string;
    expertise: string;
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
    assigned: Consultant[];
    status: 'active' | 'closed';
    createdAt: string;
    lastMessage?: string;
}
