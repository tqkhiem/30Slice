import { X } from "react-feather";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addStyleList } from "../../app/services/admin/stylelist.service";
import { groupedOptions } from "./shift.js";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
const animatedComponents = makeAnimated();

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const Modal = (props) => {
  const [timeSelected, setTimeSelected] = useState([]);
  const refUsername = useRef("");
  const refPassword = useRef("");
  const refEmail = useRef("");
  const refPhone = useRef("");
  const refName = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      username: refUsername.current.value,
      password: refPassword.current.value,
      email: refEmail.current.value,
      phone: refPhone.current.value,
      full_name: refName.current.value,
      shifts: timeSelected,
      role: "styleList",
    };
    const res = await addStyleList(data);
    if (res.status === 201) {
      toastSuccess(res.data.message);
      props.loadStyleList();
    }
    if (res.status === 200) {
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
              Thêm thợ cắt tóc
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
            <div className="new-member-modal">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-20">
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    ref={refUsername}
                  />
                </div>
                <div className="form-group mb-20">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password123..."
                    ref={refPassword}
                  />
                </div>
                <div className="form-group mb-20">
                  <Select
                    placeholder={"Chọn ca làm việc..."}
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    options={groupedOptions}
                    isMulti
                    formatGroupLabel={formatGroupLabel}
                    onChange={(e) =>
                      setTimeSelected(e.map((item) => item.value))
                    }
                  />
                </div>
                <div className="form-group mb-20">
                  <label htmlFor="full_name">Họ và tên</label>
                  <input
                    id="full_name"
                    type="text"
                    className="form-control"
                    placeholder="Nguyễn Văn A..."
                    ref={refName}
                  />
                </div>
                <div className="form-group mb-20">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                    ref={refEmail}
                  />
                </div>
                <div className="form-group mb-20">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    id="phone"
                    type="number"
                    className="form-control"
                    placeholder="113"
                    ref={refPhone}
                  />
                </div>

                <div className="button-group d-flex pt-25">
                  <button
                    type="submit"
                    className="btn btn-primary btn-default btn-squared text-capitalize"
                  >
                    Thêm nhân viên
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-light btn-default btn-squared fw-400 text-capitalize"
                  >
                    Huỷ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
