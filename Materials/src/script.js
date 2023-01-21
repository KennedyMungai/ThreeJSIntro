import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const gradient1 = textureLoader.load('/textures/gradients/3.jpg')

// Scene
const scene = new THREE.Scene()

// Added an axes helper to the scene
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Grid Helper
const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
scene.add(gridHelper)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// Added a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material
)

sphere.position.set(-2, 0, 0)

scene.add(sphere)

// Added a plane
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material
)

torus.position.set(2, 0, 0)

scene.add(sphere, plane, torus)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphere.rotation.x = elapsedTime * 0.1
    plane.rotation.x = elapsedTime * 0.1
    torus.rotation.x = elapsedTime * 0.1

    sphere.rotation.y = elapsedTime * 0.15
    plane.rotation.y = elapsedTime * 0.15
    torus.rotation.y = elapsedTime * 0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()