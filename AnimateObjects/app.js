const canvas = document.getElementById('webgl')

const scene = new THREE.Scene()
const group = new THREE.Group()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const size = {
    x: 600,
    y: 800
}

const camera = new THREE.PerspectiveCamera(75, size.y / size.x)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.y, size.x)
renderer.render(scene, camera)