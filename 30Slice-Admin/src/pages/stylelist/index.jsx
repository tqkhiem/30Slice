import { Eye, Edit, XCircle, Key } from "react-feather";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Modal from "./modal";
import Detail from "./Detail";
import ChangePass from "./ChangePass";
import {
  getStyleList,
  updateStyleList,
  deleteStyleList,
  changePasswordByAdmin,
} from "../../app/services/admin/stylelist.service";
import SwitchIOS from "../../CustomMui/switch";
import {
  toastError,
  toastSuccess,
} from "../../components/sharedComponents/toast";

const StyleList = () => {
  const _isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [arrStyleList, setArrStyleList] = useState([]);
  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  });
  const loadStyleList = async () => {
    _isMounted.current && setLoading(true);
    const data = await getStyleList();
    console.log(data);
    _isMounted.current && setLoading(false);
    _isMounted.current && setArrStyleList(data);
  };
  const handleUpdateStatus = async (id, Is_Show) => {
    const data = { Status_Code: !Is_Show, _id: id };
    try {
      await updateStyleList(data);
      _isMounted && loadStyleList();
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleUpdateBlock = async (id, Is_Block) => {
    const data = { Block_By_Admin: !Is_Block, _id: id };
    try {
      await updateStyleList(data);
      _isMounted && loadStyleList();
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleDeleteStyleList = async (id) => {
    try {
      const res = await deleteStyleList(id);
      toastError(res.data.message);
      _isMounted && loadStyleList();
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleUpdateStyleList = async (data) => {
    try {
      const res = await changePasswordByAdmin(data);
      console.log(res);
      toastSuccess("Đổi mật khẩu thành công!");
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    loadStyleList();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Quản lý thợ cắt tóc
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">
                  {arrStyleList?.length} Thợ cắt tóc
                </span>
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
                Thêm thợ cắt tóc
              </a>
              {/* Modal */}
              <Modal loadStyleList={loadStyleList} />
              {/* Modal */}
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
                        <span className=" userDatatable-title">
                          Tên người dùng
                        </span>
                      </th>
                      <th>
                        <span className=" userDatatable-title">Họ và tên</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">emaill</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">
                          Ngày gia nhập
                        </span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Trạng thái</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Chặn</span>
                      </th>
                      <th>
                        <span className="userDatatable-title float-right">
                          Thao tác
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrStyleList.map((item) => (
                      <tr key={item?._id}>
                        <td>
                          <div className="d-flex">
                            <div className="userDatatable-inline-title">
                              <h7>{item?.Username}</h7>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div className="userDatatable-inline-title">
                              <h7>{item?.Full_Name}</h7>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div className="userDatatable-inline-title">
                              <h7>{item?.Email}</h7>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="userDatatable-content">
                            {moment(item?.createdAt).format("L")}
                          </div>
                        </td>
                        <td>
                          <div className="userDatatable-content d-inline-block">
                            <SwitchIOS
                              defaultChecked={item?.Info.Status_Code}
                              name="Status"
                              onChange={() =>
                                handleUpdateStatus(
                                  item?.Info._id,
                                  item?.Info.Status_Code
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="userDatatable-content d-inline-block">
                            <SwitchIOS
                              defaultChecked={item?.Info.Block_By_Admin}
                              name="Block"
                              onChange={() =>
                                handleUpdateBlock(
                                  item?.Info._id,
                                  item?.Info.Block_By_Admin
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                            <li>
                              <a
                                href="#"
                                className="view"
                                data-toggle="modal"
                                data-target={"#modal-changePass" + item._id}
                              >
                                <Key />
                              </a>
                            </li>
                            <ChangePass
                              item={item}
                              callback={handleUpdateStyleList}
                            />

                            <li>
                              <a
                                href=""
                                className="view"
                                data-toggle="modal"
                                data-target={"#modal-info" + item._id}
                              >
                                <Eye />
                              </a>
                            </li>
                            <Detail item={item} />
                            <li>
                              <a className="edit">
                                <Edit />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="remove"
                                data-toggle="modal"
                                data-target={"#modal-info-delete" + item._id}
                              >
                                <XCircle />
                              </a>
                              <div
                                className="modal-info-delete modal fade show"
                                id={"modal-info-delete" + item._id}
                                tabIndex={-1}
                                role="dialog"
                                aria-hidden="true"
                              >
                                <div
                                  className="modal-dialog modal-sm modal-info"
                                  role="document"
                                >
                                  <div className="modal-content">
                                    <div className="modal-body">
                                      <div className="modal-info-body d-flex">
                                        <div className="modal-info-icon warning">
                                          <span data-feather="info" />
                                        </div>
                                        <div className="modal-info-text">
                                          <h6>
                                            Bạn có thực sự muốn xoá thợ cắt tóc{" "}
                                            <b>{item?.Full_Name}</b>?
                                          </h6>
                                          <p>
                                            Xoá sẽ không khôi phục lại đâu nha
                                            cha nội
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-outlined btn-sm"
                                        data-dismiss="modal"
                                      >
                                        Không
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteStyleList(item._id)
                                        }
                                        type="button"
                                        className="btn btn-success btn-outlined btn-sm"
                                        data-dismiss="modal"
                                      >
                                        Xoá
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
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
};

export default StyleList;
