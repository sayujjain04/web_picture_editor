"use client"
import { atom, useAtom } from 'jotai'
import React, {ChangeEvent, createContext, useEffect, useRef} from "react";
import {BiRotateLeft} from "react-icons/bi";
import ImageShaderMaterial from "@/app/ActionBarComponents/ImageShader";
import { Canvas } from '@react-three/fiber';
import {sidebarAtom} from "@/app/ActionBar";
import {useCompare, useRedoLastAction, useRevert} from "@/app/ActionBarComponents/HistoryFunctionality";
import {MdCompare} from "react-icons/md";



export const logoUrlAtom = atom("normal.jpg"); // Replace with the URL of the logo image, if available
const zoomLevelAtom = atom(100);
export const imageRefImage = atom<React.MutableRefObject<null> | null>(null);
export const imageDimensionsAtom = atom({width: 0, height: 0});

function MainPanel() {

    const [zoomLevel, setZoomLevel] = useAtom(zoomLevelAtom);
    const imageRef = useRef(null);
    const [imageReference, setImageRefImage] = useAtom(imageRefImage);
    const [sidebarComponent] = useAtom(sidebarAtom);
    const [logoUrl, setLogoUrl] = useAtom(logoUrlAtom);
    const [imageDimensions, setImageDimensions] = useAtom(imageDimensionsAtom);

    setImageRefImage(imageRef);


    const revert = useRevert();
    const compare = useCompare();
    const returnLast = useRedoLastAction();

    // Handles image zooming
    function handleZoomChange(event: ChangeEvent<HTMLInputElement>) {
        const newZoomLevel = parseInt(event.target.value);
        setZoomLevel(newZoomLevel);
    }

    const getLogoUrl = () => {
        if (logoUrl.trim() === "") {
            setLogoUrl("placeholderImage.jpg")
            return "placeholderImage.jpg";
        } else {
            setLogoUrl(logoUrl)
            return logoUrl;
        }
    };

    useEffect(() => {
        const loadImage = async () => {
            const img = new Image();
            img.src = logoUrl;
            await img.decode();  // Wait for the image to load.
            setImageDimensions({width: img.width, height: img.height});
        };
        loadImage();
    }, [logoUrl]);




    return (
        <div className="flex flex-col justify-between h-full ">
            <div className="w-full h-5/6 overflow-hidden flex justify-center items-center" style={{ position: 'relative', padding: '4px' }}>

                { (sidebarComponent=== "filters" || sidebarComponent == "adjust") ? (
                        <div style={{ width: imageDimensions.width / 2, height: imageDimensions.height / 2, transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}>
                            <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                <mesh>
                                    <planeBufferGeometry args={[imageDimensions.width/100, imageDimensions.height/100]} attach="geometry"/>
                                    <primitive attach="material" object={ImageShaderMaterial} />
                                </mesh>
                            </Canvas>
                        </div>)
                    :<img src={getLogoUrl()} alt="Logo" ref={imageRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }} />
                }

            </div>
            <div className="h-1/6">
                <div className="flex flex-col h-1/4 bg-gray-100 justify-center ">
                    <div className="grid grid-cols-3 h-full">
                        <div className="flex items-center justify-center">
                            <button className="bg-gray-100 hover:bg-gray-200 text-black  px-4 flex items-center h-full" onMouseDown={compare}
                                    onMouseUp={returnLast}>
                                <MdCompare className="h-5" />
                                <h1 className="ml-2 text-sm">Compare</h1>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-gray-100 hover:bg-gray-200 text-black  px-4 flex items-center h-full" onClick={revert}>
                                <BiRotateLeft className="h-5" />
                                <h1 className="ml-2 text-sm">Revert to original</h1>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <input
                                type="range"
                                min="50"
                                max="150"
                                value={zoomLevel}
                                onChange={handleZoomChange}
                                className="w-3/4 h-4"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-3/4 bg-gray-300"></div>
            </div>
        </div>

    );
}

export default MainPanel;


