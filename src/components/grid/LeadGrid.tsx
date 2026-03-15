import { formatDistanceToNow } from 'date-fns';
import { useLeadStore } from '@/lib/lead-store';
import { StatusPill } from './StatusPill';
import { Search, SlidersHorizontal } from 'lucide-react';
import { LeadStatus } from '@/lib/types';

const sourceLabels: Record<string, string> = {
  website: 'Website',
  referral: 'Referral',
  social: 'Social',
  email: 'Email',
  'cold-call': 'Cold Call',
  event: 'Event',
};

export function LeadGrid() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedLeadId,
    setSelectedLead,
    getFilteredLeads,
  } = useLeadStore();

  const leads = getFilteredLeads();
  const filters: (LeadStatus | 'all')[] = ['all', 'new', 'contacted', 'converted'];

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-ui bg-secondary rounded-md border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-caption font-medium rounded transition-all duration-200 expo-out capitalize ${
                statusFilter === f
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-caption text-muted-foreground tabular-nums">
          {leads.length} leads
        </span>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-[2fr_2fr_1.2fr_1fr_1fr_1fr] gap-2 px-4 py-2 border-b border-border text-caption font-medium text-muted-foreground uppercase tracking-wider">
        <span>Name</span>
        <span>Company</span>
        <span>Source</span>
        <span>Status</span>
        <span className="text-right">Value</span>
        <span className="text-right">Added</span>
      </div>

      {/* Grid Body */}
      <div className="flex-1 overflow-y-auto">
        {leads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => setSelectedLead(lead.id)}
            className={`grid grid-cols-[2fr_2fr_1.2fr_1fr_1fr_1fr] gap-2 px-4 py-3 cursor-pointer transition-all duration-200 expo-out border-b border-border/50 ${
              selectedLeadId === lead.id
                ? 'grid-row-selected'
                : 'grid-row-hover'
            }`}
          >
            <div className="flex flex-col min-w-0">
              <span className="text-ui font-medium truncate">{lead.name}</span>
              <span className="text-caption text-muted-foreground truncate">{lead.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-ui truncate">{lead.company}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-secondary text-caption font-medium text-muted-foreground">
                {sourceLabels[lead.source] || lead.source}
              </span>
            </div>
            <div className="flex items-center">
              <StatusPill leadId={lead.id} status={lead.status} />
            </div>
            <div className="flex items-center justify-end">
              <span className="text-ui font-medium tabular-nums">
                ${(lead.value / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-caption text-muted-foreground tabular-nums">
                {formatDistanceToNow(lead.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-ui">
            No leads found
          </div>
        )}
      </div>
    </div>
  );
}
