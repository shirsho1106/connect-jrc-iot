import React, { useEffect, useState } from "react";
import { logout } from "../database/auth_database_firebase";
import { auth } from "../database/auth_database_firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";
import DeviceLinks from "../device_management/DeviceLinks";

import {
  addNewDevice,
  getAllDevices,
} from "../device_management/functionalities";

function Dashboard() {
  // <-- User Management ...
  const [user, loading, error] = useAuthState(auth);
  function logsout() {
    if (logout()) setUserstate(!userstate);
  }
  // ... User Management -->

  // <-- UI functionalities ...
  const navigate = useNavigate();
  const [userstate, setUserstate] = useState(true);

  useEffect(() => {
    if (loading) {
      load();
    } else if (!user) navigate("/login");
    else get_devices();
  }, [user, loading, userstate]);

  const load = () => {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  };

  const [isSaveWindowOpen, setIsSaveWindowOpen] = useState(false);

  const handleOpen = () => {
    setIsSaveWindowOpen(true);
  };
  const handleClose = () => {
    setIsSaveWindowOpen(false);
  };
  // ... UI funcionalities -->

  // <-- Device Management ...
  const [devices, setDevices] = useState([]);
  const [device_name, setDevice_name] = useState("");
  const [chip_name, setChip_name] = useState("");

  async function add_device() {
    let device = null;
    try {
      device = await addNewDevice(user.uid, device_name, chip_name);
    } catch (err) {
      alert(err.message);
      return false;
    }
    setIsSaveWindowOpen(false);
    // let devscopy = devices;
    // devscopy.push(device);
    // setDevices(devscopy);
    await get_devices();
    return true;
  }
  async function get_devices() {
    setDevices(await getAllDevices(user.uid));
  }
  // ... Device Management -->

  // <-- Search Management ...
  const [searchInput, setsearchInput] = useState("");

  function handleSearch() {
    let newdevs = [];
    devices.forEach((device) => {
      if (device.name.toLowerCase().includes(searchInput.toLowerCase()))
        newdevs.push(device);
    });
    setDevices(newdevs);
  }
  function resetSearch() {
    setsearchInput("");
    get_devices();
  }
  // ... Search management -->

  return (
    <>
      <div className="flex">
        <div className="w-[5%] h-screen flex justify-center relative  ">
          <div className=" absolute bottom-0">
            <UsersIcon className="h-14 w-14" />
          </div>
        </div>
        <div className="w-[95%] h-screen bg-gray-200 pt-16 px-5">
          {/*first segement */}
          <div className="flex">
            <div className="w-[50%] ">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border-b border-gray-400 bg-gray-200 text-black rounded-lg mt-4  w-[40%] text-2xl "
                value={searchInput}
                onChange={(e) => {
                  setsearchInput(e.target.value);
                }}
              />
              <button className="pl-3 text-lg" onClick={handleSearch}>
                {" "}
                Search
              </button>
              <button className="pl-3 text-lg" onClick={resetSearch}>
                {" "}
                Reset
              </button>
            </div>
            <div className=" w-[50%] relative flex-col items-center">
              <div className="flex absolute right-0 text-white text-lg bg-black p-4 rounded-sm hover:cursor-pointer hover:text-black hover:bg-white hover:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mt-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>

                <button className="pl-3 text-lg" onClick={handleOpen}>
                  {" "}
                  Add Device
                </button>
                <div>
                  {isSaveWindowOpen && (
                    <div className="fixed top-0 left-0 h-screen w-screen flex items-center  justify-center bg-gray-900 bg-opacity-75">
                      <div className="bg-white p-8 rounded-lg">
                        <h1 className="text-xl font-medium text-black py-5">
                          Device Info
                        </h1>
                        <div className="mt-4 p-16">
                          <input
                            className=" mr-9 p-2 border-b placeholder-gray-600 border-gray-600 rounded-lg mt-4 text-center"
                            type="text"
                            placeholder="Device Name"
                            value={device_name}
                            onChange={(e) => setDevice_name(e.target.value)}
                          />
                          <input
                            className=" mr-9 p-2 border-b placeholder-gray-600 border-gray-600 rounded-lg mt-4 text-center"
                            type="text"
                            placeholder="Chip"
                            value={chip_name}
                            onChange={(e) => setChip_name(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end mt-8 py-5">
                          <button
                            className="bg-red-600 text-white p-3 rounded-lg mr-2"
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-green-700 text-white p-3 rounded-lg"
                            onClick={add_device}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/*second segement */}
          <div>
            <div className="w-[100%] bg-gray-600 my-3">
              <ul className="flex  text-white text-center text-sm sm:text-md md:text-xl mx-3 p-5">
                <li className="w-[8%]">SL</li>
                <li className="w-[16%]">Device Name</li>
                <li className="w-[16%]">Microcontroller</li>
                <li className="w-[16%]">Microprocessor</li>
                <li className="w-[16%]">Controller</li>
                <li className="w-[16%]">Status</li>
                <li className="w-[12%]">Date Added</li>
              </ul>
            </div>
            {devices && (
              <div>
                <DeviceLinks devicelist={devices} setDevicelist={setDevices} user_id={user?.uid} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-black px-6 text-white text-xl hover:bg-amber-500 py-2 rounded-3xl"
          onClick={logsout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default Dashboard;
