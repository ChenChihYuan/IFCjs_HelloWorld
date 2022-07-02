import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    OrthographicCamera,
    Scene,
    WebGLRenderer,
  } from "three";
  import {
      OrbitControls
  } from "three/examples/jsm/controls/OrbitControls";
  
  import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
  } from 'three-mesh-bvh';  

  import * as THREE from 'three'
  import { IFCLoader } from "web-ifc-three/IFCLoader";

  // Sets up the IFC loading
  const ifcLoader = new IFCLoader();

 

  const input = document.getElementById("file-input");
  input.addEventListener(
    "change",
    (changed) => {
      const file = changed.target.files[0];
      var ifcURL = URL.createObjectURL(file);
      ifcLoader.load(
            ifcURL,
            (ifcModel) => 
              scene.add(ifcModel));
    },
    false
  );

  
  // await ifcLoader.ifcManager.setWasmPath("./");
  // ifcLoader.ifcManager.setupThreeMeshBVH(
  //   acceleratedRaycast,
  //   computeBoundsTree,
  //   disposeBoundsTree
  // );
  
  
  // function exampleCallback(event) {
  //   const progress = event.total / event.progress * 100;
  //   console.log("Progress: ", progress, "%");
  // }

  // ifcLoader.ifcManager.setOnProgress(exampleCallback);

  //Creates the Three.js scene
  const scene = new Scene();

  //Object to store the size of the viewport
  const size = {
    width: window.innerWidth /2.01,
    height: window.innerHeight /2.01,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  const camera1 = new PerspectiveCamera(75, aspect);

  // const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
  const camera2 = new OrthographicCamera(-20, 20, 20, -1, 0.1, 10)
  const camera3 = new OrthographicCamera(-20, 20, 20, -1, 0.1, 10)
  const camera4 = new OrthographicCamera(-20, 20, 20, -1, 0.1, 10)

  camera1.position.z = 2
  camera2.position.y = 1
  camera2.lookAt(new THREE.Vector3(0, 0, 0))
  camera3.position.z = 1
  camera4.position.x = 1
  camera4.lookAt(new THREE.Vector3(0, 0, 0))


  camera1.position.z = 15;
  camera1.position.y = 13;
  camera1.position.x = 8;


  

  //Creates the lights of the scene
  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  //Sets up the renderer, fetching the canvas of the HTML
  const canvas1 = document.getElementById("three-canvas");
  const canvas2 = document.getElementById("three-canvas2");
  const canvas3 = document.getElementById("three-canvas3");
  const canvas4 = document.getElementById("three-canvas4");

  const renderer1 = new WebGLRenderer({canvas: canvas1, alpha: true });
  const renderer2 = new WebGLRenderer({canvas: canvas2, alpha: true });
  const renderer3 = new WebGLRenderer({canvas: canvas3, alpha: true });
  const renderer4 = new WebGLRenderer({canvas: canvas4, alpha: true });



  renderer1.setSize(size.width, size.height);
  renderer2.setSize(size.width, size.height);
  renderer3.setSize(size.width, size.height);
  renderer4.setSize(size.width, size.height);

  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new GridHelper(50, 30);
  scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera1, canvas1);
  controls.enableDamping = true;
  
  controls.target.set(-2, 0, 0);

  const controls2 = new OrbitControls(camera2, canvas2)
  controls2.enableRotate = false;

  //Animation loop
  const animate = () => {
    controls.update();
    controls2.update();
    //renderer1.render(scene, camera1);
    render();
    requestAnimationFrame(animate);
  };

  animate();

  //Adjust the viewport to the size of the browser
  window.addEventListener("resize", () => {
    size.width = window.innerWidth/2.01;
    size.height = window.innerHeight/2.01;
    camera1.aspect = size.width / size.height;

    
    camera2.aspect = size.width / size.height;
    camera3.aspect = size.width / size.height;
    camera4.aspect = size.width / size.height;

    camera1.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    camera3.updateProjectionMatrix();
    camera4.updateProjectionMatrix();

    renderer1.setSize(size.width, size.height);
    renderer2.setSize(size.width, size.height);
    renderer3.setSize(size.width, size.height);
    renderer4.setSize(size.width, size.height);
    
  });

  function render() {
    renderer1.render(scene, camera1)
    renderer2.render(scene, camera2)
    renderer3.render(scene, camera3)
    renderer4.render(scene, camera4)
  }