import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ulbs = [
  { name: "Ranchi (Nagar Nigam)" },
  { name: "Dhanbad (Nagar Nigam)" },
  { name: "Hazaribag (Nagar Parshad)" },
  { name: "Adityapur (Nagar Parshad)" },
  { name: "Mango" },
  { name: "Jamshedpur (NAC)" },
  { name: "Deoghar (Nagar Nigam)" },
  { name: "Medininagar (Daltonganj) (Nagar Parshad)" },
  { name: "Jhumri Talaiya (Nagar Parshad)" },
  { name: "Giridih (Nagar Parshad)" },
  { name: "Sahibganj (Nagar Parshad)" },
  { name: "Phusro (Nagar Parshad)" },
  { name: "Chas (Nagar Parshad)" },
  { name: "Chaibasa (Nagar Parshad)" },
  { name: "Chakradharpur (Nagar Parshad)" },
  { name: "Garhwa (Nagar Panchayat)" },
  { name: "Hussainabad (Nagar Panchayat)" },
  { name: "Chatra (Nagar Parshad)" },
  { name: "Madhupur (Nagar Parshad)" },
  { name: "Godda (Nagar Panchayat)" },
  { name: "Pakur (Nagar Panchayat)" },
  { name: "Dumka (Nagar Parshad)" },
  { name: "Jamtara (Nagar Panchayat)" },
  { name: "Mihijam (Nagar Panchayat)" },
  { name: "Chirkunda (Nagar Panchayat)" },
  { name: "Khunti (Nagar Panchayat)" },
  { name: "Lohardaga (Nagar Parshad)" },
  { name: "Gumla (Nagar Panchayat)" },
  { name: "Simdega (Nagar Panchayat)" },
  { name: "Jugsalai (Municipality)" },
  { name: "Majhiaown (Nagar Panchayat)" },
  { name: "Latehar (Nagar Panchayat)" },
  { name: "Kodarma (Nagar Panchayat)" },
  { name: "Rajmahal (Nagar Panchayat)" },
  { name: "Basukinath (Nagar Panchayat)" },
  { name: "Bundu (Nagar Panchayat)" },
  { name: "Saraikela (Nagar Panchayat)" },
  { name: "Chakulia (Nagar Panchayat)" },
  { name: "Vishrampur (Nagar Panchayat)" },
];

const ulb_seed = async () => {
  try {
    console.log("🧹 Deleting all existing ULBs...");
    await prisma.ulb.deleteMany({});

    console.log("🔄 Resetting ID sequence...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE ulb_id_seq RESTART WITH 1`);

    console.log("🌱 Inserting ULBs...");
    for (const ulb of ulbs) {
      await prisma.ulb.create({
        data: ulb,
      });
    }

    console.log("✅ ULBs seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding ULBs:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default ulb_seed;
