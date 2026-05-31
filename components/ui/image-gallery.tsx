interface ImageGalleryProps {
  images: string[];
  alt: string;
  columns?: { md?: number };
}

export function ImageGallery({ images, alt, columns = { md: 2 } }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className={`grid md:grid-cols-${columns.md} gap-4`}>
      {images.map((image, index) => (
        <div key={index} className="aspect-video bg-white/5 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
