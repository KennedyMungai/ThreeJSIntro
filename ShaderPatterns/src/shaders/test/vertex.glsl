attribute vec2 uv;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}