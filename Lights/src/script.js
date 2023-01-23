import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

// Group
const items = new THREE.Group()
scene.add(items)

// Axes Helper
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Grid Helper
const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
scene.add(gridHelper)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

// Directional light
// const directionalLight = new THREE.DirectionalLight(0x0ffffc, 0.3)
// directionalLight.position.set(1, 2, 0)
// scene.add(directionalLight)

// Hemisphere Light
// const hemisphereLight = new THREE.HemisphereLight(0x0ffffc, 0xfff50c, 0.5)
// hemisphereLight.position.set(0, 2, 0)
// scene.add(hemisphereLight)

// Rect Area Light
// const rectAreaLight = new THREE.RectAreaLight(0x0ffffc, 10, 10, 5)
// rectAreaLight.position.set(-1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
// scene.add(rectAreaLight)

// Spot Light
const spotLight = new THREE.SpotLight(0x0ffffc, 1, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
// spotLight.target.position.x = -1.75
// scene.add(spotLight.target)
scene.add(spotLight)

// Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5)
// scene.add(pointLightHelper)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper)
const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
scene.add(spotLightHelper)

window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

items.add(sphere, cube, torus, plane)
items.position.set(0, 1, 0)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Tweaks
gui
    .add(ambientLight, "intensity")
    .min(0)
    .max(1)
    .step(0.01)

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
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()