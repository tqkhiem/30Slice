import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
const ModalConfirm = (props, ref) => {
  const { Name, id, funcDelete } = props;
  const [show, setShow] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const _isMounted = useRef();
  const handleClose = () => {
    _isMounted.current && setShow(false);
  };

  useImperativeHandle(ref, () => ({
    handleShow() {
      _isMounted.current && setShow(true);
    },
    handleClose() {
      _isMounted.current && setShow(false);
    },
  }));

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (confirm) {
      funcDelete(id);
      _isMounted.current && setShow(false);
    }
    
  }, [confirm]);
  return (
    <Modal
      className="text-center"
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-info-body">
            <div className="modal-info-icon warning">
              <span data-feather="info" />
            </div>
            <div className="modal-info-text">
              <h6>
                Bạn có thực sự muốn xoá <b>{Name}</b>?
              </h6>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger btn-outlined btn-sm"
            onClick={() => setShow(false)}
          >
            Không
          </button>
          <button
            onClick={() => setConfirm(true)}
            type="button"
            className="btn btn-success btn-outlined btn-sm"
          >
            Xoá
          </button>
        </div>
      </div>
    </Modal>
  );
};

ModalConfirm.defaultProps = {
  Name: "",
  id: "",
  funcDelete: () => {},
};

export default forwardRef(ModalConfirm);
