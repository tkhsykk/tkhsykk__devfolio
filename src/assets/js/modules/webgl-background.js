/**
 * WebGL背景エフェクト
 * Three.jsを使用したマウスインタラクティブな背景
 */
import * as THREE from 'three';

export default class WebGLBackground {
	constructor() {
		this.container = document.getElementById('webgl-container');
		if (!this.container) return;

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.uniforms = {
			uTime: { value: 0 },
			uMouse: { value: new THREE.Vector2(0.5, 0.5) },
			uResolution: { value: new THREE.Vector2(this.width, this.height) },
			uColor1: { value: new THREE.Color(0xff006c) }, // Primary
			uColor2: { value: new THREE.Color(0x494b67) }, // Text
		};

		this.init();
	}

	init() {
		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.container.appendChild(this.renderer.domElement);

		this.createPlane();
		this.addEventListeners();
		this.animate();
	}

	createPlane() {
		const geometry = new THREE.PlaneGeometry(2, 2);
		const material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uTime;
				uniform vec2 uMouse;
				uniform vec2 uResolution;
				uniform vec3 uColor1;
				uniform vec3 uColor2;
				varying vec2 vUv;

				// Simplex 2D noise
				vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
				float snoise(vec2 v){
					const vec4 C = vec4(0.211324865405187, 0.366025403784439,
							-0.577350269189626, 0.024390243902439);
					vec2 i  = floor(v + dot(v, C.yy) );
					vec2 x0 = v -   i + dot(i, C.xx);
					vec2 i1;
					i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
					vec4 x12 = x0.xyxy + C.xxzz;
					x12.xy -= i1;
					i = mod(i, 289.0);
					vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
					+ i.x + vec3(0.0, i1.x, 1.0 ));
					vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
					m = m*m ;
					m = m*m ;
					vec3 x = 2.0 * fract(p * C.www) - 1.0;
					vec3 h = abs(x) - 0.5;
					vec3 ox = floor(x + 0.5);
					vec3 a0 = x - ox;
					m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
					vec3 g;
					g.x  = a0.x  * x0.x  + h.x  * x0.y;
					g.yz = a0.yz * x12.xz + h.yz * x12.yw;
					return 130.0 * dot(m, g);
				}

				void main() {
					vec2 st = gl_FragCoord.xy / uResolution.xy;
					float aspect = uResolution.x / uResolution.y;
					st.x *= aspect;
					
					vec2 mouse = uMouse;
					mouse.x *= aspect;

					float dist = distance(st, mouse);
					float noise = snoise(st * 3.0 + uTime * 0.1);
					
					// マウスインタラクション
					float interaction = smoothstep(0.5, 0.0, dist) * 0.5;
					
					// 色の混合
					vec3 color = mix(uColor2, uColor1, noise + interaction);
					
					// 透明度の調整（視認性を向上）
					float alpha = 0.15 + interaction * 0.2;

					gl_FragColor = vec4(color, alpha);
				}
			`,
			transparent: true,
		});

		const plane = new THREE.Mesh(geometry, material);
		this.scene.add(plane);
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));
	}

	onResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.setSize(this.width, this.height);
		this.uniforms.uResolution.value.set(this.width, this.height);
	}

	onMouseMove(e) {
		// マウス座標を0.0〜1.0に正規化（左下が原点になるようにY軸反転）
		this.uniforms.uMouse.value.set(
			e.clientX / this.width,
			1.0 - e.clientY / this.height
		);
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.uniforms.uTime.value += 0.01;
		this.renderer.render(this.scene, this.camera);
	}
}
