import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Grid Helper
const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
scene.add(gridHelper)

/**
 * Galaxy Generator
 */
const parameters =
{

}

parameters.count = 100000
parameters.size = 0.01

let geometry = null
let material = null
let points = null

const generateGalaxy = () => 
{
    /**
     * Destoy the old galaxy
     */
    if (geometry !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
    */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)

    for (let i = 0; i < parameters.count; i++)
    {
        const i3 = i * 3

        positions[i3 + 0] = (Math.random() - 0.5) * 3
        positions[i3 + 1] = (Math.random() - 0.5) * 3
        positions[i3 + 2] = (Math.random() - 0.5) * 3
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    /**
     * Material
    */
    material = new THREE.PointsMaterial(
        {
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        }
    )

    /**
     * Points
    */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

generateGalaxy()

gui
    .add(parameters, "count")
    .min(500)
    .max(10000)
    .step(10)
    .onFinishChange(generateGalaxy)

gui
    .add(parameters, "size")
    .min(0.0001)
    .max(0.1)
    .step(0.00001)
    .onFinishChange(generateGalaxy)


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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()