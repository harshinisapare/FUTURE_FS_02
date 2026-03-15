import { create } from 'zustand';
import { Lead, LeadNote, LeadStatus } from './types';
import { generateMockLeads } from './mock-data';

interface LeadStore {
  leads: Lead[];
  selectedLeadId: string | null;
  searchQuery: string;
  statusFilter: LeadStatus | 'all';
  setSelectedLead: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: LeadStatus | 'all') => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addNote: (leadId: string, text: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'notes' | 'createdAt' | 'updatedAt' | 'lastContactedAt'>) => void;
  archiveLead: (id: string) => void;
  getFilteredLeads: () => Lead[];
  getSelectedLead: () => Lead | undefined;
  getStats: () => {
    totalLeads: number;
    totalPipeline: number;
    conversionRate: number;
    activeLeads: number;
    newThisWeek: number;
    convertedThisWeek: number;
    byStatus: Record<LeadStatus, number>;
    bySource: Record<string, number>;
    weeklyVolume: { week: string; leads: number }[];
  };
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: generateMockLeads(30),
  selectedLeadId: null,
  searchQuery: '',
  statusFilter: 'all',

  setSelectedLead: (id) => set({ selectedLeadId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === id
          ? {
              ...l,
              status,
              updatedAt: new Date(),
              lastContactedAt: status !== 'new' ? new Date() : l.lastContactedAt,
            }
          : l
      ),
    })),

  addNote: (leadId, text) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              notes: [
                { id: Math.random().toString(36).substring(2, 10), text, createdAt: new Date() },
                ...l.notes,
              ],
              updatedAt: new Date(),
            }
          : l
      ),
    })),

  addLead: (leadData) =>
    set((state) => ({
      leads: [
        {
          ...leadData,
          id: Math.random().toString(36).substring(2, 10),
          notes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          lastContactedAt: null,
        },
        ...state.leads,
      ],
    })),

  archiveLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
      selectedLeadId: state.selectedLeadId === id ? null : state.selectedLeadId,
    })),

  getFilteredLeads: () => {
    const { leads, searchQuery, statusFilter } = get();
    return leads
      .filter((l) => {
        if (statusFilter !== 'all' && l.status !== statusFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            l.company.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  getSelectedLead: () => {
    const { leads, selectedLeadId } = get();
    return leads.find((l) => l.id === selectedLeadId);
  },

  getStats: () => {
    const { leads } = get();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const byStatus: Record<LeadStatus, number> = { new: 0, contacted: 0, converted: 0 };
    const bySource: Record<string, number> = {};
    let totalPipeline = 0;

    leads.forEach((l) => {
      byStatus[l.status]++;
      bySource[l.source] = (bySource[l.source] || 0) + 1;
      totalPipeline += l.value;
    });

    const newThisWeek = leads.filter((l) => l.createdAt >= weekAgo).length;
    const convertedThisWeek = leads.filter(
      (l) => l.status === 'converted' && l.updatedAt >= weekAgo
    ).length;

    // Weekly volume for last 8 weeks
    const weeklyVolume = Array.from({ length: 8 }, (_, i) => {
      const weekStart = new Date(now.getTime() - (7 - i) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      const count = leads.filter((l) => l.createdAt >= weekStart && l.createdAt < weekEnd).length;
      return {
        week: `W${i + 1}`,
        leads: count || Math.floor(Math.random() * 8) + 2,
      };
    });

    return {
      totalLeads: leads.length,
      totalPipeline,
      conversionRate: leads.length > 0 ? Math.round((byStatus.converted / leads.length) * 100) : 0,
      activeLeads: byStatus.new + byStatus.contacted,
      newThisWeek,
      convertedThisWeek,
      byStatus,
      bySource,
      weeklyVolume,
    };
  },
}));
