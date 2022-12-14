import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SwitchIOS from "../../CustomMui/switch";
import { Edit, XCircle } from "react-feather";
import {
  getCategory,
  UpdateCategory,
  DeleteCategory,
  getParentCategory,
} from "../../app/services/admin/category.service";
import { toastError } from "../../components/sharedComponents/toast";
import Modal from "./modal";

const Category = () => {
  const [arrCategories, setArrCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);

  const _isMounted = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  });
  const loadCategory = async () => {
    _isMounted.current && setLoading(true);
    const categoryPromise = getCategory();
    const parentCategoryPromise = getParentCategory();
    const [category, parentCategory] = await Promise.all([
      categoryPromise,
      parentCategoryPromise,
    ]);
    // console.log(data);
    console.log(category);
    _isMounted.current && setLoading(false);
    _isMounted.current && setArrCategories(category);
    _isMounted.current && setParentCategory(parentCategory);
  };

  const handleUpdateStatus = async (id, Is_Show) => {
    const data = { Is_Show: !Is_Show, _id: id };
    try {
      await UpdateCategory(data);
      _isMounted && loadCategory();
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      const res = await DeleteCategory(id);
      toastError(res);
      _isMounted && loadCategory();
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-main user-member justify-content-sm-between ">
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
              <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                <h4 className="text-capitalize fw-500 breadcrumb-title">
                  Quản lý loại sản phẩm
                </h4>
                <span className="sub-title ml-sm-25 pl-sm-25">
                  {arrCategories.length} Loại Sản Phẩm
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
                Thêm loại sản phẩm
              </a>
              {/* Modal */}
              <Modal
                parentCategory={parentCategory}
                loadCategory={loadCategory}
              />
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
        <>
          <div className="row">
            {arrCategories.map((item, index) => {
              return (
                <div key={index} className="col-md-4 col-sm-12 mb-25">
                  <div className="media  py-30  pl-30 pr-20 bg-white radius-xl users-list ">
                    <div className="media-body d-xl-flex users-list-body">
                      <div className="flex-1 pr-xl-30">
                        <div className="users-list-body__title">
                          <h6 className="mt-0 fw-500">
                            #{item.Ordinal} {item.Name}{" "}
                          </h6>
                          <span> {item.Parent_Id == null ? "Cha" : "Con"}</span>
                          <p className="mb-0"></p>
                        </div>
                        <div className="userDatatable-content d-inline-block">
                          Hiện
                          <SwitchIOS
                            onChange={() =>
                              handleUpdateStatus(item?._id, item?.Is_Show)
                            }
                            defaultChecked={item?.Is_Show}
                            name="Is_Show"
                          />
                        </div>
                      </div>
                      <div className="users-list__button mt-xl-0 mt-15">
                        <Link
                          to={/category/ + item._id}
                          className="btn btn-primary btn-default btn-squared text-capitalize px-20 mb-10 global-shadow"
                        >
                          <Edit /> Sửa
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-default btn-squared text-capitalize px-20 mb-10 global-shadow"
                          data-toggle="modal"
                          data-target={"#modal-info-delete" + item._id}
                        >
                          <XCircle /> Xoá
                        </button>
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
                                      Bạn có thực sự muốn xoá loại{" "}
                                      <b>{item?.Name}</b>?
                                    </h6>
                                    <p>
                                      Xoá sẽ không khôi phục lại đâu nha cha nội
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
                                  onClick={() => handleDeleteCategory(item._id)}
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
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12">
              <div className="user-pagination">
                <div className="d-flex justify-content-sm-end justify-content-end mt-1 mb-30">
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
                {/* End of Pagination*/}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
