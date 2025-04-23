import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/registry/new-york-v4/ui/dialog";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Search } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onOpenChange,
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogContent className="fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <DialogHeader>
              <DialogTitle>جستجو</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSearch} className="mt-4">
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
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
};

export default SearchModal; 