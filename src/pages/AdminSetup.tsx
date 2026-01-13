import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { COMPANY_INFO } from "@/lib/constants";

export default function AdminSetup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's already an admin
    const checkAdmin = async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id")
        .eq("role", "admin")
        .limit(1);
      
      if (!error && data && data.length > 0) {
        setHasAdmin(true);
      } else {
        setHasAdmin(false);
      }
    };
    
    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) {
        toast.error(signUpError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Add admin role
        const { error: roleError } = await supabase
          .from("user_roles")
          .update({ role: "admin" })
          .eq("user_id", authData.user.id);

        if (roleError) {
          console.error("Error setting admin role:", roleError);
          // Try insert if update fails (in case trigger didn't create the role)
          await supabase
            .from("user_roles")
            .insert({ user_id: authData.user.id, role: "admin" });
        }

        toast.success("Akun admin berhasil dibuat! Silakan login.");
        navigate("/auth");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }

    setLoading(false);
  };

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold font-serif mb-2">Admin Sudah Ada</h1>
          <p className="text-muted-foreground mb-6">
            Akun admin sudah dibuat sebelumnya. Silakan login dengan akun admin yang sudah ada.
          </p>
          <Button onClick={() => navigate("/auth")} className="gradient-primary">
            Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg font-serif">
                {COMPANY_INFO.name}
              </span>
              <p className="text-xs text-muted-foreground -mt-1">Setup Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6">
            <Shield className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              Halaman ini hanya untuk membuat akun admin pertama. Setelah admin dibuat, halaman ini tidak bisa diakses lagi.
            </p>
          </div>

          <h1 className="text-3xl font-bold font-serif mb-2">
            Buat Akun Admin
          </h1>
          <p className="text-muted-foreground mb-8">
            Buat akun admin pertama untuk mengelola website
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Nama Admin"
                  className="pl-10"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary shadow-elegant"
              disabled={loading}
            >
              {loading ? "Membuat Akun..." : "Buat Akun Admin"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex w-1/2 gradient-hero items-center justify-center p-16">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-24 h-24 rounded-full bg-background/10 flex items-center justify-center mx-auto mb-8">
            <Shield className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold font-serif mb-4">
            Admin Setup
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Buat akun admin pertama untuk mulai mengelola {COMPANY_INFO.name}
          </p>
          <div className="p-6 bg-background/10 rounded-xl text-left">
            <h3 className="font-semibold mb-3">Fitur Admin:</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>✓ Upload & kelola buku</li>
              <li>✓ Edit informasi buku</li>
              <li>✓ Upload cover buku</li>
              <li>✓ Publish/unpublish buku</li>
              <li>✓ Hapus buku</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
