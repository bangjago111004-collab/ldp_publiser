import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Upload,
  ArrowLeft,
  LogOut,
  Image,
  X,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    year_published: "",
    category: "",
    pages: "",
    price: "",
    cover_image_url: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
        navigate("/auth");
      }
    });
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    setIsAdmin(data === true);
    setLoading(false);

    if (data === true) {
      fetchBooks();
    }
  };

  const fetchBooks = async () => {
    const { data } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    setBooks(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("book-covers")
      .upload(fileName, file);

    if (error) {
      toast.error("Gagal mengupload gambar");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("book-covers").getPublicUrl(fileName);

    setFormData({ ...formData, cover_image_url: publicUrl });
    setUploading(false);
    toast.success("Gambar berhasil diupload");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author,
      description: formData.description || null,
      isbn: formData.isbn || null,
      year_published: formData.year_published
        ? parseInt(formData.year_published)
        : null,
      category: formData.category || null,
      pages: formData.pages ? parseInt(formData.pages) : null,
      price: formData.price ? parseFloat(formData.price) : null,
      cover_image_url: formData.cover_image_url || null,
      created_by: user?.id,
    };

    if (editingBook) {
      const { error } = await supabase
        .from("books")
        .update(bookData)
        .eq("id", editingBook.id);

      if (error) {
        toast.error("Gagal mengupdate buku");
        return;
      }
      toast.success("Buku berhasil diupdate");
    } else {
      const { error } = await supabase.from("books").insert([bookData]);

      if (error) {
        toast.error("Gagal menambahkan buku");
        return;
      }
      toast.success("Buku berhasil ditambahkan");
    }

    resetForm();
    setIsDialogOpen(false);
    fetchBooks();
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      isbn: book.isbn || "",
      year_published: book.year_published?.toString() || "",
      category: book.category || "",
      pages: book.pages?.toString() || "",
      price: book.price?.toString() || "",
      cover_image_url: book.cover_image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus buku ini?")) return;

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      toast.error("Gagal menghapus buku");
      return;
    }

    toast.success("Buku berhasil dihapus");
    fetchBooks();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      isbn: "",
      year_published: "",
      category: "",
      pages: "",
      price: "",
      cover_image_url: "",
    });
    setEditingBook(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold font-serif mb-2">Akses Ditolak</h1>
          <p className="text-muted-foreground mb-6">
            Anda tidak memiliki akses admin. Hubungi administrator untuk mendapatkan akses.
          </p>
          <Button onClick={() => navigate("/")} className="gradient-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold font-serif">{COMPANY_INFO.name}</span>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif">Kelola Buku</h1>
            <p className="text-muted-foreground">
              Tambah, edit, atau hapus buku yang sudah diterbitkan
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="gradient-primary shadow-elegant"
                onClick={resetForm}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Buku
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif">
                  {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Cover Image */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cover Buku
                  </label>
                  <div className="flex items-start gap-4">
                    {formData.cover_image_url ? (
                      <div className="relative w-32 h-44 rounded-lg overflow-hidden border border-border">
                        <img
                          src={formData.cover_image_url}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, cover_image_url: "" })
                          }
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-44 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        {uploading ? (
                          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <Image className="w-8 h-8 text-muted-foreground mb-2" />
                            <span className="text-xs text-muted-foreground text-center px-2">
                              Upload Cover
                            </span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Judul Buku *
                    </label>
                    <Input
                      required
                      placeholder="Judul buku"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Penulis *
                    </label>
                    <Input
                      required
                      placeholder="Nama penulis"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Deskripsi
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="Deskripsi singkat buku"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      ISBN
                    </label>
                    <Input
                      placeholder="978-xxx-xxx-xxx-x"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Kategori
                    </label>
                    <Input
                      placeholder="Fiksi, Non-fiksi, dst."
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tahun Terbit
                    </label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={formData.year_published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year_published: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Jumlah Halaman
                    </label>
                    <Input
                      type="number"
                      placeholder="200"
                      value={formData.pages}
                      onChange={(e) =>
                        setFormData({ ...formData, pages: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Harga (Rp)
                    </label>
                    <Input
                      type="number"
                      placeholder="150000"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="flex-1 gradient-primary">
                    {editingBook ? "Update Buku" : "Simpan Buku"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Books List */}
        {books.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-card rounded-xl border border-border overflow-hidden group"
              >
                <div className="aspect-[3/4] relative bg-muted">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <BookOpen className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleEdit(book)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold font-serif line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  {book.category && (
                    <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {book.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold font-serif mb-2">
              Belum Ada Buku
            </h2>
            <p className="text-muted-foreground mb-6">
              Mulai tambahkan buku yang sudah diterbitkan
            </p>
            <Button
              className="gradient-primary"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Buku Pertama
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
