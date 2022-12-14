import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteNews,
  getNews,
  updateNews,
} from "../../app/services/admin/news.service";
import ModalConfirm from "../../components/sharedComponents/ModalConfirm";
import { toastError, toastSuccess } from "../../components/sharedComponents/toast";
import SwitchIOS from "../../CustomMui/switch";

const News = () => {
  const _isMounted = useRef(false);
  const id = useRef();
  const modalConfirmRef = useRef();
  const [arrNews, setArrNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const loadNews = async () => {
    _isMounted.current && setLoading(true);
    const data = await getNews();
    _isMounted.current && setLoading(false);
    _isMounted.current && setArrNews(data);
  };

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  });

  useEffect(() => {
    loadNews();
  }, []);

  const handleUpdateStatus = async (id, Is_Show) => {
    const data = { Is_Show: !Is_Show, _id: id };
    try {
      await updateNews(data);
      _isMounted && loadNews();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateHot = async (id, Is_Hot) => {
    const data = { Is_Hot: !Is_Hot, _id: id };
    try {
      await updateNews(data);
      _isMounted && loadNews();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleDelete = async (id) => {
    const data = { _id: id };
    await deleteNews(data);
    _isMounted && loadNews();
  };

  const onDelete = async (id) => {
    const data = { _id: id };
    const res = await deleteNews(data);
    if (res.status === 200) {
      toastSuccess("xoa thanh cong");
      await loadNews();
      _isMounted.current && setIsShowModal(false);
      return;
    }
    toastError("loi");
  };

  const onConfirm = (_id) => {
    id.current = _id;
    setIsShowModal(true);
    modalConfirmRef.current?.handleShow();
  };

  const handleSearch = (e) => {
    _isMounted && setKeySearch(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Danh sách tin tức
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">
                  {arrNews.length} Tin
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
              <Link to={"/add-news"} className="btn px-15 btn-primary">
                <i className="las la-plus fs-16" />
                Thêm Tin tức
              </Link>
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
                        <span className=" userDatatable-title">
                          Tên bài viết
                        </span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Hình ảnh</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Tác giả</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Ngày viết</span>
                      </th>
                      <th>
                        <span className="userDatatable-title">Lượt xem</span>
                      </th>
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
                    {arrNews.length > 0 &&
                      arrNews.map((item) => (
                        <tr key={item?._id}>
                          <td>
                            <div className="userDatatable-inline-title">
                              <span className="text-dark fw-500 text-wrap text-start mw-300">
                                <h6>{item?.Title}</h6>
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              <img src={item?.image} width={50} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              {item?.Create_By?.Full_Name}
                            </div>
                          </td>
                          <td>
                            <div className="userDatatable-content">
                              {moment(item?.createdAt).format("L")}
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
                              <Link to={`/edit-news/${item?._id}`} className="btn btn-primary btn-default btn-squared text-capitalize px-10 mr-10 global-shadow">
                                <i className="fa-solid fa-pen-to-square"></i>{" "}
                                Sửa
                              </Link>

                              <button
                                onClick={() => onConfirm(item?._id)}
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
            </div>
          )}
        </div>
        {isShowModal && (
          <ModalConfirm
            id={id.current ?? null}
            funcDelete={onDelete}
            ref={modalConfirmRef}
          />
        )}
      </div>
    </div>
  );
};

export default News;
