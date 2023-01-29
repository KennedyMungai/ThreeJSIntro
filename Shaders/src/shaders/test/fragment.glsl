precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

// varying float vRandom;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.75;
    // gl_FragColor = vec4(uColor, 1.0);
    gl_FragColor = textureColor;
}