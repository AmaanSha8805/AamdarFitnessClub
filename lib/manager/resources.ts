import type { ResourceName } from "@/lib/manager/data";

export type { ResourceName };

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select" | "textarea" | "checkbox" | "url";
  options?: { label: string; value: string }[];
  placeholder?: string;
};

export type ColumnConfig = {
  key: string;
  label: string;
};

const planTypes = [
  { label: "Daily", value: "DAILY" },
  { label: "Weekly", value: "WEEKLY" },
  { label: "Monthly", value: "MONTHLY" },
  { label: "Quarterly", value: "QUARTERLY" },
  { label: "Half-Yearly", value: "HALF_YEARLY" },
  { label: "Annual", value: "ANNUAL" },
  { label: "Custom", value: "CUSTOM" },
];

const paymentMethods = [
  { label: "Cash", value: "CASH" },
  { label: "UPI", value: "UPI" },
  { label: "Card", value: "CARD" },
  { label: "Bank Transfer", value: "BANK_TRANSFER" },
  { label: "Other", value: "OTHER" },
];

const paymentStatuses = [
  { label: "Paid", value: "PAID" },
  { label: "Pending", value: "PENDING" },
];

const memberStatuses = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Expired", value: "EXPIRED" },
  { label: "Pending", value: "PENDING" },
];

const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

export const resourceTitles: Record<ResourceName, { title: string; description: string; cta: string }> = {
  members: { title: "Members", description: "Manage admissions, profiles, renewals, and emergency contacts.", cta: "Add Member" },
  plans: { title: "Membership Plans", description: "Daily to annual plans with auto expiry tracking.", cta: "Add Plan" },
  payments: { title: "Payments", description: "Cash, UPI, card, bank transfers with receipt generation.", cta: "Record Payment" },
  leads: { title: "Leads", description: "Track enquiries from first contact through conversion.", cta: "Add Lead" },
  trainers: { title: "Trainers", description: "Trainer profiles, specializations, salary, and assigned members.", cta: "Add Trainer" },
  expenses: { title: "Expenses", description: "Track rent, electricity, salary, maintenance, and other costs.", cta: "Add Expense" },
  branches: { title: "Branches", description: "Manage multiple gym branches and locations.", cta: "Add Branch" },
  equipment: { title: "Equipment", description: "Equipment inventory, purchase records, and status.", cta: "Add Equipment" },
  maintenance: { title: "Maintenance", description: "Service dates, costs, and equipment maintenance history.", cta: "Add Record" },
  lockers: { title: "Lockers", description: "Locker inventory and availability status.", cta: "Add Locker" },
  workouts: { title: "Workout Plans", description: "Create and manage workout plans with exercise library.", cta: "Add Workout Plan" },
  exercises: { title: "Exercise Library", description: "Central exercise database for workout plans.", cta: "Add Exercise" },
  "diet-plans": { title: "Diet Plans", description: "Nutrition plans with calories and meal schedules.", cta: "Add Diet Plan" },
  progress: { title: "Progress Tracking", description: "Weight, measurements, BMI, and transformation photos.", cta: "Add Progress Entry" },
  notifications: { title: "Notifications", description: "Expiry alerts, payment dues, birthdays, and announcements.", cta: "Create Notification" },
  attendance: { title: "Attendance Records", description: "Daily check-in/check-out records and history.", cta: "Add Attendance" },
  "trainer-attendance": { title: "Trainer Attendance", description: "Track trainer daily attendance.", cta: "Add Record" },
  "trainer-salaries": { title: "Trainer Salaries", description: "Monthly salary tracking and payment status.", cta: "Add Salary Record" },
};

