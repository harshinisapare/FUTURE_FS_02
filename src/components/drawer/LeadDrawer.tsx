import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Phone, Building2, Globe, Calendar, Send, Archive } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useLeadStore } from '@/lib/lead-store';
import { StatusPill } from '@/components/grid/StatusPill';
import { Button } from '@/components/ui/button';

export function LeadDrawer() {
  const { selectedLeadId, setSelectedLead, getSelectedLead, addNote, archiveLead } = useLeadStore();
  const lead = getSelectedLead();
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (!noteText.trim() || !lead) return;
    addNote(lead.id, noteText.trim());
    setNoteText('');
  };

  const handleArchive = () => {
    if (!lead) return;
    archiveLead(lead.id);
  };

  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-[400px] border-l border-border bg-card h-full flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-section font-semibold text-balance">Lead Dossier</h2>
            <button
              onClick={() => setSelectedLead(null)}
              className="p-1.5 rounded-md hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Lead Info */}
          <div className="p-4 border-b border-border space-y-4">
            <div>
              <h3 className="text-section font-semibold">{lead.name}</h3>
              <div className="mt-2">
                <StatusPill leadId={lead.id} status={lead.status} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ui text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-ui text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-ui text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span>{lead.company}</span>
              </div>
              <div className="flex items-center gap-2 text-ui text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                <span className="capitalize">{lead.source}</span>
              </div>
              <div className="flex items-center gap-2 text-ui text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Added {format(lead.createdAt, 'MMM d, yyyy')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-kpi font-bold tabular-nums">
                ₹{lead.value.toLocaleString('en-IN')}
              </span>
              <button
                onClick={handleArchive}
                className="flex items-center gap-1.5 text-caption text-muted-foreground hover:text-destructive transition-colors"
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </button>
            </div>
          </div>

          {/* Add Note */}
          <div className="p-4 border-b border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a follow-up note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                className="flex-1 px-3 py-2 text-ui bg-secondary rounded-md border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Button
                size="sm"
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                className="gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Save Note
              </Button>
            </div>
          </div>

          {/* Notes Timeline */}
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Activity ({lead.notes.length})
            </h4>
            <div className="space-y-3">
              {lead.notes.map((note) => (
                <div key={note.id} className="surface-card p-3">
                  <p className="text-ui leading-relaxed">{note.text}</p>
                  <span className="text-caption text-muted-foreground mt-1.5 block">
                    {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                  </span>
                </div>
              ))}
              {lead.notes.length === 0 && (
                <p className="text-caption text-muted-foreground">No notes yet. Add one above.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
