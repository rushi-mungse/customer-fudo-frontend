import { Link } from "react-router-dom";
import { FeaturedProduct, Review, WhatWeServe } from "../../components";
import { Button } from "../../ui";
import { Rate } from "antd";

export default function HomePage() {
    return (
        <div className="min-h-screen pt-[48px]">
            <section className="min-h-screen">
                <div className="container mx-auto">
                    <div className="flex-center min-h-screen">
                        <div className="w-1/2 flex justify-center flex-col">
                            <div className="text-5xl font-bold tracking-wider text-dark">
                                <h1>
                                    Your Favourite{" "}
                                    <span className="text-active italic">
                                        food
                                    </span>
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
                                <Button
                                    intent="tertiary"
                                    size="lg"
                                    rounded="small"
                                >
                                    Order Now
                                </Button>
                            </Link>

                            <div className="mt-8 flex items-center">
                                <Review />
                                <div className="flex flex-col ml-4">
                                    <span className="font-semibold tracking-wide">
                                        Our Happy Customer
                                    </span>
                                    <span>
                                        <Rate
                                            disabled
                                            count={1}
                                            defaultValue={4}
                                            className="text-sm"
                                        />
                                        <Link
                                            to={"/reviews"}
                                            className="text-sm text-active ml-2 hover:text-active-600"
                                        >
                                            (12.5k Reviews)
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <img src="/food.png" alt="food" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-bl from-red-100 via-red-50 to-gray-50 rounded-b-xl min-h-screen">
                <div className="container mx-auto py-16 ">
                    <WhatWeServe />
                </div>
            </section>
            <section className="mt-8">
                <FeaturedProduct />
            </section>
        </div>
    );
}
