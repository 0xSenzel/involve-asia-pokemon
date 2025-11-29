interface StaticBannerProps {
  image: string;
  alt: string;
}

export function StaticBanner({ image, alt }: StaticBannerProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-card bg-card">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
