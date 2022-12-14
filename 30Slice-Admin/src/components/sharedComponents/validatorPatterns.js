export const usernameValidator = {
  value: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g,
  message: 'Vui lòng nhập đúng định dạng tên người dùng',
};

export const passwordValidator = {
  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
  message: 'Mật khẩu tối thiểu 8 kí tự. Bao gồm chữ in hoa, in thường và số!',
};
