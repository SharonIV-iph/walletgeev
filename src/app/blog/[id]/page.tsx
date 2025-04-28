'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import { Card } from "@/registry/new-york-v4/ui/card";
import { BlogPost } from '@/types/components';

const BlogPostPage: React.FC = () => {
    const { id } = useParams();
    const { get, loading, error } = useApi();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await get<BlogPost>(`/posts/${id}`);
            if (response?.data) {
                setPost(response.data);
            }
        };

        fetchPost();
    }, [id, get]);

    if (loading) {
        return (
            <main>
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/4 mb-8" />
                    <Skeleton className="h-96 w-full mb-8" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
                    <div className="text-center text-red-500">
                        خطا در دریافت مطلب. لطفا دوباره تلاش کنید.
                    </div>
                </div>
            </main>
        );
    }

    if (!post) {
        return (
            <main>
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
                    <div className="text-center text-muted-foreground">
                        مطلب مورد نظر یافت نشد.
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4">
                <article className="prose prose-lg max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-muted-foreground text-sm mb-8">{post.date}</p>
                    <div className="relative w-full h-96 mb-8">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                </article>
            </div>
        </main>
    );
};

export default BlogPostPage;
