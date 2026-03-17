Forge CRM — Client Lead Management System
A full-stack CRM application built for agencies, freelancers, and startups to manage client leads, track pipeline value, and convert prospects into clients.
🔗 Live Demo: https://forgecrm.vercel.app
📧 Demo Credentials: admin@forgecrm.in / admin123

Features

Landing Page — Professional landing page with feature overview and CTA
Secure Login — Role-based admin authentication with credential validation
Lead Pipeline — Add, view, update and delete leads with full CRUD operations
Status Tracking — Track leads through New → Contacted → Converted stages
Notes & Follow-ups — Add timestamped notes to each lead
KPI Dashboard — Real-time metrics: total leads, conversion rate, pipeline value
Analytics Panel — Charts showing leads by source, status breakdown, weekly volume
Search & Filter — Search by name/email/company, filter by status and source
Dark/Light Mode — Toggle between themes
Responsive UI — Works on desktop and mobile
MongoDB Storage — All leads persist in cloud database across sessions


Tech Stack
Frontend
TechnologyPurposeReact 18UI frameworkTypeScriptType safetyViteBuild toolTailwind CSSStylingZustandState managementReact RouterClient-side routingLucide ReactIconsshadcn/uiUI components
Backend
TechnologyPurposeNode.jsRuntimeExpress.jsREST API frameworkMongooseMongoDB ODMCORSCross-origin requestsDotenvEnvironment variables
Database & Deployment
ServicePurposeMongoDB AtlasCloud databaseVercelFrontend hostingRailwayBackend hosting

Project Structure
FUTURE_FS_02/
├── src/                          # React frontend
│   ├── components/
│   │   ├── dashboard/            # KPI cards, analytics, add lead dialog
│   │   ├── drawer/               # Lead detail drawer
│   │   ├── grid/                 # Lead list grid
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/
│   │   ├── auth-store.ts         # Authentication state
│   │   ├── lead-store.ts         # Lead management + API calls
│   │   ├── theme-store.ts        # Dark/light mode
│   │   └── types.ts              # TypeScript types
│   └── pages/
│       ├── Landing.tsx           # Landing page
│       ├── Login.tsx             # Login page
│       ├── Index.tsx             # Main dashboard
│       └── NotFound.tsx          # 404 page
├── server/                       # Express backend
│   ├── models/
│   │   └── Lead.js               # MongoDB Lead schema
│   ├── routes/
│   │   └── leads.js              # CRUD API routes
│   ├── index.js                  # Express server entry point
│   └── package.json              # Backend dependencies
├── vercel.json                   # Vercel routing config
└── package.json                  # Frontend dependencies

API Endpoints
MethodEndpointDescriptionGET/api/healthHealth checkGET/api/leadsGet all leadsGET/api/leads/:idGet single leadPOST/api/leadsCreate new leadPATCH/api/leads/:idUpdate leadDELETE/api/leads/:idDelete lead

Getting Started Locally
Prerequisites

Node.js v18+
MongoDB Atlas account
Git

1. Clone the repository
bashgit clone https://github.com/harshinisapare/FUTURE_FS_02.git
cd FUTURE_FS_02
2. Install frontend dependencies
bashnpm install
3. Install backend dependencies
bashcd server
npm install
4. Set up environment variables
Create .env in the root folder:
VITE_API_URL=http://localhost:5000
Create server/.env:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/forgecrm?appName=Cluster0
PORT=5000
FRONTEND_URL=http://localhost:5173
5. Run the backend
bashcd server
npm run dev
6. Run the frontend (new terminal)
bashcd ..
npm run dev
7. Open in browser
http://localhost:5173
Login with: admin@forgecrm.in / admin123

Deployment
Frontend — Vercel

Push code to GitHub
Import repo on vercel.com
Add environment variable: VITE_API_URL=your_railway_url
Deploy — Vercel auto detects Vite

Backend — Railway

Create new project on railway.app
Connect GitHub repo
Set root directory to server
Add environment variables: MONGODB_URI, PORT, FRONTEND_URL
Generate domain and deploy


Author
Harshini Sapare
GitHub: @harshinisapare

License
This project is built as part of Future Interns — Full Stack Development Program (Task 2).
