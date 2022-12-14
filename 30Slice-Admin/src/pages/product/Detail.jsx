import Modal from "react-bootstrap/Modal";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { X } from "react-feather";
import { useRef } from "react";
import { useEffect } from "react";

const Detail = (props, ref) => {
    const {product,setIsShowDetail} = props
  const [show, setShow] = useState(true);
  const _isMounted = useRef();
  const handleClose = () => {
    _isMounted.current && setShow(false);
    _isMounted.current && setIsShowDetail(false)
  };
  useImperativeHandle(ref, () => ({
    handleShow() {
        _isMounted.current&& setShow(true);
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
            Chi tiết sản phẩm
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
              <tr>
                <td>Tên sản phẩm</td>
                <td className="text-wrap">{product?.Name}</td>
              </tr>
              <tr>
                <td>Hình sản phẩm</td>
                <td>
                {product?.Images.length > 0 && product?.Images.map(item => (
                    <img src={item} width="100"/>
                ))}
                </td>
              </tr>
              <tr>
                <td>Giá sản phẩm</td>
                <td>{product?.Price}</td>
              </tr>
              <tr>
                <td>Số lượng đã bán</td>
                <td>{product?.Saled}</td>
              </tr>
              <tr>
                <td>Thuộc loại sản phẩm</td>
                <td>{product?.Id_Categories?.Name}</td>
              </tr>
              <tr>
                <td>Chi tiết</td>
                <td className="text-wrap">{product?.Details}</td>
              </tr>
              <tr>
                <td>Số lượng sản phẩm</td>
                <td>{product?.InStock}</td>
              </tr>
              <tr>
                <td>Lượt xem sản phẩm</td>
                <td>{product?.Views}</td>
              </tr>
              <tr>
                <td>Mô tả sản phẩm sản phẩm</td>
                <td className="text-wrap">{product?.Describe}</td>
              </tr>
              <tr>
                <td>Thêm ngày </td>
                <td>{moment(product?.createdAt).format("L")}</td>
              </tr>
              <tr>
                <td>(%) Giảm giá </td>
                <td>{product?.Discount}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(Detail);
