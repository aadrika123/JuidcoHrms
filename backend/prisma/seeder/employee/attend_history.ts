import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const employee_id = "EMP912e43";

const newArr = [
  {
    employee_id: "EMP912e43",
    date: "2024-04-01T00:00:00.000Z",
    emp_in: "2024-04-01T09:00:00.000Z",
    emp_out: "2024-04-01T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-02T00:00:00.000Z",
    emp_in: "2024-04-02T09:00:00.000Z",
    emp_out: "2024-04-02T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-03T00:00:00.000Z",
    emp_in: "2024-04-03T09:00:00.000Z",
    emp_out: "2024-04-03T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-04T00:00:00.000Z",
    emp_in: "2024-04-04T09:00:00.000Z",
    emp_out: "2024-04-04T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-05T00:00:00.000Z",
    emp_in: "2024-04-05T09:00:00.000Z",
    emp_out: "2024-04-05T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-06T00:00:00.000Z",
    emp_in: "2024-04-06T09:00:00.000Z",
    emp_out: "2024-04-06T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-07T00:00:00.000Z",
    emp_in: "2024-04-07T09:00:00.000Z",
    emp_out: "2024-04-07T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-08T00:00:00.000Z",
    emp_in: "2024-04-08T09:00:00.000Z",
    emp_out: "2024-04-08T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-09T00:00:00.000Z",
    emp_in: "2024-04-09T09:00:00.000Z",
    emp_out: "2024-04-09T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-10T00:00:00.000Z",
    emp_in: "2024-04-10T09:00:00.000Z",
    emp_out: "2024-04-10T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-11T00:00:00.000Z",
    emp_in: "2024-04-11T09:00:00.000Z",
    emp_out: "2024-04-11T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-12T00:00:00.000Z",
    emp_in: "2024-04-12T09:00:00.000Z",
    emp_out: "2024-04-12T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-13T00:00:00.000Z",
    emp_in: "2024-04-13T09:00:00.000Z",
    emp_out: "2024-04-13T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-14T00:00:00.000Z",
    emp_in: "2024-04-14T09:00:00.000Z",
    emp_out: "2024-04-14T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-15T00:00:00.000Z",
    // emp_in: "",
    // emp_out: "",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-16T00:00:00.000Z",
    // emp_in: "",
    // emp_out: "",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-17T00:00:00.000Z",
    // emp_in: "",
    // emp_out: "",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-18T00:00:00.000Z",
    // emp_in: "",
    // emp_out: "",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-19T00:00:00.000Z",
    // emp_in: "",
    // emp_out: "",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-20T00:00:00.000Z",
    emp_in: "2024-04-20T09:00:00.000Z",
    emp_out: "2024-04-20T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-21T00:00:00.000Z",
    emp_in: "2024-04-21T09:00:00.000Z",
    emp_out: "2024-04-21T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-22T00:00:00.000Z",
    emp_in: "2024-04-22T09:00:00.000Z",
    emp_out: "2024-04-22T11:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-23T00:00:00.000Z",
    emp_in: "2024-04-23T09:00:00.000Z",
    emp_out: "2024-04-23T10:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-24T00:00:00.000Z",
    emp_in: "2024-04-24T09:00:00.000Z",
    emp_out: "2024-04-24T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-25T00:00:00.000Z",
    emp_in: "2024-04-25T09:00:00.000Z",
    emp_out: "2024-04-25T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-26T00:00:00.000Z",
    emp_in: "2024-04-26T09:00:00.000Z",
    emp_out: "2024-04-26T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-27T00:00:00.000Z",
    emp_in: "2024-04-27T09:00:00.000Z",
    emp_out: "2024-04-27T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-28T00:00:00.000Z",
    emp_in: "2024-04-28T09:00:00.000Z",
    emp_out: "2024-04-28T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-29T00:00:00.000Z",
    emp_in: "2024-04-29T09:00:00.000Z",
    emp_out: "2024-04-29T17:00:00.000Z",
  },
  {
    employee_id: "EMP912e43",
    date: "2024-04-30T00:00:00.000Z",
    emp_in: "2024-04-30T09:00:00.000Z",
    emp_out: "2024-04-30T17:00:00.000Z",
  },
];

export const attend_history_seed = async () => {
  await prisma.employee_attendance_history.createMany({ data: newArr });
};

// export const attend_history_seed = async () => {
//   for (let i = 1; i <= 30; i++) {
//     const date = `2024-04-${i < 10 ? "0" + i : i}`;
//     const emp_in = `${date}T10:00:00.000Z`;
//     const emp_out = `${date}T18:00:00.000Z`;

//     const data = {
//       employee_id: employee_id,
//       date: `${date}T00:00:00.000Z`,
//       emp_in: emp_in,
//       emp_out: emp_out,
//     };

//     await prisma.employee_attendance_history.createMany({ data });
//   }
// };
