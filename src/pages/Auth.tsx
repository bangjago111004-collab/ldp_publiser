import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { COMPANY_INFO } from "@/lib/constants";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Email atau password salah");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      toast.success("Berhasil login!");
      navigate("/");
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }

    setLoading(false);
  };

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
              <p className="text-xs text-muted-foreground -mt-1">Admin Panel</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold font-serif mb-2">
            Login Admin
          </h1>
          <p className="text-muted-foreground mb-8">
            Masuk ke panel admin untuk mengelola buku
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="email@example.com"
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
                  placeholder="••••••••"
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
              {loading ? "Memproses..." : "Masuk"}
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
            <BookOpen className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold font-serif mb-4">
            {COMPANY_INFO.name}
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {COMPANY_INFO.tagline}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {COMPANY_INFO.stats.slice(0, 4).map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-background/10 rounded-lg"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
