import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass'
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass'
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader'
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'
import { ToonShader } from 'three/examples/jsm/shaders/ToonShader'
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Models
 */
gltfLoader.load(
    '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(2, 2, 2)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update Effect Composer
    effectComposer.setPixelRatio(Math.min(window.setPixelRatio, 2))
    effectComposer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.5
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Render Target
// const renderTarget = new THREE.WebGLRenderTarget(
//     800,
//     600,
//     {
//         minFilter: THREE.LinearFilter,
//         magFilter: THREE.LinearFilter,
//         format: THREE.RGBAFormat,
//         encoding: THREE.sRGBEncoding,
//         antialias: true
//     }
// )

// Multisample Render Target
const renderTarget = new THREE.WebGLMultisampleRenderTarget(
    800,
    600,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding,
    }
)

// Effect Composer
const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

// Render Pass
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Dot Screen pass
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)

// Glitch pass
const glitchPass = new GlitchPass()
glitchPass.goWild = true
glitchPass.enabled = false
effectComposer.addPass(glitchPass)

// Unreal Bloom Pass
const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.strength = 0.5
unrealBloomPass.enabled = false
effectComposer.addPass(unrealBloomPass)

// Film Pass
const filmPass = new FilmPass(30, 3, 3, 10)
filmPass.enabled = false
effectComposer.addPass(filmPass)

// Afterimage Pass
const afterimagePass = new AfterimagePass()
afterimagePass.enabled = false
effectComposer.addPass(afterimagePass)

// Outline Pass
const outlinePass = new OutlinePass(new THREE.Vector2(512, 512), scene, camera)
outlinePass.enabled = false
effectComposer.addPass(outlinePass)

// Adaptive Tonemap pass
const adaptiveTonemapPass = new AdaptiveToneMappingPass()
adaptiveTonemapPass.enabled = false
effectComposer.addPass(adaptiveTonemapPass)

// Bokeh Pass
// const bokehPass = new BokehPass(scene, camera)
// bokehPass.enabled = false
// effectComposer.addPass(bokehPass)

// Clearpass
const clearPass = new ClearPass('#ff8855', 0.1)
clearPass.enabled = false
effectComposer.addPass(clearPass)

// Cube Texture Pass
const cubeTexturePass = new CubeTexturePass(camera, environmentMap)
cubeTexturePass.enabled = false
effectComposer.addPass(cubeTexturePass)

// Halftone pass
const halftonePass = new HalftonePass()
halftonePass.enabled = false
effectComposer.addPass(halftonePass)

// // LUTPass
// const lutpass = new LUTPass()
// lutpass.enabled = false
// effectComposer.addPass(lutpass)

// RGBShiftShader
const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.enabled = false
effectComposer.addPass(rgbShiftPass)

// // Film Shader
// const filmShaderPass = new ShaderPass(FilmShader)
// filmShaderPass.enabled = false
// effectComposer.addPass(filmShaderPass)

// // Vignette Shader
// const vignetteShaderPass = new ShaderPass(VignetteShader)
// vignetteShaderPass.enabled = false
// effectComposer.addPass(vignetteShaderPass)

// // Toon Shader Pass
// const toonShaderPass = new ShaderPass(ToonShader)
// toonShaderPass.enabled = false
// effectComposer.addPass(toonShaderPass)

// // Water refraction shader
// const waterRefractionShaderPass = new ShaderPass(WaterRefractionShader)
// waterRefractionShaderPass.enabled = false
// effectComposer.addPass(WaterRefractionShader)

const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)

// Custom Effects Shader Pass
const TintShader = {
    uniforms: {
        tDiffuse: { value: null },
        uTint: { value: null },
    },
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            // vec4 viewPosition = viewMatrix * modelPosition;
            // vec4 projectionPosition = projectionMatrix * viewPosition;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;

            gl_FragColor = color;
        }
    `
}

const displacementPass = new ShaderPass(TintShader)
displacementPass.uniforms.uTint.value = new THREE.Vector3()
effectComposer.addPass(displacementPass)

gui
    .add(displacementPass.uniforms.uTint.value, 'x')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('Red Tint')

gui
    .add(displacementPass.uniforms.uTint.value, 'y')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('Green Tint')

gui
    .add(displacementPass.uniforms.uTint.value, 'z')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('Blue Tint')

// Displacement pass
// const DisplacementShader = {
//     uniforms: {
//         tDiffuse: { value: null },
//     },
//     vertexShader: `
//         varying vec2 vUv;

//         void main()
//         {
//             // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//             // vec4 viewPosition = viewMatrix * modelPosition;
//             // vec4 projectionPosition = projectionMatrix * viewPosition;

//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D tDiffuse;

//         varying vec2 vUv;

//         void main()
//         {
//             vec2 newUv = vUv;
//             vec4 color = texture2D(tDiffuse, newUv);

//             gl_FragColor = color;
//         }
//     `
// }

// const displacementPass = new ShaderPass(DisplacementShader)
// effectComposer.addPass(displacementPass)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()