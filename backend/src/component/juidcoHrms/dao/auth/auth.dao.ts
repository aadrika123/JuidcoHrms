// import { PrismaClient } from "@prisma/client";
// import { generateRes } from "../../../../util/generateRes";
// // import Middleware from "../../middleware/middleware";
// // import { generateOtp } from "../../../../util/helper/generateOtp";
// import bcrypt from "bcrypt";
// import Middleware from "../../../../middleware/auth.middleware";

// const prisma = new PrismaClient();

// class AuthDao {
//   private middleware: Middleware;
//   constructor() {
//     this.middleware = new Middleware();
//   }

//   login = async (credentials: any) => {
//     const { password, email } = credentials;
//     const user = await prisma.users.findFirst({
//       where: { email },
//       select: {
//         id: true,
//         user_id: true,
//         name: true,
//         email: true,
//         password: true,
//         designation: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//     });

//     if (!user) {
//       return generateRes(user);
//     }
//     const isValidPassword: boolean = await bcrypt.compare(
//       password,
//       user.password
//     );
//     if (isValidPassword) {
//       const { password, ...others } = user;
//       return generateRes({ ...others });
//     }
//     return false;
//   };
// }

// export default AuthDao;
