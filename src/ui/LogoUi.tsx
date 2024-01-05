import { Link } from "react-router-dom";

const LogoUi = () => {
    return (
        <Link to={"/"} className="flex items-center justify-center">
            <span className="bg-active rounded-[50%] w-[16px] h-[16px] flex-center mr-2">
                <span className="bg-pure rounded-[50%] w-[25%] h-[25%]"></span>
            </span>
            <div className="text-xl font-semibold tracking-wide leading-3 text-dark/80">
                <span>F</span>
                <span className="text-active">UD</span>
                <span>O</span>
            </div>
        </Link>
    );
};

export default LogoUi;
