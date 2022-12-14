export const usernameValidator = {
  value: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g,
  message: 'Vui lòng nhập đúng định dạng tên người dùng',
};

export const passwordValidator = {
  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
  message: 'Mật khẩu tối thiểu 8 kí tự. Bao gồm chữ in hoa, in thường và số!',
};
    // /^\+84[3|5|7|8|9][0-9]{8}$/.test(phone);
export const phoneValidator = {
  value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
  message: 'Số điện thoại bắt đầu từ 0 và có 10 số',
};