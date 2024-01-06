import { useAtom } from 'jotai';
import { useLoader } from '@react-three/fiber';
import {TextureLoader} from 'three';
import ImageShaderMaterial from '@/app/ActionBarComponents/ImageShader';
import { logoUrlAtom } from '@/app/MainPanel';
import {
    brightnessAtom,
    contrastAtom, curveAtom, denoiseAtom,
    editedValuesAtom,
    exposureAtom,
    saturationAtom
} from "@/app/ActionBarComponents/AdjustSidebar";
import {useEditHistory} from "@/app/ActionBarComponents/HistoryFunctionality";


type Preset = {
    name: string;
    brightness: number;
    contrast: number;
    saturation: number;
    exposure: number;
    denoise: number;
    curve: number;
};

const FilterSidebar: React.FC = () => {
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
    const [editedValues, setEditedValues] = useAtom(editedValuesAtom);


    const handlePresetClick = (preset: Preset) => {

        if (
            preset.brightness === brightness &&
            preset.contrast === contrast &&
            preset.saturation === saturation &&
            preset.exposure === exposure &&
            preset.denoise === denoise &&
            preset.curve === curve
        ) {
            return; // Return early if the values are the same
        }


        setBrightness(preset.brightness);
        setContrast(preset.contrast);
        setSaturation(preset.saturation);
        setExposure(preset.exposure);
        setDenoise(preset.denoise);
        setCurve(preset.curve);

        setEditedValues({brightness: preset.brightness, contrast: preset.contrast, saturation: preset.saturation, exposure: preset.exposure, denoise: preset.denoise, curve: preset.curve, color: {r: 255, g: 255, b: 255 }});

        ImageShaderMaterial.uniforms.brightness.value = preset.brightness;
        ImageShaderMaterial.uniforms.contrast.value = preset.contrast;
        ImageShaderMaterial.uniforms.saturation.value = preset.saturation;
        ImageShaderMaterial.uniforms.exposure.value = preset.exposure;
        ImageShaderMaterial.uniforms.denoise.value = preset.denoise;
        ImageShaderMaterial.uniforms.curve.value = preset.curve;
    };

    const presets: Preset[] = [
        {
            name: 'Normal',
            brightness: 0.0,
            contrast: 0.0,
            saturation: 1.0,
            exposure: 1.0,
            denoise: 0.0,
            curve: 0.0
        },

        {
            name: 'Vibrant Pop',
            brightness: 0.2,
            contrast: 0.1,
            saturation: 1.4,
            exposure: 1.0,
            denoise: 0.0,
            curve: 0.0
        },
        {
            name: 'Vintage Dream',
            brightness: -0.2,
            contrast: 0.3,
            saturation: 0.8,
            exposure: 1.2,
            denoise: 0.0,
            curve: 0.1
        },
        {
            name: 'Electric Blue',
            brightness: 0.0,
            contrast: 0.2,
            saturation: 1.2,
            exposure: 1.0,
            denoise: 0.0,
            curve: 0.0
        },
        {
            name: 'Mystic Forest',
            brightness: -0.1,
            contrast: 0.3,
            saturation: 1.0,
            exposure: 1.0,
            denoise: 0.0,
            curve: 0.3
        },
        {
            name: 'Sunset Glow',
            brightness: 0.3,
            contrast: 0.4,
            saturation: 1.3,
            exposure: 1.2,
            denoise: 0.0,
            curve: 0.0
        },
        {
            name: 'Soft Glamour',
            brightness: 0.05,
            contrast: 0.05,
            saturation: 1.1,
            exposure: 1.05,
            denoise: -0.05,
            curve: 0.0
        },
        {
            name: 'Film Noir',
            brightness: -0.2,
            contrast: 0.6,
            saturation: 0.8,
            exposure: 1.1,
            denoise: 0.0,
            curve: 0.0
        },
        {
            name: 'Golden Hour',
            brightness: 0.4,
            contrast: 0.3,
            saturation: 1.2,
            exposure: 1.3,
            denoise: 0.0,
            curve: 0.0
        },
        {
            name: 'Ethereal Glow',
            brightness: 0.2,
            contrast: 0.1,
            saturation: 1.1,
            exposure: 1.1,
            denoise: -0.1,
            curve: 0.1
        },
        {
            name: 'Crisp Monochrome',
            brightness: 0.2,
            contrast: 0.2,
            saturation: 0.2,
            exposure: 1.05,
            denoise: 0.1,
            curve: 0.05
        },
        {
            name: 'Romantic Vintage',
            brightness: -0.1,
            contrast: 0.2,
            saturation: 0.9,
            exposure: 1.1,
            denoise: -0.05,
            curve: 0.05
        },
        {
            name: 'Dreamy Pastels',
            brightness: 0.1,
            contrast: 0.05,
            saturation: 1.2,
            exposure: 1.05,
            denoise: 0.0,
            curve: -0.05
        },
        {
            name: 'Warm Embrace',
            brightness: 0.05,
            contrast: 0.1,
            saturation: 1.1,
            exposure: 1.1,
            denoise: -0.05,
            curve: 0.0
        },
        {
            name: 'Natural Elegance',
            brightness: 0.0,
            contrast: 0.05,
            saturation: 1.05,
            exposure: 1.05,
            denoise: 0.0,
            curve: 0.05
        },
        {
            name: 'Luminous Whimsy',
            brightness: 0.1,
            contrast: 0.1,
            saturation: 1.1,
            exposure: 1.1,
            denoise: -0.1,
            curve: -0.05
        }
        // Add more presets as needed
    ];

    return (
        <div>
            {/* Presets */}
            <h2>Preset Options</h2>
            <div>
                {presets.map((preset) => (
                    <button
                        key={preset.name}
                        onClick={() => handlePresetClick(preset)}
                        style={{ backgroundColor: '#EDEDED', margin: '3px', padding: '5px 5px' }}
                    >
                        {preset.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
