import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dist = [
  { name: "Deoghar" },
  { name: "Dumka" },
  { name: "Bokaro" },
  { name: "Giridih" },
  { name: "Koderma" },
  { name: "Godda" },
  { name: "Chatra" },
  { name: "Dhanbad" },
  { name: "Gharwha" },
  { name: "East-Singhbhum" },
  { name: "Jamtara" },
  { name: "Saraikela-Kharsawan" },
  { name: "Ranchi" },
  { name: "Pakur" },
  { name: "Latehar" },
  { name: "Hazaribagh" },
  { name: "Lohardaga" },
  { name: "Palamu" },
  { name: "Ramghar" },
  { name: "Simdega" },
  { name: "West-Singhbhum" },
  { name: "Sahebganj" },
  { name: "Gumla" },
  { name: "Khunti" },
];
const district_seed = async () => {
  for (const district of dist) {
    await prisma.district.create({
      data: district,
    });
  }
};

export default district_seed;
