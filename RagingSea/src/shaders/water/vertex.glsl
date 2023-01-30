uniform float uBigWaveElevation;
uniform vec2 uBigWaveFrequency;
uniform float uTime;

void main() {
    // model matrix
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uBigWaveFrequency.x) * sin(modelPosition.z * uBigWaveFrequency.y) * uBigWaveElevation;

    modelPosition.y += elevation;

    // view matrix
    vec4 viewPosition = viewMatrix * modelPosition;

    // projection matrix
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}