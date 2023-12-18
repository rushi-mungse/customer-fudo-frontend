interface IOtpData {
    otpDigits: string[];
    otpInputRef: React.RefObject<HTMLInputElement>[];
    handleOnChange: (e: React.KeyboardEvent, index: number) => void;
}

type TPropType = IOtpData & React.HTMLAttributes<HTMLElement>;

const OtpBox = ({
    otpDigits,
    otpInputRef,
    handleOnChange,
    className,
    ...props
}: TPropType) => {
    return (
        <div
            className={`flex items-center justify-center gap-4 + ${
                className ?? className
            }`}
            {...props}
        >
            {otpDigits.map((digit, index) => (
                <input
                    key={index}
                    type="number"
                    ref={otpInputRef[index]}
                    className="w-9 h-9 text-center text-dark/80 border rounded-md p-2 shadow-lg shadow-dark/30 bg-pure outline-none border-dark/80"
                    placeholder="0"
                    onKeyDown={(e) => handleOnChange(e, index)}
                    onChange={() => {}}
                    value={digit}
                />
            ))}
        </div>
    );
};

export default OtpBox;
