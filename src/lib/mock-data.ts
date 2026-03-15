import { Lead, LeadSource, LeadStatus } from './types';

const names = [
  'Sarah Chen', 'Marcus Johnson', 'Elena Rodriguez', 'James Mitchell', 'Priya Sharma',
  'David Kim', 'Rachel Foster', 'Omar Hassan', 'Lisa Wang', 'Thomas Anderson',
  'Maya Patel', 'Alex Turner', 'Sofia Morales', 'Ryan O\'Brien', 'Aisha Khan',
  'Chris Nakamura', 'Emma Davis', 'Luca Rossi', 'Nina Johansson', 'Kevin Park',
  'Hannah Meyer', 'Carlos Silva', 'Victoria Chang', 'Daniel Wright', 'Fatima Al-Salem',
  'Jake Morrison', 'Yuki Tanaka', 'Olivia Bennett', 'Samuel Okafor', 'Isabel Fernandez',
];

const companies = [
  'TechNova Inc.', 'Vertex Solutions', 'Atlas Digital', 'Quantum Labs', 'Pinnacle Group',
  'Ember Studios', 'Nexus Dynamics', 'Horizon Media', 'Catalyst Corp', 'Zephyr Analytics',
  'Forge Industries', 'Pulse Networks', 'Slate Ventures', 'Crest Consulting', 'Vibe Creative',
];

const sources: LeadSource[] = ['website', 'referral', 'social', 'email', 'cold-call', 'event'];
const statuses: LeadStatus[] = ['new', 'contacted', 'converted'];

const noteTemplates = [
  'Interested in enterprise plan. Wants a demo next week.',
  'Followed up via email. Awaiting response.',
  'Had a great call. Very interested in API integrations.',
  'Budget approved. Moving to contract phase.',
  'Needs custom onboarding for team of 50+.',
  'Referred by existing client. High priority.',
  'Requested pricing breakdown for annual plan.',
  'Met at conference. Strong product-market fit.',
  'Competitor evaluation in progress. Need to highlight differentiators.',
  'Decision maker is the CTO. Schedule technical deep-dive.',
];

function randomDate(daysBack: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  d.setHours(Math.floor(Math.random() * 12) + 8);
  d.setMinutes(Math.floor(Math.random() * 60));
  return d;
}

function randomId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function generateMockLeads(count: number = 30): Lead[] {
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const status = statuses[Math.floor(Math.random() * 3)];
    const createdAt = randomDate(60);
    const notesCount = Math.floor(Math.random() * 3) + (status === 'new' ? 0 : 1);
    
    return {
      id: randomId(),
      name,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@${companies[i % companies.length].toLowerCase().replace(/[^a-z]/g, '')}.com`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company: companies[i % companies.length],
      source: sources[Math.floor(Math.random() * sources.length)],
      status,
      value: Math.floor(Math.random() * 50) * 1000 + 5000,
      notes: Array.from({ length: notesCount }, () => ({
        id: randomId(),
        text: noteTemplates[Math.floor(Math.random() * noteTemplates.length)],
        createdAt: randomDate(30),
      })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      createdAt,
      updatedAt: randomDate(14),
      lastContactedAt: status !== 'new' ? randomDate(7) : null,
    };
  });
}
