<!-- # 🤖 AGENTS.md — HR Management System (Frontend Demo)
> **Stack:** Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · Zustand · Recharts  
> **Mode:** Frontend-only demo with Indian dummy data · No backend required  
> **Roles:** `admin` | `hr` | `employee`

---

## 📐 Project Architecture

```
hr-management/
├── app/                          # Next.js 16 App Router
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Shell: sidebar + header
│   │   ├── page.tsx              # Home Dashboard
│   │   ├── profile/
│   │   │   └── [id]/page.tsx
│   │   ├── team/page.tsx
│   │   ├── organization/page.tsx
│   │   ├── trackers/
│   │   │   ├── leave/page.tsx
│   │   │   ├── time/page.tsx
│   │   │   ├── attendance/page.tsx
│   │   │   └── reimbursement/page.tsx
│   │   ├── salary/page.tsx
│   │   ├── finance/page.tsx
│   │   └── settings/page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn base components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── RoleSwitcher.tsx      # Demo role switcher
│   │   └── NotificationBell.tsx
│   ├── dashboard/
│   │   ├── CheckInCard.tsx
│   │   ├── BirthdayCard.tsx
│   │   ├── NewHiresCard.tsx
│   │   ├── AttendanceWidget.tsx
│   │   ├── LeaveReportCard.tsx
│   │   ├── HolidayCard.tsx
│   │   ├── AnnouncementCard.tsx
│   │   ├── TimelogCard.tsx
│   │   ├── QuickLinks.tsx
│   │   └── ApprovalRequests.tsx
│   ├── employee/
│   │   ├── EmployeeCard.tsx
│   │   ├── EmployeeTable.tsx
│   │   ├── ProfileTabs.tsx
│   │   └── ImportModal.tsx
│   ├── team/
│   │   ├── TeamAvailability.tsx
│   │   ├── DepartmentWall.tsx
│   │   └── OrgTree.tsx
│   ├── salary/
│   │   ├── PayslipCard.tsx
│   │   ├── SalaryBreakdown.tsx
│   │   └── PayHistory.tsx
│   ├── trackers/
│   │   ├── LeaveTracker.tsx
│   │   ├── TimeTracker.tsx
│   │   ├── AttendanceLog.tsx
│   │   └── ReimbursementForm.tsx
│   └── shared/
│       ├── StatCard.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── SearchBar.tsx
│       └── HRChatbot.tsx
├── lib/
│   ├── data/
│   │   ├── employees.ts          # Indian dummy data
│   │   ├── attendance.ts
│   │   ├── leaves.ts
│   │   ├── salary.ts
│   │   ├── announcements.ts
│   │   └── holidays.ts
│   ├── store/
│   │   ├── authStore.ts          # Zustand: role state
│   │   ├── employeeStore.ts
│   │   └── uiStore.ts
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts                  # All TypeScript interfaces
└── public/
    └── avatars/                  # Indian name initials avatars
```

---

## 🎨 Design System — MUST FOLLOW

### Color Palette
```css
/* globals.css — apply these as CSS variables */
--background:       #F8F9FB;   /* Page background */
--surface:          #FFFFFF;   /* Card/panel background */
--surface-alt:      #F1F3F7;   /* Subtle section dividers */
--border:           #E4E7EC;   /* All borders */
--text-primary:     #111827;   /* Headings */
--text-secondary:   #6B7280;   /* Labels, meta */
--text-muted:       #9CA3AF;   /* Placeholders */
--brand:            #4F46E5;   /* Indigo — primary CTA */
--brand-light:      #EEF2FF;   /* Brand tint bg */
--success:          #10B981;   /* Active / present */
--warning:          #F59E0B;   /* Pending / half-day */
--danger:           #EF4444;   /* Absent / rejected */
--info:             #3B82F6;   /* Info / links */
```

### Typography
```
Font: Inter (Google Fonts)
Headings: font-semibold tracking-tight
Body: font-normal text-sm
Labels: text-xs text-secondary uppercase tracking-wide
```

### Spacing / Cards
- All cards: `rounded-2xl bg-white border border-[--border] shadow-sm p-5`
- Section titles: `text-base font-semibold text-[--text-primary] mb-4`
- Page padding: `px-6 py-5`
- Grid gaps: `gap-4` or `gap-5`
- Sidebar width: `w-[240px]` collapsed `w-[64px]`

