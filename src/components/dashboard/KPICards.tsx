import { TrendingUp, Users, IndianRupee, Zap } from 'lucide-react';
import { useLeadStore } from '@/lib/lead-store';

export function KPICards() {
  const getStats = useLeadStore((s) => s.getStats);
  const stats = getStats();

  const formatINR = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val}`;
  };

  const kpis = [
    {
      label: 'Pipeline Value',
      value: formatINR(stats.totalPipeline),
      icon: IndianRupee,
      change: '+18%',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: '+3.2%',
    },
    {
      label: 'Active Leads',
      value: stats.activeLeads.toString(),
      icon: Users,
      change: `${stats.newThisWeek} new this week`,
    },
    {
      label: 'Velocity',
      value: `${stats.newThisWeek}/wk`,
      icon: Zap,
      change: '+12% vs last',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="surface-card p-4 surface-card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-muted-foreground font-medium uppercase tracking-wider">
              {kpi.label}
            </span>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="kpi-number">{kpi.value}</div>
          <span className="text-caption text-accent font-medium">{kpi.change}</span>
        </div>
      ))}
    </div>
  );
}
