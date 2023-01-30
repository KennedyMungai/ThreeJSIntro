void main() {
    // Disc
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);
    // strength = 1.0 - strength;

    // Diffuse Point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;

    gl_FragColor = vec4(vec3(strength), 1.0);
}