/* eslint-disable react/prop-types */
function Button({ children, onClick, disabled, type }) {
  const base = " ";
  const styles = {
    primary: base + "",
    small: base + "",
    secondary: "",
    round: "",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
