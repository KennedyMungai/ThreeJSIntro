// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

scene.add(cube1)

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

// mesh.position.set(0.7, 1.2, 1)
// mesh.scale.set(5, 1.5, 1.5)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.set(45, 60, 45)

// Axes helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 3)
scene.add(camera)

// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)