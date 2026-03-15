import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useLeadStore } from '@/lib/lead-store';
import { LeadSource, LeadStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddLeadDialog() {
  const addLead = useLeadStore((s) => s.addLead);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'website' as LeadSource,
    status: 'new' as LeadStatus,
    value: 10000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addLead(form);
    setForm({ name: '', email: '', phone: '', company: '', source: 'website', status: 'new', value: 10000 });
    setOpen(false);
  };

  const inputClass =
    'w-full px-3 py-2 text-ui bg-secondary rounded-md border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
          <input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as LeadSource })} className={inputClass}>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="social">Social</option>
              <option value="email">Email</option>
              <option value="cold-call">Cold Call</option>
              <option value="event">Event</option>
            </select>
            <input type="number" placeholder="Deal Value" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} className={inputClass} />
          </div>
          <Button type="submit" className="w-full">Create Lead</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
