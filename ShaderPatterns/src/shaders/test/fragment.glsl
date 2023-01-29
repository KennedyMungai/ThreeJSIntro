varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

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
    // float strength = step(0.75, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.75, mod(vUv.y * 10.0, 1.0));

    // White lines on a black surface
    // float strength  = step(0.75, mod(vUv.y * 10.0, 1.0));
    // strength -= step(0.75, mod(vUv.x * 10.0, 1.0));

    // White right angles on the mesh
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.75, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // barY *= step(0.75, mod(vUv.x * 10.0, 1.0));

    // float strength = barX + barY;

    // White crosses on the mesh
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.75, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.4, mod(vUv.y * 10.0 - 0.175, 1.0));
    // barY *= step(0.75, mod(vUv.x * 10.0 + 0.175, 1.0));

    // float strength = barX + barY;

    // Banding with a black bar in the middle
    // float strength = abs(vUv.x - 0.5);

    // Octagonal banding
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // Diagonal banding
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // White square with an inset black square
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // White square with a larger inset black square
    // float strength = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // Better crisp banding on the plane
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // Better crisp banding on two dimensions
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    // Noise
    // float strength = random(vUv);

    // Crisp Noise
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);

    // SkewedCrisp Noise
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, (floor((vUv.y + vUv.x) * 10.0) / 10.0));
    // float strength = random(gridUv);

    // A white plane with a dark lower corner
    // float strength = length(vUv);

    // A white plane with a dark center
    float strength = distance(vUv, vec2(0.5));

    gl_FragColor = vec4(vec3(strength), 1.0);
}