import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Pensionstatement = [
    {
      month: "January",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 66500,
    },
    {
      month: "February",
      year: "2024",
      no_of_days_present: "24",
      net_pay: 67000,
    },
    {
      month: "March",
      year: "2024",
      no_of_days_present: "25",
      net_pay: 66000,
    },
    {
      month: "April",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 67500,
    },
    {
      month: "May",
      year: "2024",
      no_of_days_present: "25",
      net_pay: 65500,
    },
    {
      month: "June",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 67000,
    },
    {
      month: "July",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 67000,
    },
    {
      month: "August",
      year: "2024",
      no_of_days_present: "25",
      net_pay: 66000,
    },
    {
      month: "September",
      year: "2024",
      no_of_days_present: "25",
      net_pay: 65500,
    },
    {
      month: "October",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 67500,
    },
    {
      month: "November",
      year: "2024",
      no_of_days_present: "24",
      net_pay: 66000,
    },
    {
      month: "December",
      year: "2024",
      no_of_days_present: "26",
      net_pay: 67000,
    },
  ];
  
const pensionStatement_seeder = async () => {
  for (const pensionStatement of Pensionstatement) {
    await prisma.pensionstatement.create({
        data: pensionStatement,
      });
  }
};
export default pensionStatement_seeder;
