import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    cover_image_url?: string;
    category?: string;
    year_published?: number;
    price?: number;
  };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link 
      to={`/books/${book.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden hover:shadow-elegant transition-all duration-300 hover-lift"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <BookOpen className="w-16 h-16 text-primary/30" />
          </div>
        )}
        {book.category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {book.category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold font-serif text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center justify-between">
          {book.year_published && (
            <span className="text-xs text-muted-foreground">
              {book.year_published}
            </span>
          )}
          {book.price && (
            <span className="text-sm font-semibold text-primary">
              Rp {book.price.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
