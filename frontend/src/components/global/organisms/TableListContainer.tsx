import CheckBox from "@/components/Helpers/CheckBox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  SUB_ACCESSOR?: string;
  TYPE?: string;
  WIDTH?: string;
}

type ActionType = "edit" | "readonly" | "delete";

interface TLContainerProps {
  columns: COLUMNS[];
  tableData: any[];
  actionBtn?: boolean;
  actionName?: string;
  setEmpId?: (val: number) => void;
  sl_no: boolean;
  thead_bg?: string;
  action_type?: ActionType[];
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function convertTimeToAMPM(timeString: string): string {
  if (timeString === "--") return "--";
  console.log("Time string: ", timeString);
  const time = new Date(timeString);

  // const timeZoneFromDB = -0.0; //time zone value from database
  // //get the timezone offset from local time in minutes
  // const tzDifference = timeZoneFromDB * 60 + time1.getTimezoneOffset();
  // //convert the offset to milliseconds, add to targetTime, and make a new Date
  // const time = new Date(time1.getTime() + tzDifference * 60 * 1000);

  let hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const realTime = `${hours}:${formattedMinutes} ${ampm}`;
  return realTime;
}

const Thead: React.FC<{
  index: number;
  HEADER: string;
  WIDTH?: string;
  SL_NO: boolean;
}> = (props) => {
  return (
    <>
      {props.index === 0 ? (
        <>
          <th className="px-4 w-16 whitespace-nowrap">
            {props.SL_NO ? (
              <div key={props.index} className={`p-5 text-xl font-light`}>
                <div className="flex gap-2">
                  <span>#</span>
                </div>
              </div>
            ) : (
              <CheckBox
                label={""}
                name={""}
                className="border-zinc-800 w-8 h-8"
              />
            )}
          </th>
          <th
            key={props.index}
            className={`p-5 text-xl font-light whitespace-nowrap w-[${props.WIDTH}]`}
          >
            <div className="flex gap-2">
              <span>{props.HEADER}</span>
            </div>
          </th>
        </>
      ) : (
        <th
          key={props.index}
          className={`p-5 text-xl font-light whitespace-nowrap w-[${props.WIDTH}]`}
        >
          <div className="flex gap-2">
            <span>{props.HEADER}</span>
          </div>
        </th>
      )}
    </>
  );
};

const Tdata: React.FC<{
  tdata: any;
  index: number;
  SL_NO: boolean;
  sl_index: number;
  type: string;
}> = (props) => {
  return (
    <>
      {props.index === 0 ? (
        <>
          <td className="pl-5 py-5 text-xl text-zinc-600 font-light">
            {props.SL_NO ? (
              <div className="">
                <span>{props.sl_index + 1}</span>
              </div>
            ) : (
              <CheckBox label="" name="" />
            )}
          </td>
          <td className="pl-5 py-5 text-xl text-zinc-600 font-light">
            <span>
              {props.type === "date"
                ? formatDate(props.tdata)
                : props.type === "time"
                  ? convertTimeToAMPM(props.tdata)
                  : props.tdata}
            </span>
          </td>
        </>
      ) : (
        <>
          <td className="pl-6 py-3 text-xl text-zinc-600 font-light">
            <span>
              {props.type === "date"
                ? formatDate(props.tdata)
                : props.type === "time"
                  ? convertTimeToAMPM(props.tdata)
                  : props.tdata}
            </span>
          </td>
        </>
      )}
    </>
  );
};

const TableListContainer: React.FC<TLContainerProps> = (props) => {
  const pathName = usePathname();
  return (
    <div>
      <table className="mt-4 w-full">
        <thead
          className={`text-[1rem] border-t border-b border-zinc-400 text-[#211F35] bg-[${props.thead_bg}] w-full`}
        >
          <tr>
            {props.columns?.map((cols, index: number) => (
              <Thead
                key={index}
                HEADER={cols.HEADER}
                WIDTH={cols.WIDTH}
                index={index}
                SL_NO={props.sl_no}
              />
            ))}
            {props.actionBtn && (
              <th className="p-5 text-xl font-light w-[10%]">
                <span>{props.actionName}</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.tableData &&
            props.tableData?.map((data, index: number) => {
              return (
                <>
                  <tr key={index} className="border-b">
                    {props.columns?.map((col, i: number) => {
                      const getValue = (data: any): any => {
                        if (
                          typeof data === "object" &&
                          data !== "undefined" &&
                          data !== null
                        ) {
                          if (data[col.ACCESSOR]) {
                            return data[col.ACCESSOR];
                          } else {
                            for (const key in data) {
                              if (typeof data[key] === "object") {
                                const value = getValue(data[key]);
                                if (value !== undefined) {
                                  return value;
                                }
                              }
                            }
                          }
                        } else {
                          return data || "--";
                        }
                      };

                      const value = getValue(data);

                      return (
                        <Tdata
                          key={i}
                          tdata={value}
                          index={i}
                          SL_NO={props.sl_no}
                          sl_index={index}
                          type={col.TYPE as string}
                        />
                      );
                    })}
                    {props.actionBtn && (
                      <td className="text-center py-3 text-xl text-zinc-600 font-light">
                        <div className="flex items-center justify-around">
                          {props.action_type?.includes("edit") && (
                            <Link
                              href={`${pathName}/edit/${data?.emp_id}`}
                              className=" scale-125"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="20"
                                viewBox="0 0 23 20"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_1440_7941)">
                                  <rect
                                    x="1.63591"
                                    y="0.63591"
                                    width="18.7282"
                                    height="18.7282"
                                    rx="4.36409"
                                    stroke="#726E6E"
                                    strokeWidth="1.27182"
                                  />
                                  <path
                                    d="M15.5263 8.02097C15.3434 8.19095 15.1659 8.35592 15.1605 8.5209C15.1444 8.68088 15.3273 8.84585 15.4994 9.00083C15.7576 9.2508 16.0104 9.47577 15.9997 9.72073C15.9889 9.9657 15.7146 10.2207 15.4402 10.4706L13.2187 12.5403L12.4549 11.8304L14.741 9.71073L14.2246 9.2308L13.4608 9.9357L11.4436 8.06096L13.5092 6.14623C13.7189 5.95126 14.0686 5.95126 14.2676 6.14623L15.5263 7.31607C15.7361 7.50104 15.7361 7.826 15.5263 8.02097ZM6 13.1253L11.1424 8.34092L13.1595 10.2157L8.01715 15H6V13.1253Z"
                                    fill="black"
                                    fillOpacity="0.41"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1440_7941">
                                    <rect
                                      width="22.7692"
                                      height="19.7333"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Link>
                          )}

                          {props.action_type?.includes("readonly") && (
                            <button className=" scale-125">
                              <Link
                                href={`${pathName}/view/${data?.emp_id}`}
                                className=" scale-125"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="21"
                                  height="20"
                                  viewBox="0 0 21 20"
                                  fill="none"
                                >
                                  <rect
                                    x="0.578644"
                                    y="0.578644"
                                    width="19.8427"
                                    height="18.8427"
                                    rx="4.42136"
                                    stroke="#726E6E"
                                    strokeWidth="1.15729"
                                  />
                                  <path
                                    d="M10 9.1C10.3617 9.1 10.7085 9.2475 10.9642 9.51005C11.22 9.7726 11.3636 10.1287 11.3636 10.5C11.3636 10.8713 11.22 11.2274 10.9642 11.4899C10.7085 11.7525 10.3617 11.9 10 11.9C9.63834 11.9 9.29149 11.7525 9.03576 11.4899C8.78003 11.2274 8.63636 10.8713 8.63636 10.5C8.63636 10.1287 8.78003 9.7726 9.03576 9.51005C9.29149 9.2475 9.63834 9.1 10 9.1ZM10 7C12.2727 7 14.2136 8.45133 15 10.5C14.2136 12.5487 12.2727 14 10 14C7.72727 14 5.78636 12.5487 5 10.5C5.78636 8.45133 7.72727 7 10 7ZM5.99091 10.5C6.3583 11.2701 6.92878 11.919 7.63749 12.3729C8.34621 12.8267 9.16473 13.0673 10 13.0673C10.8353 13.0673 11.6538 12.8267 12.3625 12.3729C13.0712 11.919 13.6417 11.2701 14.0091 10.5C13.6417 9.72986 13.0712 9.08098 12.3625 8.62715C11.6538 8.17331 10.8353 7.93272 10 7.93272C9.16473 7.93272 8.34621 8.17331 7.63749 8.62715C6.92878 9.08098 6.3583 9.72986 5.99091 10.5Z"
                                    fill="black"
                                    fillOpacity="0.41"
                                  />
                                </svg>
                              </Link>
                            </button>
                          )}

                          {props.action_type?.includes("delete") && (
                            <button
                              className=" scale-125"
                              onClick={() =>
                                props?.setEmpId && props.setEmpId(data?.emp_id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <rect
                                  x="0.563881"
                                  y="0.563881"
                                  width="18.362"
                                  height="18.1851"
                                  rx="5.07493"
                                  stroke="#726E6E"
                                  strokeWidth="1.12776"
                                />
                                <path
                                  d="M13 6.5H11.25L10.75 6H8.25L7.75 6.5H6V7.5H13M6.5 14C6.5 14.2652 6.60536 14.5196 6.79289 14.7071C6.98043 14.8946 7.23478 15 7.5 15H11.5C11.7652 15 12.0196 14.8946 12.2071 14.7071C12.3946 14.5196 12.5 14.2652 12.5 14V8H6.5V14Z"
                                  fill="black"
                                  fillOpacity="0.41"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableListContainer;
