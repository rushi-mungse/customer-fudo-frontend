import { Link } from "react-router-dom";
import { ProductCardUi } from "../ui";

const FeaturedProduct = () => {
    return (
        <div className="min-h-screen min-w-screen">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl tracking-wider leading-20 font-semibold text-dark/90">
                        Our Featured Food
                    </h1>
                    <Link to="/menu">
                        <span className="text-active hover:text-active/80 text-sm">
                            See all Food ⭢
                        </span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 container mx-auto py-8">
                <ProductCardUi />
                <ProductCardUi />
                <ProductCardUi />
                <ProductCardUi />
            </div>
        </div>
    );
};

export default FeaturedProduct;
