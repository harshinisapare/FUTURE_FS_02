import { useState } from 'react';
import { Command, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. Try admin@forgecrm.in / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
            <Command className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-section font-bold heading-tight">Forge CRM</h1>
          <p className="text-caption text-muted-foreground mt-1">Admin Panel Login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="surface-card p-6 space-y-4">
          <div>
            <label className="text-caption font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@forgecrm.in"
              className="w-full px-3 py-2.5 text-ui bg-secondary rounded-md border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-caption font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 text-ui bg-secondary rounded-md border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-caption text-destructive font-medium">{error}</p>
          )}

          <Button type="submit" className="w-full gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>

          <p className="text-caption text-muted-foreground text-center pt-2">
            Demo: admin@forgecrm.in / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
