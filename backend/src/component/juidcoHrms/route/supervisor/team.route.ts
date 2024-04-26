"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import TeamController from "../../controller/supervisor/team.controller";

class TeamRoute {
    private TeamController: TeamController;
    constructor() {
        this.TeamController = new TeamController();
    }

    configure(app: express.Application): void {
        app
            .route(`${baseUrl}/team/list/:supervisor_id`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.TeamController.team_members_list(req, res, next, "0801"),
                loggerMiddleware
            );

    }
}

export default TeamRoute;
