// components/EventCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

const EventCard = ({ id, imageUrl, title, category }: EventCardProps) => {
  return (
    <Link href={`/events/${id}`} className="relative block w-full aspect-[2/3] rounded-lg overflow-hidden group">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-sm text-gray-300">{category}</p>
      </div>
    </Link>
  );
};

export default EventCard;