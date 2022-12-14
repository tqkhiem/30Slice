import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import { useForm } from "react-hook-form";

import { toastSuccess, toastError } from "../../components/sharedComponents/toast";
import { uploadLoadFIle } from "../../app/services/upload";
import { updateService } from "../../app/services/admin/services.service";

const EditService = (props, ref) => {
  const { service, loadService, setIsShowModalEdit } = props;
  const {
    Name,
    Images,
    Price,
    Describe,
    _id
  } = service;
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState(true);
  const _isMounted = useRef(false);
  const idService = useRef();
  const file = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "onChange",
      service: {
        Name: "",
        Images: "",
        Price: null,
        Describe: "",
      },
    },
  });

  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowModalEdit(false)
  };
  const onSubmit = async (obj) => {
    const { service } = obj;
    let data = [];
    const imgFile = file.current.files;
    //upload hinh
    if (imgFile.length > 0) {
      const res = await uploadLoadFIle(imgFile[0]);
      if (res) {
        data = {
          ...service,
          _id: _id,
          Images: res,
        };
      }
    } else {
      data = {
        ...service,
        _id: _id,
      };
    }
    
    const res = await updateService(data);
    if (res.status === 200) {
      toastSuccess("Sửa thành công!");
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

  useEffect(() => {
    _isMounted.current &&
      setValue("service", {
        Name: Name,
        Price: Price,
        Describe: Describe
      });
  }, [_id]);
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <div className="modal-content  radius-xl">
        <div className="modal-header">
          <h6 className="modal-title fw-500" id="staticBackdropLabel">
            Sửa dịch vụ
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
            <div className="add-service__body px-sm-40 px-20">
              {/* Start: form */}

              {/* form group */}
              <div className="form-group">
                <label htmlFor="name">Tên dịch vụ</label>
                <input
                  type="text"
                  id={"name"}
                  className={
                    !!errors?.service?.Name
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  {...register("service.Name", { required: true })}
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Giá</label>
                <input
                  type="number"
                  className={
                    !!errors?.service?.Price
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Price"
                  placeholder="Giá"
                  {...register("service.Price", { required: true, min: 1 })}
                />
              </div>
              <div className="form-group mb-20">
                <label
                  htmlFor="Describe"
                  className="fs-14 color-light strikethrough"
                >
                  Mô tả
                </label>
                <textarea
                  className={
                    !!errors?.service?.Describe
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Describe"
                  rows={3}
                  defaultValue={""}
                  {...register("service.Describe", { required: true })}
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
                Sửa
              </button>
              <button
                type="button"
                className="btn btn-danger btn-default btn-squared fw-400 text-capitalize"
                onClick={handleClose}
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

export default forwardRef(EditService);
