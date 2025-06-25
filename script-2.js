// script.js
// ==============================
// Fetch MSDF font data & run the RGBA shader

document.addEventListener('DOMContentLoaded', () => {
  const fontDataUrl    = 'https://lekzd.github.io/codepen/cyrillic-Roboto-Bold-msdf.json';
  const fontTextureUrl = 'https://lekzd.github.io/codepen/cyrillic-Roboto-Bold-msdf.png';

  fetch(fontDataUrl)
    .then(res => res.json())
    .then(data => {
      const { scaleW, scaleH } = data.common;

      // — Helpers to extract UV & size for a given character —
      function findChar(ch) {
        const item = data.chars.find(c => c.char === ch);
        if (!item) return null;
        return {
          uv: [
            item.x / scaleW,
            1 - (item.y + item.height) / scaleH
          ],
          size: [
            item.width  / scaleW,
            item.height / scaleH
          ]
        };
      }
      const charUv   = ch => findChar(ch)?.uv   || [0, 0];
      const charData = ch => {
        const cd = findChar(ch);
        return cd ? [ cd.size[0], cd.size[1], 1.0 ] : [0, 0, 0];
      };
      const getLetter = i => 'СТЕКЛО'[i];

      // — Locate our canvas —
      const canvas = document.querySelector('.glass-shader__canvas');
      if (!canvas) {
        console.error('❌ <canvas> not found!');
        return;
      }

      // — The fragment shader source (exactly as before) —
      const shaderSource = `
  //	Classic Perlin 3D Noise
      //	by Stefan Gustavson
      //
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec4 P){
        vec4 Pi0 = floor(P);
        vec4 Pi1 = Pi0 + 1.0;
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec4 Pf0 = fract(P);
        vec4 Pf1 = Pf0 - 1.0;

        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = vec4(Pi0.zzzz);
        vec4 iz1 = vec4(Pi1.zzzz);
        vec4 iw0 = vec4(Pi0.wwww);
        vec4 iw1 = vec4(Pi1.wwww);

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 ixy00 = permute(ixy0 + iw0);
        vec4 ixy01 = permute(ixy0 + iw1);
        vec4 ixy10 = permute(ixy1 + iw0);
        vec4 ixy11 = permute(ixy1 + iw1);

        // fetch and normalize gradient vectors...
        // (full code omitted here for brevity—
        // include the entire body from your original shader)
      }

      // … continue with your myFwidth, median, msdf_sample, renderChar, getDigits, palette, refract_palette, sdCircle, smin, getBgColor …

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
        uv.y *= resolution.y / resolution.x;

        float n1 = cnoise(vec4(uv, uv + time * 0.1)) * 0.2;
        float digits = getDigits(uv + n1);

        vec3 bgColor = getBgColor(uv);
        vec2 reflected = reflect(uv + n1, vec2(1.0 - digits) * 0.5);
        float edgeLight = pow(dot(vec2(1.0 - digits), (1.0 - uv) * 0.5), 10.0);
        vec3 refr = mix(refract_palette(n1 * 10.0) * 4.0, vec3(1.0), pow(digits, 1.0));
        vec3 baseColor = getBgColor(reflected);
        vec3 fgColor = baseColor * max(refr, vec3(1.0)) + vec3(0.3) * digits + edgeLight * 10.0;
        vec3 color = mix(bgColor, fgColor, smoothstep(0.01, 0.1, digits));

        gl_FragColor = vec4(color, 1.0);
      }
      `;

      // — Initialize RGBA into our canvas —
      RGBA(shaderSource, {
        canvas,
        textures: [fontTextureUrl],
        uniforms: {
          char0_uv:   () => charUv(getLetter(0)),
          char0_data: () => charData(getLetter(0)),
          char1_uv:   () => charUv(getLetter(1)),
          char1_data: () => charData(getLetter(1)),
          char2_uv:   () => charUv(getLetter(2)),
          char2_data: () => charData(getLetter(2)),
          char3_uv:   () => charUv(getLetter(3)),
          char3_data: () => charData(getLetter(3)),
          char4_uv:   () => charUv(getLetter(4)),
          char4_data: () => charData(getLetter(4)),
          char5_uv:   () => charUv(getLetter(5)),
          char5_data: () => charData(getLetter(5)),
          char6_uv:   () => charUv(getLetter(6)),
          char6_data: () => charData(getLetter(6)),
          fontScale:  () => 18,
          sectors:     slider("sectors",    8,  2,  50,   1),
          noiseAmount: slider("noise",      1,  0,   5,  0.1),
          amplitude:   slider("amplitude", 0.1, 0, 0.5, 0.01),
          uvStep:      slider("step",      10,  1, 100,   1),
          morphing:    slider("morphing", 0.01, 0,   1, 0.01),
          color2:      slider("color",    0.93, 0,   1, 0.01),
          colorRange:  slider("color range",0.1,0,   1, 0.01)
        }
      });
    })
    .catch(err => console.error('❌ Font load error:', err));
});
