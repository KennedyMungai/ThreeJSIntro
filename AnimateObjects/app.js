const canvas = document.getElementById('webgl')

const scene = new THREE.Scene()
const group = new THREE.Group()

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

cube1.position.set(3, 3, 3)

scene.add(cube1)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const size = {
    x: window.innerHeight - 10,
    y: window.innerWidth - 10
}

const camera = new THREE.PerspectiveCamera(75, size.y / size.x)
camera.position.set(2, 2, 10)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.y, size.x)

// Time
let time = Date.now()

// Animations
const tick = () => 
{
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    console.log(deltaTime)

    // Update objects
    cube1.rotation.y += 0.1

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()