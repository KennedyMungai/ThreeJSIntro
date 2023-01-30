uniform float uSize;
uniform float uTime;

attribute float aScale;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = color;
}