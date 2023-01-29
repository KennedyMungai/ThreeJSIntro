varying vec2 vUv;

void main() {
    // Gray scale banded pattern
    // float strength = vUv.x;

    // Gray scale banded pattern on the y axis
    // float strength = vUv.y;

    // Gray scale banded pattern on the y axis inverted
    // float strength = 1.0 - vUv.y;

    // Gray scale banded pattern on the y axis but with some uneven distribution
    // float strength = vUv.y * 10.0;

    // Gray scale banded pattern with more pronounced banding
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Gray scale banded pattern with more pronounced banding and some dark separation
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // Gray scale banded pattern with more pronounced banding and greater dark separation
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.75, strength);

    // Gray scale banded pattern with more pronounced banding and greater dark separation
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.75, strength);

    // Gray scale checkered pattern
    // float strength = step(0.75, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.75, mod(vUv.y * 10.0, 1.0));

    // White dots on a black surface
    float strength = step(0.75, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.75, mod(vUv.y * 10.0, 1.0));

    gl_FragColor = vec4(vec3(strength), 1.0);
}