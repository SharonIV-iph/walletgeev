export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    date: string;
    author: {
        name: string;
        image: string;
    };
    tags: string[];
}
