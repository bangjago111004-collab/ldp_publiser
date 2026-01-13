import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/books/BookCard";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await supabase
      .from("books")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    
    setBooks(data || []);
    setLoading(false);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Katalog Buku
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6">
              Koleksi <span className="text-gradient">Publikasi Kami</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Temukan karya-karya berkualitas dari penulis-penulis terbaik Indonesia
              yang telah kami terbitkan.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari judul atau penulis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-4 animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-serif mb-4">
                Katalog Sedang Disiapkan
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Kami sedang mempersiapkan koleksi buku berkualitas untuk Anda. 
                Segera hadir dengan karya-karya terbaik dari penulis Indonesia.
              </p>
              <Button asChild className="gradient-primary">
                <Link to="/contact">Hubungi Kami untuk Info Lebih Lanjut</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Tidak ditemukan buku dengan kata kunci "{search}"
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
