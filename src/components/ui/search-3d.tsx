import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { allManga } from "@/lib/data/manga-data";
import { Manga } from "@/lib/types";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Search3DProps {
  className?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  showOnMobile?: boolean;
  maxResults?: number;
}

export function Search3D({
  className,
  onSearch,
  autoFocus = false,
  placeholder = "Tìm kiếm truyện của bạn...",
  showOnMobile = false,
  maxResults = 4,
}: Search3DProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [suggestions, setSuggestions] = useState<Manga[]>([]);
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const performSearch = (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search with delay for animation effect
    setTimeout(() => {
      const results = allManga.filter(
        (manga) =>
          manga.title.toLowerCase().includes(value.toLowerCase()) ||
          manga.description.toLowerCase().includes(value.toLowerCase()) ||
          manga.author.toLowerCase().includes(value.toLowerCase()) ||
          manga.genres.some((genre) => genre.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 20); // Limit to 20 results

      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // First search for results in-place
      performSearch(query);
      setSuggestions([]);

      // If onSearch callback exists, call it (usually for navigation)
      if (onSearch) {
        onSearch(query);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 2) {
      // Search for suggestions
      const results = allManga
        .filter(
          (manga) =>
            manga.title.toLowerCase().includes(value.toLowerCase()) ||
            manga.author.toLowerCase().includes(value.toLowerCase()) ||
            manga.genres.some((genre) =>
              genre.toLowerCase().includes(value.toLowerCase())
            )
        )
        .slice(0, maxResults); // Limit to maxResults

      setSuggestions(results);

      // Also perform search for results display
      performSearch(value);
    } else {
      setSuggestions([]);
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (manga: Manga) => {
    setQuery(manga.title);
    setSuggestions([]);
    navigate(`/manga/${manga.id}`);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-3xl perspective-1000",
        showOnMobile ? "" : "md:block hidden",
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center backdrop-blur-sm border border-input bg-background/80 rounded-xl shadow-lg overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 py-2.5 px-4 w-full bg-transparent focus:outline-none text-base placeholder:text-muted-foreground"
            autoComplete="off"
          />

          <button
            type="submit"
            className={cn(
              "flex items-center justify-center p-3 text-muted-foreground hover:text-primary transition-colors",
              query.trim() ? "text-primary" : ""
            )}
          >
            <SearchIcon className={cn(
              "h-5 w-5 transition-transform duration-300",
              isFocused ? "scale-110" : "",
              query.trim() ? "text-primary" : ""
            )} />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-background/95 backdrop-blur-sm border border-input rounded-xl shadow-lg overflow-hidden animate-in fade-in-50 duration-300"
        >
          <div className="p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((manga) => (
                <div
                  key={manga.id}
                  className="flex items-center gap-3 p-2 hover:bg-primary/10 cursor-pointer transition-colors rounded-lg"
                  onClick={() => handleSuggestionClick(manga)}
                >
                  <img
                    src={manga.coverImage}
                    alt={manga.title}
                    className="w-10 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate text-sm">{manga.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {manga.author}
                    </p>
                    {manga.genres[0] && (
                      <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 rounded-full mt-1">
                        {manga.genres[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full search results */}
      {query.trim().length >= 2 && (
        <div className="mt-6">
          {isSearching ? (
            <div className="flex justify-center py-6">
              <div className="relative">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-0 opacity-50 blur-md w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"
                    style={{ animationDuration: '1s', animationDelay: '0.1s' }} />
              </div>
            </div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {searchResults.length} kết quả cho "{query}"
                  </h3>
                  <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4">
                      {searchResults.map((manga, index) => (
                        <div
                          key={manga.id}
                          className="relative group cursor-pointer"
                          onClick={() => navigate(`/manga/${manga.id}`)}
                        >
                          <div className="aspect-[2/3] overflow-hidden rounded-md">
                            <img
                              src={manga.coverImage}
                              alt={manga.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="mt-2">
                            <h3 className="text-sm font-medium truncate">{manga.title}</h3>
                            <p className="text-xs text-muted-foreground truncate">{manga.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    Không tìm thấy kết quả nào cho "{query}"
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
