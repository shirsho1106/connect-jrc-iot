import React, { useEffect, useState } from 'react'
import { logout } from '../database/auth_database_firebase';
import { auth } from '../database/auth_database_firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";
import Device from '../device_management/Device'
import { addNewDevice, getAllDevices } from '../device_management/functionalities';

function Dashboard() {
  const navigate = useNavigate();
  const [searchInput, setsearchInput] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userstate,setUserstate] = useState(true)
  const [devices,setDevices] = useState(null)
  
  async function add_device(){
    let device = new Device("device1","esp32",user);
    try{
      await addNewDevice(device)
    } catch(err){
      alert(err.message)
      return false
    }
    return true
  }
  async function get_devices(){
    setDevices(getAllDevices(user.uid))
  }
  function logsout(){
    if(logout()) setUserstate(!userstate)
    // navigate('/login');
  }
  useEffect(() => {
    // get_devices()
        if (loading) {
          load()
        }
        else if (!user) navigate('/login')
    }, [user,loading,userstate,devices]);

  const load = () => {
    return (
      <div>
        <h1>MARAKHAO Dashboard</h1>
      </div>
    );
  };
  function handleSearch() {}
  return (
    <>
      {/*
    <div>
    {user &&
      <div>
      <button className='bg-black px-6 text-white text-xl hover:bg-amber-500 py-2 rounded-3xl' onClick={logsout}>Log Out</button>
      </div>
    }
    </div>
  */}
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
                onChange={(e) => setsearchInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchInput);
                  }
                }}
              />
            </div>
            <div className=" w-[50%] relative flex-col items-center">
              <div className="flex absolute right-0 text-white text-lg bg-black p-4 rounded-sm hover:cursor-pointer hover:text-black hover:bg-white hover:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 mt-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>

                <button className="pl-3 text-lg" onClick={get_devices}> Add Device</button>
                {/* {devices.map((device)=>{
                  return <h1>Hello</h1>
                })} */}
              </div>
            </div>
          </div>
          {/*second segement */}
        </div>
      </div>
      <div>
      <button className='bg-black px-6 text-white text-xl hover:bg-amber-500 py-2 rounded-3xl' onClick={logsout}>Log Out</button>
      </div>
      </>
  );
}

export default Dashboard;
