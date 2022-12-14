import Modal from "react-bootstrap/Modal";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { X } from "react-feather";
import { useRef } from "react";
import { useEffect } from "react";

const Detail = (props) => {
  return (
    <div
      className="modal-basic modal fade show"
      id={"modal-info" + props?.item?.Id_User}
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content modal-bg-white ">
          <div className="modal-header">
            <h6 className="modal-title">Chi tiếtkhách hàng</h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span data-feather="x" />
            </button>
          </div>
          <div className="modal-body">
            <div className="global-shadow ">
              <div className="table-responsive">
                <table className="table mb-0 ">
                  <tbody>
                    <tr className="userDatatable-header">
                      <th>
                        <span className=" userDatatable-title">
                          Họ và tên
                        </span>
                      </th>
                      <th>
                        <span className=" userDatatable-header">
                          {props?.item?.user?.Full_Name}
                        </span>
                      </th>
                    </tr>
                    <tr className="userDatatable-header">
                      <th>
                        <span className=" userDatatable-title">
                          Tên người dùng
                        </span>
                      </th>
                      <th>
                        <span className=" userDatatable-header">
                          {props?.item?.user?.Username}
                        </span>
                      </th>
                    </tr>
                    <tr className="userDatatable-header">
                      <th>
                        <span className=" userDatatable-title">
                          Email
                        </span>
                      </th>
                      <th>
                        <span className=" userDatatable-header">
                          {props?.item?.user?.Email}
                        </span>
                      </th>
                    </tr>
                    <tr className="userDatatable-header">
                      <th>
                        <span className=" userDatatable-title">
                          Số điện thoại
                        </span>
                      </th>
                      <th>
                        <span className=" userDatatable-header">
                          {props?.item?.user?.Phone}
                        </span>
                      </th>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
