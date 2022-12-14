import { Eye, Edit, XCircle } from "react-feather";
import Modal from "./modal";
const Employee = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Quản lý nhân viên
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">274 Users</span>
              </div>
              <form
                action="/"
                className="d-flex align-items-center user-member__form my-sm-0 my-2"
              >
                <span data-feather="search" />
                <input
                  className="form-control mr-sm-2 border-0 box-shadow-none"
                  type="search"
                  placeholder="Search by Name"
                  aria-label="Search"
                />
              </form>
            </div>
            <div className="action-btn">
              <a
                href="#"
                className="btn px-15 btn-primary"
                data-toggle="modal"
                data-target="#new-member"
              >
                <i className="las la-plus fs-16" />
                Add New Member
              </a>
              {/* Modal */}
              <Modal />
              {/* Modal */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="userDatatable global-shadow border p-30 bg-white radius-xl w-100 mb-30">
            <div className="table-responsive">
              <table className="table mb-0 table-borderless">
                <thead>
                  <tr className="userDatatable-header">
                    <th>
                      <div className="d-flex align-items-center">
                        <div className="custom-checkbox  check-all">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id="check-3"
                          />
                          <label htmlFor="check-3">
                            <span className="checkbox-text userDatatable-title">
                              user
                            </span>
                          </label>
                        </div>
                      </div>
                    </th>
                    <th>
                      <span className="userDatatable-title">emaill</span>
                    </th>
                    <th>
                      <span className="userDatatable-title">company</span>
                    </th>
                    <th>
                      <span className="userDatatable-title">position</span>
                    </th>
                    <th>
                      <span className="userDatatable-title">join date</span>
                    </th>
                    <th>
                      <span className="userDatatable-title">status</span>
                    </th>
                    <th>
                      <span className="userDatatable-title float-right">
                        action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="userDatatable__imgWrapper d-flex align-items-center">
                          <div className="checkbox-group-wrapper">
                            <div className="checkbox-group d-flex">
                              <div className="checkbox-theme-default custom-checkbox checkbox-group__single d-flex">
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  id="check-grp-12"
                                />
                                <label htmlFor="check-grp-12" />
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="profile-image rounded-circle d-block m-0 wh-38"
                            style={{
                              backgroundImage: 'url("img/tm6.png")',
                              backgroundSize: "cover",
                            }}
                          />
                        </div>
                        <div className="userDatatable-inline-title">
                          <a href="#" className="text-dark fw-500">
                            <h6>Kellie Marquot</h6>
                          </a>
                          <p className="d-block mb-0">San Francisco, CA</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        john-keller@gmail.com
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        Business Development
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">Web Developer</div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        January 20, 2020
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content d-inline-block">
                        <span className="bg-opacity-success  color-success rounded-pill userDatatable-content-status active">
                          Admin
                        </span>
                      </div>
                    </td>
                    <td>
                      <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                        <li>
                          <a href="#" className="view">
                            <Eye />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="edit">
                            <Edit />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="remove">
                            <XCircle />
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="userDatatable__imgWrapper d-flex align-items-center">
                          <div className="checkbox-group-wrapper">
                            <div className="checkbox-group d-flex">
                              <div className="checkbox-theme-default custom-checkbox checkbox-group__single d-flex">
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  id="check-grp-12"
                                />
                                <label htmlFor="check-grp-12" />
                              </div>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="profile-image rounded-circle d-block m-0 wh-38"
                            style={{
                              backgroundImage: 'url("img/tm6.png")',
                              backgroundSize: "cover",
                            }}
                          />
                        </div>
                        <div className="userDatatable-inline-title">
                          <a href="#" className="text-dark fw-500">
                            <h6>Kellie Marquot</h6>
                          </a>
                          <p className="d-block mb-0">San Francisco, CA</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        john-keller@gmail.com
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        Business Development
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content">Web Developer</div>
                    </td>
                    <td>
                      <div className="userDatatable-content">
                        January 20, 2020
                      </div>
                    </td>
                    <td>
                      <div className="userDatatable-content d-inline-block">
                        <span className="bg-opacity-info  color-info rounded-pill userDatatable-content-status">
                          Writer
                        </span>
                      </div>
                    </td>
                    <td>
                      <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                        <li>
                          <a href="#" className="view">
                            <Eye />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="edit">
                            <Edit />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="remove">
                            <XCircle />
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end pt-30">
              <nav className="atbd-page ">
                <ul className="atbd-pagination d-flex">
                  <li className="atbd-pagination__item">
                    <a
                      href="#"
                      className="atbd-pagination__link pagination-control"
                    >
                      <span className="la la-angle-left" />
                    </a>
                    <a href="#" className="atbd-pagination__link">
                      <span className="page-number">1</span>
                    </a>
                    <a href="#" className="atbd-pagination__link active">
                      <span className="page-number">2</span>
                    </a>
                    <a href="#" className="atbd-pagination__link">
                      <span className="page-number">3</span>
                    </a>
                    <a
                      href="#"
                      className="atbd-pagination__link pagination-control"
                    >
                      <span className="page-number">...</span>
                    </a>
                    <a href="#" className="atbd-pagination__link">
                      <span className="page-number">12</span>
                    </a>
                    <a
                      href="#"
                      className="atbd-pagination__link pagination-control"
                    >
                      <span className="la la-angle-right" />
                    </a>
                    <a href="#" className="atbd-pagination__option"></a>
                  </li>
                  <li className="atbd-pagination__item">
                    <div className="paging-option">
                      <select name="page-number" className="page-selection">
                        <option value={20}>20/page</option>
                        <option value={40}>40/page</option>
                        <option value={60}>60/page</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
