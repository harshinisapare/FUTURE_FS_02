import { useLeadStore } from '@/lib/lead-store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const SOURCE_COLORS = [
  'hsl(221, 83%, 53%)',
  'hsl(221, 83%, 65%)',
  'hsl(221, 83%, 40%)',
  'hsl(221, 60%, 75%)',
  'hsl(221, 40%, 50%)',
  'hsl(221, 83%, 85%)',
];

const sourceLabels: Record<string, string> = {
  website: 'Website',
  referral: 'Referral',
  social: 'Social',
  email: 'Email',
  'cold-call': 'Cold Call',
  event: 'Event',
};

export function AnalyticsPanel() {
  const stats = useLeadStore((s) => s.getStats());

  const pieData = Object.entries(stats.bySource).map(([key, value]) => ({
    name: sourceLabels[key] || key,
    value,
  }));

  const statusData = [
    { name: 'New', value: stats.byStatus.new, fill: 'hsl(221, 83%, 53%)' },
    { name: 'Contacted', value: stats.byStatus.contacted, fill: 'hsl(38, 92%, 50%)' },
    { name: 'Converted', value: stats.byStatus.converted, fill: 'hsl(142, 71%, 45%)' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Weekly Volume */}
      <div className="surface-card p-4">
        <h3 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Weekly Lead Volume
        </h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={stats.weeklyVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" width={24} />
            <Tooltip
              contentStyle={{
                background: 'hsl(0, 0%, 100%)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="leads" fill="hsl(221, 83%, 53%)" opacity={0.8} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Source Distribution */}
      <div className="surface-card p-4">
        <h3 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Source Distribution
        </h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(0, 0%, 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2 text-caption">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: SOURCE_COLORS[i % SOURCE_COLORS.length] }}
                />
                <span className="text-muted-foreground">{entry.name}</span>
                <span className="font-medium tabular-nums ml-auto">{entry.value as number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="surface-card p-4">
        <h3 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Pipeline Funnel
        </h3>
        <div className="space-y-3 mt-2">
          {statusData.map((s) => {
            const total = stats.totalLeads || 1;
            const pct = Math.round((s.value / total) * 100);
            return (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-caption font-medium">{s.name}</span>
                  <span className="text-caption tabular-nums text-muted-foreground">
                    {s.value} ({pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 expo-out"
                    style={{ width: `${pct}%`, background: s.fill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between text-caption">
            <span className="text-muted-foreground">This week</span>
            <span className="font-medium tabular-nums text-accent">
              +{stats.convertedThisWeek} converted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
