'use client';

import React, { useEffect, useState } from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";
import { BlogPost } from '@/types/components';
import { useApi } from '@/hooks/useApi';
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import Link from 'next/link';

const BlogPage: React.FC = () => {
    const { get, loading, error } = useApi();
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await get<BlogPost[]>('/posts');
            if (response?.data) {
                setPosts(response.data);
            }
        };

        fetchPosts();
    }, [get]);

    if (loading || posts.length === 0) {
        return (
            <main>
                <div className="relative">
                    <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">بلاگ ما</h1>
                        <div className="flex flex-wrap -mx-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-full md:w-1/3 px-4 mb-8">
                                    <Card className="overflow-hidden">
                                        <Skeleton className="h-48 w-full bg-muted" />
                                        <div className="p-6">
                                            <Skeleton className="h-7 w-4/5 mb-3 bg-muted" />
                                            <Skeleton className="h-4 w-1/3 mb-4 bg-muted" />
                                            <Skeleton className="h-4 w-full mb-2 bg-muted" />
                                            <Skeleton className="h-4 w-5/6 mb-2 bg-muted" />
                                            <Skeleton className="h-4 w-4/6 bg-muted" />
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="relative">
                    <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">بلاگ ما</h1>
                        <div className="text-center text-red-500">
                            خطا در دریافت مطالب بلاگ. لطفا دوباره تلاش کنید.
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="relative">
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                    <h1 className="text-3xl font-bold text-center mb-8 text-foreground">بلاگ ما</h1>
                    <div className="flex flex-wrap -mx-4">
                        {posts.map((post) => (
                            <div key={post.id} className="w-full md:w-1/3 px-4 mb-8">
                                <Link href={`/blog/${post.id}`}>
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div
                                            className="h-48 bg-cover bg-center"
                                            style={{ backgroundImage: `url("${post.image}")` }}
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-foreground mb-2">{post.title}</h3>
                                            <p className="text-muted-foreground text-sm mb-4">{post.date}</p>
                                            <p className="text-muted-foreground">{post.excerpt}</p>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPage;
