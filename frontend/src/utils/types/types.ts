declare global {
  interface Array<T> {
    resetData(): T[];
  }
} // Pagination Types
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

export type EmpListProps<T> = {
  currentPage: number;
  count: number;
  totalPage: number;
  data: T[];
};
