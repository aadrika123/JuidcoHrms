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
  for (const language of languages) {
    await prisma.language.create({
      data: language,
    });
  }
};

export default language_seed;
