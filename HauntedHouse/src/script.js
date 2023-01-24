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

// Axes Helper
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Grid Helper
const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
scene.add(gridHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Loading in the textures
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

/**
 * House
 */
// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(7.5, 3, 7.5),
    new THREE.MeshStandardMaterial({
        color: 0xac8e82
    })
)

walls.position.y = 3 / 2

house.add(walls)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(7, 2.75, 4, 1),
    new THREE.MeshStandardMaterial({
        color: 0xb35f45
    })
)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: colorTexture,
        alphaMap: alphaTexture,
        normalMap: normalTexture,
        aoMap: ambientOcclusionTexture,
        metalnessMap: metalnessTexture,
        roughnessMap: roughnessTexture
    })
)

// Bushes
const bush1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush1.position.set(-2, 0.5, 5.5)
bush1.scale.set(0.5, 0.5, 0.5)

const bush2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush2.position.set(3, 0.5, 5.5)
bush2.scale.set(0.5, 0.5, 0.5)

const bush3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush3.position.set(3, 0.5, 8)
bush3.scale.set(0.5, 0.5, 0.5)

const bush4 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush4.position.set(-2, 0.5, 8)
bush4.scale.set(0.5, 0.5, 0.5)

const bush5 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush5.position.set(-2, 0.3, 8.5)
bush5.scale.set(0.25, 0.25, 0.25)

const bush6 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    new THREE.MeshStandardMaterial(
        {
            color: 0x89c854
        }
    )
)

bush6.position.set(3.25, 0.3, 8.25)
bush6.scale.set(0.25, 0.25, 0.25)

house.add(bush1, bush2, bush3, bush4, bush5, bush6)

door.position.z = 3.7555
door.position.y = 1.75 / 2

house.add(door)

roof.position.y = house.position.x + 3.75
roof.rotation.y = Math.PI / 4

house.add(roof)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: 0xb2b6b1 })

for (let i = 0; i < 50; i++)
{
    const angle = Math.random() * (Math.PI * 2)
    const radius = 7.5 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.4, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.6
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

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