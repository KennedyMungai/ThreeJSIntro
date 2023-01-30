uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main() {
    gl_FragColor = vec4(vElevation, vElevation, vElevation, 1.0);
}