import "./styles/button.css";

const Button = ({ title, backColor, color, type }) => {
    return (
        <button type={type} className="button" style={{ backgroundColor: backColor, color: color }}>{title}</button>
    );
};

export default Button;