import { NavLink } from "react-router-dom";

interface TLink {
    to: string;
    text: string;
    id: string;
}

const defaultLinks: TLink[] = [
    {
        to: "/",
        text: "Home",
        id: "1",
    },
    {
        to: "/menu",
        text: "Menu",
        id: "2",
    },

    {
        to: "/stores",
        text: "Stores",
        id: "3",
    },
    {
        to: "/contact",
        text: "Contact",
        id: "4",
    },
];

interface TPropType {
    links?: TLink[];
}

const HeaderLinksUi = ({ links = defaultLinks }: TPropType) => {
    return (
        <div className="flex-center gap-12">
            {links.map((link) => (
                <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                        `${
                            isActive ? "text-active" : "text-dark"
                        } text-sm trnasition-all hover:text-active`
                    }
                    key={link.id}
                >
                    <span>{link.text}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default HeaderLinksUi;
