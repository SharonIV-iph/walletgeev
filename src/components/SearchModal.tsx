import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/registry/new-york-v4/ui/dialog";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Search } from "lucide-react";
import { SearchModalProps } from '@/types/components';
import { useEffect, useState } from "react";
import { useApi } from '@/hooks/useApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Consultant {
    id: string;
    name: string;
    email: string;
    expertise: string;
    imageUrl: string;
}

interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
}

const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onOpenChange,
    searchQuery,
    setSearchQuery,
    onSearch,
}) => {
    const { get } = useApi();
    const router = useRouter();
    const [searchDataConsultant, setSearchDataConsultant] = useState<Consultant[]>([]);
    const [searchDataService, setSearchDataService] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');
            setSearchDataConsultant([]);
            setSearchDataService([]);
            setHasSearched(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchDataConsultant([]);
            setSearchDataService([]);
            setHasSearched(false);
        }
    }, [searchQuery]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setHasSearched(true);
        try {
            const [consultantsResponse, servicesResponse] = await Promise.all([
                get<Consultant[]>(`/consultants?q=${searchQuery}`),
                get<Service[]>(`/services?q=${searchQuery}`)
            ]);

            if (consultantsResponse?.data) {
                setSearchDataConsultant(consultantsResponse.data);
            }

            if (servicesResponse?.data) {
                setSearchDataService(servicesResponse.data);
            }
        } catch (error) {
            console.error('Error fetching search data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConsultantClick = (id: string) => {
        onOpenChange(false);
        router.push(`/consultants/${id}`);
    };

    const handleServiceClick = (id: string) => {
        onOpenChange(false);
        router.push(`/services/${id}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <DialogContent className="fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                        <DialogHeader className="flex justify-center items-center">
                            <DialogTitle>جستجو</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSearch} className="mt-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder="جستجو..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1"
                                    autoFocus
                                />
                                <Button type="submit">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                        <div className="max-h-[500px] overflow-y-auto">
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <p className="text-sm text-muted-foreground">در حال جستجو...</p>
                                </div>
                            ) : hasSearched && searchDataService.length === 0 && searchDataConsultant.length === 0 ? (
                                <div className="flex justify-center items-center">
                                    <p className="text-sm text-muted-foreground">هیچ نتیجه‌ای یافت نشد</p>
                                </div>
                            ) : hasSearched && (searchDataService.length > 0 || searchDataConsultant.length > 0) ? (
                                <div className="flex flex-col gap-4">
                                    {searchDataConsultant.length > 0 && (
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-medium">متخصصین</h3>
                                            <div className="flex flex-col gap-2">
                                                {searchDataConsultant.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                                        onClick={() => handleConsultantClick(item.id)}
                                                    >
                                                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                            <Image
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{item.expertise}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {searchDataService.length > 0 && (
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-medium">خدمات</h3>
                                            <div className="flex flex-col gap-2">
                                                {searchDataService.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                                        onClick={() => handleServiceClick(item.id)}
                                                    >
                                                        <div className="flex flex-col">
                                                            <h4 className="text-sm font-medium">{item.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{item.shortDescription}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </DialogContent>
                </div>
            )}
        </Dialog>
    );
};

export default SearchModal;
