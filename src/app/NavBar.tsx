import { BiBadgeCheck, BiEditAlt, BiImageAlt, BiPlus } from "react-icons/bi";
import React from "react";

function Navigation() {
    const buttons = [
        { name: "Button 1" },
        { name: "Button 2" },
        { name: "Button 3" },
        { name: "Button 4" },
        { name: "Button 5" },
    ];

    const logoUrl = "placeholderimage.jpg"; // Replace with the URL of the logo image, if available

    const getLogoUrl = () => {
        if (logoUrl.trim() === "") {
            return "placeholderImage.png";
        } else {
            return logoUrl;
        }
    };

    return (
        <div className={"flex-col justify-end items-center m-2.5"}>
            <div className={"max-w-full h-1/5"}>
                <img src={getLogoUrl()} className={"max-w-full"} alt="Logo" width={"100%"} />
            </div>
            <div className={"flex max-w-full gap-0.5 py-0.5"}>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 px-3 flex items-center justify-center w-3/5"}>
                    <h3 className={"text-sm"}>Project Name</h3>
                </button>
                <button className={"bg-gray-200 hover:bg-gray-100 py-1 px-4 w-1/5"}>
                    <BiPlus />
                </button>
                <button className={"bg-gray-200 hover:bg-gray-100 py-1 px-4 w-1/5"}>
                    <BiEditAlt />
                </button>
            </div>
            <div className={"max-w-full h-3 bg-gray-300 mt-1 mb-1"}></div>
            <div className={"max-w-full py-0.5"}>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center"}>
                    <BiBadgeCheck className={"h-8"} />
                    <h1 className={"ml-2 text-lg"}>All Photos</h1>
                </button>
            </div>
            <div className={"max-w-full py-0.5"}>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center"}>
                    <BiBadgeCheck className={"h-8"} />
                    <h1 className={"ml-2 text-lg"}>People &amp; Tags</h1>
                </button>
            </div>
            <div className={"py-1 bg-gray-300 mt-1"}>
                <h2 className={"ml-2 text-sm"}>Collections</h2>
            </div>

            {/*These are the collection buttons*/}
            <div className="flex items-center w-full bg-gray-300 mb-1 mt-1">
                <div className="w-1/5 flex items-center justify-center">
                    <BiImageAlt className={"h-8"} />
                </div>
                <div className="w-4/5">
                    <button className="bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center">
                        <h1 className={"text-lg"}>Name</h1>
                    </button>
                </div>
            </div>
            <div className="flex items-center w-full bg-gray-300 mb-1 mt-1">
                <div className="w-1/5 flex items-center justify-center">
                    <BiImageAlt className={"h-8"} />
                </div>
                <div className="w-4/5">
                    <button className="bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center">
                        <h1 className={"text-lg"}>Name</h1>
                    </button>
                </div>
            </div>
            <div className="flex items-center w-full bg-gray-300 mb-1 mt-1">
                <div className="w-1/5 flex items-center justify-center">
                    <BiImageAlt className={"h-8"} />
                </div>
                <div className="w-4/5">
                    <button className="bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center">
                        <h1 className={"text-lg"}>Name</h1>
                    </button>
                </div>
            </div>
            <div className="flex items-center w-full bg-gray-300">
                <div className="w-1/5 flex items-center justify-center">
                    <BiImageAlt className={"h-8"} />
                </div>
                <div className="w-4/5">
                    <button className="bg-gray-200 hover:bg-gray-100 text-black py-1 px-4 w-full flex items-center">
                        <h1 className={"text-lg"}>Name</h1>
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Navigation;
