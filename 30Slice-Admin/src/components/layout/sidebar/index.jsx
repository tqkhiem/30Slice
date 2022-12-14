import {
  Activity,
  Box,
  Archive,
  Book,
  User,
  Users,
  Calendar,
  Truck,
  Info,
  Scissors,
} from "react-feather";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar sidebar-collapse" id="sidebar">
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            {user.role === "admin" ? (
              <>
                <li className="menu-title">
                  <span>Thống kê</span>
                </li>
                <li>
                  <NavLink to="/" className="">
                    <Activity className="nav-icon" />
                    <span className="menu-text">Thống kê dữ liệu</span>
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Sản Phẩm</span>
                </li>
                <li>
                  <NavLink to="/category" className="">
                    <Archive className="nav-icon" />
                    <span className="menu-text">Quản lý loại sản phẩm</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="">
                    <Box className="nav-icon" />
                    <span className="menu-text">Quản lý sản phẩm</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/combo" className="">
                    <Box className="nav-icon" />
                    <span className="menu-text">Quản lý combo sản phẩm</span>
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Tin tức</span>
                </li>
                <li>
                  <NavLink to="/news" className="">
                    <Book className="nav-icon" />
                    <span className="menu-text">Quản lý tin tức</span>
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Người dùng</span>
                </li>
                <li>
                  <NavLink to="/employee" className="">
                    <Users className="nav-icon" />
                    <span className="menu-text">Quản lý nhân viên</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/stylelist" className="">
                    <Scissors className="nav-icon" />
                    <span className="menu-text">Quản lý thợ cắt tóc</span>
                  </NavLink>
                  <NavLink to="/customer" className="">
                    <User className="nav-icon" />
                    <span className="menu-text">Quản lý khách hàng</span>
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Đơn hàng</span>
                </li>
                <li>
                  <NavLink to="/orders" className="">
                    <Truck className="nav-icon" />
                    <span className="menu-text">Quản lý đơn hàng</span>
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Dịch vụ</span>
                </li>
                <li>
                  <NavLink to="/services" className="">
                    <Info className="nav-icon" />
                    <span className="menu-text">Quản lý dịch vụ</span>
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {user.role === "styleList" ? (
              <>
                <li className="menu-title">
                  <span>Lịch đặt (nhân viên mới xem được)</span>
                </li>
                <li>
                  <NavLink to="/schedule" className="">
                    <Calendar className="nav-icon" />
                    <span className="menu-text">Quản lý lịch đặt</span>
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
