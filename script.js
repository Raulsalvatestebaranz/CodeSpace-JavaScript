/* Alexandr Korotaev, feel free to reach out me here: lekzd@mail.ru */

const fontDataUrl = 'https://lekzd.github.io/codepen/cyrillic-Roboto-Bold-msdf.json';
const fontTextureUrl = 'https://lekzd.github.io/codepen/cyrillic-Roboto-Bold-msdf.png';

fetch(fontDataUrl).then(res => res.json()).then(data => {
  const { scaleW, scaleH } = data.common;
  
  const findChar = (char) => {
    const charData = data.chars.find(item => item.char === char);
    if (!charData) return null;
    
    return {
      uv: [
        (charData.x / scaleW),
        1.0 - (charData.y + charData.height) / scaleH // Flip Y для GL текстуры
      ],
      size: [
        charData.width / scaleW,
        charData.height / scaleH
      ]
    };
  };
  
  const charUv = (char) => findChar(char)?.uv || [0, 0]
  
  const charData = (char) => findChar(char) ? [findChar(char).size[0], findChar(char).size[1], 1.0] : [0, 0, 0]
  
  const digits = Array(10000).fill(0).map(() => Math.round(Math.random()));
  
  const getTime = () => performance.now() / 300
  // const getTime = () => {
  //   const index = Math.floor(performance.now() / 300) % (digits.length - 3);
    
  //   return +digits.slice(index, 3).join('')
  // }
  
  const getLetter = (i) => {
    return 'СТЕКЛО'[i]
  }
  
  RGBA(`
  //	Classic Perlin 3D Noise
      //	by Stefan Gustavson
      //
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec4 P){
        vec4 Pi0 = floor(P); // Integer part for indexing
        vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec4 Pf0 = fract(P); // Fractional part for interpolation
        vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
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

        vec4 gx00 = ixy00 / 7.0;
        vec4 gy00 = floor(gx00) / 7.0;
        vec4 gz00 = floor(gy00) / 6.0;
        gx00 = fract(gx00) - 0.5;
        gy00 = fract(gy00) - 0.5;
        gz00 = fract(gz00) - 0.5;
        vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
        vec4 sw00 = step(gw00, vec4(0.0));
        gx00 -= sw00 * (step(0.0, gx00) - 0.5);
        gy00 -= sw00 * (step(0.0, gy00) - 0.5);

        vec4 gx01 = ixy01 / 7.0;
        vec4 gy01 = floor(gx01) / 7.0;
        vec4 gz01 = floor(gy01) / 6.0;
        gx01 = fract(gx01) - 0.5;
        gy01 = fract(gy01) - 0.5;
        gz01 = fract(gz01) - 0.5;
        vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
        vec4 sw01 = step(gw01, vec4(0.0));
        gx01 -= sw01 * (step(0.0, gx01) - 0.5);
        gy01 -= sw01 * (step(0.0, gy01) - 0.5);

        vec4 gx10 = ixy10 / 7.0;
        vec4 gy10 = floor(gx10) / 7.0;
        vec4 gz10 = floor(gy10) / 6.0;
        gx10 = fract(gx10) - 0.5;
        gy10 = fract(gy10) - 0.5;
        gz10 = fract(gz10) - 0.5;
        vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
        vec4 sw10 = step(gw10, vec4(0.0));
        gx10 -= sw10 * (step(0.0, gx10) - 0.5);
        gy10 -= sw10 * (step(0.0, gy10) - 0.5);

        vec4 gx11 = ixy11 / 7.0;
        vec4 gy11 = floor(gx11) / 7.0;
        vec4 gz11 = floor(gy11) / 6.0;
        gx11 = fract(gx11) - 0.5;
        gy11 = fract(gy11) - 0.5;
        gz11 = fract(gz11) - 0.5;
        vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
        vec4 sw11 = step(gw11, vec4(0.0));
        gx11 -= sw11 * (step(0.0, gx11) - 0.5);
        gy11 -= sw11 * (step(0.0, gy11) - 0.5);

        vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
        vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
        vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
        vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
        vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
        vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
        vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
        vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
        vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
        vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
        vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
        vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
        vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
        vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
        vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
        vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

        vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
        g0000 *= norm00.x;
        g0100 *= norm00.y;
        g1000 *= norm00.z;
        g1100 *= norm00.w;

        vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
        g0001 *= norm01.x;
        g0101 *= norm01.y;
        g1001 *= norm01.z;
        g1101 *= norm01.w;

        vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
        g0010 *= norm10.x;
        g0110 *= norm10.y;
        g1010 *= norm10.z;
        g1110 *= norm10.w;

        vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
        g0011 *= norm11.x;
        g0111 *= norm11.y;
        g1011 *= norm11.z;
        g1111 *= norm11.w;

        float n0000 = dot(g0000, Pf0);
        float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
        float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
        float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
        float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
        float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
        float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
        float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
        float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
        float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
        float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
        float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
        float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
        float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
        float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
        float n1111 = dot(g1111, Pf1);

        vec4 fade_xyzw = fade(Pf0);
        vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
        vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
        vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
        vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
        float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
        return 2.2 * n_xyzw;
      }
      
  float myFwidth(float v) {
      return 0.5;
  }
  float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
  }
  
  float msdf_sample(sampler2D tex, vec2 uv) {
    vec3 msd = texture2D(tex, uv).rgb;
    float sd = median(msd.r, msd.g, msd.b) - 0.5;
    return clamp(sd / myFwidth(sd) + 0.5, 0.0, 1.0);
  }
  
  float renderChar(vec2 uv, vec2 charPos, vec2 charSize, vec2 charUV) {
    vec2 charCoords = (uv - charPos) / charSize;
    float offset = 0.;
    if (charCoords.x < -offset || charCoords.x > fontScale + offset || 
        charCoords.y < -offset || charCoords.y > fontScale + offset) {
      return 0.0;
    }
    vec2 finalUV = charUV + charCoords * (charSize / fontScale);
    return msdf_sample(tex[0], finalUV);
  }
      
  float getDigits(vec2 uv) {
    float digits = 0.0;
    
    vec2 charPos = vec2(sin(time * 0.1) - 1.5, -0.6);
    float spacing = 0.05;
    
    if (char0_data.z > 0.0) { // Проверка что символ найден
      digits = max(digits, renderChar(
        uv, 
        charPos, 
        vec2(char0_data.x, char0_data.y), 
        vec2(char0_uv.x, char0_uv.y)
      ));
    }
    
    if (char1_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + spacing, 0.0), 
        vec2(char1_data.x, char1_data.y), 
        vec2(char1_uv.x, char1_uv.y)
      ));
    }
    
    if (char2_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + char1_data.x * fontScale + spacing * 2.0, 0.0), 
        vec2(char2_data.x, char2_data.y), 
        vec2(char2_uv.x, char2_uv.y)
      ));
    }
    
    if (char3_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + char1_data.x * fontScale + char2_data.x * fontScale + spacing * 3.0, 0.0), 
        vec2(char3_data.x, char3_data.y), 
        vec2(char3_uv.x, char3_uv.y)
      ));
    }
    
    if (char4_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + char1_data.x * fontScale + char2_data.x * fontScale + char3_data.x * fontScale + spacing * 4.0, 0.0), 
        vec2(char4_data.x, char4_data.y), 
        vec2(char4_uv.x, char4_uv.y)
      ));
    }
    
    if (char5_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + char1_data.x * fontScale + char2_data.x * fontScale + char3_data.x * fontScale + char4_data.x * fontScale + spacing * 5.0, 0.0), 
        vec2(char5_data.x, char5_data.y), 
        vec2(char5_uv.x, char5_uv.y)
      ));
    }
    
    if (char6_data.z > 0.0) {
      digits = max(digits, renderChar(
        uv, 
        charPos + vec2(char0_data.x * fontScale + char1_data.x * fontScale + char2_data.x * fontScale + char3_data.x * fontScale + char4_data.x * fontScale + char5_data.x * fontScale + spacing * 6.0, 0.0), 
        vec2(char6_data.x, char6_data.y), 
        vec2(char6_uv.x, char6_uv.y)
      ));
    }
    
    return digits;
  }
  
  //https://iquilezles.org/articles/palettes/
  vec3 palette( float t ) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263,0.416,0.557);

      return a + b*cos( 6.28318*(c*t+d) );
  }
  
  vec3 refract_palette( float t ) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.00, 0.33, 0.67);

      return a + b*cos( 6.28318*(c*t+d) );
  }
  
  float sdCircle( vec2 p, float r )
  {
      return length(p) - r;
  }
  
  float smin( float a, float b, float k )
  {
      k *= 1.0;
      float r = exp2(-a/k) + exp2(-b/k);
      return -k*log2(r);
  }
  
  vec3 getBgColor(vec2 uv) {
    float d = 1.;
    float t = time * 0.1;
    
    float n1 = cnoise(vec4(uv, uv + t)) * noiseAmount;
    float n2 = cnoise(vec4(uv, uv + t)) * noiseAmount;

    for (int i = 0; i < 20; i++) {
      vec2 pos = vec2(
        n1,
        n2
      );
      float size = sin(float(i)) * amplitude + amplitude;
      d = smin(d, sdCircle(uv * 0.5 + pos, size), morphing);
    }
    
    float f = mix(
        fract(d * uvStep),
        fract(d * uvStep + 0.5),
        smoothstep(0.8, 1.0, fract(d * uvStep))
    ) + sin(d * uvStep);
    
    return palette(mod(f * colorRange + color2, 1.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy*2.-1.;
    uv.y *= resolution.y/resolution.x;
    
    float PI = 3.14159;
  
  float halfSector = sectors * 0.5;
  
  float angle = atan(uv.y, uv.x); // угол в полярных координатах
  angle = abs(mod(angle, PI / halfSector) - PI / sectors); // разбиваем на сектора
  vec2 muv = vec2(cos(angle), sin(angle)) * length(uv); // возвращаем в декартовы координаты
    
    float n1 = cnoise(vec4(uv, uv + time * 0.1)) * 0.2;
    float digits = getDigits(uv + n1);
    
    
    vec3 bgColor = getBgColor(muv);
    
    vec2 reflected = reflect(muv + n1, vec2(1. - digits) * 0.5);
    float lightAmount = 1.;
    float edgeLightAmount = pow(dot(vec2(1. - digits), (1.0 - muv) * 0.5), 10.);
    vec3 refractedFactor = mix(refract_palette(n1 * 10.) * 4., vec3(1.), pow(digits, 1.));
    vec3 baseColor = getBgColor(reflected);
    vec3 glassColor = vec3(0.3);
    vec3 fgColor = baseColor 
      * max(refractedFactor, vec3(lightAmount))
      + (glassColor) * (digits)
      + edgeLightAmount * 10.
      ;
    
    vec3 background = bgColor;
    vec3 foreground = fgColor;
    
    vec3 color = mix(background, foreground, smoothstep(0.01, 0.1, digits));
    
    gl_FragColor = vec4(vec3(color), 1.0);
  }
  `, {
    textures: [fontTextureUrl],
    uniforms: {
      char0_uv: () => charUv(getLetter(0)),
      char0_data: () => charData(getLetter(0)),
      char1_uv: () => charUv(getLetter(1)),
      char1_data: () => charData(getLetter(1)),
      char2_uv: () => charUv(getLetter(2)),
      char2_data: () => charData(getLetter(2)),
      char3_uv: () => charUv(getLetter(3)),
      char3_data: () => charData(getLetter(3)),
      char4_uv: () => charUv(getLetter(4)),
      char4_data: () => charData(getLetter(4)),
      char5_uv: () => charUv(getLetter(5)),
      char5_data: () => charData(getLetter(5)),
      char6_uv: () => charUv(getLetter(6)),
      char6_data: () => charData(getLetter(6)),
      fontScale: () => 18,
      
      sectors: slider("sectors", 8, 2, 50, 1),
      noiseAmount: slider("noise", 1, 0, 5, 0.1),
      amplitude: slider("amplitude", 0.1, 0, 0.5, 0.01),
      uvStep: slider("step", 10, 1, 100, 1),
      morphing: slider("morphing", 0.01, 0, 1, 0.01),
      color2: slider("color", 0.93, 0, 1, 0.01),
      colorRange: slider("color range", 0.1, 0, 1, 0.01),
    }
  });
});
