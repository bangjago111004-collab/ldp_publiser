import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ArrowLeft, 
  ShoppingCart, 
  Calendar, 
  FileText, 
  Tag, 
  User,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover_image_url?: string;
  category?: string;
  year_published?: number;
  pages?: number;
  price?: number;
  isbn?: string;
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching book:", error);
    }
    setBook(data);
    setLoading(false);
  };

  const handleBuy = () => {
    if (!book) return;
    
    const message = `Halo, saya tertarik untuk membeli buku:\n\n📚 *${book.title}*\n✍️ Penulis: ${book.author}${book.price ? `\n💰 Harga: Rp ${book.price.toLocaleString("id-ID")}` : ""}\n\nMohon informasi lebih lanjut mengenai pembelian.`;
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Mengarahkan ke WhatsApp...");
  };

  if (loading) {
    return (
      <Layout>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-2xl" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-6 bg-muted rounded w-1/2" />
                  <div className="h-32 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center py-24">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-2xl font-bold font-serif mb-4">
                Buku Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground mb-8">
                Maaf, buku yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Button asChild>
                <Link to="/books">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Katalog
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link 
            to="/books" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Katalog
          </Link>
        </div>
      </section>

      {/* Book Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Cover Image */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-elegant-lg">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <BookOpen className="w-24 h-24 text-primary/30" />
                    </div>
                  )}
                </div>
                {book.category && (
                  <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
                    {book.category}
                  </span>
                )}
              </div>

              {/* Book Info */}
              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
                  {book.title}
                </h1>
                
                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
                  <User className="w-5 h-5" />
                  <span>{book.author}</span>
                </div>

                {/* Price */}
                {book.price && (
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">
                      Rp {book.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                {/* Description */}
                {book.description && (
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Sinopsis
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {book.year_published && (
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Tahun Terbit</span>
                      </div>
                      <p className="font-semibold">{book.year_published}</p>
                    </div>
                  )}
                  
                  {book.pages && (
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <FileText className="w-4 h-4" />
                        <span>Jumlah Halaman</span>
                      </div>
                      <p className="font-semibold">{book.pages} halaman</p>
                    </div>
                  )}
                  
                  {book.isbn && (
                    <div className="bg-secondary/50 rounded-xl p-4 col-span-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Tag className="w-4 h-4" />
                        <span>ISBN</span>
                      </div>
                      <p className="font-semibold font-mono">{book.isbn}</p>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button 
                    size="lg" 
                    className="gradient-primary flex-1"
                    onClick={handleBuy}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Beli Sekarang
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1"
                    onClick={handleBuy}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Tanya via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
