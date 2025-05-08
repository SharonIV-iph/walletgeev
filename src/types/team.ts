export interface TeamMember {
    id: string;
    name: string;
    role: string;
    position: string;
    image: string;
    bio: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}
