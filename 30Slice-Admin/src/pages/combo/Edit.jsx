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
import { updateCombo } from "../../app/services/admin/combos.service";
import { uploadLoadFIle } from "../../app/services/upload";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";

const Edit = (props, ref) => {
  const { combo, loadCombo } = props;
  const {
    Name,
    Ordinal,
    Image,
    Price,
    Discount,
    InStock,
    Details,
    _id,
    Arr_Id_Products,
  } = combo;
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState(true);
  const _isMounted = useRef(false);
  const idProducts = useRef();
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
      combo: {
        Name: "",
        Arr_Id_Products: [],
        Ordinal: null,
        Image: "",
        Price: null,
        Discount: null,
        InStock: null,
        Details: "",
      },
    },
  });

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const getObjProductsByIds = () => {
    const obj = products.filter((item) => Arr_Id_Products.includes(item?._id));
    return obj;
  };

  const handleClose = () => {
    _isMounted.current && setShow(false);
  };
  const onSubmit = async (obj) => {
    const {combo} = obj
    let data = [];

    const Arr_Id_Products = idProducts.current.InputValue.map(
      (item) => item._id
    );
    //upload hinh
    if (file.current.files[0]) {
      const urlImg = await uploadLoadFIle(file.current.files[0]);
      data = {
        ...combo,
        Is_Show: selected,
        Arr_Id_Products: Arr_Id_Products,
        Image: urlImg,
        _id : _id
      };
    } else {
      data = {
        ...combo,
        Is_Show: selected,
        Arr_Id_Products: Arr_Id_Products,
        _id : _id 
      };
    }

   
    const res = await updateCombo(data);
    if (res.status === 200) {
      toastSuccess("Sửa thành công thành công!");
      _isMounted.current && setShow(false);
      reset();
      await loadCombo();
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

  useEffect(() => {
    _isMounted.current &&
      setValue("combo", {
        Name: Name,
        Ordinal: Ordinal,
        Image: Image,
        Price: Price,
        Discount: Discount,
        InStock: InStock,
        Details: Details,
      });
  }, [_id]);
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <div className="modal-content  radius-xl">
        <div className="modal-header">
          <h6 className="modal-title fw-500" id="staticBackdropLabel">
            Sửa combo sản phẩm
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
                  className={
                    !!errors?.combo?.Name
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  {...register("combo.Name", { required: true })}
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
                  defaultValue={getObjProductsByIds()}
                  ref={idProducts}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Ordinal">Thứ tự</label>
                <input
                  type="number"
                  className={
                    !!errors?.combo?.Ordinal
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Ordinal"
                  placeholder="Số thứ tự"
                  {...register("combo.Ordinal", { required: true, min: 1 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Giá</label>
                <input
                  type="number"
                  className={
                    !!errors?.combo?.Price
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Price"
                  placeholder="Giá"
                  {...register("combo.Price", { required: true, min: 1 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Discount">Giảm giá (%)</label>
                <input
                  type="number"
                  className={
                    !!errors?.combo?.Discount
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Discount"
                  placeholder="Giảm giá"
                  {...register("combo.Discount", { required: true, min: 0 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="InStock">Số lượng</label>
                <input
                  type="number"
                  className={
                    !!errors?.combo?.InStock
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="InStock"
                  placeholder="Số lượng"
                  {...register("combo.InStock", { required: true, min: 1 })}
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
                    !!errors?.combo?.Details
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Details"
                  rows={3}
                  defaultValue={""}
                  {...register("combo.Details", { required: true })}
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
                onClick={() => handleClose}
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

export default forwardRef(Edit);
