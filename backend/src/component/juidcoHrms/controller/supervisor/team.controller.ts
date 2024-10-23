import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import TeamDao from "../../dao/supervisor/team.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class TeamController {
    private teamDao: TeamDao;

    constructor() {
        this.teamDao = new TeamDao();
    }

    team_members_list = async (
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

        const data = await this.teamDao.fetch_team_member_list(req);
        return CommonRes.SUCCESS(
            resMessage("List of team members").FOUND,
            data,
            resObj,
            res,
            next
        );
    };

    leave_approve_deny = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };

        const data = await this.teamDao.accept_or_deny(req);
        return CommonRes.SUCCESS(
            resMessage("Leave status changed").FOUND,
            data,
            resObj,
            res,
            next
        );
    };

    leaveListByEmpid = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };

        const data = await this.teamDao.listbyEmpid(req);
        return CommonRes.SUCCESS(
            resMessage("Leave status changed").FOUND,
            data,
            resObj,
            res,
            next
        );
    };

    fetchTeamHeirarchy = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };
        try {
            const { supervisor_id } = req.params;
            const data = await this.teamDao.fetchTeamHeirarchy(supervisor_id);
            return CommonRes.SUCCESS(
                resMessage("Leave status changed").FOUND,
                data,
                resObj,
                res,
                next
            );
        } catch (err: any) {
            return CommonRes.SERVER_ERROR(
                err,
                resObj,
                res,
                next
            );
        }

    };

    fetchSuperiorTeamHeirarchy = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };
        try {
            const { emp_id } = req.params;
            const data = await this.teamDao.fetchSuperiorTeamHeirarchy(emp_id);
            return CommonRes.SUCCESS(
                resMessage("Leave status changed").FOUND,
                data,
                resObj,
                res,
                next
            );
        } catch (err: any) {
            return CommonRes.SERVER_ERROR(
                err,
                resObj,
                res,
                next
            );
        }

    };

}

export default TeamController;
