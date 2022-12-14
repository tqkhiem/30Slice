import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../app/redux/slices/product";
import AutocompleteCustom from "../../CustomMui/autocomplete";
import { useForm } from "react-hook-form";
import { addCombo } from "../../app/services/admin/combos.service";
import { uploadLoadFIle } from "../../app/services/upload";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";

const Add = (props, ref) => {
  const { combos,loadCombo } = props;
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(true);
  const _isMounted = useRef(false);
  const idProducts = useRef();
  const file = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const handleClose = () => {
    _isMounted.current && setShow(false);
  };
  const onSubmit = async (obj) => {
    const urlImg = await uploadLoadFIle(file.current.files[0]);
    const Arr_Id_Products = idProducts.current.InputValue.map(
      (item) => item._id
    );
    const data = {
      ...obj,
      Is_Show: selected,
      Arr_Id_Products: Arr_Id_Products,
      Image : urlImg
    };
    const res = await addCombo(data);
    if (res.status === 200) {
      toastSuccess("Thêm thành công!");
      _isMounted.current && setShow(false);
      reset();
      await loadCombo()
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
    dispatch(fetchProduct());
  }, []);

 


  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <div className="modal-content  radius-xl">
        <div className="modal-header">
          <h6 className="modal-title fw-500" id="staticBackdropLabel">
            Thêm combo sản phẩm
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
            {/* Start: card */}

            {/* Start: card body */}
            <div className="add-product__body px-sm-40 px-20">
              {/* Start: form */}

              {/* form group */}
              <div className="form-group">
                <label htmlFor="name">Tên Combo</label>
                <input
                  type="text"
                  id={"name"}
                  className={!!errors?.Name ? "is-invalid form-control"  : "form-control"}
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
                />
              </div>
              <div className="form-group">
                <label>Tên Sản phẩm</label>
                <AutocompleteCustom
                  options={products}
                  multiple={true}
                  display="Name"
                  ref={idProducts}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Ordinal">Thứ tự</label>
                <input
                  type="number"
                  className={!!errors?.Ordinal ? "is-invalid form-control"  : "form-control"}
                  id="Ordinal"
                  placeholder="Số thứ tự"
                  {...register("Ordinal", { required: true, min : 1 })}
                  defaultValue={combos[combos.length - 1]?.Ordinal + 1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Giá</label>
                <input
                  type="number"
                  className={!!errors?.Price ? "is-invalid form-control"  : "form-control"}
                  id="Price"
                  placeholder="Giá"
                  {...register("Price", { required: true, min : 1 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Discount">Giảm giá (%)</label>
                <input
                  type="number"
                  className={!!errors?.Discount ? "is-invalid form-control"  : "form-control"}
                  id="Discount"
                  placeholder="Giảm giá"
                  {...register("Discount",{ required: true, min : 0 })}
                  defaultValue={0}
                />
              </div>
              <div className="form-group">
                <label htmlFor="InStock">Số lượng</label>
                <input
                  type="number"
                  className={!!errors?.InStock ? "is-invalid form-control"  : "form-control"}
                  id="InStock"
                  placeholder="Số lượng"
                  {...register("InStock",{ required: true, min : 1 })}
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
                   className={!!errors?.Details ? "is-invalid form-control"  : "form-control"}
                  id="Details"
                  rows={3}
                  defaultValue={""}
                  {...register("Details", { required: true })}
                />
              </div>
              <div className="form-group mb-20 ">
                <label className="mb-15">Ẩn/Hiện</label>
                <div className="d-flex">
                  <div className="radio-horizontal-list d-flex flex-wrap">
                    <div className="radio-theme-default custom-radio ">
                      <input
                        className="radio"
                        type="radio"
                        name="Is_Show"
                        value={true}
                        id="radio-hl1"
                        checked={selected === true}
                        onChange={() => setSelected(true)}
                      />
                      <label htmlFor="radio-hl1">
                        <span className="radio-text">Hiện</span>
                      </label>
                    </div>
                    <div className="radio-theme-default custom-radio ">
                      <input
                        className="radio"
                        type="radio"
                        name="Is_Show"
                        value={false}
                        id="radio-hl2"
                        checked={selected === false}
                        onChange={() => setSelected(false)}
                      />
                      <label htmlFor="radio-hl2">
                        <span className="radio-text">Ẩn</span>
                      </label>
                    </div>
                  </div>
                </div>
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
                Thêm
              </button>
              <button
                type="button"
                className="btn btn-danger btn-default btn-squared fw-400 text-capitalize"
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
