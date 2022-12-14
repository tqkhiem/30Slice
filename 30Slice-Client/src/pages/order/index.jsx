import Breadcrumb from "../../components/Breakcumb";
import { GetOrderHistory } from "../../app/services/user/order.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Order = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrderHistory = async () => {
    setLoading(true);
    const res = await GetOrderHistory();
    // console.log(res.data);
    setLoading(false);
    setOrderHistory(res.data);
  };
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Lịch sử đặt hàng
                </h4>
              </div>
            </div>
            <Breadcrumb />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="card-body">
          <div className="spin-container text-center">
            <div className="atbd-spin-dots spin-lg">
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="userDatatable orderDatatable global-shadow border py-30 px-sm-30 px-20 bg-white radius-xl w-100 mb-30">
                <div className="project-top-wrapper d-flex justify-content-between flex-wrap mb-25 mt-n10">
                  <div className="d-flex align-items-center flex-wrap justify-content-center">
                    <div className="project-search order-search  global-shadow mt-10">
                      <form action="/" className="order-search__form">
                        <span data-feather="search" />
                        <input
                          className="form-control mr-sm-2 border-0 box-shadow-none"
                          type="search"
                          placeholder="Tìm kiếm..."
                          aria-label="Search"
                        />
                      </form>
                    </div>
                  </div>

                  {/* End: .content-center */}
                </div>
                {/* End: .project-top-wrapper */}
                <div className="tab-content" id="ap-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="ap-overview"
                    role="tabpanel"
                    aria-labelledby="ap-overview-tab"
                  >
                    {/* Start Table Responsive */}
                    <div className="table-responsive">
                      <table className="table mb-0 table-hover table-borderless border-0">
                        <thead>
                          <tr className="userDatatable-header">
                            <th>
                              <span className="checkbox-text ml-3">
                                Mã đơn hàng
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                                Tên người nhận
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                                Trạng thái
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                                Trạng thái thanh toán
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                                Phương thức thanh toán
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                                Tổng cộng
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title float-right">
                                Ngày đặt hàng
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title float-right">
                                Hành động
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderHistory.map((item) => (
                            <tr key={item._id}>
                              <td>
                                <div className="orderDatatable-title">
                                  <Link to={/order/ + item._id}>
                                    <p className="d-block mb-0">#{item._id}</p>
                                  </Link>
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                  {item.Receiver}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-status d-inline-block">
                                  {item.Status === "Pending" ? (
                                    <span className="order-bg-opacity-warning  text-warning rounded-pill active">
                                      Chờ xác nhận
                                    </span>
                                  ) : (
                                    <span className="order-bg-opacity-success  text-success rounded-pill active">
                                      Đang giao hàng
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td>
                                <div className="orderDatatable-status d-inline-block">
                                  {item.Payment_Status === "completed" ? (
                                    <span className="order-bg-opacity-success  text-success rounded-pill active">
                                      Đã thanh toán
                                    </span>
                                  ) : (
                                    <span className="order-bg-opacity-danger  text-danger rounded-pill active">
                                      Chưa thanh toán
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                  {item.Payment_Method.toUpperCase()}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                  {item.Amount.toLocaleString("vi-VN")}đ
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title float-right">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </td>
                              <td>
                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap float-right">
                                  <button className="btn btn-danger">
                                    Huỷ
                                  </button>
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Table Responsive End */}
                  </div>
                </div>
                <div className="d-flex justify-content-sm-end justify-content-start mt-15 pt-25 border-top">
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
              {/* End: .userDatatable */}
            </div>
            {/* End: .col */}
          </div>
        </div>
      )}
    </>
  );
};
export default Order;
