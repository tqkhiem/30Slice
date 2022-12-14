const Input = ({
  type = 'text',
  id,
  label,
  register,
  required = 'Trường này không được để trống',
  pattern,
  error,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className={`form-control ${error && 'is-invalid'}`}
        {...register(id, {
          required,
          pattern,
        })}
      />
      {error && <span className="invalid-validate">{error.message}</span>}
    </>
  );
};

export default Input;
