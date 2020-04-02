import {AxesHelper, Box3, Box3Helper, Matrix4, Object3D, Vector3} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface LoadModelOptions {
  path: string;
}

export interface Model {
  name: string;
  node: Object3D;

  destruct: () => void;
}

abstract class ModelFactory {
  public abstract async load(opt: LoadModelOptions): Promise<Model>;
  public someOperations(): string {
    return 'https://refactoring.guru/design-patterns/factory-method/typescript/example'
  }
}

export class GltfModel implements Model {
  name: string;
  node: Object3D;

  content: Object3D;

  constructor(gltf: GLTF) {
    this.name = 'unknown';
    this.content = gltf.scene;
    this.node = new Object3D();
    this.node.add(this.content);
    const bbox = new Box3().setFromObject(this.node);

    this.node.add(new AxesHelper(5));
    this.node.add(new Box3Helper(bbox));

    console.log(this);
    // normalize
    this.normalize();
  }
  /**
   * @brief Model is z-up in obj space, now normalize and rotate to y-up.
   */
  normalize(): GltfModel {
    const bbox = new Box3().setFromObject(this.content);
    // console.log(bbox);
    let center = new Vector3(), size = new Vector3();
    bbox.getCenter(center);
    bbox.getSize(size);
    const scale: number = 1 / Math.max(size.x, size.y);
    // console.log(center);
    // let mat = new Matrix4().setPosition(-center).multiply(
    //     (new Matrix4().makeRotationX(Math.PI / 2))
    //         .multiply(new Matrix4().setPosition(center)));
    // let mat = (new Matrix4().identity().setPosition(-center));
    let mat = new Matrix4().identity().setPosition(center.negate());
    mat.premultiply(new Matrix4().identity().makeRotationX(-Math.PI / 2));

    mat.premultiply(
        new Matrix4().identity().setPosition(new Vector3(0, size.z / 2, 0)));
    mat.premultiply(new Matrix4().identity().makeScale(scale, scale, scale));

    this.node.matrix.identity();
    this.node.matrixAutoUpdate = false;
    this.node.matrix.copy(mat);

    return this;
  }
  /**
   * @todo
   */
  destruct(): void {
    console.warn('TODO: Release memory.')
  }
}

export class GltfModelFactory extends ModelFactory {
  /**
   * load
   */
  public async load(opt: LoadModelOptions): Promise<GltfModel> {
    const path = opt.path;
    // model
    let loader = new GLTFLoader();
    return new Promise(
        (resolve, reject) => {loader.load(
            path,  //'../../../public/asset/model/owl/owl.gltf',
            (gltf) => {
              resolve(new GltfModel(gltf));
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
              console.log(error);
              reject(error);
            })})
  }
}
