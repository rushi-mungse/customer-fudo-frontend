interface ServePropType {
    imgUrl: string;
    description: string;
    heading: string;
}

type PropsType = ServePropType & React.HtmlHTMLAttributes<HTMLDivElement>;

const ServeUi = ({ imgUrl, description, heading }: PropsType) => {
    return (
        <div className="flex-center flex-col">
            <img src={imgUrl} alt={`serve-${imgUrl}`} className="h-[300px]" />
            <h1 className="text-active font-semibold leading-slug text-lg">
                {heading}
            </h1>
            <span className="w-[60%] line-clamp-2 text-center text-lg font-light tracking-wide">
                {description}
            </span>
        </div>
    );
};

export default ServeUi;
