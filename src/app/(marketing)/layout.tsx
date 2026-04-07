import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase not configured
  }

  return (
    <>
      <Navbar user={user ? { email: user.email ?? '' } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