export const resourceColumns: Record<ResourceName, ColumnConfig[]> = {
  members: [
    { key: "memberCode", label: "ID" },
    { key: "fullName", label: "Name" },
    { key: "mobileNumber", label: "Mobile" },
    { key: "planName", label: "Plan" },
    { key: "expiryDate", label: "Expiry" },
    { key: "status", label: "Status" },
  ],
  plans: [
    { key: "name", label: "Plan" },
    { key: "planType", label: "Type" },
    { key: "duration", label: "Days" },
    { key: "price", label: "Price" },
    { key: "active", label: "Active" },
  ],
  payments: [
    { key: "receiptNumber", label: "Receipt" },
    { key: "memberName", label: "Member" },
    { key: "amount", label: "Amount" },
    { key: "method", label: "Method" },
    { key: "status", label: "Status" },
  ],
  leads: [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "goal", label: "Goal" },
    { key: "status", label: "Status" },
  ],
  trainers: [
    { key: "name", label: "Name" },
    { key: "specialization", label: "Specialization" },
    { key: "assignedMembers", label: "Members" },
    { key: "active", label: "Active" },
  ],
  expenses: [
    { key: "title", label: "Title" },
    { key: "amount", label: "Amount" },
    { key: "category", label: "Category" },
    { key: "date", label: "Date" },
  ],
  branches: [
    { key: "name", label: "Branch" },
    { key: "contactNumber", label: "Contact" },
    { key: "memberCount", label: "Members" },
    { key: "isActive", label: "Active" },
  ],
  equipment: [
    { key: "name", label: "Equipment" },
    { key: "brand", label: "Brand" },
    { key: "status", label: "Status" },
    { key: "branchName", label: "Branch" },
  ],
  maintenance: [
    { key: "equipmentName", label: "Equipment" },
    { key: "serviceDate", label: "Service Date" },
    { key: "nextServiceDate", label: "Next Service" },
    { key: "status", label: "Status" },
  ],
  lockers: [
    { key: "number", label: "Locker #" },
    { key: "branchName", label: "Branch" },
    { key: "status", label: "Status" },
  ],
  workouts: [
    { key: "name", label: "Plan" },
    { key: "trainerName", label: "Trainer" },
    { key: "description", label: "Description" },
  ],
  exercises: [
    { key: "name", label: "Exercise" },
    { key: "muscleGroup", label: "Muscle Group" },
    { key: "equipmentNeeded", label: "Equipment" },
  ],
  "diet-plans": [
    { key: "name", label: "Plan" },
    { key: "calories", label: "Calories" },
    { key: "description", label: "Description" },
  ],
  progress: [
    { key: "memberName", label: "Member" },
    { key: "date", label: "Date" },
    { key: "weight", label: "Weight" },
    { key: "bmi", label: "BMI" },
    { key: "goalProgress", label: "Goal %" },
  ],
  notifications: [
    { key: "type", label: "Type" },
    { key: "title", label: "Title" },
    { key: "memberName", label: "Member" },
    { key: "sentAt", label: "Sent" },
  ],
  attendance: [
    { key: "memberCode", label: "ID" },
    { key: "memberName", label: "Member" },
    { key: "checkIn", label: "Check In" },
    { key: "checkOut", label: "Check Out" },
    { key: "type", label: "Type" },
  ],
  "trainer-attendance": [
    { key: "trainerName", label: "Trainer" },
    { key: "date", label: "Date" },
    { key: "checkIn", label: "Check In" },
    { key: "checkOut", label: "Check Out" },
  ],
  "trainer-salaries": [
    { key: "trainerName", label: "Trainer" },
    { key: "month", label: "Month" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ],
};

type Options = {
  plans?: { label: string; value: string }[];
  members?: { label: string; value: string }[];
  branches?: { label: string; value: string }[];
  trainers?: { label: string; value: string }[];
  equipment?: { label: string; value: string }[];
};

