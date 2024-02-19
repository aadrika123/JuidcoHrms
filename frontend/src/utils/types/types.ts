// Pagination Types
export interface Pagination {
  page: number;
  totalPage: number;
  currentPage: number;
}

// common type
export type MasterProps<T> = {
  currentPage: number;
  count: number;
  totalPage: number;
  data: T[];
};

// Sidebar Types
export type SidebarModule = {
  moduleName: string;
  path: string;
  icon?: React.ReactElement;
  subModules?: SidebarModule[];
};

export type SidebarLinksProps = {
  modules: SidebarModule[];
};
// Sidebar Types

// Chart of Accounts Types //

export type ChartsOfAccountsProps<T> = {
  currentPage: number;
  count: number;
  totalPage: number;
  data: T[];
};

//Account code types //
export type AccountingTableData = {
  major_head: string;
  minor_head: string;
  detail_code: string;
  description: string;
};
// function code types //
export type FunctionTableData = {
  group: string;
  description_code: string;
  cost_center: string;
  description: string;
};
// muncipality code typed //
export type MuncipalityTableData = {
  ulbs: string;
  district: string;
  state_code: string;
  district_code: string;
  category: string;
  code: string;
};
// Chart of Accounts Types //
