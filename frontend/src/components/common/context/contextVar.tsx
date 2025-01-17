// 'use client'

// import { createContext } from "react";

// // Define an interface for the context data
// interface ContextData {
//   notify: () => void;
//   menuList: any[]; // Replace `any[]` with a more specific type if needed
//   setmenuList: (list: any[]) => void; // Replace `any[]` with a more specific type if needed
//   userDetails: any | null; // Replace `any` with the type for user details if you have it
//   setuserDetails: (user: any | null) => void; // Replace `any` with the user details type
//   titleText: string;
//   settitleText: (text: string) => void;
//   titleBarVisibility: boolean;
//   settitleBarVisibility: (visible: boolean) => void;
//   heartBeatCounter: number;
//   setheartBeatCounter: (counter: number) => void;
//   toggleBar: boolean;
//   settoggleBar: (toggle: boolean) => void;
//   refresh: boolean;
//   setrefresh: (refresh: boolean) => void;
//   reference_no: string;
//   setReferenceNo: (referenceNo: string) => void;
// }

// // Create the context with the defined interface as the default value
// export const contextVar = createContext<ContextData>({
//   notify: () => {},
//   menuList: [],
//   setmenuList: () => {},
//   userDetails: null,
//   setuserDetails: () => {},
//   titleText: "",
//   settitleText: () => {},
//   titleBarVisibility: false,
//   settitleBarVisibility: () => {},
//   heartBeatCounter: 0,
//   setheartBeatCounter: () => {},
//   toggleBar: false,
//   settoggleBar: () => {},
//   refresh: false,
//   setrefresh: () => {},
//   reference_no: "",
//   setReferenceNo: () => {},
// });
