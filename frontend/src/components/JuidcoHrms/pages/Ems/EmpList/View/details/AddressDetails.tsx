import React, { useEffect, useState } from "react";

export default function AddressDetails(props: any) {
  const { data } = props;
  const [isAddressSame, setIsAddressSame] = useState(false);

  useEffect(() => {
    if (data?.emp_address_same === "yes") {
      setIsAddressSame(true);
    } else {
      setIsAddressSame(false);
    }
  }, [data, isAddressSame]);

  return (
    <div className="rounded border-2 p-4 border-neutral">
      <h5 className="text-xl">
        <b>Address Details</b>
      </h5>
      <div className="divider divider-neutral"></div>
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between">
            <p>
              <b>Address : </b>
            </p>
            <p>
              <b>Post Office : </b>
            </p>
            <p>
              <b>District : </b>
            </p>
            <p>
              <b>Pin Code : </b>
            </p>
            <p>&nbsp;</p>
            {isAddressSame && <p>Present and permanent addresses are same.</p>}
            <p>&nbsp;</p>
            {!isAddressSame && (
              <>
                <p>
                  <b>Permanent Address Line 1 : </b>
                </p>
                <p>
                  <b>Post Office : </b>
                </p>
                <p>
                  <b>District : </b>
                </p>
                <p>
                  <b>Pin Code : </b>
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col justify-between items-end">
            <p className="gap-2">
              {data?.address_primary} {data?.address_secondary}
            </p>
            <p>{data?.post_office || "N/A"}</p>
            <p>{data?.district || "N/A"}</p>
            <p>{data?.pin_code || "N/A"}</p>
            <p>&nbsp;</p>
            {isAddressSame && <p>&nbsp;</p>}
            <p>&nbsp;</p>
            {!isAddressSame && (
              <>
                <p>{data?.address_primary_permanent || "N/A"}</p>
                <p>{data?.post_office_permanent || "N/A"}</p>
                <p>{data?.district_permanent || "N/A"}</p>
                <p>{data?.pin_code_permanent || "N/A"}</p>
              </>
            )}
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between">
            {/* <p><b>Address Line 2 : </b></p> */}
            <p>
              <b>State : </b>
            </p>
            <p>
              <b>Block / ULB : </b>
            </p>
            <p>
              <b>Police Station : </b>
            </p>
            <p>&nbsp;</p>
            {isAddressSame && <p>&nbsp;</p>}
            <p>&nbsp;</p>
            {!isAddressSame && (
              <>
                <p>
                  <b>Permanent Address Line 2 : </b>
                </p>
                <p>
                  <b>State : </b>
                </p>
                <p>
                  <b>Block / ULB : </b>
                </p>
                <p>
                  <b>Police Station : </b>
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col justify-between items-end">
            {/* <p>{data?.address_secondary || 'N/A'}</p> */}
            <p>{data?.state || "N/A"}</p>
            <p>{data?.block_ulb || "N/A"}</p>
            <p>{data?.police_station || "N/A"}</p>
            <p>&nbsp;</p>
            {isAddressSame && <p>&nbsp;</p>}
            <p>&nbsp;</p>
            {!isAddressSame && (
              <>
                <p>{data?.address_secondary_permanent || "N/A"}</p>
                <p>{data?.state_permanent || "N/A"}</p>
                <p>{data?.block_ulb_permanent || "N/A"}</p>
                <p>{data?.police_station_permanent || "N/A"}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
