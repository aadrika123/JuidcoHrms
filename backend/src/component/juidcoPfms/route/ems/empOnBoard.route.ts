"use strict";



/**
 * | Route - 11
 */

class AdministrativeWardRoute {
  private administrativeWardController: AdministrativeWardController;
  constructor() {
    this.administrativeWardController = new AdministrativeWardController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/adminis-ward/get`)
      .get(this.administrativeWardController.getAdministrativeWards); //1101
  }
}

export default AdministrativeWardRoute;
