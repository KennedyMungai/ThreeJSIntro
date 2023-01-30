import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneBufferGeometry(2, 2, 512, 512)

// Color
debugObject.depthColor = '#0d0d5f'
debugObject.surfaceColor = '#8484d9'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uTime: { value: 0.0 },

        // Vertex stuff(Big waves)
        uBigWaveElevation: { value: 0.1 },
        uBigWaveFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 1.0 },

        // Small waves
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 4.5 },
        uSmallWavesSpeed: { value: 0.05 },
        uSmallWavesIterations: { value: 4.0 },

        // Color stuff
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.25 },
        uColorMultiplier: { value: 4.0 }
    }
})

gui
    .add(waterMaterial.uniforms.uBigWaveElevation, 'value')
    .min(0)
    .max(1.0)
    .step(0.01)
    .name('Amplitude')

gui
    .add(waterMaterial.uniforms.uBigWaveFrequency.value, 'x')
    .min(1)
    .max(10)
    .step(1)
    .name('Frequency on X')

gui
    .add(waterMaterial.uniforms.uBigWaveFrequency.value, 'y')
    .min(1)
    .max(10)
    .step(1)
    .name('Frequency on Y')

gui
    .add(waterMaterial.uniforms.uBigWavesSpeed, 'value')
    .min(0.5)
    .max(10)
    .step(0.01)
    .name('Wave speed')

gui
    .addColor(debugObject, 'surfaceColor')
    .name('Surface Color')
    .onChange(() => 
    {
        waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    })

gui
    .addColor(debugObject, 'depthColor')
    .name('Depth Color')
    .onChange(() =>
    {
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })

gui
    .add(waterMaterial.uniforms.uColorOffset, 'value')
    .min(0.1)
    .max(0.9)
    .step(0.01)
    .name('Color Offset')

gui
    .add(waterMaterial.uniforms.uColorMultiplier, 'value')
    .min(1.0)
    .max(10.0)
    .step(0.01)
    .name('Color Multiplier')

gui
    .add(waterMaterial.uniforms.uSmallWavesElevation, 'value')
    .min(0.0)
    .max(1.0)
    .step(0.001)
    .name('Small Waves Elevation')

gui
    .add(waterMaterial.uniforms.uSmallWavesFrequency, 'value')
    .min(1)
    .max(5)
    .step(0.01)
    .name('Small Waves Frequency')

gui
    .add(waterMaterial.uniforms.uSmallWavesSpeed, 'value')
    .min(0)
    .max(1)
    .step(0.001)
    .name('Small Waves Speed')

gui
    .add(waterMaterial.uniforms.uSmallWavesIterations, 'value')
    .min(1)
    .max(5)
    .step(1)
    .name('Small Waves Iteration')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animating the wave
    waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()