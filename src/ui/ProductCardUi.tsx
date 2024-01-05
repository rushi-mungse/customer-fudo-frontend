import { ButtonUi } from "./";

interface ProductType {
    name: string;
    description: string;
    discount: number;
    price: number;
    imageUrl: string;
    size: string;
    currency: string;
    availability: boolean;
    preparationTimeInMinute: number;
    category: string;
    ingredients: string;
}

interface PropsType {
    product?: ProductType;
}

const ProductCardUi = ({ product }: PropsType) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="relative flex items-center rounded-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:bg-dark/10 transition-all">
                <div className="absolute bg-active rounded-[50%] h-10 w-10 top-2 right-2 flex-center flex-col">
                    <span className="text-xs text-pure">50%</span>
                    <span className="text-[8px] text-pure">Off</span>
                </div>
                <div className="p-3 bg-active rounded-md flex items-center justify-center">
                    <img className="w-[350px] " src={`/food.png`} alt="food" />
                </div>
                <div className="w-[400px]">
                    <div className="flex items-center justify-center flex-col">
                        <span className="text-active italic text-md px-3 py-1 my-2">
                            Special Pizza
                        </span>
                        <p className="text-center text-dark/80 text-sm w-[80%]">
                            Original glaze with pizza frosting topped with
                            golden sprinkles
                        </p>
                    </div>
                    <div className="flex items-center justify-between w-[80%] mx-auto mt-4">
                        <span className="text-active text-sm">$ 100</span>
                        <ButtonUi intent="tertiary" rounded="medium" size="sm">
                            Add
                        </ButtonUi>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardUi;
