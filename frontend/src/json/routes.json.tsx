/**
 * | Author- Bijoy Paitandi
 * | Created On- 26-01-2024
 * | Status: open
 * | Intended Use: central place to define routes to pages, (instead of hardcoding the page address, use these static clas fields
 */

const Routes = class {
  // Chequebook master routes
  static chequebook_master = '/finance/masters/chequebook-master';
  static chequebook_master$add = this.chequebook_master + "/add";
  static chequebook_master$view = this.chequebook_master + "/view";
  static chequebook_master$return = this.chequebook_master + "/return";


  // Reciept Entry routes
  static receipt_entry = '/finance/transaction/receipt-entry';
  static receipt_entry$add = this.receipt_entry + "/add";
  static receipt_entry$view = this.receipt_entry + "/view";


}


export default Routes;