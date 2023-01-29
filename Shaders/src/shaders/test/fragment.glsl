precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

// varying float vRandom;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = vec4(uColor, 1.0);
}