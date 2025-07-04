import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const designation = [
  { name: "Assistant Municipal Commissioner" },
  { name: "Executive Officer/Special Officer" },
  { name: "Deputy Municipal Comissioner" },
  { name: "Additional Municipal Comissioner" },
  { name: "Junior Engineer(Civil & Mechanical)" },
  {
    name: "Assistant Engineer(Civil )/Technical Advisor to the Superitending Engineer",
  },
  { name: "Assistant Engineer(Transport/Mechanical)" },
  {
    name: "Executive Engineer/Technical Advisor to Chief Engineer",
  },
  { name: "Subordinate Engineer" },
  { name: "Chief City Engineer" },
  { name: "Junior Engineer(Electrical)" },
  { name: "Assistant Engineer(Electrical)" },
  { name: "Pipeline Inspector" },
  { name: "Street Light Inspector" },
  {
    name: "Sub Divisional Clerk/Office - Assistant-cum-Accountant/Accounts Clerk/Accountant -Cum-Computer Operator",
  },
  { name: "Accountant -Cum-Cashier/Accountant" },
  { name: "Assistant Accounts Officer" },
  { name: "Accounts Officer" },
  { name: "Chief Accounts Officer" },
  { name: "Revenue Inspector" },
  { name: "Assistant Superitendent of Tax" },
  {
    name: "Assistant Revenue Officer(Assessment and valuation officer /Tax Superetendant/Assistant Valuation officer Integrated)",
  },
  { name: "Chief Assessment and valuation officer" },
  { name: "Sanitary Supervisor" },
  { name: "Sanitary and Food Inspector" },
  { name: "Chief Sanitary Inspector" },
  { name: "Assistant Public Health Officer" },
  { name: "Public Health Officer" },
  { name: "Garden Superitendent" },
  { name: "Agriculture Officer" },
  { name: "Horticulture Officer" },
  { name: "Publicity Assistant" },
  { name: "Assistant Public Relations Officer" },
  { name: "Public Relations Officer" },
  { name: "Legal Assistant" },
  { name: "Assistant Law Officer" },
  { name: "Law Officer" },
  { name: "Veterinary Assistant" },
  { name: "Medical Assistant" },
  { name: "Veterinary Officer" },
  { name: "Medical Practitioner" },
  {
    name: "Sub Divisional Clerk/Office - Assistant-cum-Computer Operator/ Accounts Clerk -Cum-Computer Operator",
  },
  { name: "Branch Officer" },
  { name: "Real Estate Officer" },
  { name: "Office Superitendent" },
  { name: "Administrative Officer" },
  { name: "Stenographer Assistant" },
  { name: "Personal Assistant" },
  { name: "Private Secretary" },
  { name: "Planning Assistant" },
  { name: "Municipal Commissioner" },
  { name: "project manager" },
  { name: "project manager consultant" },
  { name: "Deputy Project Manager" },
  { name: "Assistant Project Manager" },
  { name: "Deputy General Manager" },
  { name: "General Manager" },
  { name: "Drawing & Disbursing Officer" },
  { name: "Chief Secretary (IAS)" },
  { name: "Director" },
  { name: "Deputy Executive Officer" },
  {
    name: "SMM Financial Inclusion & Micro Enterprises",
  },
  { name: "SMM MIS & ME" },
  { name: "SMM Skills & Livelihood" },
  { name: "SMM Social Development & Infrastructure" },
  { name: "CMM Financial Inclusion" },
  { name: "CMM MIS & ME" },
  { name: "CMM Skills & Livelihood" },
  { name: "CMM Social Development & Infrastructure" },
  { name: "Principal Assistant" },
  { name: "Assistant" },
  { name: "Tax Inspector" },
  { name: "PEON" },
  { name: "City Manager" },
  { name: "Community Organizer" },
  { name: "Programmer" },
  { name: "Computer Operator" },
  { name: "Water Tax Collector" },
  { name: "Cand" },
  { name: "CandO" },
  {
    name: "SMM – Shelters and Social Infrastructure",
  },
  {
    name: "SMM – Social Mobilization & Institutional Development",
  },
  { name: "SMM – HR & Capacity Building" },
  { name: "Accountant" },
  { name: "Computer Operator Cum Assistant" },
  { name: "Sweeper" },
  { name: "Night Guard" },
  { name: "Driver" },
  { name: "Electrician" },
  { name: "Assistant Electrician" },
  { name: "JCB Operator Cum Driver" },
  { name: "Accounts Clerk Cum Computer Operator" },
  { name: "Plumber" },
  { name: "Chairman" },
  { name: "Dy Chairman" },
  { name: "Section Officer" },
  { name: "Ward Zamadar" },
  { name: "Deputy Municipal Corporation" },
  { name: "Chief Engineer" },
  { name: "Executive Engineer" },
  { name: "Sanitary Inspector In Charge" },
  { name: "Social Development Specialist" },
  { name: "Labour" },
  { name: "WORK SARKAR" },
  { name: "Light Inspector" },
  { name: "ROAD MAT" },
  { name: "Tubewel Mechanic" },
  { name: "MIS Specialist" },
  { name: "GIS Specialist" },
  { name: "Town Planning Specialist" },
  { name: "Project Engineering Specialist" },
  { name: "Tax Daroga" },
  { name: "Joint Secretery" },
  { name: "Deputy Secretery" },
  { name: "Town Planner" },
  { name: "Assistant Director" },
  { name: "Accountant" },
];

const designation_seeder = async () => {
  try {
    console.log("🧹 Deleting existing designations...");
    await prisma.designation.deleteMany({});

    console.log("🔄 Resetting ID sequence...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE designation_id_seq RESTART WITH 1`);

    console.log("🌱 Inserting designations...");
    for (const des of designation) {
      await prisma.designation.create({ data: des });
    }

    console.log("✅ Designations seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding designations:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default designation_seeder;
