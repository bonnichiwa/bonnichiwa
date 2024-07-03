import { Center, useMatcapTexture, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { useControls } from "leva"

const Text = () => {
  // 28292A_D3DAE5_A3ACB8_818183
  // 161B1F_C7E0EC_90A5B3_7B8C9B
  // 3F3A2F_91D0A5_7D876A_94977B
  //3F3D52_CCCED9_AFB0C6_8D8CAC
  const [ matcapTexture ] = useMatcapTexture('3F3D52_CCCED9_AFB0C6_8D8CAC', 256);
  const raycasterRef = useRef(null);
  const instancedMeshRef = useRef(null);
  const [voxels, setVoxels] = useState<any>(null)
  const {
    modelSize,
    gridSize,
    boxSize,
    boxRoundness
  } = useControls({
    modelSize: {
      value: 5.71,
      min: 0,
      max: 9,
    },
    gridSize: {
      value: .05,
      min: 0,
      max: 0.1,
    },
    boxSize: .03,
    boxRoundness: 0.01
  })
  let rayCasterIntersects = [];

  const isInsideMesh = (pos, ray, mesh) => {
    raycasterRef.current?.set(pos, ray);
    rayCasterIntersects = raycasterRef.current?.intersectObject(mesh, false);
    return rayCasterIntersects.length % 2 === 1;
  }

  useEffect(() => {
    voxelizeModel();
  }, [modelSize, gridSize, boxSize, boxRoundness])

  useEffect(() => {
    if (voxels) renderVoxels();
  }, [voxels])

  const text = useGLTF('/models/bonnichiwa.gltf')

  const voxelizeModel = () => {
    const { scene } = text

    const importedMeshes: any = [];
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide;
          importedMeshes.push(child);
        }
    });

    let boundingBox = new THREE.Box3().setFromObject(scene);
    const size = boundingBox.getSize(new THREE.Vector3());
    const scaleFactor = modelSize / size.length();
    const center = boundingBox.getCenter(new THREE.Vector3()).multiplyScalar(-scaleFactor);

    scene.scale.multiplyScalar(scaleFactor);
    scene.position.copy(center);

    boundingBox = new THREE.Box3().setFromObject(scene);
    boundingBox.min.y += .5 * gridSize; // for egg grid to look better

    let modelVoxels = [];

    for (let i = boundingBox.min.x; i < boundingBox.max.x; i += gridSize) {
      for (let j = boundingBox.min.y; j < boundingBox.max.y; j += gridSize) {
        for (let k = boundingBox.min.z; k < boundingBox.max.z; k += gridSize) {
          for (let meshCnt = 0; meshCnt < importedMeshes.length; meshCnt++) {
            const mesh = importedMeshes[meshCnt];

            const color = new THREE.Color();
            const {h, s, l} = mesh.material.color.getHSL(color);
            color.setHSL(h, s * .8, l * .8 + .2);
            const pos = new THREE.Vector3(i, j, k);
            
            if (isInsideMesh(pos, new THREE.Vector3(0, 0, 1), mesh)) {
              modelVoxels.push({color: color, position: pos});
              break;
            }
          }
        }
      }
    }

    setVoxels(modelVoxels);
  }

  const renderVoxels = () => {
    if (!voxels) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < voxels?.length; i++) {
      const voxel = voxels[i];
      const color = voxel.color;
      const position = voxel.position;

      dummy.position.copy(position);
      dummy.updateMatrix();

      instancedMeshRef.current?.setMatrixAt(i, dummy.matrix);
      instancedMeshRef.current?.setColorAt(i, color);
    }
    instancedMeshRef.current?.instanceMatrix.set('needsUpdate',true)
  }

  // useFrame((delta) => {
  //   // console.log('frame', delta.clock.elapsedTime * 0.01)
  //   const dummy = new THREE.Object3D();

  //   for (let i = 0; i < voxels?.length; i++) {
  //     const voxel = voxels[i];
  //     const color = voxel.color;
  //     console.log(voxel.position)
  //     const position = new THREE.Vector3(voxel.position.x, voxel.position.y + delta.clock.elapsedTime * 5, voxel.position.z);
  //     console.log('position', position)

  //     dummy.position.copy(position);
  //     dummy.updateMatrix();

  //     instancedMeshRef.current?.setMatrixAt(i, dummy.matrix);
  //     instancedMeshRef.current?.setColorAt(i, color);
  //   }
  // })

  return (
    <Center>
      <raycaster
        ref={raycasterRef}
      />
      <instancedMesh
        args={[
          new RoundedBoxGeometry(gridSize, gridSize, gridSize, 1, boxRoundness),
          new THREE.MeshMatcapMaterial({matcap: matcapTexture}),
          voxels?.length
        ]}
        ref={instancedMeshRef}
        onPointerEnter={(e) => {console.log(e)}}
      />
    </Center>
  )
}

export default Text
