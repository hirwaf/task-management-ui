import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Routers from "../routers";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);

    const Logout = () => {
        localStorage.removeItem('accessToken');
        window.location.reload();
    }

    const handleClickOutside = (e) => {
        if (nodeRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">Tasks MS</div>
                    <a href={Routers.TasksListPage.path}
                       className="block px-4 py-2 hover:bg-gray-200">Tasks</a>
                    <a href={Routers.TaskCreatePage.path}
                       className="block px-4 py-2 hover:bg-gray-200">Create Task</a>

                    <div className="flex space-x-4 items-center">

                        <div ref={nodeRef} className="relative">
                            <div onClick={() => setIsOpen(!isOpen)}
                                 className="cursor-pointer bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
                                H
                            </div>

                            <CSSTransition
                                in={isOpen}
                                timeout={300}
                                classNames="menu"
                                unmountOnExit
                            >
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                    <a href={"#"} className="block w-full text-center px-4 py-2 hover:bg-gray-200">Profile</a>
                                    <button onClick={Logout} className="block w-full px-4 py-2 hover:bg-gray-200">Logout</button>
                                </div>
                            </CSSTransition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
