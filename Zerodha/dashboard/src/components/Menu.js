import React, { useState } from "react";
import { Link } from "react-router-dom";

// Menu component handles the sidebar navigation and user profile dropdown
const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0); // Tracks the currently selected menu item
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Tracks the state of the profile dropdown

  // Updates the selected menu item based on the clicked index
  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  // Toggles the visibility of the profile dropdown
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu"; // Default class for menu items
  const activeMenuClass = "menu selected"; // Class for the currently active menu item

  return (
    <div className="menu-container">
      {/* Logo Section */}
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />

      {/* Navigation Menu */}
      <div className="menus">
        <ul>
          {/* Dashboard Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)} // Highlights the Dashboard as selected
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          {/* Orders Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)} // Highlights the Orders as selected
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          {/* Holdings Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          {/* Positions Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          {/* Funds Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          {/* Apps Menu Item */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>

        {/* Divider between menu and profile section */}
        <hr />

        {/* User Profile Section */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div> {/* Placeholder for user's avatar */}
          <p className="username">USERID</p> {/* Placeholder for user's ID */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
