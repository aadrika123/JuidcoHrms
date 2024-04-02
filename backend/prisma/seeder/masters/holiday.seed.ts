import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const holidays = [
  { date: "2024-01-01", name: "New Year's Day" },
  { date: "2024-01-15", name: "Makar Sankranti" },
  { date: "2024-01-26", name: "Republic Day" },
  { date: "2024-03-07", name: "Maha Shivaratri" },
  { date: "2024-03-10", name: "Holi" },
  { date: "2024-04-02", name: "Good Friday" },
  { date: "2024-04-06", name: "Mahavir Jayanti" },
  { date: "2024-04-14", name: "Ambedkar Jayanti" },
  { date: "2024-05-01", name: "May Day" },
  { date: "2024-05-07", name: "Buddha Purnima" },
  { date: "2024-08-15", name: "Independence Day" },
  { date: "2024-08-22", name: "Bakrid / Eid al-Adha" },
  { date: "2024-09-02", name: "Ganesh Chaturthi" },
  { date: "2024-10-02", name: "Gandhi Jayanti" },
  { date: "2024-10-07", name: "Dussehra" },
  { date: "2024-10-28", name: "Diwali" },
  { date: "2024-12-25", name: "Christmas Day" },
];
const holidays_seeder = async () => {
  for (const holidaysleave of holidays) {
    await prisma.holidays.create({
      data: holidaysleave,
    });
  }
};
export default holidays_seeder;