### UI Rules
1. **No heavy gradients** — flat surfaces, max 1 subtle gradient per hero element
2. **Borders over shadows** — use `border` for separation, `shadow-sm` only on hover
3. **Status badges**: pill shape `rounded-full px-2.5 py-0.5 text-xs font-medium`
4. **Tables**: zebra rows `even:bg-[--surface-alt]`, sticky header
5. **Charts**: Recharts only, muted colors, no 3D effects
6. **Avatars**: colored initials or image, always with `ring-2 ring-white`
7. **Empty states**: illustration + helper text, never blank white
8. **Loading**: skeleton shimmer, never spinners on full page

---

## 👥 Role System (Auth Store)

```typescript
// lib/store/authStore.ts
type Role = 'admin' | 'hr' | 'employee'

interface AuthState {
  role: Role
  user: Employee
  setRole: (role: Role) => void
}

// Demo credentials (no backend)
const DEMO_USERS = {
  admin:    { id: 'EMP001', name: 'Rajesh Sharma',   role: 'admin'    },
  hr:       { id: 'EMP042', name: 'Priya Mehta',     role: 'hr'       },
  employee: { id: 'EMP087', name: 'Arjun Nair',      role: 'employee' },
}
```

### Role Visibility Matrix
| Feature                    | Admin | HR  | Employee |
|----------------------------|-------|-----|----------|
| All Employee Data          | ✅    | ✅  | ❌       |
| Salary of Others           | ✅    | ✅  | ❌       |
| Approve Leaves/Time        | ✅    | ✅  | ❌       |
| Import Employees           | ✅    | ✅  | ❌       |
| Organization Settings      | ✅    | ❌  | ❌       |
| Finance Module             | ✅    | ❌  | ❌       |
| Own Profile                | ✅    | ✅  | ✅       |
| Apply Leave/Checkin        | ✅    | ✅  | ✅       |

> **Demo Role Switcher**: Float a small pill in the top-right corner of the header showing current role with a dropdown to switch instantly — this makes demo presentation easy.

---

## 🇮🇳 Indian Dummy Data Spec

### Employees (25 records minimum)
```typescript
// lib/data/employees.ts
export const EMPLOYEES = [
  {
    id: 'EMP001',
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@techinfinia.in',
    phone: '+91 98765 43210',
    designation: 'Chief Technology Officer',
    department: 'Engineering',
    location: 'Bengaluru, Karnataka',
    joiningDate: '2019-03-15',
    salary: 285000,
    status: 'active',
    reportingTo: null,
    avatar: 'RS',
    aadhaar: 'XXXX-XXXX-1234',
    pan: 'ABCDE1234F',
    bankAccount: 'SBI ****7890',
    bloodGroup: 'O+',
    emergencyContact: 'Sunita Sharma — +91 98765 11111',
  },
  // Include employees from cities: Mumbai, Delhi, Bengaluru, Chennai, Hyderabad,
  // Pune, Kolkata, Ahmedabad, Jaipur, Raipur
  // Departments: Engineering, HR, Finance, Sales, Marketing, Operations, Design, Legal
  // Mix of: junior/senior/manager/director/C-suite levels
]
```

### Name Bank (use these)
```
Rajesh Sharma, Priya Mehta, Arjun Nair, Sunita Verma, Kiran Patel,
Deepa Iyer, Suresh Reddy, Neha Gupta, Amit Joshi, Kavitha Krishnan,
Ravi Shankar, Pooja Agarwal, Manoj Singh, Divya Rao, Vikram Malhotra,
Ananya Pillai, Rohit Desai, Shilpa Tiwari, Rahul Mishra, Meera Nambiar,
Sanjay Dubey, Lakshmi Narayanan, Gaurav Bhatia, Tanvi Shah, Dinesh Choudhary
```

### Company
```typescript
export const COMPANY = {
  name: 'TechInfinia Solutions Pvt. Ltd.',
  cin: 'U72900KA2018PTC123456',
  gstin: '29ABCDE1234F1Z5',
  pan: 'ABCDE1234F',
  founded: '2018',
  strength: 247,
  hq: 'Bengaluru, Karnataka',
  offices: ['Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'],
  industry: 'IT Services & Consulting',
  logo: '/logo.svg',
}
```

