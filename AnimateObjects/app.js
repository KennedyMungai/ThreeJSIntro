const canvas = document.getElementById('webgl')

const scene = new THREE.Scene()
const group = new THREE.Group()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const size = {
    x: 800,
    y: 600
}

const camera = new THREE.PerspectiveCamera(75, size.y / size.x)
scene.add(camera)