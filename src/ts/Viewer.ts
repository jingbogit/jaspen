import {AmbientLight, AxesHelper, Clock, Color, GridHelper, PerspectiveCamera, PointLight, PointLightHelper, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import {GltfModel, GltfModelFactory, LoadModelOptions, Model} from './Model/Gltf'

export interface Viewer {
  div: HTMLDivElement;
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  control: OrbitControls;
  destruct: () => void;
}

export class JaspenViewer implements Viewer {
  div: HTMLDivElement;
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  control: OrbitControls;

  models: Model[];
  gltfFactory: GltfModelFactory;
  pointLight0: PointLight;
  pointLight1: PointLight;
  ambientLight: AmbientLight;
  clock: Clock;

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.scene = new Scene();
    this.scene.background = new Color(0xcccccc);
    this.scene.add(new AxesHelper(30));

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.div!.appendChild(this.renderer.domElement);

    this.camera = new PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 2;
    this.camera.position.y = 2;

    // let controls: THREE.OrbitControls;
    this.control = new OrbitControls(this.camera, this.renderer.domElement);

    const grid = new GridHelper(30, 100, 0x000000);
    this.scene.add(grid);

    this.pointLight0 = new PointLight(0xffffff, 1, 100);
    this.pointLight0.position.set(2, 0.5, 2);
    this.scene.add(this.pointLight0);
    this.scene.add(new PointLightHelper(this.pointLight0, 0.5));

    this.pointLight1 = new PointLight(0xffffff, 1, 100);
    this.pointLight1.position.set(0, 0, -2);
    this.scene.add(this.pointLight1);
    var pointLightHelper = new PointLightHelper(this.pointLight1, 0.5);
    this.scene.add(pointLightHelper);

    this.ambientLight = new AmbientLight(0x808080);
    this.scene.add(this.ambientLight);

    this.models = [];
    this.gltfFactory = new GltfModelFactory();
    this.clock = new Clock();
    // this.clock.start();

    this.render();
  }

  destruct(): void {
    this.clock.stop();
    this.models.forEach(element => {
      element.destruct();
    });
  }

  addModel(m: Model): JaspenViewer {
    this.scene.add(m.node);
    this.models.push(m);
    return this;
  }

  async loadGltfModel(opt: LoadModelOptions):
      Promise<GltfModel>{return this.gltfFactory.load(opt).then(model => {
        this.addModel(model);
        return Promise.resolve(model);
      })}

  render = () => {
    requestAnimationFrame(this.render);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    const t = this.clock.getElapsedTime();
    this.pointLight0.position.setX(2 * Math.sin(t));
    this.pointLight0.position.setZ(2 * Math.cos(t));
    this.pointLight1.position.setY(2 * Math.sin(t));
    this.pointLight1.position.setZ(-2 * Math.cos(t));
    if (this.control) {
      this.control.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
