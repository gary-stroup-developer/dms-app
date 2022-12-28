import React from "react";
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
    function toggleContent() {
        let content = document.getElementById("content");
        if (content.style.display === "none") {
            content.style.display = "block";
        }else{content.style.display = "none";}
    }
    return (
        <nav className="grid row-start-1 col-start-1 col-span-5 shadow-md bg-purple-400 pt-2 px-1 sm:h-screen sm:col-span-1">
            {role === 'visitor' ?
                <div>
                    <ul className="relative mt-4">
                        <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded">Visitor</p>
                        
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
                    <svg onClick={toggleContent} height="24px" width="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" /></svg>
                <div id="content">
                    <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded" onClick={toggleUserContent}>
                        Users
                        <svg height="24px" width="44px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg>
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
                                    <p className="flex items-center text-md py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded" onClick={toggleAdminContent}>
                                        Admin
                                        <svg height="24px" width="44px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg>
                                    </p>
                                    <div id="admin-content">
                                        <hr className="w-2/3"/>
                                        <li className="relative">
                                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                                Users
                                            </a>
                                        </li>
                                        <li className="relative">
                                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-purple-600 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                                New Product
                                            </a>
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

