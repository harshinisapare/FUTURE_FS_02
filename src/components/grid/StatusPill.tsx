import { Check, Phone, Sparkles } from 'lucide-react';
import { LeadStatus } from '@/lib/types';
import { useLeadStore } from '@/lib/lead-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig: Record<LeadStatus, { label: string; className: string; icon: typeof Check }> = {
  new: {
    label: 'New',
    className: 'bg-status-new-bg text-status-new',
    icon: Sparkles,
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-status-contacted-bg text-status-contacted',
    icon: Phone,
  },
  converted: {
    label: 'Converted',
    className: 'bg-status-converted-bg text-status-converted',
    icon: Check,
  },
};

export function StatusPill({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const updateLeadStatus = useLeadStore((s) => s.updateLeadStatus);
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-caption font-medium cursor-pointer transition-all duration-200 expo-out hover:scale-105 ${config.className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[140px]">
        {(Object.keys(statusConfig) as LeadStatus[]).map((s) => {
          const sc = statusConfig[s];
          const SIcon = sc.icon;
          return (
            <DropdownMenuItem
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                updateLeadStatus(leadId, s);
              }}
              className="gap-2"
            >
              <SIcon className="h-3 w-3" />
              {sc.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
