import Breadcrumb from "../../components/Breakcumb";
import { getBookedHistory } from "../../app/services/booking/booking.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BookedHistory = () => {
  const [BookedHistory, setBookedHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBookedHistory = async () => {
    setLoading(true);
    const res = await getBookedHistory();
    console.log(res.data);
    setLoading(false);
    setBookedHistory(res.data);
  };
  useEffect(() => {
    fetchBookedHistory();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Lịch sử đặt lịch
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
                               Giờ cắt
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                            Ngày cắt
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                              Tình trạng
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title ">
                                Nhân viên
                              </span>
                            </th>
                            <th>
                              <span className="userDatatable-title">
                               Dịch vụ đã chọn
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {BookedHistory.map((item) => (
                            <tr key={item._id}>
                              <td>
                                <div className="orderDatatable-title">
                                    <Link to={/order/+ item._id}>
                                  <p className="d-block mb-0">#{item._id}</p>
                                  </Link>
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                  {item.BookedTime}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                  {item.BookedDate}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-status d-inline-block">
                                {item?.Status === "pending" ? (
                                  <span className="bg-opacity-danger  color-danger rounded-pill userDatatable-content-status active">
                                    Chưa hoàn thành
                                  </span>
                                ) : (
                                  <span className="bg-opacity-success  color-success rounded-pill userDatatable-content-status active">
                                    Đã hoàn thành
                                  </span>
                                )}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                                 {item.StyleList.Full_Name}
                                </div>
                              </td>
                              <td>
                                <div className="orderDatatable-title">
                               {item.Service.Name}
                                </div>
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
export default BookedHistory;
