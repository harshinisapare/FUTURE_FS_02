import { Lead, LeadSource, LeadStatus } from './types';

const names = [
  'Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Gupta', 'Vikram Singh',
  'Sneha Reddy', 'Arjun Nair', 'Kavya Iyer', 'Rajesh Kumar', 'Divya Joshi',
  'Aditya Verma', 'Meera Kapoor', 'Siddharth Rao', 'Ishita Banerjee', 'Karan Malhotra',
  'Neha Agarwal', 'Harsh Pandey', 'Pooja Deshmukh', 'Varun Choudhary', 'Riya Saxena',
  'Amit Tiwari', 'Shreya Bhatt', 'Manish Kulkarni', 'Ankita Mishra', 'Deepak Chauhan',
  'Tanvi Shah', 'Nikhil Srivastava', 'Sakshi Dubey', 'Rahul Thakur', 'Swati Pillai',
];

const companies = [
  'Infosys Ltd.', 'Wipro Technologies', 'TCS Digital', 'Zoho Corp', 'Freshworks Inc.',
  'Razorpay Pvt. Ltd.', 'Flipkart Internet', 'Ola Cabs', 'Swiggy Technologies', 'Zerodha Broking',
  'PhonePe Digital', 'Paytm Payments', 'BYJU\'s Education', 'Meesho Supply', 'Unacademy Learning',
];

const sources: LeadSource[] = ['website', 'referral', 'social', 'email', 'cold-call', 'event'];
const statuses: LeadStatus[] = ['new', 'contacted', 'converted'];

const noteTemplates = [
  'Enterprise plan mein interest hai. Next week demo chahiye.',
  'Email se follow up kiya. Response ka wait kar rahe hain.',
  'Bahut achhi call thi. API integrations mein interest hai.',
  'Budget approve ho gaya. Contract phase mein move kar rahe hain.',
  '50+ team ke liye custom onboarding chahiye.',
  'Existing client se referral aaya hai. High priority.',
  'Annual plan ki pricing breakdown maangi hai.',
  'Conference mein mile the. Strong product-market fit.',
  'Competitor evaluation chal raha hai. Differentiators highlight karne hain.',
  'Decision maker CTO hai. Technical deep-dive schedule karna hai.',
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
    const companyName = companies[i % companies.length];
    const domain = companyName.toLowerCase().replace(/[^a-z]/g, '') + '.in';
    
    return {
      id: randomId(),
      name,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@${domain}`,
      phone: `+91 ${Math.floor(Math.random() * 90000 + 10000)} ${Math.floor(Math.random() * 90000 + 10000)}`,
      company: companyName,
      source: sources[Math.floor(Math.random() * sources.length)],
      status,
      value: Math.floor(Math.random() * 50) * 10000 + 50000,
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
