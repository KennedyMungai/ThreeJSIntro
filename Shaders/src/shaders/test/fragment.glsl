precision mediump float;

varying float vRandom;

void main() {
    gl_FragColor = vec4(vRandom, vRandom * 0.5, 0.0, 1);
}