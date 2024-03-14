import "./styles/button.css";

const Button = ({ title, backColor, color, type, onClick, borderRadius }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="button"
      style={{
        backgroundColor: backColor,
        color: color,
        borderRadius: borderRadius,
      }}
    >
      {title}
    </button>
  );
};

export default Button;
