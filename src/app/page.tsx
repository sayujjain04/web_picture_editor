import React from 'react';
import Header from "@/app/Header";
import ActionBar from "@/app/ActionBar";
import MainPanel from "@/app/MainPanel";
import MainPanelH from "@/app/MainPanelH";
import Navigation from "@/app/NavBar";

function HomePage() {



    return (
        <div className="app h-full w-full flex flex-col bg-gray-300">
            <div className="h-10 bg-gray-300"><Header /></div>
            <div className="flex flex-1 max-h-full bg-amber-600">
                <div className="nav w-1/6 bg-gray-400"><Navigation /></div>
                <div className="flex-1 flex flex-col bg-neutral-600">
                    <div className=" bg-gray-200 h-10"><MainPanelH /></div>
                    <div className="flex-1 bg-gray-300"><MainPanel/></div>
                </div>
                <div className="action-bar w-1/6 bg-gray-400"><ActionBar/></div>
            </div>
        </div>
    );
}

export default HomePage;