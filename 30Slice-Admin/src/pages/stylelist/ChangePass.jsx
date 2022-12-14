import Modal from "react-bootstrap/Modal";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { X } from "react-feather";
import { useRef } from "react";
import { passwordValidator } from "../../components/sharedComponents/validatorPatterns";
import { useForm } from "react-hook-form";
// import Input from "../../components/sharedComponents/input";

export default function ChangePass(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (newPass) => {
    const data = {
        ...newPass,
        _id: props?.item?._id,
    }
    props.callback(data);
  };

  return (
    <div
      className="modal-basic modal fade show"
      id={"modal-changePass" + props?.item?._id}
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content modal-bg-white ">
          <div className="modal-header">
            <h6 className="modal-title">Đổi mật khẩu</h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span data-feather="x" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="form-group mb-20">
                <label htmlFor={"username" + props?.item?._id}>
                  Tên người dùng
                </label>
                <input
                  id={"username" + props?.item?._id}
                  type="text"
                  className="form-control"
                  defaultValue={props?.item?.Username}
                  disabled
                />
              </div>
              <div className="form-group mb-20">
                <label htmlFor={"password" + props?.item?._id}>
                  Mật khẩu mới
                </label>
                <input
                  id={"password" + props?.item?._id}
                  type="password"
                  className={
                    !!errors?.newPassword
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  {...register(
                    "newPassword",
                    { required: "Trường này không được để trống" ,
                      pattern: passwordValidator
                    }
                  )}
                />
              </div>
              {errors && (
                <span className="invalid-validate">
                  {errors?.newPassword?.message}
                </span>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-info btn-sm">
                Đổi mật khẩu
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
