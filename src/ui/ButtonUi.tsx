import { cva, type VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";

const ButtonVariants = cva(
    "tracking-wider transition-all w-fit font-light cursor-pointer",
    {
        variants: {
            intent: {
                primary: "bg-pure text-dark hover:bg-pure-200 ring-1 ring-dark",
                secondary:
                    "bg-dark text-pure ring-1 ring-dark hover:bg-pure-600",
                tertiary: "bg-active text-pure hover:bg-active-600",
            },
            size: {
                xs: "px-5 py-1.5 text-xs",
                sm: "px-6 py-2 text-xs",
                md: "px-5 py-1.5 text-sm",
                lg: "px-7 py-3 text-sm",
            },
            rounded: {
                normal: "",
                small: "rounded-sm",
                medium: "rounded-md",
                full: "rounded-full",
                circle: "rounded-[50%]",
            },
            _contentType: {
                icon: "",
                textAndIcon: "inline-flex items-center",
                text: "",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
            _contentType: "text",
        },
        compoundVariants: [
            {
                _contentType: ["textAndIcon"],
                className: "gap-x-3",
            },
            {
                rounded: "circle",
                className: "p-0 inline-block h-4 w-4",
            },
        ],
    }
);

export type TButtonVariants = Omit<
    VariantProps<typeof ButtonVariants>,
    "_contentType"
> &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    (
        | { leadingIcon?: IconType; trailingIcon?: never }
        | { leadingIcon?: never; trailingIcon?: IconType }
    );

const ButtonUi = ({
    intent,
    size,
    rounded,
    children,
    className,
    trailingIcon: TrailingIcon,
    leadingIcon: LeadingIcon,
    ...props
}: TButtonVariants) => {
    return (
        <button
            className={ButtonVariants({
                className,
                intent,
                size,
                rounded,
                _contentType:
                    LeadingIcon || TrailingIcon ? "textAndIcon" : "text",
            })}
            {...props}
        >
            {LeadingIcon && <LeadingIcon />}
            {children}
            {TrailingIcon && <TrailingIcon />}
        </button>
    );
};

export default ButtonUi;
