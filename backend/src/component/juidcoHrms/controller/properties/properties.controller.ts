import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
// import TestDao from "../../dao/test/test.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";
import path from "path";

import PropertiesReader from 'properties-reader'

// const properties = PropertiesReader('./config.properties');
const propertiesPath = path.resolve(__dirname, '../../../../conf.properties');

class TestController {
    private properties: any;

    constructor() {
        this.properties = PropertiesReader(propertiesPath);
    }

    calcEpf = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
        };

        try {
            // const data = this.properties.get('calc.epf')

            const allProperties = this.properties.getAllProperties();

            const data = Object.keys(allProperties)
                .filter(key => key.startsWith('calc.'))
                .reduce((obj: any, key) => {
                    obj[key] = allProperties[key];
                    return obj;
                }, {});

            return CommonRes.SUCCESS(
                resMessage("Property fetched successfully").FOUND,
                data,
                resObj,
                res,
                next
            );
        } catch (err: any) {
            console.log(err)
            throw new Error(err?.message)
        }
    };


}

export default TestController;
