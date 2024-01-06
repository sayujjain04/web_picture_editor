import React, {useEffect} from 'react';
import { atom, useAtom } from 'jotai';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { SketchPicker, ColorResult } from 'react-color';
import ImageShaderMaterial from '@/app/ActionBarComponents/ImageShader';
import {logoUrlAtom} from "@/app/MainPanel";
import {useEditHistory} from "@/app/ActionBarComponents/HistoryFunctionality";

export const brightnessAtom = atom(0);
export const contrastAtom = atom(0);
export const saturationAtom = atom(1.0);
export const exposureAtom = atom(1.0);
export const denoiseAtom = atom(0);
export const curveAtom = atom(0);
export const colorAtom = atom({r: 255, g: 255, b: 255 });

export const initialState = {
    brightness: 0,
    contrast: 0,
    saturation: 1,
    exposure: 1,
    denoise: 0,
    curve: 0,
    color: {r: 255, g: 255, b: 255 },
};

export const editedValuesAtom = atom(initialState);
 export const historyAtom = atom<{ past: typeof initialState[], future: typeof initialState[]}>({
    past: [],
    future: []
});

const AdjustSidebar: React.FC = () => {

    useEditHistory();
    const [ImageUrl] = useAtom(logoUrlAtom);
    const texture = useLoader(TextureLoader, ImageUrl);
    ImageShaderMaterial.uniforms.tDiffuse.value = texture;

    const [brightness, setBrightness] = useAtom(brightnessAtom);
    const [contrast, setContrast] = useAtom(contrastAtom);
    const [saturation, setSaturation] = useAtom(saturationAtom);
    const [exposure, setExposure] = useAtom(exposureAtom);
    const [denoise, setDenoise] = useAtom(denoiseAtom);
    const [curve, setCurve] = useAtom(curveAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [history, setHistory] = useAtom(historyAtom);
    const [editedValues, setEditedValues] = useAtom(editedValuesAtom);

    useEffect(() => {
        ImageShaderMaterial.uniforms.colorAdjust.value = new THREE.Vector3(
            color.r / 255,
            color.g / 255,
            color.b / 255,
        );
    }, [color]);


    const handleColorChange = (color: ColorResult) => {
        setColor(color.rgb);
    };

    const handleColorChangeComplete = (color: ColorResult) => {
        setEditedValues((prev) => ({ ...prev, color: color.rgb }));
    };

    const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setBrightness(value);
        ImageShaderMaterial.uniforms.brightness.value = value;
    };

    const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setContrast(value);
        ImageShaderMaterial.uniforms.contrast.value = value;
    };

    const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setSaturation(value);
        ImageShaderMaterial.uniforms.saturation.value = value;
    };

    const handleExposureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setExposure(value);
        ImageShaderMaterial.uniforms.exposure.value = value;
    };

    const handleDenoiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setDenoise(value);
        ImageShaderMaterial.uniforms.denoise.value = value;
    };

    const handleCurveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setCurve(value);
        ImageShaderMaterial.uniforms.curve.value = value;
    };

    return (
        <div>
            {/* Sliders */}
            <div>
                {/* Contrast slider */}
                <div>
                    <label htmlFor="contrast">Contrast:</label>
                    <input
                        id="contrast"
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={contrast}
                        onChange={handleContrastChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, contrast: value }));
                        }}
                    />
                </div>
                {/* Brightness slider */}
                <div>
                    <label htmlFor="brightness">Brightness:</label>
                    <input
                        id="brightness"
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={brightness}
                        onChange={handleBrightnessChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, brightness: value }));
                        }}
                    />
                </div>
                {/* Saturation slider */}
                <div>
                    <label htmlFor="saturation">Saturation:</label>
                    <input
                        id="saturation"
                        type="range"
                        min="0"
                        max="2"
                        step="0.01"
                        value={saturation}
                        onChange={handleSaturationChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, saturation: value }));
                        }}
                    />
                </div>
                {/* Exposure slider */}
                <div>
                    <label htmlFor="exposure">Exposure:</label>
                    <input
                        id="exposure"
                        type="range"
                        min="0"
                        max="2"
                        step="0.01"
                        value={exposure}
                        onChange={handleExposureChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, exposure: value }));
                        }}
                    />
                </div>

                {/* Denoise slider */}
                <div>
                    <label htmlFor="denoise">Denoise:</label>
                    <input
                        id="denoise"
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={denoise}
                        onChange={handleDenoiseChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, denoise: value }));
                        }}
                    />
                </div>
                {/* Curve slider */}
                <div>
                    <label htmlFor="curve">Curve:</label>
                    <input
                        id="curve"
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={curve}
                        onChange={handleCurveChange}
                        onMouseUp={(e) => {
                            const value = parseFloat(e.currentTarget.value);
                            setEditedValues((prev) => ({ ...prev, curve: value }));
                        }}
                    />
                </div>
                <div id="color">
                    <label htmlFor="color">Color:</label>
                    <SketchPicker color={color} onChange={handleColorChange} onChangeComplete={handleColorChangeComplete}/>
                </div>
            </div>

        </div>
    );
};

export default AdjustSidebar;
