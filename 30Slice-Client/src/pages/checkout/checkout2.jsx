import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

import Select from "react-select";
import useLocationSelect from "./useLocationSelect";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { setInfo } from "../../app/redux/slices/user/CartSlice";
const Checkout2 = () => {
  const dataUser = useSelector((state) => state.auth.user);
  // console.log(dataUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationSelect(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const refCustomerName = useRef();
  const refCustomerPhone = useRef();
  const refCustomerEmail = useRef();
  const refCustomerStreet = useRef();
  const refCustomerNote = useRef();
  const nextStepCheckout = () => {
    if (
      refCustomerName.current.value === "" ||
      refCustomerPhone.current.value === "" ||
      refCustomerEmail.current.value === "" ||
      refCustomerStreet.current.value === "" ||
      selectedCity === null ||
      selectedDistrict === null ||
      selectedWard === null
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      let data = {
        id_Customer: dataUser.id,
        name: refCustomerName.current.value,
        phone: refCustomerPhone.current.value,
        email: refCustomerEmail.current.value,
        address:
          refCustomerStreet.current.value +
          ", " +
          selectedWard.label +
          ", " +
          selectedDistrict.label +
          ", " +
          selectedCity.label,
        note: refCustomerNote.current.value,
      };
      // console.log(data);
      dispatch(setInfo(data));
      navigate("/checkout3");
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Địa chỉ nhận hàng
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className=" checkout wizard1 global-shadow border px-sm-50 px-20 pt-sm-50 py-30 mb-30 bg-white radius-xl w-100">
          <div className="row">
            <div className="col-xl-8">
              <div className="checkout-progress-indicator content-center">
                <div className="checkout-progress">
                  <div className="step" id={1}>
                    <span>
                      {" "}
                      <img
                        className="svg"
                        src="/assets/img/svg/user-success.svg"
                        alt=""
                      />{" "}
                    </span>
                    <span>Đăng nhập</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkoutin.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step active" id={2}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/adress-active.svg"
                        alt=""
                      />
                    </span>
                    <span>Thông tin người nhận</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkout.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={3}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/155-credit-card.svg"
                        alt=""
                      />
                    </span>
                    <span>Phương thức thanh toán</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkout.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={4}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/024-like.svg"
                        alt=""
                      />
                    </span>
                    <span>Hoàn thành đơn hàng</span>
                  </div>
                </div>
              </div>

              {/* checkout */}
              <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-8 col-sm-10">
                  <div className="card checkout-shipping-form border-0">
                    <div className="card-header border-bottom-0 align-content-start pb-sm-0 pb-1">
                      <h4 className="fw-500">
                        2. Xác nhận thông tin khách hàng
                      </h4>
                    </div>
                    <div className="card-body">
                      <form
                        id="customer-info-form"
                        className="row contact_form"
                        noValidate="novalidate"
                      >
                        <div className="col-md-12 form-group">
                          <label htmlFor="">Tên người nhận</label>
                          <input
                            type="text"
                            className="form-control"
                            id="customer_name"
                            name="customer_name"
                            placeholder="Tên khách hàng"
                            ref={refCustomerName}
                            defaultValue={dataUser.name}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="">Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="customer_phone"
                            name="customer_phone"
                            placeholder="Số điện thoại"
                            ref={refCustomerPhone}
                            defaultValue={dataUser.phone}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="customer_email"
                            name="customer_email"
                            placeholder="Email"
                            ref={refCustomerEmail}
                            defaultValue={dataUser.email}
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="">Địa chỉ</label>
                          <input
                            type="text"
                            className="form-control"
                            id="detail_address"
                            name="detail_address"
                            placeholder="Địa chỉ"
                            ref={refCustomerStreet}
                          />
                        </div>

                        {/* <LocationSelect /> */}
                        <div className="col-md-12 form-group">
                          <Select
                            className="country_select mb-3"
                            name="cityId"
                            key={`cityId_${selectedCity?.value}`}
                            isDisabled={cityOptions.length === 0}
                            options={cityOptions}
                            onChange={(option) => onCitySelect(option)}
                            placeholder="Tỉnh/Thành"
                            defaultValue={selectedCity}
                          />

                          <Select
                            className="country_select mb-3"
                            name="districtId"
                            key={`districtId_${selectedDistrict?.value}`}
                            isDisabled={districtOptions.length === 0}
                            options={districtOptions}
                            onChange={(option) => onDistrictSelect(option)}
                            placeholder="Quận/Huyện"
                            defaultValue={selectedDistrict}
                          />

                          <Select
                            className="country_select"
                            name="wardId"
                            key={`wardId_${selectedWard?.value}`}
                            isDisabled={wardOptions.length === 0}
                            options={wardOptions}
                            placeholder="Phường/Xã"
                            onChange={(option) => onWardSelect(option)}
                            defaultValue={selectedWard}
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="">Ghi chú</label>
                          <textarea
                            className="form-control"
                            name="message"
                            id="message"
                            rows={3}
                            placeholder="Ghi chú"
                            defaultValue={""}
                            ref={refCustomerNote}
                          />
                        </div>
                      </form>
                      <div className="col-md-12 form-group">
                        <button
                          className="btn btn-primary btn-default btn-squared "
                          onClick={nextStepCheckout}
                        >
                          Tiếp tục
                          <i className="ml-10 mr-0 las la-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ends: card */}
                </div>
                {/* ends: col */}
              </div>
            </div>
            {/* ends: col */}
            <div className="col-xl-4 col-md-8 col-sm-10 mx-auto">
              <div className="card order-summery order-summery--width  bg-normal p-sm-25 p-15">
                <div className="card-header border-bottom-0 p-0 pb-25">
                  <h5 className="fw-500">Tổng đơn hàng</h5>
                </div>
                <div className="card-body bg-white">
                  <OrderSummary />
                </div>
              </div>
              {/* ends: card */}
            </div>
            {/* ends: col */}
          </div>
        </div>
        {/* End: .global-shadow*/}
      </div>
    </>
  );
};
export default Checkout2;
