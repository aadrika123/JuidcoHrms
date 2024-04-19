import { Request } from 'express';
import { generateRes } from '../../../../util/generateRes';
import twilio from 'twilio';
import otpGenerator from 'otp-generator';

const accountSid = process.env.TWILIO_ACCNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new (twilio as any)(accountSid, authToken);

class EmployeeOtpGenDao {
    private otpMap: Map<string, { otp: string; attempts: number }>; // Map to store mobileNumber -> { otp, attempts }

    constructor() {
        this.otpMap = new Map();
    }

    post = async (req: Request) => {
        const { mobileNumber } = req.body;

        // Generate a new OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
        });

        try {
            const message = await twilioClient.messages.create({
                body: `Your OTP is: ${otp}`,
                to: mobileNumber,
                from: process.env.TWILIO_PHONE,
            });

            console.log('Twilio Message:', message);

            // Store the generated OTP and attempts count in the otpMap (associated with mobileNumber)
            this.otpMap.set(mobileNumber, { otp, attempts: 0 });

            return generateRes({
                status: true,
                message: 'OTP created Successfully!!',
                data: message,
            });
        } catch (error) {
            console.error('Error sending OTP:', error);
            return generateRes({
                status: false,
                message: 'Failed to send OTP',
            });
        }
    };




    // Validate the OTP entered by the user
    validateOtp = async (req: Request) => {
        const { mobileNumber, enteredOtp } = req.body;

        // Retrieve the stored OTP and attempts count from the otpMap
        const storedData = this.otpMap.get(mobileNumber);

        if (!storedData) {
            console.error('No OTP data found for mobileNumber:', mobileNumber);
            return generateRes({
                status: false,
                message: 'No OTP found for mobileNumber',
            });
        }

        const { otp, attempts } = storedData;

        // Compare the entered OTP with the stored OTP
        const isOtpValid = enteredOtp === otp;

        console.log('OTP Validation Result:', isOtpValid);

        // Increment the attempts count
        storedData.attempts++;

        // If OTP is invalid and attempts exceed a certain limit (e.g., 3 attempts), return failure
        if (!isOtpValid && attempts >= 3) {
            console.error(`Exceeded max attempts for mobileNumber: ${mobileNumber}`);
            this.otpMap.delete(mobileNumber); 
            return generateRes({
                status: false,
                message: 'Exceeded maximum OTP attempts',
            });
        }

        // Return the validation result
        if (isOtpValid) {
            this.otpMap.delete(mobileNumber); 
            return generateRes({
                status: true,
                message: 'OTP validated Successfully',
            });
        } else {
            return generateRes({
                status: false,
                message: 'Invalid OTP',
            });
        }
    };
}

export default EmployeeOtpGenDao;