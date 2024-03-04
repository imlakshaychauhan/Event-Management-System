import "./styles/button.css";

const Button = ({ title, backColor, color, type, onClick }) => {
    return (
        <button onClick={onClick} type={type} className="button" style={{ backgroundColor: backColor, color: color }}>{title}</button>
    );
};

export default Button;