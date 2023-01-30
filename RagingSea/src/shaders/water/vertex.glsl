void main() {
    // model matrix
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // view matrix
    vec4 viewPosition = viewMatrix * modelPosition;

    // projection matrix
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}