import Modal from "react-bootstrap/Modal";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { X } from "react-feather";
import { useRef } from "react";
import { useEffect } from "react";

const Detail = (props, ref) => {
  const { order, setIsShowDetail } = props;
  const [show, setShow] = useState(true);
  const _isMounted = useRef();
  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowDetail(false);
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
  });

  return (
    <Modal size="lg" show={show} onHide={handleClose} animation={false}>
      <div className="modal-content  radius-xl">
        <div className="modal-header">
          <h6 className="modal-title fw-500" id="staticBackdropLabel">
            Chi tiết đơn hàng
          </h6>
          <button type="button" className="close" onClick={handleClose}>
            <X />
          </button>
        </div>
        <div className="modal-body">
          <div className=" global-shadow  bg-white radius-xl w-100 mb-30">
            <table className="table mb-0 table-bordered table-social ">
              <thead>
                <th>
                  <span className="userDatatable-title">Tên sản phẩm</span>
                </th>
                <th>
                  <span className="userDatatable-title">Hình sản phẩm</span>
                </th>
                <th>
                  <span className="userDatatable-title">Giá sản phẩm</span>
                </th>
                <th>
                  <span className="userDatatable-title">Số lượng</span>
                </th>
                <th>
                  <span className="userDatatable-title">Tổng giá</span>
                </th>
              </thead>
              <tbody>
                {order.length > 0 &&
                  order.map((item) => (
                    <tr>
                      <td>
                        <div className="userDatatable-content text-wrap text-start">
                          {item?.Name}
                        </div>
                      </td>

                      <td>
                      <img src={item?.Images[0]} width="100" />
                      </td>
                      <td>
                        <div className="userDatatable-content text-wrap ">
                          {item?.Price}
                        </div>
                      </td>
                      <td>
                        <div className="userDatatable-content text-wrap text-center">
                          {item?.Quantity}
                        </div>
                      </td>
                      <td>
                        <div className="userDatatable-content text-wrap text-start">
                          {item?.Price * item?.Quantity}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(Detail);
