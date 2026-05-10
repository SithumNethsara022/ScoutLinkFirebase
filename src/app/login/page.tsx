
'use client';

import { useState } from 'react';
import { auth, useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authInstance = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInstance) return;
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(authInstance, email, password);
      } else {
        await createUserWithEmailAndPassword(authInstance, email, password);
      }
      router.push('/onboarding');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!authInstance) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authInstance, provider);
      router.push('/onboarding');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error.message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient animate-in fade-in duration-1000">
      <Card className="w-full max-w-md glass-panel border-none rounded-[3.5rem] shadow-2xl overflow-hidden">
        <CardHeader className="p-12 pb-6 text-center">
          <div className="w-20 h-20 rounded-[2rem] liquid-glass flex items-center justify-center mx-auto mb-6 border border-primary/20 animate-bounce">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-black gold-text uppercase tracking-tight">
            {isLogin ? 'Troop Access' : 'New Induction'}
          </CardTitle>
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-[9px] font-black mt-3">
            42nd Colombo Gold Troop Portal
          </p>
        </CardHeader>
        <CardContent className="p-12 pt-0 space-y-8">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  type="email"
                  placeholder="name@scoutlink.lk"
                  className="rounded-2xl bg-black/20 border-white/5 h-14 pl-12 font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Password</Label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-2xl bg-black/20 border-white/5 h-14 pl-12 font-bold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              className="w-full h-16 rounded-[2rem] bg-primary text-black font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login to HQ' : 'Start Induction')}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-widest"><span className="bg-transparent px-4 text-muted-foreground">Or Connect With</span></div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-14 rounded-2xl border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10"
          >
            Google Authenticator
          </Button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            {isLogin ? "Need induction? Register here" : "Already a member? Sign in"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
