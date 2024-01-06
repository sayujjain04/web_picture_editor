"use client"
import {CiSaveDown2} from "react-icons/ci";
import React from "react";
import {BiListUl} from "react-icons/bi";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import { atom } from 'jotai';
import { useAtom } from 'jotai/react';
import {TbArrowBack, TbArrowForward} from "react-icons/tb";
import {useRedo, useUndo} from "@/app/ActionBarComponents/HistoryFunctionality";
import {FiSave} from "react-icons/fi";
import {sidebarAtom} from "@/app/ActionBar";
import {imageDimensionsAtom, imageRefImage, logoUrlAtom} from "@/app/MainPanel";
import {Mesh, OrthographicCamera, PlaneGeometry, Scene, WebGLRenderer} from "three";
import ImageShaderMaterial from "@/app/ActionBarComponents/ImageShader";
import {
    brightnessAtom,
    colorAtom,
    contrastAtom, curveAtom, denoiseAtom,
    exposureAtom, initialState,
    saturationAtom
} from "@/app/ActionBarComponents/AdjustSidebar";
import * as THREE from "three";

export const isCrop = atom(false);
const isClickedAtom = atom(false);
function MainPanelH() {
    const [isClicked, setIsClicked] = useAtom(isClickedAtom);
    const [sidebarComponent, setSidebarComponent] = useAtom(sidebarAtom);
    const [, setLogoUrl] = useAtom(logoUrlAtom);
    const [imageDimensions] = useAtom(imageDimensionsAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);
    const [crop, setCrop] = useAtom(isCrop);

    const saveEditedImage = () => {
        const {width, height} = imageDimensions;

        const renderer = new WebGLRenderer();
        renderer.setSize(width, height);


        const aspect = width / height;

        const camera = new OrthographicCamera(-aspect / 2, aspect / 2, 1 / 2, -1 / 2, 0.1, 1000);
        camera.position.z = 1;

        const scene = new Scene();

        const material = ImageShaderMaterial;  // Your edited shader material
        const geometry = new PlaneGeometry(aspect, 1);
        const plane = new Mesh(geometry, material);

        scene.add(plane);

        renderer.render(scene, camera);

        const dataUrl = renderer.domElement.toDataURL();

        // Now save dataUrl to your state, local storage, or wherever you want.
        setLogoUrl(dataUrl);  // Assuming setLogoUrl is the setter from your useAtom hook.
        setSidebarComponent("label");
        setBrightness(initialState.brightness);
        setContrast(initialState.contrast);
        setSaturation(initialState.saturation);
        setExposure(initialState.exposure);
        setDenoise(initialState.denoise);
        setCurve(initialState.curve);

        if (initialState.color.r !== color.r || initialState.color.g !== color.g || initialState.color.b !== color.b) {
            setColor(initialState.color);
            ImageShaderMaterial.uniforms.colorAdjust.value = new THREE.Vector3(
                initialState.color.r / 255,
                initialState.color.g / 255,
                initialState.color.b / 255,
            );
        }

        ImageShaderMaterial.uniforms.brightness.value = initialState.brightness;
        ImageShaderMaterial.uniforms.contrast.value = initialState.contrast;
        ImageShaderMaterial.uniforms.saturation.value = initialState.saturation;
        ImageShaderMaterial.uniforms.exposure.value = initialState.exposure;
        ImageShaderMaterial.uniforms.denoise.value = initialState.denoise;
        ImageShaderMaterial.uniforms.curve.value = initialState.curve;
    };

    const handleCropImage = () => {
        setCrop(!crop);
    };


    const handleButtonClick = () => {
        setIsClicked(!isClicked);
    };

    const handleSaveButtonClick = () => {
        if (sidebarComponent === 'crop') {
            handleCropImage()
        } else {
            saveEditedImage();
        }
    };

    const undo = useUndo();
    const redo = useRedo();

    return (
        <div className="grid grid-cols-3 h-10 ">
            <div className="flex flex-row items-center">
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 flex items-center ml-2"} onClick={undo}>
                    <TbArrowBack className={"h-8 ml-1 mr-1"} />
                </button>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 flex items-center"} onClick={redo}>
                    <TbArrowForward className={"h-8 ml-1 mr-1"} />
                </button>
                <h2 className="flex items-center text-xs ml-2">Img_Name</h2>
            </div>
            <div className="flex flex-row gap-1 items-center justify-center">
                <button
                    className="bg-gray-200 text-black py-1 flex items-center"
                    onClick={handleButtonClick}
                >
                    {isClicked ? (
                        <AiFillHeart className="h-8 ml-0.5" />
                    ) : (
                        <AiOutlineHeart className="h-8 ml-0.5" />
                    )}
                </button>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 flex items-center"}>
                    <BiListUl className={"h-8 ml-1 mr-0.5"} />
                    <h1 className={"ml-0.5 text-xs mr-1.5"}>Add</h1>
                </button>
                <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 flex items-center "}>
                    <CiSaveDown2 className={"h-8 ml-0.5 mr-0.5"} />
                    <h1 className={"ml-0.5 text-xs mr-1.5"}>Move</h1>
                </button>
            </div>
            <div className="flex flex-row items-center justify-end">
                {sidebarComponent !== 'label' && (
                    <button className={"bg-gray-200 hover:bg-gray-100 text-black py-1 flex items-center mr-2"}
                            onClick={handleSaveButtonClick}>
                        <FiSave className={"h-8 ml-0.5 mr-0.5"} />
                        <h1 className={"ml-0.5 text-xs mr-1.5"}>
                            {sidebarComponent === 'crop' ? 'Crop Image' : 'Save Edits'}
                        </h1>
                    </button>
                )}
            </div>
        </div>

    )

}
export default MainPanelH;