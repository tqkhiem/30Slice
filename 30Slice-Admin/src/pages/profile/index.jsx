import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../components/sharedComponents/input";
import { passwordValidator } from "../../components/sharedComponents/validatorPatterns";
import { selectMessage } from "../../app/redux/slices/auth/message";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { ChangePassword,ChangeInfo } from "../../app/services/admin/admin.service";
import { useNavigate } from "react-router-dom";
import { Settings, Key, Camera } from "react-feather";
import { logout } from '../../app/redux/slices/auth/auth';

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const message = useSelector(selectMessage);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const onSubmit = async (user) => {
    setLoading(true);
    const { old_password, new_password } = user;
    try {
      const res = await ChangePassword(user);
      setLoading(false);
      if (res.status === 201) {
        toastSuccess(res.data.message);
        dispatch(logout());
      } else {
        toastError(res.data.message);
      }
      // navigate('/');
    } catch (err) {
      throw new Error(err);
    }
  };
  const onSubmitProfile = async (user) => {
    setLoading(true);
    try {
      const res = await ChangeInfo(user);
      setLoading(false);
      if (res.status === 201) {
        toastSuccess(res.data.message);
        dispatch(logout());
      } else {
        toastError(res.data.message);
      }
      // navigate('/');
    } catch (err) {
      throw new Error(err);
    }
    // console.log(user);
  };

  return (
    <>
      <div className="profile-setting ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Tài Khoản Của Tôi
                </h4>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-sm-5 mt-4">
              {/* Profile Acoount */}
              <div className="card mb-25">
                <div className="card-body text-center p-0">
                  <div className="account-profile border-bottom pt-25 px-25 pb-0 flex-column d-flex align-items-center ">
                    <div className="ap-img mb-20 pro_img_wrapper">
                      <input
                        id="file-upload"
                        type="file"
                        name="fileUpload"
                        className="d-none"
                      />
                      <label htmlFor="file-upload">
                        {/* Profile picture image*/}
                        <img
                          className="ap-img__main rounded-circle wh-120"
                          src="/assets/img/admin.png"
                          alt="profile"
                        />
                        <span className="cross" id="remove_pro_pic">
                          <Camera />
                        </span>
                      </label>
                    </div>
                    <div className="ap-nameAddress pb-3">
                      <h5 className="ap-nameAddress__title">{user.name}</h5>
                      <p className="ap-nameAddress__subTitle fs-14 m-0">
                        {user.role.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="ps-tab p-20 pb-25">
                    <div
                      className="nav flex-column text-left"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <a
                        className="nav-link active"
                        id="v-pills-profile-tab"
                        data-toggle="pill"
                        href="#v-pills-profile"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="true"
                      >
                        <Settings />
                        Thông Tin Tài Khoản
                      </a>
                      <a
                        className="nav-link"
                        id="v-pills-messages-tab"
                        data-toggle="pill"
                        href="#v-pills-messages"
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected="false"
                      >
                        <Key />
                        Đổi mật khẩu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Profile Acoount End */}
            </div>
            <div className="col-xxl-9 col-lg-8 col-sm-7">
              <div className="mb-50">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    {/* Edit Profile */}
                    <div className="edit-profile mt-25">
                      <div className="card">
                        <div className="card-header  px-sm-25 px-3">
                          <div className="edit-profile__title">
                            <h6>Thông Tin Tài Khoản</h6>
                            <span className="fs-13 color-light fw-400">
                              Cập nhập thông tin tài khoản của bạn
                            </span>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit2(onSubmitProfile)}>
                          <div className="card-body">
                            <div className="row justify-content-center">
                              <div className="col-xxl-6 col-lg-8 col-sm-10">
                                <div className="edit-profile__body mx-lg-20">
                                  <div className="form-group mb-20">
                                    <label htmlFor="username">Username</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Duran Clayton"
                                      defaultValue={user.username}
                                      {...register2("username", {
                                        required: true,
                                      })}
                                    />
                                  </div>
                                  <div className="form-group mb-20">
                                    <label htmlFor="name">Họ Và Tên</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      placeholder="Duran Clayton"
                                      defaultValue={user.name}
                                      {...register2("name", { required: true })}
                                    />
                                  </div>
                                  <div className="form-group mb-1">
                                    <label htmlFor="email">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      placeholder="Contact@example.com"
                                      defaultValue={user.email}
                                      {...register2("email", {
                                        required: true,
                                      })}
                                    />
                                  </div>
                                  <div className="form-group mb-1">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="phone"
                                      placeholder="012345678"
                                      defaultValue={user.phone}
                                      {...register2("phone", {
                                        required: true,
                                      })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-xxl-6 col-lg-8 col-sm-10">
                                <div className="button-group d-flex flex-wrap pt-35 mb-35">
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-default btn-squared mr-15 text-capitalize"
                                  >
                                     {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}
                                    Lưu
                                  </button>
                                  <button className="btn btn-light btn-default btn-squared fw-400 text-capitalize">
                                    Huỷ
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* Edit Profile End */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    {/* Edit Profile */}
                    <div className="edit-profile mt-25">
                      <div className="card">
                        <div className="card-header  px-sm-25 px-3">
                          <div className="edit-profile__title">
                            <h6>Đổi mật khẩu</h6>
                            <span className="fs-13 color-light fw-400">
                              Đổi mật khẩu tài khoản của bạn
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row justify-content-center">
                            <div className="col-xxl-6 col-lg-8 col-sm-10">
                              <div className="edit-profile__body mx-lg-20">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className="form-group mb-20">
                                    <Input
                                      register={register}
                                      type="password"
                                      label="Mật khẩu Cũ"
                                      id="old_password"
                                      required="Trường này không được để trống"
                                      pattern={passwordValidator}
                                      error={errors.old_password}
                                    />
                                  </div>
                                  <div className="form-group mb-1">
                                    <div className="position-relative">
                                      <Input
                                        register={register}
                                        type="password"
                                        label="Mật khẩu Mới"
                                        id="new_password"
                                        required="Trường này không được để trống"
                                        pattern={passwordValidator}
                                        error={errors.new_password}
                                      />
                                    </div>
                                    {message && (
                                      <div className="form-group">
                                        <div
                                          className="alert alert-danger"
                                          role="alert"
                                        >
                                          {message}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="button-group d-flex flex-wrap pt-45 mb-35">
                                    <button className="btn btn-primary btn-default btn-squared mr-15 text-capitalize">
                                      {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}
                                      Lưu
                                    </button>
                                    <button className="btn btn-light btn-default btn-squared fw-400 text-capitalize">
                                      Huỷ
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Edit Profile End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
