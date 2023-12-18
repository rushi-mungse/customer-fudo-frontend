import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={"/"}>
            <div className="text-xl font-semibold tracking-wide leading-3 text-dark/80">
                <span>F</span>
                <span className="text-active">UD</span>
                <span>O</span>
            </div>
        </Link>
    );
};

export default Logo;
