import "./styles/button.css";

const Button = ({ title, backColor, color }) => {
    return (
        <button className="button" style={{ backgroundColor: backColor, color: color }}>{title}</button>
    );
};

export default Button;