import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../app/redux/slices/auth/auth';
// import EventBus from '../../../app/common/EventBus';
import {
  LogIn,
  Search,
  Mail,
  Bell,
  Inbox,
  Upload,
  X,
  User,
  Settings,
  Key,
  Users,
  LogOut,
} from 'react-feather';
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logout());
  };

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  // useEffect(() => {
  //   EventBus.on('logout', () => {
  //     logOut();
  //   });

  //   return () => {
  //     EventBus.remove('logout');
  //   };
  // }, [logOut]);

  return (
    <>
      <div className="mobile-search">
        <form className="search-form">
          <Search />
          <input
            className="form-control mr-sm-2 box-shadow-none"
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="mobile-author-actions" />
      <header className="header-top">
        <nav className="navbar navbar-light">
          <div className="navbar-left">
            <a href="#" className="sidebar-toggle">
              <img className="svg" src="/assets/img/svg/bars.svg" alt="img" />
            </a>
            <a className="navbar-brand" href="#">
              <img
                className="dark"
                src="/assets/img/logo30slice.png"
                alt="svg"
              />
              <img
                className="light"
                src="/assets/img/logo30slice.png"
                alt="img"
              />
            </a>
          </div>
          {/* ends: navbar-left */}
          <div className="navbar-right">
            <ul className="navbar-right__menu">
              <li className="nav-search d-none">
                <a href="#" className="search-toggle">
                  <i className="la la-search" />
                  <i className="la la-times" />
                </a>
                <form action="/" className="search-form-topMenu">
                  <Search className="search-icon" />
                  <input
                    className="form-control mr-sm-2 box-shadow-none"
                    type="text"
                    placeholder="Search..."
                  />
                </form>
              </li>

              <li className="nav-author">
                <div className="dropdown-custom">
                  <a href="#" className="nav-item-toggle">
                    <img
                      src="/assets/img/admin.png"
                      alt=""
                      className="rounded-circle"
                    />
                  </a>
                  <div className="dropdown-wrapper">
                    <div className="nav-author__info">
                      <div className="author-img">
                        <img
                          src="/assets/img/admin.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6>{user.username.toUpperCase()}</h6>
                        <span>{user.role.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="nav-author__options">
                      <ul>
                        <li>
                          <Link to="/profile">
                            <User /> Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <a href="">
                            <Settings /> Settings
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <Key /> Billing
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <Users /> Activity
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <Bell /> Help
                          </a>
                        </li>
                      </ul>
                      <a onClick={logOut} className="nav-author__signout">
                        <LogOut /> Đăng xuất
                      </a>
                    </div>
                  </div>
                  {/* ends: .dropdown-wrapper */}
                </div>
              </li>
              {/* ends: .nav-author */}
            </ul>
            {/* ends: .navbar-right__menu */}
            <div className="navbar-right__mobileAction d-md-none">
              <a href="#" className="btn-search">
                <Search />
                <X />
              </a>
              <a href="#" className="btn-author-action">
                <span data-feather="more-vertical" />
              </a>
            </div>
          </div>
          {/* ends: .navbar-right */}
        </nav>
      </header>
    </>
  );
};

export default Header;
