import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const states = [
  "West Bengal",
  "Rajasthan",
  "Jammu and Kashmir",
  "Uttar Pradesh",
  "Bihar",
  "Assam",
  "Odisha",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Madhya Pradesh",
  "Kerala",
  "Karnataka",
  "Maharashtra",
  "Gujarat",
  "Nagaland",
  "Punjab",
  "Himachal Pradesh",
  "Manipur",
  "Meghalaya",
  "Tripura",
  "Sikkim",
  "Goa",
  "Arunachal Pradesh",
  "Mizoram",
  "Chhattisgarh",
  "Jharkhand",
  "Uttarakhand",
  "Telangana",
  "Haryana",
  "Delhi",
  "Andaman Nicobar",
  "Chandigarh",
  "Dadra & Nagar Haveli",
  "Lakshadweep",
  "Puducherry",
  "Anglo Indian Nominated",
  "Jammu and Kashmir",
  "Ladakh",
];

const state_seed = async () => {
  for (const stateName of states) {
    await prisma.indianstates.create({
      data: {
        name: stateName,
      },
    });
  }
};

export default state_seed;
