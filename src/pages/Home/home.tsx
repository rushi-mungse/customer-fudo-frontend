import { Link } from "react-router-dom";
import { FeaturedProduct } from "../../components";
import { Button } from "../../ui";

export default function HomePage() {
    return (
        <div className="min-h-screen pt-[48px]">
            <div className="container mx-auto h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="w-1/2 flex justify-center flex-col">
                        <div className="text-5xl font-bold tracking-wider text-dark">
                            <h1>
                                Your Favourite{" "}
                                <span className="text-active italic">food</span>
                            </h1>
                            <h1 className="leading-relaxed">
                                <span className="text-active italic">
                                    delivery
                                </span>{" "}
                                Partner Fudo
                            </h1>
                        </div>
                        <p className="text-dark/80 w-[80%] mt-1">
                            We are focused on being the best helping hand to
                            local bussinesses
                        </p>

                        <Link to="/menu" className="mt-12">
                            <Button intent="tertiary" size="lg" rounded="small">
                                Order Now
                            </Button>
                        </Link>

                        <div className="mt-8 h-20">reviews</div>
                    </div>
                    <div className="w-1/2">
                        <img src="/food.png" alt="food" />
                    </div>
                </div>
            </div>
            <FeaturedProduct />
        </div>
    );
}
