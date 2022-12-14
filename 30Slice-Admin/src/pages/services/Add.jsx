import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { toastSuccess, toastError, } from "../../components/sharedComponents/toast";
import { uploadLoadFIle } from "../../app/services/upload";
import { addService } from "../../app/services/admin/services.service";


const Add = (props, ref) => {
   const { loadService } = props;
   const [show, setShow] = useState(false);
   const _isMounted = useRef(false);
   const file = useRef();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const handleClose = () => {
      _isMounted.current && setShow(false);
   };

   const onSubmit = async (obj) => {

      let urlImg = "";
      const upFile = async () => {
         const name = await uploadLoadFIle(file.current.files[0]);
         return name
      }
      const name = await upFile();
      urlImg = name
      
      const data = {
         ...obj,
         Images: urlImg,
      };
      const res = await addService(data);
      if (res.status === 200) {
         toastSuccess("Thêm thành công!");
         _isMounted.current && setShow(false);
         reset();
         await loadService();
         return;
      }
      toastError("Lỗi!");
   };

   useImperativeHandle(ref, () => ({
      handleShow() {
         _isMounted.current && setShow(true);
      },
   }));

   useEffect(() => {
      _isMounted.current = true;
      return () => {
         _isMounted.current = false;
      };
   }, []);


   return (
      <Modal show={show} onHide={handleClose} animation={false}>
         <div className="modal-content  radius-xl">
            <div className="modal-header">
               <h6 className="modal-title fw-500" id="staticBackdropLabel">
                  Thêm dịch vụ
               </h6>
               <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setShow(false)}
               >
                  <X />
               </button>
            </div>
            <div className="modal-body">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="add-product__body px-sm-40 px-20">
                     <div className="form-group">
                        <label htmlFor="name">Tên dịch vụ</label>
                        <input type="text" id={"name"} className={
                              !!errors?.Name ? "is-invalid form-control" : "form-control"
                           }
                           {...register("Name", { required: true })}
                        />
                     </div>
                     <div className="form-group mb-20">
                        <label
                           htmlFor="Image"
                           className="fs-14 color-light strikethrough"
                        >
                           Hình ảnh
                        </label>

                        <input
                           ref={file}
                           className="form-control"
                           type="file"
                           id="formFile"
                           multiple
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="Price">Giá</label>
                        <input
                           type="number"
                           className={
                              !!errors?.Price ? "is-invalid form-control" : "form-control"
                           }
                           id="Price"
                           placeholder="Giá"
                           {...register("Price", { required: true, min: 1 })}
                        />
                     </div>
                     <div className="form-group mb-20">
                        <label
                           htmlFor="Details"
                           className="fs-14 color-light strikethrough"
                        >
                           Mô tả
                        </label>
                        <textarea
                           className={
                              !!errors?.Describe
                                 ? "is-invalid form-control"
                                 : "form-control"
                           }
                           id="Describe"
                           rows={2}
                           defaultValue={""}
                           {...register("Describe", { required: true })}
                        />
                     </div>
                  </div>
                  {/* End: card body */}

                  {/* End: card */}
                  <div className="button-group d-flex justify-content-end">
                     <button
                        type="submit"
                        className="btn btn-success text-capitalize"
                     >
                        Thêm
                     </button>
                     <button
                        type="button"
                        className="btn btn-danger text-capitalize"
                        onClick={() => setShow(false)}
                     >
                        Huỷ
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </Modal>
   );
};

export default forwardRef(Add);
