import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { ButtonUi, LogoUi, HeaderLinksUi } from "../ui";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../state";

const Header = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return (
        <>
            <div className="h-[48px] border border-b-dark/10 shadow-xs shadow-dark/20 fixed top-0 left-0 w-screen bg-pure z-10">
                <nav className="flex items-center justify-between py-2 container mx-auto">
                    <div className="flex-center gap-4">
                        <LogoUi />
                    </div>
                    <HeaderLinksUi />
                    <div className="flex-center gap-4">
                        {/* <SearchUi />
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
                        </NavLink> */}
                        {!isAuth ? (
                            <>
                                <Link to="/auth/login">
                                    <ButtonUi
                                        intent="tertiary"
                                        size="xs"
                                        rounded="small"
                                    >
                                        login
                                    </ButtonUi>
                                </Link>
                                <Link to="/auth/register/send-otp">
                                    <ButtonUi
                                        intent="secondary"
                                        size="xs"
                                        rounded="small"
                                    >
                                        Sign Up
                                    </ButtonUi>
                                </Link>
                            </>
                        ) : (
                            <NavLink
                                to="/user/all"
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "text-active ring-active"
                                            : "ring-pure-800 text-pure-800"
                                    } group flex-center ring-1 p-1.5 rounded-[50%] transition-all hover:text-active hover:ring-active`
                                }
                            >
                                <RxDashboard className="text-[14px]" />
                            </NavLink>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
