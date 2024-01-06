import {isEqual} from "lodash";
import {useAtom, useAtomValue} from "jotai/react";
import {
    brightnessAtom,
    colorAtom, contrastAtom,
    curveAtom, denoiseAtom,
    editedValuesAtom, exposureAtom,
    historyAtom,
    initialState, saturationAtom
} from "@/app/ActionBarComponents/AdjustSidebar";
import {useEffect} from "react";
import ImageShaderMaterial from "@/app/ActionBarComponents/ImageShader";
import * as THREE from "three";

export const useEditHistory = () => {
    const editedValues = useAtomValue(editedValuesAtom);
    const [history, setHistory] = useAtom(historyAtom);

    useEffect(() => {
        const lastEdit = history.past[history.past.length - 1];
        // Only update the history if editedValues is different from the last value in the history
        if (!isEqual(editedValues, lastEdit)) {
            setHistory((prev) => {
                const past = [...prev.past, editedValues];
                if (past.length > 7) past.shift(); // keep only the last 7 instances
                return { past, future: [] }; // clear 'future' when adding a new entry to 'past'
            });
        }
    }, [editedValues, setHistory]);
};



export const useUndo = () => {
    const [, setEditedValues] = useAtom(editedValuesAtom);
    const [, setHistory] = useAtom(historyAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);

    return () => {
        setHistory(({ past, future }) => {
            if (past.length === 0) return { past, future };

            const newFuture = [past[past.length - 1], ...future];
            const newPast = past.slice(0, past.length - 1);
            const lastPast = newPast[newPast.length - 1] || initialState;

            setBrightness(lastPast.brightness);
            setContrast(lastPast.contrast);
            setSaturation(lastPast.saturation);
            setExposure(lastPast.exposure);
            setDenoise(lastPast.denoise);
            setCurve(lastPast.curve);

            if (lastPast.color.r !== color.r || lastPast.color.g !== color.g || lastPast.color.b !== color.b) {
                setColor(lastPast.color);
                ImageShaderMaterial.uniforms.colorAdjust.value = new THREE.Vector3(
                    lastPast.color.r / 255,
                    lastPast.color.g / 255,
                    lastPast.color.b / 255,
                );
            }

            // Update ImageShaderMaterial uniforms according to lastPast
            ImageShaderMaterial.uniforms.brightness.value = lastPast.brightness;
            ImageShaderMaterial.uniforms.contrast.value = lastPast.contrast;
            ImageShaderMaterial.uniforms.saturation.value = lastPast.saturation;
            ImageShaderMaterial.uniforms.exposure.value = lastPast.exposure;
            ImageShaderMaterial.uniforms.denoise.value = lastPast.denoise;
            ImageShaderMaterial.uniforms.curve.value = lastPast.curve;


            setEditedValues(lastPast);

            return { past: newPast, future: newFuture };
        });
    };
};

export const useRedo = () => {
    const [, setEditedValues] = useAtom(editedValuesAtom);
    const [, setHistory] = useAtom(historyAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);

    return () => {
        setHistory(({ past, future }) => {
            if (future.length === 0) return { past, future };

            const newPast = [...past, future[0]];
            const newFuture = future.slice(1);
            const nextFuture = newPast[newPast.length - 1] || initialState;

            setBrightness(nextFuture.brightness);
            setContrast(nextFuture.contrast);
            setSaturation(nextFuture.saturation);
            setExposure(nextFuture.exposure);
            setDenoise(nextFuture.denoise);
            setCurve(nextFuture.curve);

            if (nextFuture.color.r !== color.r || nextFuture.color.g !== color.g || nextFuture.color.b !== color.b) {
                setColor(nextFuture.color);
                ImageShaderMaterial.uniforms.colorAdjust.value = new THREE.Vector3(
                    nextFuture.color.r / 255,
                    nextFuture.color.g / 255,
                    nextFuture.color.b / 255,
                );
            }

            // Update ImageShaderMaterial uniforms according to nextFuture
            ImageShaderMaterial.uniforms.brightness.value = nextFuture.brightness;
            ImageShaderMaterial.uniforms.contrast.value = nextFuture.contrast;
            ImageShaderMaterial.uniforms.saturation.value = nextFuture.saturation;
            ImageShaderMaterial.uniforms.exposure.value = nextFuture.exposure;
            ImageShaderMaterial.uniforms.denoise.value = nextFuture.denoise;
            ImageShaderMaterial.uniforms.curve.value = nextFuture.curve;


            setEditedValues(nextFuture);

            return { past: newPast, future: newFuture };
        });
    };
};

