import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaHome } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

// Import your components
import Dashboard from "./Dashboard";
import Create from "./Create";
import Update from "./Update";
import Profile from "./Profile";

function MyProfile() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility for mobile

  // Function to render the current active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Create":
        return <Create />;
      case "Update":
        return <Update />;
      case "Profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu for Mobile */}
      <button
        className="absolute top-4 left-4 z-50 text-white sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <HiMenuAlt3 className="h-8 w-8" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[16rem] bg-zinc-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0`}
      >
        <Card className="h-full w-full p-4 bg-zinc-800 text-white shadow-none">
          <div className="mb-4 p-4">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>
            <ListItem onClick={() => setActiveComponent("Dashboard")}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            <ListItem onClick={() => setActiveComponent("Create")}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Create Items
            </ListItem>
            <ListItem onClick={() => setActiveComponent("Update")}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Update Items
            </ListItem>
            <ListItem onClick={() => setActiveComponent("Profile")}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <FaHome className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/"> Back To Home</Link>
            </ListItem>
            {/* <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem> */}
          </List>
        </Card>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 ${isSidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"
          } sm:opacity-100 sm:pointer-events-auto`}
        onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside on mobile
      >
        {renderComponent()}
      </div>
    </div>
  );
}

export default MyProfile;