export function resourceFields(options: Options = {}): Record<ResourceName, FieldConfig[]> {
  return {
    members: [
      { name: "memberCode", label: "Member ID (auto if empty)", type: "text" },
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "mobileNumber", label: "Mobile Number", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date" },
      { name: "age", label: "Age", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: genders },
      { name: "height", label: "Height (cm)", type: "number" },
      { name: "weight", label: "Weight (kg)", type: "number" },
      { name: "fitnessGoal", label: "Fitness Goal", type: "text" },
      { name: "medicalNotes", label: "Medical Notes", type: "textarea" },
      { name: "emergencyContactName", label: "Emergency Contact Name", type: "text" },
      { name: "emergencyContactPhone", label: "Emergency Contact Phone", type: "text" },
      { name: "photoUrl", label: "Photo URL", type: "url" },
      { name: "planId", label: "Membership Plan", type: "select", options: options.plans || [] },
      { name: "branchId", label: "Branch", type: "select", options: options.branches || [] },
      { name: "trainerId", label: "Assigned Trainer", type: "select", options: options.trainers || [] },
      { name: "joiningDate", label: "Joining Date", type: "date" },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "status", label: "Status", type: "select", options: memberStatuses },
    ],
    plans: [
      { name: "name", label: "Name", type: "text" },
      { name: "planType", label: "Plan Type", type: "select", options: planTypes },
      { name: "duration", label: "Duration Days", type: "number" },
      { name: "price", label: "Price", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "active", label: "Active", type: "checkbox" },
    ],
    payments: [
      { name: "memberId", label: "Member", type: "select", options: options.members || [] },
      { name: "amount", label: "Amount", type: "number" },
      { name: "method", label: "Payment Method", type: "select", options: paymentMethods },
      { name: "date", label: "Date", type: "date" },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: paymentStatuses },
    ],
    leads: [
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "goal", label: "Goal", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "New", value: "NEW" },
          { label: "Contacted", value: "CONTACTED" },
          { label: "Interested", value: "INTERESTED" },
          { label: "Converted", value: "CONVERTED" },
          { label: "Rejected", value: "REJECTED" },
        ],
      },
    ],
    trainers: [
      { name: "name", label: "Name", type: "text" },
      { name: "photoUrl", label: "Photo URL", type: "url" },
      { name: "email", label: "Email", type: "email" },
      { name: "experience", label: "Experience Years", type: "number" },
      { name: "specialization", label: "Specialization", type: "text" },
      { name: "certifications", label: "Certifications", type: "textarea" },
      { name: "contact", label: "Contact", type: "text" },
      { name: "salary", label: "Monthly Salary", type: "number" },
      { name: "joinDate", label: "Join Date", type: "date" },
      { name: "active", label: "Active", type: "checkbox" },
    ],
    expenses: [
      { name: "title", label: "Title", type: "text" },
      { name: "amount", label: "Amount", type: "number" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { label: "Rent", value: "RENT" },
          { label: "Electricity", value: "ELECTRICITY" },
          { label: "Salary", value: "SALARY" },
          { label: "Maintenance", value: "MAINTENANCE" },
          { label: "Miscellaneous", value: "MISCELLANEOUS" },
        ],
      },
      { name: "date", label: "Date", type: "date" },
    ],
    branches: [
      { name: "name", label: "Branch Name", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "contactNumber", label: "Contact Number", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
    equipment: [
      { name: "name", label: "Equipment Name", type: "text" },
      { name: "brand", label: "Brand", type: "text" },
      { name: "serialNumber", label: "Serial Number", type: "text" },
      { name: "purchaseDate", label: "Purchase Date", type: "date" },
      { name: "purchasePrice", label: "Purchase Price", type: "number" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Operational", value: "OPERATIONAL" },
          { label: "Maintenance", value: "MAINTENANCE" },
          { label: "Out of Service", value: "OUT_OF_SERVICE" },
        ],
      },
      { name: "branchId", label: "Branch", type: "select", options: options.branches || [] },
    ],
    maintenance: [
      { name: "equipmentId", label: "Equipment", type: "select", options: options.equipment || [] },
      { name: "serviceDate", label: "Service Date", type: "date" },
      { name: "nextServiceDate", label: "Next Service Date", type: "date" },
      { name: "cost", label: "Cost", type: "number" },
      { name: "notes", label: "Notes", type: "textarea" },
      {
        name: "status",
        label: "Status After Service",
        type: "select",
        options: [
          { label: "Operational", value: "OPERATIONAL" },
          { label: "Maintenance", value: "MAINTENANCE" },
          { label: "Out of Service", value: "OUT_OF_SERVICE" },
        ],
      },
    ],
    lockers: [
      { name: "number", label: "Locker Number", type: "text" },
      { name: "branchId", label: "Branch", type: "select", options: options.branches || [] },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Available", value: "AVAILABLE" },
          { label: "Occupied", value: "OCCUPIED" },
          { label: "Maintenance", value: "MAINTENANCE" },
        ],
      },
    ],
    workouts: [
      { name: "name", label: "Plan Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "exercises", label: "Exercises (JSON)", type: "textarea", placeholder: '[{"name":"Squats","sets":3,"reps":12}]' },
      { name: "trainerId", label: "Trainer", type: "select", options: options.trainers || [] },
    ],
    exercises: [
      { name: "name", label: "Exercise Name", type: "text" },
      { name: "muscleGroup", label: "Muscle Group", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "equipmentNeeded", label: "Equipment Needed", type: "text" },
    ],
    "diet-plans": [
      { name: "name", label: "Plan Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "calories", label: "Daily Calories", type: "number" },
      { name: "meals", label: "Meals (JSON)", type: "textarea", placeholder: '[{"time":"08:00","meal":"Oats + eggs"}]' },
    ],
    progress: [
      { name: "memberId", label: "Member", type: "select", options: options.members || [] },
      { name: "date", label: "Date", type: "date" },
      { name: "weight", label: "Weight (kg)", type: "number" },
      { name: "chest", label: "Chest (cm)", type: "number" },
      { name: "waist", label: "Waist (cm)", type: "number" },
      { name: "hips", label: "Hips (cm)", type: "number" },
      { name: "bmi", label: "BMI", type: "number" },
      { name: "goalProgress", label: "Goal Progress %", type: "number" },
      { name: "photoUrl", label: "Transformation Photo URL", type: "url" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    notifications: [
      {
        name: "type",
        label: "Type",
        type: "select",
        options: [
          { label: "Membership Expiry", value: "MEMBERSHIP_EXPIRY" },
          { label: "Payment Due", value: "PAYMENT_DUE" },
          { label: "Birthday", value: "BIRTHDAY" },
          { label: "Announcement", value: "ANNOUNCEMENT" },
          { label: "Trainer", value: "TRAINER" },
          { label: "Attendance", value: "ATTENDANCE" },
          { label: "Promotional", value: "PROMOTIONAL" },
        ],
      },
      { name: "title", label: "Title", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "memberId", label: "Member", type: "select", options: options.members || [] },
      { name: "trainerId", label: "Trainer", type: "select", options: options.trainers || [] },
      {
        name: "channel",
        label: "Channel",
        type: "select",
        options: [
          { label: "WhatsApp", value: "WHATSAPP" },
          { label: "Email", value: "EMAIL" },
        ],
      },
      { name: "scheduledFor", label: "Schedule For", type: "date" },
    ],
    attendance: [
      { name: "memberId", label: "Member", type: "select", options: options.members || [] },
      { name: "branchId", label: "Branch", type: "select", options: options.branches || [] },
      { name: "checkIn", label: "Check In", type: "date" },
      { name: "checkOut", label: "Check Out", type: "date" },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: [
          { label: "Manual", value: "MANUAL" },
          { label: "QR Code", value: "QR_CODE" },
        ],
      },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    "trainer-attendance": [
      { name: "trainerId", label: "Trainer", type: "select", options: options.trainers || [] },
      { name: "date", label: "Date", type: "date" },
      { name: "checkIn", label: "Check In", type: "date" },
      { name: "checkOut", label: "Check Out", type: "date" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    "trainer-salaries": [
      { name: "trainerId", label: "Trainer", type: "select", options: options.trainers || [] },
      { name: "amount", label: "Amount", type: "number" },
      { name: "month", label: "Month", type: "date" },
      { name: "paidAt", label: "Paid On", type: "date" },
      { name: "status", label: "Status", type: "select", options: paymentStatuses },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  };
}

export const defaultResourceValues: Record<ResourceName, Record<string, unknown>> = {
  members: {
    memberCode: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    age: "",
    gender: "MALE",
    height: "",
    weight: "",
    fitnessGoal: "",
    medicalNotes: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    photoUrl: "",
    planId: "",
    branchId: "",
    trainerId: "",
    joiningDate: new Date().toISOString().slice(0, 10),
    expiryDate: new Date().toISOString().slice(0, 10),
    status: "ACTIVE",
  },
  plans: { name: "", planType: "MONTHLY", duration: 30, price: 0, description: "", active: true },
  payments: { memberId: "", amount: 0, method: "UPI", date: new Date().toISOString().slice(0, 10), notes: "", status: "PAID" },
  leads: { name: "", phone: "", email: "", goal: "", notes: "", status: "NEW" },
  trainers: { name: "", photoUrl: "", email: "", experience: 0, specialization: "", certifications: "", contact: "", salary: "", joinDate: "", active: true },
  expenses: { title: "", amount: 0, category: "MISCELLANEOUS", date: new Date().toISOString().slice(0, 10) },
  branches: { name: "", address: "", contactNumber: "", isActive: true },
  equipment: { name: "", brand: "", serialNumber: "", purchaseDate: "", purchasePrice: "", status: "OPERATIONAL", branchId: "" },
  maintenance: { equipmentId: "", serviceDate: new Date().toISOString().slice(0, 10), nextServiceDate: "", cost: "", notes: "", status: "OPERATIONAL" },
  lockers: { number: "", branchId: "", status: "AVAILABLE" },
  workouts: { name: "", description: "", exercises: "[]", trainerId: "" },
  exercises: { name: "", muscleGroup: "", description: "", equipmentNeeded: "" },
  "diet-plans": { name: "", description: "", calories: "", meals: "[]" },
  progress: { memberId: "", date: new Date().toISOString().slice(0, 10), weight: "", chest: "", waist: "", hips: "", bmi: "", goalProgress: "", photoUrl: "", notes: "" },
  notifications: { type: "ANNOUNCEMENT", title: "", message: "", memberId: "", trainerId: "", channel: "WHATSAPP", scheduledFor: "" },
  attendance: { memberId: "", branchId: "", checkIn: new Date().toISOString().slice(0, 10), checkOut: "", type: "MANUAL", notes: "" },
  "trainer-attendance": { trainerId: "", date: new Date().toISOString().slice(0, 10), checkIn: "", checkOut: "", notes: "" },
  "trainer-salaries": { trainerId: "", amount: 0, month: new Date().toISOString().slice(0, 10), paidAt: "", status: "PENDING", notes: "" },
};
