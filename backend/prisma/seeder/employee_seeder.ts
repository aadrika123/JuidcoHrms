import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const employee_seeder = async () => {
  const total = 20;

  for (let i = 0; i < total; i++) {
    const record = {
      name: faker.person.fullName(),
      dob: faker.date.past(),
      father_nm: faker.name.lastName(),
      mother_nm: faker.name.lastName(),
      spouse_nm: faker.name.firstName(),
      gender: faker.string.alpha(["male", "felmale", "other"]),
      marital_status: faker.string.alpha(["Single", "Married", "Divorced"]),
      identification_mark_status: faker.lorem.words(),
      height: faker.number.int({ min: 50, max: 100 }),
      weight: faker.number.int({ min: 50, max: 100 }),
      category: faker.random.word(),
      physically_handicapped: false,
      religion: faker.random.word(),
      mobile_number: faker.phone.number(),
      email_id: faker.internet.email(),
      blood_group: faker.string.alpha([
        "A+",
        "B+",
        "AB+",
        "O+",
        "A-",
        "B-",
        "AB-",
        "O-",
      ]),
      home_state: faker.address.state(),
      home_district: faker.address.city(),
      ltc_home_town: faker.address.city(),
      nearest_railway_station: faker.address.city(),
      health_status: faker.random.word(),
      ph_type: faker.random.word(),
      adhar_card_no: faker.finance.creditCardNumber(),
      voter_id_card: faker.finance.creditCardNumber(),
      mode_of_recruitment: faker.random.word(),
      employee_type: faker.random.word(),
      gpf_cps_pran_no: faker.finance.creditCardNumber(),
      emergency_contact_number:  faker.phone.number(),
      emp_primary_skills: faker.random.words(),
      emp_secondary_skills: faker.random.words(),
      emp_employment_status: faker.random.word(),
    };

    await prisma.employee.create({ data: record });
  }
};

export default employee_seeder;
