let div = document.getElementById('viewer');
if (div) {
    const viewer = new jaspen.JaspenViewer(div);
    viewer.loadGltfModel({ path: '../../../public/asset/model/owl/owl.gltf' })
} else {
    console.error('creating div failed');
}