### Holidays (Indian 2025)
```typescript
export const HOLIDAYS = [
  { date: '2025-01-26', name: 'Republic Day',          type: 'national' },
  { date: '2025-03-14', name: 'Holi',                  type: 'festival' },
  { date: '2025-04-14', name: 'Dr. Ambedkar Jayanti',  type: 'national' },
  { date: '2025-04-18', name: 'Good Friday',            type: 'restricted' },
  { date: '2025-08-15', name: 'Independence Day',       type: 'national' },
  { date: '2025-10-02', name: 'Gandhi Jayanti',         type: 'national' },
  { date: '2025-10-20', name: 'Dussehra',               type: 'festival' },
  { date: '2025-10-30', name: 'Diwali',                 type: 'festival' },
  { date: '2025-11-05', name: 'Bhai Dooj',              type: 'festival' },
  { date: '2025-12-25', name: 'Christmas',              type: 'festival' },
]
```

### Leave Types
```
Casual Leave (CL)     — 12 days/year
Sick Leave (SL)       — 8 days/year
Earned Leave (EL)     — 15 days/year
Maternity Leave (ML)  — 180 days
Paternity Leave (PL)  — 15 days
Compensatory Off (CO) — As earned
```

---

## 🏗️ Page-by-Page Build Spec

---

### PAGE 1: Login (`/login`)
**Layout:** Split-screen (60/40). Left: brand illustration + company tagline. Right: login form.

**Components:**
- Company logo + name top-left
- `<RoleSwitcher>` — 3 card buttons: Admin / HR / Employee (click to select role)
- Email input (pre-filled per role)
- Password input (any value works)
- "Sign In" button → redirect to `/`
- Bottom note: "Demo Mode — No real data is stored"

---

### PAGE 2: Home Dashboard (`/`)
**Layout:** 12-col grid. Sidebar (fixed 240px) + content area.

**Top Row — Stats Bar (4 cards):**
```
[Present Today: 198/247] [On Leave: 12] [New Hires (Month): 3] [Open Positions: 7]
```

**Row 1 (3 cols):**
- `CheckInCard` — Clock display, Check-in/out button, today's duration timer, punch history
- `BirthdayCard` — 3 employees with birthdays this week, confetti emoji, send wish button
- `NewHiresCard` — Last 3 joiners with avatar, designation, joining date badge

**Row 2 (2 cols):**
- `AttendanceWidget` — Monthly heatmap calendar (present=green, absent=red, half=yellow, holiday=blue)
- `LeaveReportCard` — Donut chart: CL/SL/EL used vs. balance

**Row 3 (3 cols):**
- `AnnouncementCard` — Feed of 4-5 announcements with category tags (Policy/Event/Holiday)
- `HolidayCard` — Next 3 upcoming holidays in a clean list with countdown days
- `TimelogCard` — Weekly bar chart: hours per day, today highlighted

**Row 4 (2 cols):**
- `ApprovalRequests` — Table: pending leave/time approval requests (HR/Admin only)
- `QuickLinks` — Icon grid: Apply Leave, Download Payslip, Add Time, Raise Request

**Favourites bar:** Pinned employee cards (draggable, 4 max)

---

### PAGE 3: Employee Profile (`/profile/[id]`)
**Layout:** Header hero + left nav tabs + main content + right sidebar

**Hero Section:**
- Cover photo (subtle gradient)
- Profile picture (large, with edit overlay for own profile)
- Name, Designation badge, Department badge
- Action buttons (top-right): `Edit ✏️` | `⋮ Options` | `Check-In/Out`
- Status indicator: Online / Away

**Left Tab Navigation:**
1. Profile Home
2. Work Experience
3. Education
4. Skill Set
5. Documents
6. Time Tracker *(links to tracker)*
7. Leave / Attendance *(links to tracker)*
8. Compensation *(salary module)*
9. Performance (KRA)

**Profile Home Content:**
```
Personal Info grid:
  Employee ID | Date of Birth | Blood Group | Gender
  Phone | Personal Email | Address | Emergency Contact

Work Info grid:
  Department | Designation | Reporting Manager | Team
  Employment Type | Location | Joining Date | Probation End

KYC / Bank:
  PAN Number | Aadhaar (masked) | Bank Account | IFSC
  (Show only to Admin/HR; Employee sees own data)
```

**Right Sidebar Widgets:**
- Announcements (3 latest)
- Upcoming Holidays (next 3)
- Colleagues on Leave today (avatars)

---

### PAGE 4: Team Space (`/team`)
**Layout:** 3 panels

**Panel 1: Team Availability (top strip)**
- Real-time feel — show 20 employees
- Status dots: Present (green) / WFH (blue) / Leave (red) / Half Day (yellow)
- Filter by Department dropdown

