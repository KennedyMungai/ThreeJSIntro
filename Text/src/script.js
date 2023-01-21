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

// // Axes Helper
// const axesHelper = new THREE.AxesHelper(50)
// scene.add(axesHelper)

// // GridHelper
// const gridHelper = new THREE.GridHelper(50, 50, 'red', 'gray')
// scene.add(gridHelper)

/**
 * Textures
*/
const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('/textures/matcaps/1.png')

// Fonts
const fontloader = new THREE.FontLoader()

fontloader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new THREE.TextBufferGeometry(
            'Sent from heaven',
            {
                font,
                size: 0.5,
                height: 0.5,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -textGeometry.boundingBox.max.x * 0.5,
        //     -textGeometry.boundingBox.max.y * 0.5,
        //     -textGeometry.boundingBox.max.z * 0.5
        // )

        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial(
            {
                matcap
            }
        )
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        for (let i = 0; i < 200; i++)
        {
            const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
            const donutMaterial = new THREE.MeshMatcapMaterial({ matcap })
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.set(
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25
            )

            donut.rotation.set(
                Math.random() * 90 - 45,
                Math.random() * 90 - 45,
                Math.random() * 90 - 45,
            )

            scene.add(donut)
        }
    }
)

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()