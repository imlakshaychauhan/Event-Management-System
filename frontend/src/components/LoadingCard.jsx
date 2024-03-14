import "./styles/loadingcard.css";

const LoadingCard = ({color}) => {
  return (
    <div className="loadingcard">
      <p style={{ color: color }} >Load More +</p>
    </div>
  );
}

export default LoadingCard