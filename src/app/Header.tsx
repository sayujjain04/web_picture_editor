import {BiArea, BiBorderAll, BiPlus} from "react-icons/bi";

function Header() {
    return (
        <div className="header flex justify-center items-center h-8 m-1">
            <div className="flex items-center h-8 m-2 align-middle">
                <img
                    src="JolyLogo.png"
                    className="max-h-full max-w-full object-contain"
                    alt="Logo"
                />
            </div>
            <div className="flex ml-auto gap-0.5 py-1 items-center m-1">
                <button className="bg-gray-300 hover:bg-gray-200 py-1.5 px-3 flex items-center justify-center ">
                    <BiBorderAll />
                </button>
                <button className="bg-gray-300 hover:bg-gray-200  py-1.5 px-3 flex items-center justify-center ">
                    <BiArea/>
                </button>
                <button className="bg-gray-300 hover:bg-gray-200 py-1.5 px-3 flex items-center justify-center ">
                    <BiPlus/>
                </button>
                <button className="bg-gray-300 hover:bg-gray-200 text-black py-1 px-3 flex items-center justify-center ">
                    <span className="text-sm">Share</span>
                </button>
            </div>
        </div>
    );
}

export default Header;
