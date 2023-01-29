#define PI 3.1415926535

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 *
        vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
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
    // float strength = distance(vUv, vec2(0.5));

    // A dark plane with a white center
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // A dark plane with a white center
    // float strength = 0.01 / distance(vUv, vec2(0.5));

    // A dark plane with a white center stretched on the x axis
    // vec2 lightUv = vec2(vUv.x * 0.5 + 0.25, vUv.y);
    // float strength = 0.01 / distance(lightUv, vec2(0.5));

    // Star shaped thing on a black surface
    // vec2 lightUvX = vec2(vUv.x * 0.5 + 0.25, vUv.y);
    // float lightX = 0.01 / distance(lightUvX, vec2(0.5));

    // vec2 lightUvY = vec2(vUv.y * 0.5 + 0.25, vUv.x);
    // float lightY = 0.01 / distance(lightUvY, vec2(0.5));

    // float strength = lightX * lightY;

    // Star shaped thing on a black surface but rotated by 45 degrees
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5, 0.5));

    // vec2 lightUvX = vec2(rotatedUv.x * 0.5 + 0.25, rotatedUv.y);
    // float lightX = 0.01 / distance(lightUvX, vec2(0.5));

    // vec2 lightUvY = vec2(rotatedUv.y * 0.5 + 0.25, rotatedUv.x);
    // float lightY = 0.01 / distance(lightUvY, vec2(0.5));

    // float strength = lightX * lightY;

    // A small black circle inside a whiyte surface
    // float strength = step(0.25, distance(vUv, vec2(0.5)));

    // A black ring inside a gray plane
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    // A crisp black ring inside a white plane
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // A crisp white ring inside a black plane
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // A blurry white ring inside a black plane
    // vec2 wavedUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Amoeba looking blob thing
    // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Amoeba looking blob thing on steroids
    // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Weird looking plane thing
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // Perlin Noise
    // float strength = cnoise(vUv * 10.0);

    // Crisper Perlin Noise
    // float strength = step(0.0, cnoise(vUv * 10.0));

    // Ghosty looking Perlin Noise
    float strength = 1.0 - abs(cnoise(vUv * 10.0));

    gl_FragColor = vec4(vec3(strength), 1.0);
}