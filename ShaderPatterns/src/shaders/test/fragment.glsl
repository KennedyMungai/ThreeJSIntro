varying vec2 vUv;

void main() {
    // Gray scale banded pattern
    float strength = vUv.y;

    gl_FragColor = vec4(vec3(strength), 1.0);
}