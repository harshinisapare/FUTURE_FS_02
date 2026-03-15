import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BarChart3, Command, ChevronLeft, ChevronRight, Moon, Sun, LogOut } from 'lucide-react';
import { KPICards } from '@/components/dashboard/KPICards';
import { LeadGrid } from '@/components/grid/LeadGrid';
import { LeadDrawer } from '@/components/drawer/LeadDrawer';
import { AnalyticsPanel } from '@/components/dashboard/AnalyticsPanel';
import { AddLeadDialog } from '@/components/dashboard/AddLeadDialog';
import { useLeadStore } from '@/lib/lead-store';
import { useThemeStore } from '@/lib/theme-store';
import { useAuthStore } from '@/lib/auth-store';

type View = 'dashboard' | 'leads' | 'analytics';

const navItems = [
  { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads' as View, label: 'Leads', icon: Users },
  { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
];

export default function Index() {
  const [view, setView] = useState<View>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const selectedLeadId = useLeadStore((s) => s.selectedLeadId);
  const { isDark, toggle: toggleTheme } = useThemeStore();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setView('leads');
        setTimeout(() => {
          const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
          input?.focus();
        }, 100);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-border bg-card transition-all duration-300 expo-out ${
          collapsed ? 'w-16' : 'w-[220px]'
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Command className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-ui font-bold tracking-tight">Forge CRM</span>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-ui font-medium transition-all duration-200 expo-out ${
                view === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-border space-y-0.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-caption"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors text-caption"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-caption"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div>
            <h1 className="text-section font-semibold heading-tight">
              {view === 'dashboard' && 'Pipeline Velocity'}
              {view === 'leads' && 'Lead Management'}
              {view === 'analytics' && 'Analytics'}
            </h1>
            <p className="text-caption text-muted-foreground">
              {view === 'dashboard' && 'Your single-pane command center'}
              {view === 'leads' && 'Track, update, and convert'}
              {view === 'analytics' && 'Performance insights'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-caption text-muted-foreground bg-secondary rounded border border-border">
              ⌘K
            </kbd>
            <AddLeadDialog />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {view === 'dashboard' && (
              <div className="p-6 space-y-4">
                <KPICards />
                <AnalyticsPanel />
                <div className="surface-card overflow-hidden" style={{ height: 'calc(100vh - 420px)' }}>
                  <LeadGrid />
                </div>
              </div>
            )}
            {view === 'leads' && (
              <div className="h-full">
                <LeadGrid />
              </div>
            )}
            {view === 'analytics' && (
              <div className="p-6 space-y-4">
                <KPICards />
                <AnalyticsPanel />
              </div>
            )}
          </div>
          <LeadDrawer />
        </div>
      </div>
    </div>
  );
}
