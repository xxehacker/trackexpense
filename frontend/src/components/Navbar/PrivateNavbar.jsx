import { Disclosure} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const navigation = [
    { name: 'Add Transaction', to: '/add-transaction' },
    { name: 'Add Category', to: '/add-category' },
    { name: 'Categories', to: '/categories' },
    { name: 'Profile', to: '/profile' },
    { name: 'Dashboard', to: '/dashboard' },
  ];

  return (
    // when the user scroll down the page, the navbar will stick to the top and will be transparent and bg-color will be red
    <Disclosure as="nav" className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
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
                
                <Link to="/" className="flex items-center gap-2 ml-2 md:ml-0">
                  <SiMoneygram className="h-8 w-auto text-red-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    MoneyHack
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-600 hover:text-green-500 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <button
                  onClick={logoutHandler}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 font-medium transition-all duration-200 shadow-sm"
                >
                  <IoLogOutOutline className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                >
                  <Disclosure.Button
                    as="div"
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 font-medium transition-all duration-200"
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            
            <div className="border-t border-gray-100 px-4 py-4">
              <Disclosure.Button
                as="button"
                onClick={logoutHandler}
                className="w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-200 text-left"
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}