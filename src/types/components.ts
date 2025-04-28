import { Consultant } from './consultant';

export interface GalleryItem {
    id: string;
    imageUrl: string;
    caption: string;
}

export interface GalleryProps {
    items: GalleryItem[];
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string;
    content: string;
    rating: number;
}

export interface TestimonialsProps {
    testimonials: Testimonial[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    bio?: string;
}

export interface TeamSectionProps {
    team: TeamMember[];
}

export interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    iconUrl: string;
    imageUrl: string;
}

export interface ServicesProps {
    services: Service[];
}

export interface HeroProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface FeaturesProps {
    features: Feature[];
}

export interface FeaturedConsultantsProps {
    consultants: Consultant[];
}

export interface SearchModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: (e: React.FormEvent) => void;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

export interface ButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}

export interface FeaturesProps {
    features: Feature[];
}

export interface Service {
    title: string;
    description: string;
    icon: string;
}

export interface ServicesProps {
    services: Service[];
}

export interface HeroProps {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

export interface FeaturedConsultantsProps {
    consultants: Consultant[];
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

export interface BlogPost {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    description: string;
}
