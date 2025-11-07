import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';

export function AdminHeader() {
  const { user, signOut } = useAdminAuth();

  return (
    <header className="h-14 border-b bg-card flex items-center px-4 sticky top-0 z-10">
      <SidebarTrigger className="mr-4" />
      <div className="flex-1 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {user?.email}
        </div>
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
