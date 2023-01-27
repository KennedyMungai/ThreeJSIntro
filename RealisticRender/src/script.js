import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Update all materials
 */

debugObject.envMapIntensity = 5

const updateAllMaterials = () => 
{
    scene.traverse((child) =>
    {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
        }
    })
}

gui
    .add(debugObject, 'envMapIntensity')
    .min(0)
    .max(15)
    .step(0.001)
    .name("Environment Intensity")
    .onChange(updateAllMaterials)

/**
 * Environment Textures
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])

scene.background = environmentMap


/**
 * Models
 */
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (helmet) => 
    {
        helmet.scene.scale.set(10, 10, 10)
        scene.add(helmet.scene)
        helmet.scene.rotation.y = Math.PI * 0.5

        gui
            .add(helmet.scene.rotation, 'y')
            .min(-Math.PI)
            .max(Math.PI)
            .step(0.001)

        updateAllMaterials()
    }
)

// Axes Helper
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Grid Helper
const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
scene.add(gridHelper)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(-1, 8, 4)
scene.add(directionalLight)

/**
 * GUI debug menu
 */
gui
    .add(directionalLight, 'intensity')
    .min(0)
    .max(20)
    .step(0.01)
    .name("Light Intensity")

gui
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Light X coordinate")

gui
    .add(directionalLight.position, 'y')
    .min(0)
    .max(20)
    .step(0.01)
    .name("Light Y coordinate")

gui
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Light Z coordinate")

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
camera.position.set(4, 1, - 4)
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
renderer.physicallyCorrectLights = true

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()