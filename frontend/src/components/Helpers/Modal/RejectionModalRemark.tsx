import cancel from "@/Components/assets/cancel.svg";
import ThemeStyle from "./ThemeStyle";
import React from "react";

interface RejectionModalRemarkProps {
  confirmationHandler: () => void;
  handleCancel: () => void;
  message: string;
  setData: React.Dispatch<React.SetStateAction<{ remark: string }>>;
  loadingState: boolean;
}

const RejectionModalRemark: React.FC<RejectionModalRemarkProps> = ({
  confirmationHandler,
  handleCancel,
  message,
  setData,
  loadingState,
}) => {
  const { loading } = ThemeStyle();

  return (
    <>
      <div></div>
      <div className="fixed inset-0 flex items-center justify-center z-[5000]">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10 rounded">
          <div className="relative overflow-hidden mt-10">
            <div className="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>
            <img
              className="max-w-full h-[8rem] mx-auto animate-wiggle mb-5"
              src={cancel}
              alt="alt title"
            />
          </div>
          <div className="px-2 flex-1">
            <div>
              <h3 className="text-xl text-center text-black font-openSans">
                {message}
              </h3>
            </div>
          </div>
          <div className="flex px-3">
            <textarea
              name="sr_remark"
              className="border border-[#5448dd] rounded w-full mt-5 p-2 outline-indigo-200"
              placeholder="Enter Remarks..."
              onChange={(e) =>
                setData((prev) => ({ ...prev, remark: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex flex-col m-8">
            <div className="flex justify-center space-x-5">
              <button
                className="bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white rounded leading-5 shadow-lg"
                onClick={handleCancel}
                disabled={loadingState}
              >
                Cancel
              </button>
              <button
                className="bg-[#4338CA] text-sm px-8 py-2 text-white rounded leading-5 shadow-lg"
                onClick={confirmationHandler}
              >
                {loadingState ? (
                  <div className={loading}></div>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectionModalRemark;
