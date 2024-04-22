
// import { Request, Response } from "express";
// import CommonRes from "../../../../util/helper/commonResponse";
// import { resObj } from "../../../../util/types";

// import AuthDao from "../../dao/auth/authDao";
// import { loginValidation } from "../../requests/ems/auth/loginValidation";
// import { resMessage } from "../../responseMessage/commonMessage";



// class AuthController {
//   private dao: AuthDao;
//   private initMsg: string;
//   constructor() {
//     this.dao = new AuthDao();
//     this.initMsg = "Employee";
//   }

//   // Login
//   login = async (
//     req: Request,
//     res: Response,
//     apiId: string
//   ): Promise<Response> => {
//     const resObj: resObj = {
//       apiId,
//       action: "GET",
//       version: "1.0",
//     };

//     try {

//       const { error } = loginValidation.validate(req.body);

//       if(error)
//         return CommonRes.VALIDATION_ERROR(error, resObj, res);

//       const data = await this.dao.login(req.body);

//       if (data == false)
//       return CommonRes.VALIDATION_ERROR(
//         'Invalid  Credentials',
//         resObj,
//         res
//       );

//       if (!data)
//         return CommonRes.VALIDATION_ERROR(
//           resMessage(this.initMsg).NOT_FOUND,
//           resObj,
//           res
//         );

//       return CommonRes.SUCCESS(
//         resMessage(this.initMsg).LOGIN,
//         data,
//         resObj,
//         res
//       );
//     } catch (error: any) {
//       return CommonRes.SERVER_ERROR(error, resObj, res);
//     }
//   };

  

  
// }

// export default AuthController;
