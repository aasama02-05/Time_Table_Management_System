import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/state/auth';
import { UserRole } from '@/types/domain';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@university.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('admin');
  
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password, role);
  };

  const demoAccounts = [
    { role: 'admin' as UserRole, email: 'admin@university.edu', label: 'Administrator' },
    { role: 'teacher' as UserRole, email: 'teacher@university.edu', label: 'Teacher' },
    { role: 'student' as UserRole, email: 'student@university.edu', label: 'Student' },
    { role: 'support_staff' as UserRole, email: 'staff@university.edu', label: 'Support Staff' }
  ];

  const selectDemoAccount = (demoRole: UserRole, demoEmail: string) => {
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-pink-50 to-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Time Table System
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="shadow-large">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="support_staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.role}
                    variant="outline"
                    size="sm"
                    onClick={() => selectDemoAccount(account.role, account.email)}
                    className="text-xs"
                  >
                    {account.label}
                  </Button>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Password for all demo accounts: <code>password123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}