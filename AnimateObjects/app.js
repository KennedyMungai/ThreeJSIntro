const canvas = document.getElementById('webgl')

const scene = new THREE.Scene()
const group = new THREE.Group()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)