import React from "react";
import check from "@/Components/assets/check.svg";
import { useNavigate } from "react-router-dom";
import ThemeStyle from "./ThemeStyle";

// Define the props interface
interface SuccessModalProps {
  confirmationHandler: () => void;
  message: string;
  requestNoMsg?: string;
  refNo?: string;
  loadingState: boolean;
  setSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  confirmationHandler,
  message,
  requestNoMsg,
  refNo,
  loadingState,
  setSuccessModal,
}) => {
  const { loading } = ThemeStyle();
  const navigate = useNavigate();

  const handleClick = () => {
    if (setSuccessModal) {
      setSuccessModal(false);
    }
    // navigate(`/sr-inventory-proposal`);
  };

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10 rounded'>
          <div className='relative overflow-hidden mt-10'>
            <div className='absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10'></div>
            <img
              className='max-w-full h-[8rem] mx-auto animate-wiggle mb-5'
              src={check}
              alt='alt title'
            />
          </div>
          <div className='flex-1'>
            <div>
              <h3 className='text-xl text-center text-green-600 font-openSans'>
                {message}
              </h3>
              <h3 className='text-xl text-center mb-3 text-gray-500 font-openSans font-semibold'>
                <span className='text-base text-gray-400'>{requestNoMsg}</span> {refNo}
              </h3>
            </div>
          </div>
          <div className='flex flex-col m-8'>
            <div className='flex justify-center space-x-5'>
              <div>
                <button
                  className={`bg-[#4338CA] text-sm px-8 py-2 text-white rounded leading-5 shadow-lg`}
                  onClick={confirmationHandler}
                >
                  {loadingState ? (
                    <div className={`${loading}`}></div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>

            <div>
              {/* <h1 className='text-center pt-5'>
                <span className='text-red-600 text-xl'>*</span> Save Your Order
                number for Future Reference.
              </h1> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
