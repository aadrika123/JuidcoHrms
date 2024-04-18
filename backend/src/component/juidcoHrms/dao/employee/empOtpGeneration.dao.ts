/**
 * | Author- Jaideep
 * | Created for- OTP Generation Dao
 * | Status: Open
 */

import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";
import twilio from "twilio"
import otpGenerator from "otp-generator"


const accountSid = process.env.TWILIO_ACCNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = new (twilio as any)(accountSid, authToken);

class EmployeeOtpGenDao {
    
    // !-----------------------------OTP Generation ------------------------------//

    post = async (req: Request) => {

        const { mobileNumber } = req.body;

        const otp = otpGenerator.generate(6, { digits: true, specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });

        const OTP = await twilioClient.messages.create({
            body: `Your OTP is : ${otp}`,
            to: mobileNumber,
            from: process.env.TWILIO_PHONE
        })

        return generateRes(OTP);
    };
}

export default EmployeeOtpGenDao;
