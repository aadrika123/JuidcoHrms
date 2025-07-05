import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const languages = [
  { name: "English" },
  { name: "Hindi" },
  { name: "Assamese" },
  { name: "Bengali" },
  { name: "Bodo" },
  { name: "Dogri" },
  { name: "Gujarati" },
  { name: "Kannada" },
  { name: "Kashmiri" },
  { name: "Konkani" },
  { name: "Maithili" },
  { name: "Malayalam" },
  { name: "Manipuri" },
  { name: "Marathi" },
  { name: "Nepali" },
  { name: "Odia" },
  { name: "Punjabi" },
  { name: "Sanskrit" },
  { name: "Santali" },
  { name: "Sindhi" },
  { name: "Tamil" },
  { name: "Telugu" },
  { name: "Urdu" },
];

const language_seed = async () => {
  try {
    console.log("🧹 Deleting all existing languages...");
    await prisma.language.deleteMany({});

    console.log("🔄 Resetting ID sequence...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE language_id_seq RESTART WITH 1`);

    console.log("🌱 Inserting languages...");
    for (const language of languages) {
      await prisma.language.create({
        data: language,
      });
    }

    console.log("✅ Languages seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding languages:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default language_seed;
