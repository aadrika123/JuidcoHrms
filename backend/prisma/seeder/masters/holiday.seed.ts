import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const holidays = [
  { date: "2025-02-26", name: "Mahashivratri" },
  { date: "2025-03-14", name: "Holika Dahan" },
  { date: "2025-03-15", name: "Holi" },
  { date: "2025-03-30", name: "Ram Navami" },
  { date: "2025-04-10", name: "Mahavir Jayanti" },
  { date: "2025-04-13", name: "Ambedkar Jayanti" },
  { date: "2025-04-18", name: "Good Friday" },
  { date: "2025-05-12", name: "Buddha Purnima" },
  { date: "2025-06-07", name: "Sang-Dooj-Punna" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-08-16", name: "Raksha Bandhan" },
  { date: "2025-09-03", name: "Teej" },
  { date: "2025-09-05", name: "Krishna Janmashtami" },
  { date: "2025-09-30", name: "Mahalaya" },
  { date: "2025-10-01", name: "Mahatma Gandhi Jayanti" },
  { date: "2025-10-02", name: "Mahatma Gandhi Jayanti / Vijayadashami" },
  { date: "2025-10-23", name: "Diwali" },
  { date: "2025-10-24", name: "Govardhan Puja" },
  { date: "2025-10-27", name: "Surya Shashthi Chhath" },
  { date: "2025-10-28", name: "Surya Shashthi Chhath" },
  { date: "2025-11-20", name: "Guru Nanak Jayanti" },
  { date: "2025-12-25", name: "Christmas" },
];

const holidays_seeder = async () => {
  for (const holidaysleave of holidays) {
    await prisma.holidays.create({
      data: holidaysleave,
    });
  }
};
export default holidays_seeder;
