import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import { useForm } from "react-hook-form";
import { noteByAdmin } from "../../app/services/admin/order.service";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";

const Note = (props, ref) => {
  const { loadOrders, id, setIsShowModalNote } = props;
  const [show, setShow] = useState(true);
  const _isMounted = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowModalNote(false);
  };

  const onSubmit = async (obj) => {
    const data = {
      ...obj,
      _id: id,
    };
    const res = await noteByAdmin(data);
    if (res.status === 200) {
      toastSuccess("Ghi chú thành công!");
      _isMounted.current && setShow(false);
      reset();
      await loadOrders();
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
            Ghi chú đơn hàng
          </h6>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Start: card */}

            {/* Start: card body */}
            <div className="add-product__body px-sm-40 px-20">
              {/* Start: form */}
              <div className="form-group mb-20">
                <label
                  htmlFor="Admin_Note"
                  className="fs-14 color-light strikethrough"
                >
                  Nội dung
                </label>
                <textarea
                  className={
                    !!errors?.Admin_Note
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Admin_Note"
                  rows={5}
                  defaultValue={""}
                  {...register("Admin_Note", { required: true })}
                />
              </div>
              {/* End: form */}
            </div>
            {/* End: card body */}

            {/* End: card */}
            <div className="button-group d-flex pt-25 justify-content-end">
              <button
                type="submit"
                className="btn btn-success btn-default btn-squared text-capitalize"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(Note);
