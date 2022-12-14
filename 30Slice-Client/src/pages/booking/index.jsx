import { useState, useRef, useEffect } from "react";
import Notiflix from "notiflix";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { useNavigate } from "react-router-dom";
import {
  fetchArrEmployee,
  fetchArrService,
  LoginCustomer,
  RegisterCustomer,
  CreateBooking,
} from "../../app/services/booking/booking.service";
import { create7Date, getAvailableTime } from "./func";
import { useSelector } from "react-redux";
import "../../App.css";
import {
  usernameValidator,
  phoneValidator,
  passwordValidator,
} from "../../components/sharedComponents/validatorPatterns";
import { useForm } from "react-hook-form";

function Booking(props) {
  const userInfo = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [BookedTime, setBookedTime] = useState("");
  const [ServiceId, setServiceId] = useState(0);
  const [CustomerInfo, setCustomerInfo] = useState({});
  const [arrEmployee, setArrEmployee] = useState([]);
  const [arrService, setArrService] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idStylist, setIdStylist] = useState(0);
  const arrDate = create7Date();
  const [errorPhone, setErrorPhone] = useState({});
  const [errorName, setErrorname] = useState({});
  const refDate = useRef(arrDate[0].dateEn);
  const refStyleList = useRef(0);
  const refPhone = useRef("");
  const refCustomerName = useRef("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // hàm get stylist theo ngày
  const loadArrStyleList = async () => {
    setLoading(true);
    const data = await fetchArrEmployee(refDate.current.value);
    if (data) {
      setArrEmployee(data);
      setLoading(false);
    }
  };
  // hàm get dịch vụ
  const loadArrService = async () => {
    setLoading(true);
    const data = await fetchArrService();
    if (data) {
      setArrService(data);
      setLoading(false);
    }
  };
  const isValidPhone = (value) => {
    if (value && /^0[3|5|7|8|9][0-9]{8}$/.test(value)) {
      return true;
    }
    return false;
  };
  const onBlurPhone = async () => {
    let phone = refPhone.current.value;
    if (!isValidPhone(phone)) {
      setErrorPhone({ phone: "Số điện thoại không hợp lệ" });
      return;
    }
    setErrorPhone();
    setLoading(true);
    const res = await LoginCustomer(phone);
    if (res.status === 200) {
      setCustomerInfo(res.data);
      refCustomerName.current.value = res.data.Full_Name;
    setErrorname();

    }
    setLoading(false);
  };
  const onBlurName = async () => {
    let name = refCustomerName.current.value;
    let phone = refPhone.current.value;
    if (!isValidPhone(phone)) {
      setErrorPhone({ phone: "Số điện thoại không hợp lệ" });
      return;
    } else if (!name) {
      setErrorname({ name: "Tên không được để trống" });
      return;
    }
    // setError();
    setErrorname();
    setLoading(true);
    const res = await RegisterCustomer({ name, phone });

    if (res.status === 200) {
      setCustomerInfo(res.data);
      setLoading(false);
    }
  };
  const CreateBook = async (e) => {
    if (!CustomerInfo.Id_User) {
      return;
    }
    let idStylelist;
    if (refStyleList.current.value === "0") {
      idStylelist = idStylist;
    } else {
      idStylelist = refStyleList.current.value;
    }
    let data = {
      Id_Customer: CustomerInfo.Id_User,
      Id_Service: ServiceId,
      Id_Style_List: idStylelist,
      BookedTime: BookedTime,
      BookedDate: refDate.current.value,
      Phone: CustomerInfo.Phone,
      Note: e.note,
    };

    setLoading(true);
    const res = await CreateBooking(data);

    if (res.status === 200) {
      toastSuccess("Đặt lịch thành công");
      setLoading(false);
      navigate("/booking-success/" + res.data._id);
    } else {
      toastError("Đặt lịch thất bại");
      setLoading(false);
    }
  };
  useEffect(() => {
    loadArrService();
    if (userInfo.isLoggedIn) {
      refPhone.current.value = userInfo.user.phone;
      onBlurPhone();
    }
  }, []);
  useEffect(() => {
    loadArrStyleList();
  }, [refDate.current.value]);

  useEffect(() => {
    reloadListTime();
  }, [BookedTime, arrEmployee]);
  // hàm load lại danh sách thời gian
  const reloadListTime = () => {
    const arrAvailableTime = getAvailableTime(
      refDate.current.value,
      arrEmployee
    );
    setListTime(
      Object.entries(arrAvailableTime).map((ele, index) => {
        const isAvailable =
          Object.values(ele[1]).length === 0
            ? false
            : refStyleList.current.value !== "0"
            ? typeof ele[1][refStyleList.current.value] !== undefined &&
              ele[1][refStyleList.current.value] === true
            : true;
        const idStylist = Object.keys(ele[1]).filter(
          (key) => ele[1][key] === true
        );
        return (
          <div
            key={index}
            className="form-check col-3 col-sm-2 col-md-2 col-lg-1 mb-2"
          >
            <input
              className="btn-check "
              type="radio"
              name="flexRadioDefault"
              onChange={() => setBookedTime(ele[0])}
              disabled={!isAvailable}
              id={ele[0]}
              style={{ display: "none" }}
              onClick={() => setIdStylist(idStylist[0])}
            />
            <label
              className={`form-check-label btn px-4 border ${
                BookedTime == ele[0] && isAvailable
                  ? "btn-success"
                  : "border-success text-success"
              }${!isAvailable ? "btn-default border-light" : ""}`}
              htmlFor={ele[0]}
              style={{ opacity: !isAvailable ? "0.5" : "1" }}
            >
              {ele[0]}
            </label>
          </div>
        );
      })
    );
  };

  return (
    <div className="contents container">
      <h1>
        Chào mừng anh/chị {CustomerInfo?.Full_Name},đến với trang đặt
        lịch 30Slice!
      </h1>
      <form onSubmit={handleSubmit(CreateBook)}>
        <div className="form-floating m-3">
          <label htmlFor="phone">
            Nhập số điện thoại<sup className="text-danger">*</sup>
          </label>
          <input
            type="text"
            className={
              !!errorPhone?.phone
                ? "is-invalid form-control form-control-lg"
                : "form-control form-control-lg"
            }
            placeholder="Số điện thoại..."
            id="phone"
            ref={refPhone}
            onBlur={onBlurPhone}
            disabled={CustomerInfo?.Phone}
            required
          />
          {errorPhone && (
            <span className="invalid-validate">{errorPhone?.phone}</span>
          )}
        </div>
        <div className="form-floating m-3">
          <label htmlFor="name">
            Nhập họ và tên<sup className="text-danger">*</sup>
          </label>
          <input
            type="text"
            className={
              !!errorName?.name
                ? "is-invalid form-control form-control-lg"
                : "form-control form-control-lg"
            }
            placeholder="Họ và tên."
            id="name"
            ref={refCustomerName}
            disabled={CustomerInfo && CustomerInfo.Full_Name}
            required
            onBlur={onBlurName}
          />
          {errorName && (
            <span className="invalid-validate">{errorName?.name}</span>
          )}
        </div>
        <div className="form-floating m-3">
          <label htmlFor="date">Chọn ngày</label>
          <select
            className="form-control  form-control-lg"
            id="date"
            aria-label="Chọn ngày"
            ref={refDate}
            onChange={() => {
              reloadListTime();
            }}
          >
            {arrDate &&
              arrDate.map((item, index) => (
                <option key={index} value={item.dateEn}>
                  {item.dateVn}
                </option>
              ))}
          </select>
        </div>
        <div className="form-floating m-3">
          <label htmlFor="">
            Chọn Dịch vụ<sup className="text-danger">*</sup>
          </label>
          <div className="row m-3">
            {arrService &&
              arrService.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                  >
                    <div className="card card-default card-md mb-4">
                      <div className="card-header py-20">
                        <h6>{item.Name}</h6>
                      </div>
                      <div className="card-body">
                        <img className="w-100" src={item.Images} alt="" />
                        <p>
                          Giá : <b>{item.Price.toLocaleString("vi-VN")}</b> vnđ
                        </p>
                        <a
                          data-toggle="collapse"
                          data-target={"#collapse" + item._id}
                          aria-expanded="true"
                          aria-controls={"collapse" + item._id}
                        >
                          Xem thêm
                        </a>

                        <div
                          id={"collapse" + item._id}
                          className="collapse atbd-collapse-item__body"
                        >
                          <div className="collapse-body-text">
                            <p>{item.Describe}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="service"
                          className="radio-custom btn btn-outline-info"
                          onChange={() => setServiceId(item._id)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="form-floating m-3">
          <label htmlFor="stylelist">Chọn nhân viên</label>
          <select
            className="form-control  form-control-lg"
            id="stylelist"
            aria-label="Chọn nhân viên"
            ref={refStyleList}
            onChange={() => {
              reloadListTime();
            }}
          >
            <option value="0">Ngẫu nhiên</option>
            {arrEmployee &&
              arrEmployee.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.Full_Name}
                </option>
              ))}
          </select>
        </div>
        <label className="m-3">
          Chọn thời gian<sup className="text-danger">*</sup>
        </label>
        <div className="row my-3">{listTime}</div>
        <div className="form-group form-element-textarea mb-20">
          <label htmlFor="note" className="il-gray fs-14 fw-500 align-center">
            Ghi chú
          </label>
          <textarea
            className="form-control"
            id="note"
            rows={3}
            defaultValue={""}
            placeholder="Tôi muốn ghi chú..."
            {...register("note", {
              required: false,
            })}
          />
        </div>

        <button
          className="btn btn-primary btn-lg btn-squared btn-block "
          type="submit"
          disabled={loading || errorPhone || errorName}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Đặt lịch ngay
        </button>
      </form>
    </div>
  );
}

export default Booking;