**Panel 2: Department Wall**
- Cards per department with head photo + member count + quick stats
- Departments: Engineering, HR, Finance, Sales, Marketing, Design, Operations, Legal
- Expand to see member list

**Panel 3: Org Tree**
- Visual hierarchy: CEO → CTO/CFO/CHRO → Managers → ICs
- Use a tree layout (CSS flexbox tree or react-d3-tree)
- Click node to open mini profile card

---

### PAGE 5: Organization Space (`/organization`)
**Tabs:** Overview | Employees | Structure | Policy

**Overview Tab:**
- Company card: logo, name, CIN, GSTIN, founded, strength
- Office locations map (static image of India with dots)
- Key stats: Total employees, Departments, Avg tenure, Attrition rate

**Employees Tab:**
- Searchable, filterable table
- Columns: Name | ID | Department | Designation | Location | Status | Actions
- Filters: Department, Location, Status, Join Date range
- Bulk actions: Export CSV, Send Announcement (admin/hr only)
- `Import Employees` button → modal with Excel column mapping

**Structure Tab:**
- Legal Entities card
- Business Units list
- Department hierarchy accordion
- Visual Org Tree (same as team page but full company view)

**Policy Tab:**
- Privacy & Visibility toggles
- Communication settings
- Profile picture approval toggle
- Leave policy summary table

---

### PAGE 6: Trackers

#### Leave Tracker (`/trackers/leave`)
**My Leave Section:**
- Balance cards: CL | SL | EL | CO (with progress rings)
- Apply Leave form: type, from-to dates, reason, half-day toggle
- Leave history table: Date | Type | Days | Status | Applied On
- Calendar view with leave blocks color-coded

**Team Leave View (HR/Admin):**
- Team calendar showing who's on leave
- Pending approval list with Approve/Reject actions
- Leave trend chart (monthly)

#### Time Tracker (`/trackers/time`)
**Layout:** Timer + Logs + Timesheets

- Start/Stop timer with project selector
- Today's time entries list (editable)
- Weekly timesheet grid (days × tasks)
- Total hours widget
- Submit timesheet button (disabled if already submitted)
- Status: Draft / Submitted / Approved / Rejected

**Jobs & Projects panel:**
- Project cards: name, client, hours logged, budget
- Task dropdown per project

#### Attendance Tracker (`/trackers/attendance`)
- Monthly calendar heatmap (full page version)
- Daily detail: Punch In | Punch Out | Duration | Status | Location
- Summary stats: Present/Absent/Late/Half-day counts
- Regularization request form (for missed punches)

#### Reimbursement (`/trackers/reimbursement`)
- Claim form: category, amount (₹), date, description, receipt upload (UI only)
- Claims list: Status chips (Pending/Approved/Paid/Rejected)
- Total claimed vs. approved this month

---

### PAGE 7: Salary Module (`/salary`)
**Layout:** Left panel (employee list for HR/Admin) + Right content

**Salary Dashboard (own):**
- Current CTC snapshot card
- Components breakdown:
  ```
  Fixed Pay:         ₹ 2,40,000
  HRA:               ₹  72,000
  Special Allowance: ₹  48,000
  ─────────────────────────────
  Gross Salary:      ₹ 3,60,000
  PF Deduction:      ₹  21,600
  Professional Tax:  ₹   2,400
  TDS:               ₹  18,000
  ─────────────────────────────
  Net Take-Home:     ₹ 3,18,000 / month
  ```
- Pay history timeline (last 12 months bar chart)
- Download Payslip button → renders a clean HTML payslip modal (printable)

**Payslip Modal:**
- Company header with logo
- Employee details table
- Earnings vs. Deductions table
- Net pay in words (Indian style: "Three Lakh Eighteen Thousand Only")
- Download as PDF button (use `window.print()`)

**Salary Revision History:**
- Table: Effective Date | Old CTC | New CTC | % Increase | Revised By

**Admin/HR extras:**
- Salary filter by department/designation
- Bulk payslip generation status

---

### PAGE 8: Finance Module (`/finance`)
**Note:** Intentionally lightweight — placeholder for Phase 3 buildout

**Layout:** Dashboard cards + embedded sheet placeholder

- Revenue vs. Expense summary cards
- Budget utilization by department (horizontal bar chart)
- Recent transactions table (dummy invoice/payment data)
- Document Dispatch/Receive log (table with status chips)
- "Embed Google Sheet" placeholder card with connect button (non-functional, UI only)

