import Image from 'next/image';

interface FeaturedImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
};

export function FeaturedImage({ src, alt, aspectRatio = 'video' }: FeaturedImageProps) {
  return (
    <div className={`${aspectClasses[aspectRatio]} bg-white/5 rounded-lg overflow-hidden mb-12 relative`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
