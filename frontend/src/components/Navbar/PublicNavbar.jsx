import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy, SiMoneygram } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-2"
                >
                  <SiMoneygram className="h-8 w-auto text-red-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent hover:text-red-700 duration-150">
                    MoneyHack
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-500 font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                <div className="flex items-center gap-3">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    <FaRegUser className="h-4 w-4" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500 text-white hover:bg-green-600 font-medium transition-all duration-200 shadow-sm shadow-green-100"
                  >
                    <RiLoginCircleLine className="h-4 w-4" />
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-4 pb-5 pt-2">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Login
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
