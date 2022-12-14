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
import { updateProduct } from "../../app/services/admin/product.service";

const EditProduct = (props, ref) => {
  const { categories } = useSelector((state) => state.categories);
  const { product, loadProduct ,setIsShowModalEdit} = props;
  const {
    Name,
    Ordinal,
    Image,
    Price,
    Discount,
    InStock,
    Details,
    _id,
    Id_Categories,
    Images,
  } = product;
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
      product: {
        Name: "",
        Images: [],
        Ordinal: null,
        Image: "",
        Price: null,
        Discount: null,
        InStock: null,
        Details: "",
      },
    },
  });

  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowModalEdit(false)
  };
  const onSubmit = async (obj) => {
    const { product } = obj;
    let data = [];
    const arrFile = [...file.current.files];
    //upload hinh
    if (arrFile.length > 0) {
      let urlImg = [];

      for (let i = 0; i < arrFile.length; i++) {
        const upMultipleFile = async () => {
          const name = await uploadLoadFIle(arrFile[i]);
          return name;
        };
        const name = await upMultipleFile();
        urlImg.push(name);
      }
      data = {
        ...product,
        Is_Show: selected,
        _id: _id,
        Images: urlImg,
      };
    } else {
      data = {
        ...product,
        Is_Show: selected,
        _id: _id,
      };
    }

    const res = await updateProduct(data);
    if (res.status === 200) {
      toastSuccess("Sửa thành công!");
      _isMounted.current && setShow(false);
      reset();
      await loadProduct();
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
      setValue("product", {
        Name: Name,
        Ordinal: Ordinal,
        Price: Price,
        Discount: Discount,
        InStock: InStock,
        Details: Details,
        Id_Categories :  Id_Categories._id
      });
  }, [_id]);
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <div className="modal-content  radius-xl">
        <div className="modal-header">
          <h6 className="modal-title fw-500" id="staticBackdropLabel">
            Sửa sản phẩm
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

              {/* form group */}
              <div className="form-group">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                  type="text"
                  id={"name"}
                  className={
                    !!errors?.product?.Name
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  {...register("product.Name", { required: true })}
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

              <div className="form-group select-px-15">
                <label>Loại Sản phẩm</label>
                <select
                  {...register("product.Id_Categories", { required: true })}
                  className={
                    !!errors?.product?.Id_Categories
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                >
                  <option value="">Chọn loại sản phẩm</option>
                  {categories.length > 0
                    ? categories.map((item) => (
                        <option
                        //   checked={item._id === Id_Categories}
                          value={item._id}
                          key={item._id}
                        >
                          {item.Name}
                        </option>
                      ))
                    : "Loading"}
                </select>
              </div>
{/* 
              <div className="form-group">
                <label htmlFor="Ordinal">Thứ tự</label>
                <input
                  type="number"
                  className={
                    !!errors?.product?.Ordinal
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Ordinal"
                  placeholder="Số thứ tự"
                  {...register("product.Ordinal", { required: true, min: 1 })}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="Price">Giá</label>
                <input
                  type="number"
                  className={
                    !!errors?.product?.Price
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Price"
                  placeholder="Giá"
                  {...register("product.Price", { required: true, min: 1 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Discount">Giảm giá (%)</label>
                <input
                  type="number"
                  className={
                    !!errors?.product?.Discount
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Discount"
                  placeholder="Giảm giá"
                  {...register("product.Discount", { required: true, min: 0 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="InStock">Số lượng</label>
                <input
                  type="number"
                  className={
                    !!errors?.product?.InStock
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="InStock"
                  placeholder="Số lượng"
                  {...register("product.InStock", { required: true, min: 1 })}
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
                    !!errors?.product?.Details
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  id="Details"
                  rows={3}
                  defaultValue={""}
                  {...register("product.Details", { required: true })}
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

export default forwardRef(EditProduct);
