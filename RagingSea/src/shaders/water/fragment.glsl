uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main() {
    gl_FragColor = vec4(uSurfaceColor, 1.0);
}