export const useRevert = () => {
    const [, setEditedValues] = useAtom(editedValuesAtom);
    const [, setHistory] = useAtom(historyAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);
    return () => {
        setHistory({ past: [], future: [] });

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

        // Update ImageShaderMaterial uniforms according to initialState
        ImageShaderMaterial.uniforms.brightness.value = initialState.brightness;
        ImageShaderMaterial.uniforms.contrast.value = initialState.contrast;
        ImageShaderMaterial.uniforms.saturation.value = initialState.saturation;
        ImageShaderMaterial.uniforms.exposure.value = initialState.exposure;
        ImageShaderMaterial.uniforms.denoise.value = initialState.denoise;
        ImageShaderMaterial.uniforms.curve.value = initialState.curve;


        setEditedValues(initialState);
    };
};

export const useCompare = () => {

    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);

    return () => {

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

        // Update ImageShaderMaterial uniforms according to initialState
        ImageShaderMaterial.uniforms.brightness.value = initialState.brightness;
        ImageShaderMaterial.uniforms.contrast.value = initialState.contrast;
        ImageShaderMaterial.uniforms.saturation.value = initialState.saturation;
        ImageShaderMaterial.uniforms.exposure.value = initialState.exposure;
        ImageShaderMaterial.uniforms.denoise.value = initialState.denoise;
        ImageShaderMaterial.uniforms.curve.value = initialState.curve;

    };
};

export const useRedoLastAction = () => {
    const [history, ] = useAtom(historyAtom);
    const [color, setColor] = useAtom(colorAtom);
    const [, setBrightness] = useAtom(brightnessAtom);
    const [, setContrast] = useAtom(contrastAtom);
    const [, setSaturation] = useAtom(saturationAtom);
    const [, setExposure] = useAtom(exposureAtom);
    const [, setDenoise] = useAtom(denoiseAtom);
    const [, setCurve] = useAtom(curveAtom);

    return () => {
        const lastEdit = history.past[history.past.length - 1];

        if (!lastEdit) return;

        setBrightness(lastEdit.brightness);
        setContrast(lastEdit.contrast);
        setSaturation(lastEdit.saturation);
        setExposure(lastEdit.exposure);
        setDenoise(lastEdit.denoise);
        setCurve(lastEdit.curve);

        if (lastEdit.color.r !== color.r || lastEdit.color.g !== color.g || lastEdit.color.b !== color.b) {
            setColor(lastEdit.color);
            ImageShaderMaterial.uniforms.colorAdjust.value = new THREE.Vector3(
                lastEdit.color.r / 255,
                lastEdit.color.g / 255,
                lastEdit.color.b / 255,
            );
        }

        // Update ImageShaderMaterial uniforms according to lastEdit
        ImageShaderMaterial.uniforms.brightness.value = lastEdit.brightness;
        ImageShaderMaterial.uniforms.contrast.value = lastEdit.contrast;
        ImageShaderMaterial.uniforms.saturation.value = lastEdit.saturation;
        ImageShaderMaterial.uniforms.exposure.value = lastEdit.exposure;
        ImageShaderMaterial.uniforms.denoise.value = lastEdit.denoise;
        ImageShaderMaterial.uniforms.curve.value = lastEdit.curve;

    };
};