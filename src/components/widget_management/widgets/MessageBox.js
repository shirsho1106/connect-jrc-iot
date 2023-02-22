import React, { useState } from "react";
import SetMessageBoxData from "../widget-forms/setMessageBoxData";

const MessageBox = ({ datastream, show, setDatastream }) => {
  const [modal, setModal] = useState(show);
  const Modal = () => {
    if (modal) setModal(false);
    if (!modal) setModal(true);
  };
  const [isOpen, setIsOpen] = useState(true);
  

  const [value, setValue] = useState(0);

  const handleIncrease = () => {
    if (value < 100) {
      setValue(value + 1);
    }

  };

  const handleDecrease = () => {
    setValue(value - 1);
  };

  const handleValueChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (newValue > 100) {
      newValue = 100;
    }
    setValue(newValue);

  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };
  // if(datastream==null) <SetSwitchData isOpen={isOpen} onClose={handleClose} datastream={datastream} />

  return (
    <div className="w-[100%]">
      {/*start */}
      <div className="flex justify-between pt-4 w-[100%]">
        <h5 className="font-bold capitalize">name</h5>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={Modal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
      </div>
       {/*middle */}
      <div className="flex mt-3 text-center justify-center items-center">
      <button
        className="text-2xl rounded-md bg-gray-200 hover:bg-gray-300 px-4 py-2 mr-2"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleValueChange}
        className="text-2xl text-center mx-3 w-16 bg-gray-200"
      />
      <button
        className="text-2xl rounded-md bg-gray-200 hover:bg-gray-300 px-4 py-2 ml-2"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
      {/*end */}
      <div className="flex justify-between pt-3 w-[100%]">
        <h5 className="font-semibold capitalize">Pin</h5>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      {/*on condition */}
      {modal && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center z-20 justify-center bg-gray-900 bg-opacity-75">
          <SetMessageBoxData onClose={Modal} datastream={datastream} setDatastream={setDatastream} />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
