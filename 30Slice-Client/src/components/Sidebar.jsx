import { Home, Calendar,Box,Book } from "react-feather";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";

const Sidebar = () => {
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar sidebar-collapse" id="sidebar">
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            <li>
              <NavLink to="/" className="">
                <Home className="nav-icon" />
                <span className="menu-text">Trang Chủ</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/booking" className="">
                <Calendar className="nav-icon" />
                <span className="menu-text">Đặt lịch</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/combo" className="">
                <Box className="nav-icon" />
                <span className="menu-text">Combo</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="">
                <Box className="nav-icon" />
                <span className="menu-text">Sản phẩm</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" className="">
                <Book className="nav-icon" />
                <span className="menu-text">Tin tức</span>
              </NavLink>
            </li>
            <Categories />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
