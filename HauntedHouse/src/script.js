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

// Fog
const fog = new THREE.Fog('#262837', 1, 7.5)
scene.fog = fog

// Axes Helper
// const axesHelper = new THREE.AxesHelper(50)
// scene.add(axesHelper)

// Grid Helper
// const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
// scene.add(gridHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Loading in the door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Loading in the brick textures
const brickColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const brickNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const brickRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
const brickAOTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')

// Loading the grass textures
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAOTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(32, 32)
grassAOTexture.repeat.set(32, 32)
grassNormalTexture.repeat.set(32, 32)
grassRoughnessTexture.repeat.set(32, 32)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAOTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAOTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

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
        map: brickColorTexture,
        normalMap: brickNormalTexture,
        roughness: brickRoughnessTexture,
        aoMap: brickAOTexture
    })
)

walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)

walls.position.y = 3 / 2
walls.castShadow = true

house.add(walls)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    new THREE.MeshStandardMaterial(
        {
            map: grassColorTexture,
            normalMap: grassNormalTexture,
            aoMap: grassAOTexture,
            roughnessMap: grassRoughnessTexture
        })
)

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(7, 2.75, 4, 1),
    new THREE.MeshStandardMaterial({
        color: 0xb35f45
    })
)

roof.castShadow = true

//Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        normalMap: doorNormalTexture,
        aoMap: doorAmbientOcclusionTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)

door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
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
bush1.castShadow = true

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
bush2.castShadow = true

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
bush3.castShadow = true

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
bush4.castShadow = true

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
bush5.castShadow = true

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
bush6.castShadow = true

house.add(bush1, bush2, bush3, bush4, bush5, bush6)

door.position.z = 3.7555
door.position.y = 1.75 / 2

house.add(door)

roof.position.y = house.position.x + 3.75
roof.rotation.y = Math.PI / 4

roof.castShadow = true

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
    grave.position.set(x, 0.36, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.6
    grave.castShadow = true
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#B9D5FF', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#B9D5FF', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
moonLight.castShadow = true
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight(0xffffff, 5, 4.5, 5)
doorLight.position.set(0, 2.15, 3.8)
doorLight.castShadow = true
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight(0xff00ff, 2, 3)
ghost1.castShadow = true
const ghost2 = new THREE.PointLight(0x00ffff, 2, 3)
ghost2.castShadow = true
const ghost3 = new THREE.PointLight(0xffff00, 2, 3)
ghost3.castShadow = true
scene.add(ghost1, ghost2, ghost3)

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
renderer.setClearColor('#262837')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 6
    ghost1.position.z = Math.sin(ghost1Angle) * 6
    ghost1.position.y = Math.sin(elapsedTime * 2) * 2

    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 7.5
    ghost2.position.z = Math.sin(ghost2Angle) * 7.5
    ghost2.position.y = Math.abs(Math.cos(elapsedTime * 4) + Math.cos(elapsedTime * 2)) * 2

    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.abs(Math.cos(elapsedTime * 4) + Math.sin(elapsedTime * 2)) * 2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()