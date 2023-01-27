precision mediump float;

varying float vRandom;

void main() {
    gl_FragColor = vec4(0.5, vRandom, 0.0, 1);
}