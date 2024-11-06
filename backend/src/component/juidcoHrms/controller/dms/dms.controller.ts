import { Request, NextFunction, Response } from "express";
import crypto from "crypto";
import FormData from "form-data";
import axios from "axios";

class DMSController {

    constructor() { }

    uploadAndGet = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {

        try {
            const file: any = req.file;
            const hashed = crypto
                .createHash("SHA256")
                .update(file?.buffer)
                .digest("hex");

            const formData = new FormData();
            formData.append("file", file?.buffer, file?.mimetype);
            formData.append("tags", file?.originalname.substring(0, 7));

            const headers = {
                "x-digest": hashed,
                token: "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
                folderPathId: 1,
                ...formData.getHeaders(),
            };

            const response = await axios.post(String(process.env.DMS_UPLOAD), formData, { headers });
            console.log("response", response)

            const refNo = response.data.data.ReferenceNo;
            const resData: any = await axios.post(
                String(process.env.DMS_GET),
                { referenceNo: refNo },
                { headers: { token: headers.token } }
            );

            return res.status(200).json({
                status: true,
                message: "Found Succesfully",
                "meta-data": {
                    apiId,
                    action: "POST",
                    version: "1.0",
                },

                data: resData.data.data.fullPath,

            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Error occured while getting",
                "meta-data": {
                    apiId,
                    action: "POST",
                    version: "1.0",
                },
            });
        }
    };


}

export default DMSController;
