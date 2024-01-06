import React, {useRef, useEffect} from 'react';
import 'cropperjs/dist/cropper.css';
import {atom, useAtom} from "jotai";
import {imageRefImage, logoUrlAtom} from "@/app/MainPanel";
import {sidebarAtom} from "@/app/ActionBar";
import {isCrop} from "@/app/MainPanelH";

declare global {
    interface Window {
        Cropper: any;
    }
}

export const cropDataAtom = atom({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
});

export default function CropSideBar() {
    const cropperRef = useRef<any>(null);
    const [imageRef] = useAtom(imageRefImage);
    const [cropData, setCropData] = useAtom(cropDataAtom);
    const [, setLogoUrl] = useAtom(logoUrlAtom);
    const [, setSidebarComponent] = useAtom(sidebarAtom);
    const [crop, setCrop] = useAtom(isCrop);

    useEffect(() => {

        if ( imageRef?.current) {
        import('cropperjs').then((module) => {
            const Cropper = module.default;
            const cropper = new Cropper(imageRef.current!, {
                // Cropper.js options
                aspectRatio: NaN, // Set the aspect ratio as needed
                viewMode: 1, // Set the crop mode (0: free, 1: restriction, 2: proportion)
                crop: (event: any) => {
                    setCropData(event.detail);
                },
                // Add more options as required
            });
            cropperRef.current = cropper;
        })};

        return () => {
            // Cleanup Cropper.js instance when unmounting
            if (cropperRef.current) {
                cropperRef.current.destroy();
            }
        };
    }, [imageRef]);

    const getCroppedImage = () => {
        const croppedCanvas = cropperRef.current.getCroppedCanvas();
        if (!croppedCanvas) {
            // Error handling here
            return;
        }

        const dataUrl = croppedCanvas.toDataURL('image/jpeg');
        ;  // Update the atom with the new image source
        setLogoUrl(dataUrl);
        setSidebarComponent("label")
    }

    if (crop) {
        getCroppedImage();
        setCrop(!crop);
    }

    const handleCropDataDoubleClick = (field: keyof typeof cropData) => {
        return () => {
            const value = prompt(`Enter new value for ${field}:`, `${cropData[field]}`);
            if (value !== null) {
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                    const newCropData = { ...cropData, [field]: parsedValue };
                    setCropData(newCropData);
                    if (cropperRef.current) {
                        cropperRef.current.setData(newCropData);
                        cropperRef.current.crop();
                        // Perform further actions with the cropped image
                    }
                }
            }
        };
    };
    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-9/12">
                <div className="bg-neutral-700 mt-4 p-4">
                    <h2 className="text-white text-lg font-semibold">Crop Data</h2>
                    <div className="text-white">
                        <p onDoubleClick={handleCropDataDoubleClick('x')}>X: {cropData.x.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('y')}>Y: {cropData.y.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('width')}>Width: {cropData.width.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('height')}>Height: {cropData.height.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('rotate')}>Rotate: {cropData.rotate.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('scaleX')}>ScaleX: {cropData.scaleX.toFixed(2)}</p>
                        <p onDoubleClick={handleCropDataDoubleClick('scaleY')}>ScaleY: {cropData.scaleY.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current.rotate(45)}>rotate r</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current.rotate(-45)}>rotate l</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.crop()}>crop</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.clear()}>clear</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.reset()}>reset</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.zoom(0.1)}>zoom +</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.zoom(-0.1)}>zoom -</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.moveTo(0)}>move to 0</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.setDragMode("move")}>drag mode</button>
                    <button className={"bg-neutral-700 text-white p-2 m-2 rounded-md"} onClick={() => cropperRef.current?.setDragMode("crop")}>crop mode</button>
                </div>
            </div>
        </div>
    );
}
