import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Manga } from "@/lib/types";

interface MangaCarouselProps {
  items: Manga[];
}

export function MangaCarousel({ items }: MangaCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <div className="relative overflow-hidden rounded-xl bg-black aspect-[16/9] h-full">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="object-cover w-full h-full opacity-60"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-4">
                      <Link to={`/manga/${item.id}`}>
                        <Button size="sm">Voir les détails</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