---

### PAGE 9: Settings (`/settings`)
**Tabs:** Profile Settings | Organization | Notifications | Security

**Profile Settings:**
- Edit personal info, profile picture upload (preview only)
- Change password form (UI validation only)
- Notification preferences toggles

**Organization (Admin only):**
- Company basic info edit form
- Locale: currency (INR ₹), timezone (IST UTC+5:30), date format (DD/MM/YYYY)
- Leave policy configuration

**Notifications:**
- Toggle groups: Leave updates, Payslip ready, Announcements, Birthday reminders
- WhatsApp notification toggle (UI only, no integration)

---

## 🧩 Shared Components Spec

### `<Sidebar>`
```
Width: 240px expanded, 64px collapsed
Top: Logo + company name
Nav items with icons (Lucide icons):
  🏠 Dashboard
  👥 Team
  🏢 Organization
  ⏱️ Trackers (accordion: Leave/Time/Attendance/Reimbursement)
  💰 Salary
  💼 Finance
  ⚙️ Settings
Bottom: User avatar + name + role badge + logout
```

### `<Header>`
```
Left: Page breadcrumb
Center: Search bar (Cmd+K opens command palette with employee search)
Right: 
  [🔔 Notifications badge] 
  [💬 HR Chat] 
  [⚙️ Settings]
  [Role Switcher pill — DEMO ONLY]
  [User avatar dropdown]
```

### `<HRChatbot>`
- Floating button bottom-right (brand color)
- Opens slide-over panel
- Pre-scripted responses for: "How many leaves do I have?", "When is next holiday?", "Show my payslip", "Who is on leave today?"
- Typewriter effect on bot responses
- Powered by Anthropic API (optional enhancement)

### `<NotificationBell>`
```
Notifications (dummy):
  - "Priya Mehta approved your leave request" (2m ago)
  - "Salary for March has been processed" (1h ago)
  - "New policy update: WFH Guidelines" (Yesterday)
  - "Suresh Reddy's birthday tomorrow 🎂" (Yesterday)
  - "Timesheet submission reminder" (2 days ago)
```

### `<StatCard>`
```typescript
interface StatCardProps {
  title: string
  value: string | number
  change?: string      // "+12% from last month"
  changeType?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  iconColor: string
}
```

---

## 📦 Package.json Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "latest",
    "recharts": "^2.12.0",
    "zustand": "^5.0.0",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-tabs": "latest",
    "@radix-ui/react-tooltip": "latest",
    "@radix-ui/react-popover": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-progress": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "date-fns": "latest",
    "react-day-picker": "^8.0.0"
  }
}
```

---

## 🔁 Agent Build Order (Phases)

### Phase 1 — Foundation (Day 1)
```
1. next create → configure tailwind, shadcn/ui init
2. Create /types/index.ts with all TypeScript interfaces
3. Create /lib/data/ files with full Indian dummy data
4. Create /lib/store/ with Zustand stores
5. Build <Sidebar>, <Header>, dashboard layout shell
6. Build Login page with role switcher
```

### Phase 2 — Core Pages (Day 2-3)
```
7.  Home Dashboard — all widgets
8.  Employee Profile — hero + all tabs
9.  Organization — all 4 tabs
10. Team Space — availability + org tree
```

### Phase 3 — Trackers & Salary (Day 4)
```
11. Leave Tracker (apply, history, calendar)
12. Time Tracker (timer, timesheet)
13. Attendance Tracker (heatmap, detail)
14. Reimbursement form
15. Salary module (snapshot, payslip modal)
```

### Phase 4 — Polish (Day 5)
```
16. Finance Module placeholder
17. Settings pages
18. HR Chatbot widget
19. Notifications panel
20. Role-based visibility enforcement
21. Responsive breakpoints (mobile sidebar drawer)
22. Loading skeletons for all data sections
23. Empty states
24. Keyboard navigation (Cmd+K search)
```

---

## ⚡ Agent Instructions & Rules

### When building any page, follow these rules:

1. **Always import from `@/lib/data/`** — never hardcode data inline in components
2. **Always check role** with `useAuthStore()` before rendering sensitive sections
3. **Always use** `cn()` from `lib/utils.ts` for conditional classnames
4. **All monetary values** format as Indian: `₹2,85,000` (use `toLocaleString('en-IN')`)
5. **All dates** format as `DD MMM YYYY` (e.g., `14 Mar 2025`)
6. **Charts must** have: title, legend, tooltip with ₹ or % unit, responsive container
7. **Tables must** have: sort on headers, column visibility toggle, row count label
8. **Forms must** have: Zod validation schema (even if no backend), error messages inline
9. **Mobile-first** — sidebar becomes a drawer on `< md` breakpoint
10. **No lorem ipsum** — all copy must be realistic HR/corporate language

### Naming Conventions
```
Pages:        PascalCase files in app/
Components:   PascalCase, single responsibility
Hooks:        camelCase, prefix `use`
Stores:       camelCase, suffix `Store`
Types:        PascalCase interfaces, no `I` prefix
Constants:    SCREAMING_SNAKE_CASE
Data files:   camelCase exports, plural nouns
```

### TypeScript Interfaces (Starter Set)
```typescript
// types/index.ts

