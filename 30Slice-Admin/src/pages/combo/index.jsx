import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  deleteCombo,
  getCombos,
  updateCombo,
} from "../../app/services/admin/combos.service";
import ModalConfirm from "../../components/sharedComponents/ModalConfirm";
import {
  toastError,
  toastSuccess,
} from "../../components/sharedComponents/toast";
import SwitchIOS from "../../CustomMui/switch";
import Add from "./Add";
import Edit from "./Edit";

const Combo = () => {
  const [combos, setCombos] = useState([]),
    [loading, setLoading] = useState(false),
    [keySearch, setKeySearch] = useState(""),
    [isShowModal, setIsShowModal] = useState(false),
    [isShowModalEdit,setIsShowModalEdit] = useState(false)

  const _isMounted = useRef(false),
    addRef = useRef(),
    editRef = useRef(),
    modalConfirmRef = useRef(),
    Name = useRef(),
    id = useRef(),
    combo = useRef();

    
  const loadCombo = async () => {
    _isMounted.current && setLoading(true);
    const data = await getCombos();
    _isMounted.current && setLoading(false);
    _isMounted.current && setCombos(data);
    _isMounted.current && setIsShowModalEdit(false)
    _isMounted.current &&  setIsShowModal(false)
  };

  const onDelete = async (id) => {
    const data = {_id : id}
    const res = await deleteCombo(data);
    if (res.status === 200) {
      toastSuccess("xoa thanh cong");
      await loadCombo();
      _isMounted.current &&  setIsShowModal(false)
      return;
    }
    toastError("loi");
  };

  const onConfirm = (_id, name) => {
    Name.current = name;
    id.current = _id;
    _isMounted.current && setIsShowModal(true)
    modalConfirmRef.current?.handleShow();
  };

  const onShowModalEdit = (data) => {
    combo.current = {...data}
    _isMounted.current && setIsShowModalEdit(true)
    editRef.current?.handleShow()
  };

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    loadCombo();
  }, []);

  const handleUpdateHot = async (id, Is_Hot) => {
    const data = { Is_Hot: !Is_Hot, _id: id };
    try {
      await updateCombo(data);
      _isMounted.current && loadCombo();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSearch = (e) => {
    _isMounted.current && setKeySearch(e.target.value);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Danh sách Combo
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">
                  {combos.length} Combo
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
                  value={keySearch}
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div className="action-btn">
              <button
                className="btn px-15 btn-primary"
                onClick={() => {
                  addRef.current?.handleShow();
                }}
              >
                <i className="las la-plus fs-16" />
                Thêm Combo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
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
            <div className="userDatatable global-shadow border  bg-white radius-xl w-100 mb-30">
              <div className="table-responsive">
                <table className="table mb-0 table-borderless">
                  <thead>
                    <tr className="userDatatable-header">
                      <th>
                        <span className="userDatatable-title">Thứ tự</span>
                      </th>
                      <th>
                        <span className=" userDatatable-title">Tên Combo</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Hình ảnh</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Giá</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Đã bán</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">
                          Giảm giá (%)
                        </span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Đánh giá</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">
                          Số lượng trong kho
                        </span>
                      </th>
                      {/* <th>
                        <span className="userDatatable-title">Mô tả</span>
                      </th> */}
                      <th>
                        <span className="userDatatable-title">Ẩn/Hiện</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Nỗi bật</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Thao tác</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {combos.length > 0 &&
                      combos.map((item) => (
                        <tr key={item?._id}>
                          <td>
                            <div className="userDatatable-content">
                              {item?.Ordinal}
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-inline-title">
                              <span className="text-dark fw-500 text-wrap text-start mw-300">
                                <h6>{item?.Name}</h6>
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              <img src={item?.Image} width={50} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              {item?.Price}
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              {item?.Saled}
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content text-center">
                              {item?.Discount} %
                            </div>
                          </td>
                          {/* <td>
                            <div className="userDatatable-content text-wrap mw-300">
                              {item?.Details} 
                            </div>
                          </td> */}
                          <td>
                            <div className="userDatatable-content text-center">
                              {item?.Rating}
                            </div>
                          </td>

                          <td>
                            <div className="userDatatable-content text-center">
                              {item?.Views}
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content d-inline-block">
                              <SwitchIOS
                                onChange={() =>
                                  handleUpdateStatus(item?._id, item?.Is_Show)
                                }
                                defaultChecked={item?.Is_Show}
                                name="Is_Show"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content d-inline-block">
                              <SwitchIOS
                                defaultChecked={item?.Is_Hot}
                                name="Is_Hot"
                                onChange={() =>
                                  handleUpdateHot(item?._id, item?.Is_Hot)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="orderDatatable_actions mb-0 d-flex justify-content-between align-items-center">
                              <button onClick={() => onShowModalEdit(item)} className="btn btn-primary btn-default btn-squared text-capitalize px-10 mr-10 global-shadow">
                                <i className="fa-solid fa-pen-to-square"></i>{" "}
                                Sửa
                              </button>

                              <button
                                onClick={() => onConfirm(item?._id, item?.Name)}
                                type="button"
                                className="btn btn-outline-danger btn-default btn-squared text-capitalize px-10  global-shadow"
                              >
                                <i className="fa-solid fa-trash"></i> Xoá
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* phan trang */}
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
            
                <Add loadCombo={loadCombo} combos={combos ?? []} ref={addRef} />
            
              {isShowModal && (
                <ModalConfirm
                  id={id.current ?? null}
                  Name={Name.current ?? null}
                  funcDelete={onDelete}
                  ref={modalConfirmRef}
                />
              )}

              {
                isShowModalEdit && (<Edit combo={combo.current} ref={editRef} loadCombo={loadCombo}/>)
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Combo;
