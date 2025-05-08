export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    features: string[];
    price: number;
    duration: string;
    isPopular?: boolean;
    category?: string;
}
