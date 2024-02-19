import { baseUrl } from "../../../util/common";
import VendorTypeController from "../controller/vendorTypeController";
import express from "express";

/**
 * | Route - 05
 */

class VendorTypeRoute{
    private vendorTypeController : VendorTypeController;
    constructor(){
        this.vendorTypeController = new VendorTypeController();
    }

    configure(app: express.Application){
        app.route(`${baseUrl}/vendor-type/get`).get(this.vendorTypeController.get) //01
    }
}

export default VendorTypeRoute;