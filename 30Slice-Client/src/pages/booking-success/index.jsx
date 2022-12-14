import { Link, useParams } from "react-router-dom";
import { getBookingById } from "../../app/services/booking/booking.service";
import { useEffect, useState } from "react";
export default function BookingSuccess() {
  const { id } = useParams();
  // console.log(id);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const fetchBookingById = async () => {
    setLoading(true);
    const response = await getBookingById(id);
    // console.log(response);
    setBooking(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookingById();
  }, []);

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="card-body">
          <div className="spin-container text-center">
            <div className="atbd-spin-dots spin-lg">
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
              <span className="spin-dot badge-dot dot-primary"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center  mb-5">
          <h1 className="mt-5">Đặt lịch thành công</h1>
          <hr className="m-1 p-2" />
          <div className="card-body">
            <h5 className="card-title">Cảm ơn bạn đã đặt lịch</h5>
            <p className="card-text">Thông tin Salon</p>
            <p>
              Địa chỉ Salon : <b>123 Hai Bà Trưng, Phường 10, Quận 1,TP. HCM</b>
            </p>
            <p>
              Số điện thoại Salon : <b>0987.654.321</b>
            </p>
            <p className="card-text">Thông tin đặt lịch của bạn</p>
            <p>
              Thời gian đặt lịch :{" "}
              <b className="text-success">
                {booking?.BookedTime} giờ ngày {booking?.BookedDate}
              </b>
            </p>
            <p>
              Dịch vụ đã đặt :{" "}
              <b className="text-success">
                {booking?.Service && booking?.Service.Name}
              </b>
              <b>
                {" "}
                giá{" "}
                {booking?.Service &&
                  booking?.Service.Price.toLocaleString("vi-VN")}{" "}
                vnđ
              </b>
            </p>
            <p>
              Số điện thoại người đặt :{" "}
              <b className="text-success">
                {booking?.Customer && booking?.Customer.Phone}
              </b>
            </p>
            <p>
              Tên người đặt :{" "}
              <b className="text-success">
                {booking?.Customer && booking?.Customer.Full_Name}
              </b>
            </p>
            <p>
              Thợ cắt tóc đã chọn :{" "}
              <b>{booking?.StyleList && booking?.StyleList.Full_Name}</b>
            </p>
            <p>
              Ghi chú : <b>{booking?.Note}</b>
            </p>
            <Link to="/" className="btn btn-primary m-auto">
              Trở về trang chủ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
