import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';

const DashboadrdSideBar = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [activeSubcategories, setActiveSubcategories] = useState({});
  const navigate = useNavigate();

  const toggleSubcategories = (index) => {
    setActiveSubcategories((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const navLinks = [
    {
      title: "Dashboard",
      icon: "ic:baseline-dashboard",
      path: "/user/dashboard",
    },
    {
      title: "Employees",
      icon: "mdi:users",
      path: "/user/employees",
    },
    {
      title: "Users",
      icon: "mdi:users",
      path: "/user/users",
    },
    {
      title: "Sales",
      icon: "icon-park-solid:sales-report",
      subcategories: [
        {
          title: "Customers",
          path: "/user/customers",
          icon : "mdi:users"
        },
        {
          title: "Customer Orders",
          path: "/user/customer/orders",
          icon : "material-symbols:orders-rounded"
        },
        {
          title: "Invoices",
          path: "/user/invoicing",
          icon : "iconamoon:invoice-fill"
        },
        {
          title: "Customer Payments",
          path: "/user/customer/payments",
          icon : "mdi:account-payment"
        },
      ],
    },
    {
      title: "Purchasing",
      icon: "f7:purchased",
      subcategories: [
        {
          title: "Supliers",
          path: "/user/supliers",
          icon: "mdi:users",
        },
        {
          title: "Suplier Orders",
          path: "/user/suplier/orders",
          icon : "material-symbols:orders-rounded"
        },
        {
          title: "GRN",
          path: "/user/grn",
          icon : "clarity:note-solid"
        },
        {
          title: "Suplier Payments",
          path: "/user/suplier/payments",
          icon : "mdi:account-payment"
        },
      ],
    },
    {
      title: "Inventory",
      icon: "ic:baseline-inventory",
      subcategories: [
        {
          title: "Products",
          path: "/user/inventory",
          icon : "dashicons:products"
        },
        {
          title: "Inventory",
          path: "/user/inventory/details",
          icon : "ic:baseline-inventory"
        },
      ],
    },
    {
      title: "Reports",
      icon: "solar:document-bold",
      subcategories: [
        {
          title: "Sales Report",
          path: "/user/reports/sales",
          icon : "game-icons:sell-card"
        }
      ],
    },
    {
      title: "Settings",
      icon: "material-symbols:settings",
      path: "/user/settings"
    },
  ];

  const replace = (url)=>{
    navigate(url);
  }

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <Icon icon="pepicons-pop:menu" width={30} />
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-br from-green-950 to-blue-950">
          <ul className="space-y-2 font-medium">
            <li className="mb-28">
              <button
                onClick={() => navigate('/')}
                className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="w-5 h-5 text-gray-500 transition duration-75">
                  <Icon icon="icon-park-outline:dashboard" width={25} />
                </div>
                <span className="ms-3 ml-8 mt-2 font-semibold">STOCKIFY</span>
              </button>
            </li>

            {navLinks.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() =>
                      item.subcategories
                        ? toggleSubcategories(index)
                        : replace(item.path)
                    }
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 hover:backdrop-brightness-125 group w-full"
                  >
                    <div className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75">
                      <Icon icon={item.icon} width={22} />
                    </div>
                    <div className="text-left ml-4">
                      <span className="flex-1 text-gray-300 ms-3 whitespace-nowrap">
                        {item.title}
                      </span>
                    </div>
                  </button>
                  {item.subcategories && activeSubcategories[index] && (
                    <ul className="pl-8 space-y-1">
                      {item.subcategories.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => replace(subItem.path)}
                            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 hover:backdrop-brightness-125 group w-full"
                          >
                            <div className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75">
                              <Icon icon={subItem.icon} width={22} />
                            </div>
                            <div className="text-left ml-4">
                              <span className="flex-1 text-gray-300 ms-3 whitespace-nowrap">
                                {subItem.title}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboadrdSideBar;