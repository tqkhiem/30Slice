import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Eye, Edit, XCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteService, getServices, updateService } from "../../app/services/admin/services.service";
import ModalConfirm from "../../components/sharedComponents/ModalConfirm";
import { toastError, toastSuccess } from "../../components/sharedComponents/toast";

import Add from "./Add";
import Detail from "./Detail";
import EditService from "./Edit";

const Services = () => {

   const _isMounted = useRef(false);
   const detailRef = useRef();
   const servicesRef = useRef();
   const addRef = useRef();
   const id = useRef();
   const editRef = useRef();

   const [services, setServices] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isShowDetail, setIsShowDetail] = useState(false);
   const [isShowModal, setIsShowModal] = useState(false);
   const modalConfirmRef = useRef();
   const [isShowModalEdit, setIsShowModalEdit] = useState(false);

   const dispatch = useDispatch();
   const fetchService = async () => {
      setIsLoading(true);
      const data = await getServices();
      setIsLoading(false);
      _isMounted.current && setServices(data);
      return;
   };

   const handleUpdateStatus = async (id, Is_Show) => {
      const data = { Is_Show: !Is_Show, _id: id };
      try {
         await updateService(data);
         _isMounted && fetchService();
      } catch (err) {
         throw new Error(err);
      }
   };

   const handleUpdateHot = async (id, Is_Hot) => {
      let data = [];
      if (Is_Hot) {
         data = { Is_Hot: !Is_Hot, _id: id };
      } else {
         data = { Is_Hot: true, _id: id };
      }

      try {
         await updateService(data);
         await fetchService();
      } catch (err) {
         throw new Error(err);
      }
   };

   const handleShowModalDetail = (arr) => {
      servicesRef.current = { ...arr };
      _isMounted.current && setIsShowDetail(true);
      detailRef.current?.handleShow();
   };

   const onDelete = async (id) => {
      const data = { _id: id };
      const res = await deleteService(data);
      if (res.status === 200) {
         toastSuccess("xoa thanh cong");
         await fetchService();
         _isMounted.current && setIsShowModal(false);
         return;
      }
      toastError("loi");
   };

   const onShowModalEdit = (data) => {
      servicesRef.current = { ...data };
      _isMounted.current && setIsShowModalEdit(true);
      editRef.current?.handleShow()
   };

   const onConfirm = (_id) => {
      id.current = _id;
      _isMounted.current && setIsShowModal(true);
      modalConfirmRef.current?.handleShow();
   };

   useEffect(() => {
      _isMounted.current = true;
      return () => {
         _isMounted.current = false;
      };
   });

   useEffect(() => {
      fetchService();
   }, []);

   return (
      <div className="container-fluid">
         <div className="row">
            <div className="col-lg-12">
               <div className="breadcrumb-main user-member justify-content-sm-between ">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                     <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                           Quản lí dịch vụ
                        </h4>
                        <span className="sub-title ml-sm-25 pl-sm-25">
                           {services?.length} dịch vụ
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
                           placeholder="Tìm kiếm dịch vụ"
                           aria-label="Search"
                        />
                     </form>
                  </div>
                  <div className="action-btn">
                     <button
                        className="btn px-15 btn-primary"
                        onClick={() => addRef.current?.handleShow()}
                     >
                        <i className="las la-plus fs-16" />
                        Thêm dịch vụ
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-lg-12">
               {isLoading ? (
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
                  <div className="userDatatable global-shadow border p-30 bg-white radius-xl w-100 mb-30">
                     <div className="table-responsive">
                        <table className="table mb-0 table-borderless">
                           <thead>
                              <tr className="userDatatable-header">
                                 <th>
                                    <span className="userDatatable-title ">
                                       Tên dịch vụ
                                    </span>
                                 </th>
                                 <th>
                                    <span className="userDatatable-title">
                                       Ảnh dịch vụ
                                    </span>
                                 </th>
                                 <th>
                                    <span className="userDatatable-title">Giá</span>
                                 </th>
                                 <th className="text-center">
                                    <span className="userDatatable-title">Thao tác</span>
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {services.length > 0
                                 ? services.map((item) => (
                                    <tr key={item?._id}>
                                       <td>
                                          <div className="userDatatable-content text-wrap text-start">
                                             {item?.Name}
                                          </div>
                                       </td>
                                       <td>
                                          <div className="userDatatable-content">
                                             <img src={item?.Images} width={50} alt="" />
                                          </div>
                                       </td>
                                       <td>
                                          <div className="userDatatable-content">
                                             {(item?.Price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                          </div>
                                       </td>
                                       <td>
                                          <ul className="orderDatatable_actions mb-0 d-flex flex-wrap justify-content-center">
                                             <Tooltip title="Xem chi tiết">
                                                <li onClick={() => handleShowModalDetail(item)}>
                                                   <Link className="view">
                                                      <Eye />
                                                   </Link>
                                                </li>
                                             </Tooltip>
                                             <Tooltip title="Sửa">
                                                <li onClick={() => onShowModalEdit(item)}>
                                                   <Link className="edit">
                                                      <Edit />
                                                   </Link>
                                                </li>
                                             </Tooltip>
                                             <Tooltip title="Xoá">
                                                <li onClick={() => onConfirm(item._id)}>
                                                   <Link className="remove">
                                                      <XCircle />
                                                   </Link>
                                                </li>
                                             </Tooltip>
                                          </ul>
                                       </td>
                                    </tr>
                                 ))
                                 : "Không có sản phẩm"}
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
               )}
            </div>
            {/* modal */}
            {isShowDetail && (
               <Detail
                  setIsShowDetail={setIsShowDetail}
                  service={servicesRef.current}
                  ref={detailRef}
               />
            )}
            {<Add loadService={fetchService} ref={addRef} />}
            {isShowModal && (
               <ModalConfirm
                  id={id.current ?? null}
                  funcDelete={onDelete}
                  ref={modalConfirmRef}
               />
            )}
            {isShowModalEdit && (
               <EditService
                  service={servicesRef.current}
                  ref={editRef}
                  loadService={fetchService}
                  setIsShowModalEdit={setIsShowModalEdit}
               />
            )}
         </div>
      </div>
   );
};
export default Services;