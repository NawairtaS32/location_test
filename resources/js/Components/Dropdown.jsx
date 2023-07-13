import { useState, createContext, useContext, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { IoIosArrowDropdown } from 'react-icons/io';

const DropdownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
        <div className="relative">{children}</div>
        </DropdownContext.Provider>
    );
};

const Trigger = ({ label }) => {
    const { open, setOpen, toggleOpen } = useContext(DropdownContext);

    return (
        <>
        <div onClick={toggleOpen}>
            <div
            className={`flex border-2 border-slate-600 font-semibold text-2xl place-content-between px-4 py-2 rounded-2xl h-auto ${
                open ? 'bg-slate-800 text-white' : 'bg-slate-200'
            }`}
            >
            {label}
            <IoIosArrowDropdown
                className={`text-2xl font-bold mt-1 ${open ? '' : 'rotate-90'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            />
            </div>
        </div>

        {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
    const { open, setOpen } = useContext(DropdownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div className={`absolute z-50 w-full mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`} onClick={() => setOpen(false)}>
            <div className={`rounded-lg ring-1 ring-black ring-opacity-5 ` + contentClasses} style={{ maxHeight: '400px', overflowY: 'scroll' }}>{children}</div>
            </div>
        </Transition>
        </>
    );
};

const Item = ({ className = '', value, onClick, children }) => {
    return (
        <button
        onClick={() => onClick(value)}
        className={
            'block w-full px-4 text-xl py-6 py-2 font-extrabold text-left text-sm leading-5 border-b-4 border-black/50 text-slate-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
            className
        }
        >
        {children}
        </button>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;

export default Dropdown;