export type Role = 'admin' | 'hr' | 'employee'
export type EmployeeStatus = 'active' | 'inactive' | 'probation' | 'notice'
export type LeaveType = 'CL' | 'SL' | 'EL' | 'CO' | 'ML' | 'PL'
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'
export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'holiday' | 'weekend' | 'leave'
export type Department = 'Engineering' | 'HR' | 'Finance' | 'Sales' | 'Marketing' | 'Design' | 'Operations' | 'Legal'

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  designation: string
  department: Department
  location: string
  joiningDate: string
  salary: number
  status: EmployeeStatus
  reportingTo: string | null
  avatar: string             // initials fallback
  role: Role
  bloodGroup: string
  dob: string
  gender: 'Male' | 'Female' | 'Other'
  address: string
  pan: string
  aadhaar: string            // always masked
  bankAccount: string
  bankName: string
  ifsc: string
  emergencyContact: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  type: LeaveType
  fromDate: string
  toDate: string
  days: number
  reason: string
  status: LeaveStatus
  appliedOn: string
  approvedBy?: string
  isHalfDay: boolean
}

export interface AttendanceRecord {
  date: string
  employeeId: string
  status: AttendanceStatus
  punchIn?: string           // "09:32 AM"
  punchOut?: string          // "06:48 PM"
  duration?: string          // "9h 16m"
  location?: string
  isRegularized: boolean
}

export interface TimeLog {
  id: string
  employeeId: string
  date: string
  projectId: string
  taskName: string
  hours: number
  description: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
}

export interface SalarySlip {
  month: string              // "March 2025"
  employeeId: string
  basic: number
  hra: number
  specialAllowance: number
  otherAllowances: number
  grossEarnings: number
  pf: number
  professionalTax: number
  tds: number
  otherDeductions: number
  totalDeductions: number
  netPay: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  category: 'policy' | 'event' | 'holiday' | 'general'
  postedBy: string
  postedOn: string
  isImportant: boolean
}

export interface Holiday {
  date: string
  name: string
  type: 'national' | 'festival' | 'restricted'
}

export interface Project {
  id: string
  name: string
  client: string
  budget: number
  hoursLogged: number
  status: 'active' | 'completed' | 'on-hold'
  members: string[]          // employee IDs
}
```

---

## 🖥️ Responsive Breakpoints

```
Mobile  (< 768px):  Sidebar hidden, hamburger menu, single-column cards
Tablet  (768-1024): Sidebar as icon-only (64px), 2-column cards
Desktop (> 1024px): Full sidebar (240px), 3-4 column grid
Wide    (> 1440px): Max-width 1600px, centered layout
```

---

## ✅ Definition of Done (per page)

A page is considered complete when:
- [ ] All dummy data renders correctly from `/lib/data/`
- [ ] Role-based visibility works (admin sees more than employee)
- [ ] Responsive on mobile + desktop
- [ ] All interactive states: hover, active, disabled
- [ ] Loading skeleton implemented
- [ ] Empty state implemented (for tables, lists)
- [ ] TypeScript — zero `any` types
- [ ] No console errors or warnings

---

## 🚫 Out of Scope (Frontend Demo)

- Real authentication / JWT / sessions
- API calls to any backend
- Database connections
- File uploads that persist
- Real-time websockets
- Email / WhatsApp notifications
- GPS / location tracking (show UI placeholder only)
- PDF generation (use print CSS / window.print())
- Excel import processing (show UI modal only)

---

*Last updated: 2025 — TechInfinia Solutions HR Suite v1.0 Demo* -->
