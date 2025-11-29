import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerImages = [
  "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542779283-429940ce8336?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1732418483426-f54404116aec?w=1200&h=400&fit=crop",
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-card shadow-card">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerImages.map((image, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-card/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
