import { NavLink } from "react-router-dom";

const HeaderLinks = () => {
    return (
        <div className="flex-center gap-12">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${
                        isActive ? "text-active" : "text-dark"
                    } text-sm trnasition-all hover:text-active`
                }
            >
                <span>Home</span>
            </NavLink>
            <NavLink
                to="/menu"
                className={({ isActive }) =>
                    `${
                        isActive ? "text-active" : "text-dark"
                    } text-sm trnasition-all hover:text-active`
                }
            >
                <span>Menu</span>
            </NavLink>
            <NavLink
                to="/stores"
                className={({ isActive }) =>
                    `${
                        isActive ? "text-active" : "text-dark"
                    } text-sm trnasition-all hover:text-active`
                }
            >
                <span>Stores</span>
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    `${
                        isActive ? "text-active" : "text-dark"
                    } text-sm trnasition-all hover:text-active`
                }
            >
                <span>Contact Us</span>
            </NavLink>
        </div>
    );
};

export default HeaderLinks;
