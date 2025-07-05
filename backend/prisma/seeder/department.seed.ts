import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const department = [
  {
    name: "Agriculture Animal Husbandry and Co-operative Department",
  },
  { name: "Building Construction Department" },
  { name: "Cabinet Election Department" },
  {
    name: "Cabinet Secretaritat and Vigilance Department",
  },
  { name: "Commercial Tax Department" },
  { name: "Drinking Water and Sanitation Department" },
  { name: "Energy Department" },
  { name: "Excise and Prohibition Department" },
  { name: "Finance Department" },
  {
    name: "Food Public Distribution and Consumer Affairs Department",
  },
  {
    name: "Forest Environment and Climate Change Department",
  },
  { name: "Governor Secretariat" },
  {
    name: "Health Medical Education and Family Welfare Department",
  },
  {
    name: "Higher and Technical Education Department",
  },
  { name: "Home Jail and Disaster Management" },
  { name: "Industries Department" },
  {
    name: "Information and Public Relation Department",
  },
  {
    name: "Information Technology and e-Governance Department",
  },
  {
    name: "Labour Employment Training and Skill Development Department",
  },
  { name: "Law Department" },
  { name: "Legisletive Assembly" },
  { name: "Mines and Geology Department" },
  { name: "Panchayati Raj Department" },
  {
    name: "Personnel Administrative Reforms and Rajbhasha Department",
  },
  { name: "Planning and Development Department" },
  {
    name: "Revenue Registration and Land Reforms Department",
  },
  { name: "Road Construction Department" },
  { name: "Rural Development Department" },
  { name: "Rural Works Department" },
  {
    name: "School Education and Literacy Department",
  },
  {
    name: "Tourism Art Culture Sports and Youth Afairs Department ",
  },
  { name: "Transport Department" },
  {
    name: "Urban Development and Housing Department",
  },
  { name: "Water Resource Department" },
  { name: "Welfare Department" },
  {
    name: "Women Child Development and Social Security Department",
  },
];

const department_seeder = async () => {
  try {
    console.log("🧹 Deleting all existing departments...");
    await prisma.department.deleteMany({});

    console.log("🔄 Resetting ID sequence...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE department_id_seq RESTART WITH 1`);

    console.log("🌱 Inserting departments...");
    for (const dep of department) {
      await prisma.department.create({ data: dep });
    }

    console.log("✅ Departments seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding departments:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default department_seeder;
