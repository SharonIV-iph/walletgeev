export interface Specialist {
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

export interface ConsultationSpecialist {
    id: string;
    uuid: string;
    name: string;
    assigned: Specialist[];
    status: 'active' | 'closed';
    created_at: string;
    discription: string;
    messages: Array<{
        sender_id: string;
        message: string;
        created_at: string;
    }>;
}
