import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { useEffect, useState, useRef } from "react";
import { AddCategory } from "../../app/services/admin/category.service";
import { X } from "react-feather";
const Modal = (props) => {
  const [selected, setSelected] = useState(true);
  const refName = useRef("");
  const refOrdinal = useRef();
  const refParent = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      Name: refName.current.value,
      Ordinal: parseInt(refOrdinal.current.value),
      Is_Show: selected,
      Parent_Id:
        refParent.current.value === "0" ? null : refParent.current.value,
    };
    const res = await AddCategory(data);
    if (res.status === 201) {
      toastSuccess(res.data.message);
      props.loadCategory();
    } else {
      toastError(res.data.message);
    }
  };

  return (
    <div
      className="modal fade new-member"
      id="new-member"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content  radius-xl">
          <div className="modal-header">
            <h6 className="modal-title fw-500" id="staticBackdropLabel">
              Thêm loại sản phẩm
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <X />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              {/* Start: card */}

              {/* Start: card body */}
              <div className="add-product__body px-sm-40 px-20">
                {/* Start: form */}

                {/* form group */}

                <div className="form-group">
                  <label htmlFor="name1">Tên Loại</label>
                  <input
                    type="text"
                    id={"name1"}
                    className="form-control"
                    ref={refName}
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

                <div className="form-group">
                  <label htmlFor="name8">Thứ tự</label>
                  <input
                    type="number"
                    className="form-control"
                    id="name8"
                    placeholder="Số thứ tự"
                    ref={refOrdinal}
                  />
                </div>
                <div className="form-group">
                  <div className="countryOption">
                    <label htmlFor="countryOption">Con ?</label>
                    <select
                      className="js-example-basic-single js-states form-control"
                      id="countryOption"
                      defaultValue="0"
                      ref={refParent}
                    >
                      <option value="0" selected>
                        Không
                      </option>
                      {props.parentCategory &&
                        props.parentCategory.map((item) => {
                          return (
                            <option key={item._id} value={item?._id}>
                              {item.Name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                {/* End: form */}
              </div>
              {/* End: card body */}

              {/* End: card */}
              {/* Start: button group */}
              <div className="button-group add-product-btn d-flex justify-content-end mt-40">
                <button
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="btn btn-light btn-default btn-squared fw-400 text-capitalize"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-default btn-squared text-capitalize"
                >
                  Lưu
                </button>
              </div>
              {/* End: button group */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
