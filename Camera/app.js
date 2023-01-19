const canvas = document.getElementById('webgl')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

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
    x: window.innerHeight,
    y: window.innerWidth
}

const camera = new THREE.PerspectiveCamera(75, size.y / size.x, 1, 1000)
camera.position.set(2, 2, 10)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.y, size.x)

// Clock
const clock = new THREE.Clock()

// Time
// let time = Date.now()

// Animations
const tick = () => 
{
    // Clock
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // console.log(deltaTime)

    // Update objects
    cube1.position.y = Math.sin(elapsedTime)
    cube1.position.x = Math.cos(elapsedTime)
    camera.lookAt(cube1.position)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()