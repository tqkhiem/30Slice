import { useEffect, useState, useRef } from "react";
import { Eye, Edit, XCircle, Slash } from "react-feather";
import {
  getTask,
  completeTask,
  changeService,
} from "../../app/services/stylelist/task.service";
import { create7Date } from "./func";
import SwitchIOS from "../../CustomMui/switch";
import EditService from "./Edit";
import { getServices } from "../../app/services/admin/services.service";
import { toastSuccess } from "../../components/sharedComponents/toast";
export default function Schedule() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrDate, setArrDate] = useState(create7Date());
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(arrDate[0].dateEn);

  const fetchTask = async () => {
    setLoading(true);
    const response = await getTask(date);
    console.log(response.data);
    setData(response.data);
    setLoading(false);
  };
  const fetchServices = async () => {
    setLoading(true);
    const response = await getServices();
    // console.log(response.data);
    setServices(response);
    setLoading(false);
  };

  const handleUpdateStatus = async (id, Status) => {
    console.log(id, Status);
    const data = {
      id: id,
      Status: "completed",
    };
    await completeTask(data);
    fetchTask();
  };
  const handleUpdateService = async (data) => {
    const res = await changeService(data);
    toastSuccess("Đổi dịch vụ thành công");
    // fetchTask();
  };

  useEffect(() => {
    fetchTask();
    fetchServices();
  }, [date]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Quản lý lịch đặt
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">
                  {data.length} ca
                </span>
                <select
                  className="form-control mx-5"
                  id="date"
                  aria-label="Chọn ngày"
                  onChange={(e) => setDate(e.target.value)}
                >
                  {arrDate &&
                    arrDate.map((item, index) => (
                      <option key={index} value={item.dateEn}>
                        {item.dateVn}
                      </option>
                    ))}
                </select>
              </div>
            </div>
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
        <div className="row">
          <div className="col-lg-12">
            <div className="userDatatable global-shadow border p-30 bg-white radius-xl w-100 mb-30">
              <div className="table-responsive">
                <table className="table mb-0 table-borderless">
                  <thead>
                    <tr className="userDatatable-header">
                      <th>
                        <span className="userDatatable-title">Giờ đặt</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Ngày đặt</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">
                          Tên khách hàng
                        </span>
                      </th>
                      <th>
                        <span className="userDatatable-title">
                          Số điện thoại
                        </span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Trạng thái</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Dịch vụ</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Ghi chú</span>
                      </th>
                      <th>
                        <span className="userDatatable-title float-right">
                          Hoàn thành
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
                    {data.length > 0 ? (
                      data?.map((item) => {
                        return (
                          <tr key={item?._id}>
                            <td>
                              <div className="userDatatable-content">
                                {item?.BookedTime}
                              </div>
                            </td>
                            <td>
                              <div className="userDatatable-content">
                                {item?.BookedDate}
                              </div>
                            </td>
                            <td>
                              <div className="userDatatable-content">
                                {item?.Id_Customer?.Full_Name}
                              </div>
                            </td>
                            <td>
                              <div className="userDatatable-content">
                                {item?.Id_Customer?.Phone}
                              </div>
                            </td>
                            <td>
                              <div className="userDatatable-content d-inline-block">
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
                              <div className="userDatatable-content">
                                {item?.Id_Service?.Name}
                              </div>
                            </td>
                            <td>
                              <div className="userDatatable-content">
                                {item?.Note}
                              </div>
                            </td>
                            <td>
                              <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                <SwitchIOS
                                  onChange={() =>
                                    handleUpdateStatus(item?._id, item?.Status)
                                  }
                                  defaultChecked={
                                    item?.Status === "pending" ? false : true
                                  }
                                  disabled={
                                    item?.Status === "pending" ? false : true
                                  }
                                  name="Is_Show"
                                />
                              </ul>
                            </td>
                            <td>
                              <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                {item?.Status === "completed" ? (
                                  <li>
                                    <a className="disabled">
                                      <Slash />
                                    </a>
                                  </li>
                                ) : (
                                  <>
                                    <li>
                                      <a
                                        className="edit"
                                        data-toggle="modal"
                                        data-target={"#modal-edit" + item._id}
                                      >
                                        <Edit />
                                      </a>
                                    </li>
                                    <EditService
                                      id={item?._id}
                                      defaultService={item?.Id_Service?._id}
                                      item={services}
                                      callback={handleUpdateService}
                                    />
                                  </>
                                )}
                              </ul>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Không có dữ liệu
                        </td>
                      </tr>
                    )}
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
      )}
    </div>
  );
}
