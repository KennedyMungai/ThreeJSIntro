uniform float uBigWaveElevation;

void main() {
    // model matrix
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * 10.0) * uBigWaveElevation;

    modelPosition.y += elevation;

    // view matrix
    vec4 viewPosition = viewMatrix * modelPosition;

    // projection matrix
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}