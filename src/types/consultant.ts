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
    created_at: string;
    discription: string;
    messages: Array<{
        sender_id: string;
        message: string;
        created_at: string;
    }>;
}
