const canvas = document.getElementById('webgl')

const scene = new THREE.Scene()
const group = new THREE.Group()

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

scene.add(cube1)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const size = {
    x: 600,
    y: 800
}

const camera = new THREE.PerspectiveCamera(75, size.y / size.x)
camera.position.set(2, 2, 10)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.y, size.x)

// Animations
const tick = () => 
{
    // Update objects
    cube1.position.x += 0.01

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()