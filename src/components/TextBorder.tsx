interface TPropType {
    text: string;
}

const TextBorder = ({ text = "Or" }: TPropType) => {
    return (
        <div className="flex items-center justify-center my-4">
            <hr className="border border-dark/10 h-[1px] w-[150px]" />
            <span className="px-3 py-1 rounded-full text-dark/80 border border-dark/20 text-sm">
                {text}
            </span>
            <hr className="border border-dark/10 h-[1px] w-[150px]" />
        </div>
    );
};

export default TextBorder;
