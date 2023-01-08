import React from "react";
import { Link } from "react-router-dom";

export const SideNav = ({ role }) => {
    
    function toggleAdminContent() {
        let content = document.getElementById("admin-content");
        if (content.style.display === "none") {
            content.style.display = "block";
        }else{content.style.display = "none";}
    }
    function toggleUserContent() {
        let content = document.getElementById("user-content");
        if (content.style.display === "none") {
            content.style.display = "block";
        }else{content.style.display = "none";}
    }
    return (
        <nav className="grid row-start-1 col-start-1 col-span-5 shadow-md bg-white pt-2 px-1 sm:h-screen sm:col-span-1 p-3">
            {role === 'visitor' ?
                <div>
                    <ul className="relative mt-4">
                        <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden bg-purple-600 text-white text-ellipsis whitespace-nowrap rounded">Visitor</p>
                        
                        <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Past Requests
                            </a>
                        </li>
                        <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                New Requests
                            </a>
                        </li>
                        <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Signout
                            </a>
                        </li>
                    </ul>
                </div>
                : <div>
                <div id="content">
                    <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden bg-purple-600 text-white text-ellipsis whitespace-nowrap rounded" onClick={toggleUserContent}>
                        Users
                    </p>
                    <hr className="w-2/3" />      
                    <ul className="relative mt-4 flex flex-col justify-around">
                        <div id="user-content">
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    FPQ Log
                                </a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Cryo Tank Inventory
                                </a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Cryo Tank Log
                                </a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    FSR
                                </a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    CBR
                                </a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Archives
                                </a>
                            </li>
                        </div>
                        {
                            role === 'admin' ?
                                <div>
                                    <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden bg-purple-600 text-white text-ellipsis whitespace-nowrap rounded" onClick={toggleAdminContent}>
                                        Admin
                                    </p>
                                    <div id="admin-content">
                                        <hr className="w-2/3"/>
                                        <li className="relative">
                                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                                Users
                                            </a>
                                        </li>
                                        <li className="relative">
                                            <Link to ="/admin/new-product" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out">
                                                New Product
                                            </Link>
                                        </li>
                                        <li className="relative">
                                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                                New Cell Line
                                            </a>
                                        </li>
                                    </div>
                                </div>
                                : <p></p>
                        }
                    </ul>
                    </div>
                    </div>
            }
        </nav>
    )
}

