import {JaspenViewer} from './Viewer'

console.log('ver 0.0.2');

let div = document.getElementById('viewer');
if (div) {
  const viewer = new JaspenViewer(<HTMLDivElement>div);
  viewer.loadGltfModel({path: '../../../public/asset/model/owl/owl.gltf'})
} else {
  console.error('creating div failed');
}
