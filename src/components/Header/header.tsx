import { Link, NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { Button, Logo, HeaderLinks, InputWithSearch } from "../../ui";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../state/store";

const Header = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return (
        <>
            <div className="h-[48px] border border-b-dark/10 shadow-xs shadow-dark/20 fixed top-0 left-0 w-screen bg-pure z-10">
                <nav className="flex items-center justify-between py-2 container mx-auto">
                    <div className="flex-center gap-4">
                        <Logo />
                        {/* <div className="flex items-center gap-1 ring-1 ring-dark/80 px-3 py-1 rounded-full w-[200px] h-7">
                            <span className="bg-active rounded-[50%] w-[15px] h-[15px] flex-center">
                                <span className="bg-pure rounded-[50%] w-[25%] h-[25%]"></span>
                            </span>
                            <SelectWithSearch />
                        </div> */}
                    </div>
                    <HeaderLinks />
                    <div className="flex-center gap-4">
                        <InputWithSearch />

                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `${
                                    isActive ?? "text-active"
                                } group flex-center ring-pure-800 text-pure-800 ring-1 px-3 py-1 rounded-full gap-1 transition-all hover:text-active hover:ring-active`
                            }
                        >
                            <GiShoppingCart className="text-lg group-transition-all" />
                            <span className="text-xs group-transition-all">
                                10
                            </span>
                        </NavLink>
                        {!isAuth ? (
                            <>
                                <Link to="/auth/login">
                                    <Button
                                        intent="tertiary"
                                        size="xs"
                                        rounded="small"
                                    >
                                        login
                                    </Button>
                                </Link>
                                <Link to="/auth/signup">
                                    <Button
                                        intent="secondary"
                                        size="xs"
                                        rounded="small"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <NavLink
                                to="/user"
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "text-active ring-active"
                                            : "ring-pure-800 text-pure-800"
                                    } group flex-center ring-1 p-1.5 rounded-[50%] transition-all hover:text-active hover:ring-active`
                                }
                            >
                                <FaRegUser className="text-[14px]" />
                            </NavLink>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
