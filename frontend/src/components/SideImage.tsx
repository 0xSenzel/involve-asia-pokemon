interface SideImageProps {
  image: string;
  alt: string;
}

export function SideImage({ image, alt }: SideImageProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-card bg-secondary/30 flex items-center justify-center">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
