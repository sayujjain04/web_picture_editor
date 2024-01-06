import * as THREE from "three";


const ImageShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null },
        brightness: { value: 0.0 },
        contrast: { value: 0.0 },
        saturation: { value: 1.0 },
        exposure: { value: 1.0 },
        denoise: { value: 0.0 },
        curve: { value: 0.0 },
        colorAdjust: { value: new THREE.Vector3(1, 1, 1) }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float brightness;
    uniform float contrast;
    uniform float saturation;
    uniform float exposure;
    uniform float denoise;
    uniform float curve;
    varying vec2 vUv;
    
    float average(vec3 color) {
      return (color.r + color.g + color.b) / 3.0;
    }
     uniform vec3 colorAdjust;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      color.rgb *= colorAdjust;
      
      // Apply brightness
      color.rgb += brightness;
      
      // Apply contrast
      if (contrast > 0.0) {
        color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;
      } else {
        color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5;
      }
      
      // Apply saturation
      float avg = average(color.rgb);
      color.rgb = mix(vec3(avg), color.rgb, saturation);
      
      // Apply exposure
      color.rgb *= exposure;
      
      // Apply denoise
      float dx = dFdx(vUv.x) * denoise;
      float dy = dFdy(vUv.y) * denoise;
      vec3 blurred = texture2D(tDiffuse, vUv + vec2(-dx, -dy)).rgb * 0.25 +
                     texture2D(tDiffuse, vUv + vec2(-dx, dy)).rgb * 0.25 +
                     texture2D(tDiffuse, vUv + vec2(dx, -dy)).rgb * 0.25 +
                     texture2D(tDiffuse, vUv + vec2(dx, dy)).rgb * 0.25;
      color.rgb = mix(color.rgb, blurred, denoise);
      
      // Apply curve
      float curveIntensity = 1.0 - curve;
      color.rgb = mix(color.rgb, pow(color.rgb, vec3(1.0 / curveIntensity)), curve);
      
      gl_FragColor = color;
    }
  `,
});

export default ImageShaderMaterial;