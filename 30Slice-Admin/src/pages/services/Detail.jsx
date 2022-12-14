import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";

const Detail = (props, ref) => {
  const { service, setIsShowDetail } = props
  const [show, setShow] = useState(true);
  const _isMounted = useRef();
  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowDetail(false)
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
            Chi tiết dịch vụ
          </h6>
          <button
            type="button"
            className="close"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className="modal-body">
          <div className=" global-shadow  bg-white radius-xl w-100 mb-30">
            <table className="table mb-0 table-bordered table-social ">
              <tbody>
                <tr>
                  <td>Tên dịch vụ</td>
                  <td className="text-wrap">{service?.Name}</td>
                </tr>
                <tr>
                  <td>Ảnh dịch vụ</td>
                  <td>
                    <img src={service?.Images} width="100" />
                  </td>
                </tr>
                <tr>
                  <td>Giá dịch vụ</td>
                  <td>{service?.Price}</td>
                </tr>
                <tr>
                  <td>Mô tả dịch vụ</td>
                  <td className="text-wrap">{service?.Describe}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(Detail);
