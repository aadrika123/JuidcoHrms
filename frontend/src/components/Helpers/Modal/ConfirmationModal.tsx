import cancel from "@/assets/icons/Cancel.svg";
import ThemeStyle from "./ThemeStyle";
import React from "react";
import Image from "next/image";

interface ConfirmationModalProps {
  confirmationHandler: (values:any) => void;
  handleCancel: () => void;
  message: string;
  sideMessage?: string;
  loadingState: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  confirmationHandler,
  handleCancel,
  message,
  sideMessage,
  loadingState,
}) => {
  const { loading } = ThemeStyle();

  return (
    <>
      <div></div>
      <div className="fixed inset-0 flex items-center justify-center z-[5000]">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10 rounded">
          <div className="relative overflow-hidden mt-10 flex justify-center">
            <div className="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>

            <Image src={cancel} alt="employee" width={140} height={20} />
          </div>
          <div className="flex-1">
            <div>
              <h3 className="text-xl text-center text-black font-openSans">
                {message}
              </h3>
            </div>
            {sideMessage && (
              <h3 className="text-center text-gray-500">{sideMessage}</h3>
            )}
          </div>
          <div className="flex flex-col m-8">
            <div className="flex justify-center space-x-5">
              <button
                className="bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white rounded leading-5 shadow-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[rgb(67,56,202)] text-sm px-8 py-2 text-white rounded leading-5 shadow-lg"
                onClick={confirmationHandler}
                disabled={loadingState}
              >
                {loadingState ? <div className={loading}></div> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
