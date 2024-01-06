"use client"
import {BiCrop, BiDroplet} from "react-icons/bi";
import React from "react";
import {CiFaceSmile} from "react-icons/ci";
import {BsMagic} from "react-icons/bs";
import CropSideBar from "@/app/ActionBarComponents/CropSidebar";
import {atom, useAtom} from "jotai";
import AdjustSidebar from "@/app/ActionBarComponents/AdjustSidebar";
import FilterSideBar from "@/app/ActionBarComponents/FilterSidebar";


export const sidebarAtom = atom<string>("label");
function ActionBar() {

    const [sidebarComponent, setSidebarComponent] = useAtom(sidebarAtom);

    const handleLabelClick = () => {
        setSidebarComponent("label");

    };

    const handleFiltersClick = () => {
        setSidebarComponent("filters");
    };

    const handleAdjustClick = () => {
        setSidebarComponent("adjust");
    };

    const handleCropClick = () => {
        setSidebarComponent("crop");
    };




    return (
        <div className="max-w-full max-h-full">
            <div className="flex flex-row bg-neutral-100 h-10 max-w-full">
                <button onClick={handleLabelClick} className={"bg-gray-200 hover:bg-gray-100 active:bg-gray-300 text-black py-1 flex items-center w-1/4"}>
                    <CiFaceSmile className={"h-8 ml-0.5"} />
                    <h1 className={"ml-0.5 text-xs"}>Label</h1>
                </button>
                <button onClick={handleFiltersClick} className={"bg-gray-200 hover:bg-gray-100 active:bg-gray-300 text-black py-1 flex items-center w-1/4"}>
                    <BsMagic className={"h-8 ml-0.5"} />
                    <h1 className={"ml-0.5 text-xs"}>Filters</h1>
                </button>
                <button onClick={handleAdjustClick} className={"bg-gray-200 hover:bg-gray-100 active:bg-gray-300 text-black py-1 flex items-center w-1/4"}>
                    <BiDroplet className={"h-8 ml-0.5"} />
                    <h1 className={"ml-0.5 text-xs"}>Adjust</h1>
                </button>
                <button onClick={handleCropClick} className={"bg-gray-200 hover:bg-gray-100 active:bg-gray-300 text-black py-1 flex items-center w-1/4"}>
                    <BiCrop className={"h-8 ml-0.5"} />
                    <h1 className={"ml-0.5 text-xs"}>Crop</h1>
                </button>
            </div>
            <div className={"max-w-full h-full m-2.5"}>
                {sidebarComponent === "crop" && <CropSideBar />}
                {sidebarComponent === "label" && <h1>Label</h1>}
                {sidebarComponent === "filters" && <FilterSideBar />}
                {sidebarComponent === "adjust" && <AdjustSidebar />}
            </div>
        </div>
    )
}

export default ActionBar;
