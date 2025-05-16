
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import { toast } from 'sonner';

const Room3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mountRef.current.appendChild(renderer.domElement);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);
    scene.add(camera);
    cameraRef.current = camera;

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x8ebbff, 0.7); // Slightly blue fill light
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfff1e0, 0.8); // Warm rim light
    rimLight.position.set(0, 3, -10);
    scene.add(rimLight);

    // Create a spotlight for the "power on" effect
    const screenSpotlight = new THREE.SpotLight(0x00aaff, 1.5);
    screenSpotlight.position.set(0, 1, 2);
    screenSpotlight.angle = Math.PI / 6;
    screenSpotlight.penumbra = 0.2;
    screenSpotlight.decay = 2;
    screenSpotlight.distance = 10;
    screenSpotlight.target.position.set(0, -0.5, 0);
    scene.add(screenSpotlight);
    scene.add(screenSpotlight.target);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enabled = true; // Enable user interaction
    controlsRef.current = controls;

    // Change cursor to indicate draggable model
    mountRef.current.style.cursor = 'grab';

    // Create particle system for tech effect
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Load PC/workstation model
    const loader = new GLTFLoader();
    setIsLoading(true);
    
    // Try to load a gaming PC model first
    loader.load(
      "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/gaming-pc/model.gltf",
      (gltf) => {
        const model = gltf.scene;
        
        // Apply shadows and adjust materials
        model.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Enhance materials if needed
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              
              // Make specific parts glow or have special effects
              if (material.name.includes('screen') || material.name.includes('monitor')) {
                material.emissive = new THREE.Color(0x0088ff);
                material.emissiveIntensity = 0.8;
              }
              
              if (material.name.includes('rgb') || material.name.includes('led')) {
                material.emissive = new THREE.Color(0xff00ff);
                material.emissiveIntensity = 0.5;
              }
            }
          }
        });
        
        // Position and scale the model
        model.scale.set(0.8, 0.8, 0.8);
        model.position.set(0, -1.5, 0);
        model.rotation.set(0, Math.PI / 4, 0);
        
        scene.add(model);
        modelRef.current = model;
        
        // Initial animation with GSAP
        gsap.from(model.rotation, {
          y: Math.PI * 2,
          duration: 2,
          ease: "power2.out"
        });
        
        gsap.from(model.position, {
          y: -5,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        });

        // Add "power on" animation after model loads
        setTimeout(() => {
          const timeline = gsap.timeline();
          
          // Glow effect for any LED parts
          model.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (mesh.material && mesh.name.includes('light')) {
                const material = mesh.material as THREE.MeshStandardMaterial;
                timeline.to(material, {
                  emissiveIntensity: 1.5,
                  duration: 0.5,
                  yoyo: true,
                  repeat: 3
                }, 0);
              }
            }
          });
          
          // Spotlight animation
          timeline.to(screenSpotlight, {
            intensity: 3,
            duration: 0.3,
            yoyo: true,
            repeat: 1
          }, 0);
          
          toast.success("PC System powered on", {
            position: "bottom-center"
          });
        }, 2000);
        
        // Interactive hover animation
        document.addEventListener('mousemove', (event) => {
          if (!modelRef.current || !mountRef.current) return;
          
          const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          
          gsap.to(modelRef.current.rotation, {
            y: Math.PI / 4 + mouseX * 0.1,
            x: mouseY * 0.05,
            duration: 1,
            ease: "power2.out"
          });
        });
        
        setIsLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error('An error happened loading the Gaming PC model:', error);
        // Try loading a modern desktop workstation as fallback
        loadFallbackModel();
      }
    );

    // Fallback to a different PC model if the first one fails
    const loadFallbackModel = () => {
      loader.load(
        "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/desktop-computer/model.gltf",
        (gltf) => {
          const model = gltf.scene;
          
          model.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });
          
          model.scale.set(2, 2, 2);
          model.position.set(0, -1.5, 0);
          model.rotation.set(0, Math.PI / 4, 0);
          
          scene.add(model);
          modelRef.current = model;
          
          gsap.from(model.rotation, {
            y: Math.PI * 2,
            duration: 2,
            ease: "power2.out"
          });
          
          gsap.from(model.position, {
            y: -5,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          });
          
          setIsLoading(false);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.error('An error happened loading the fallback model:', error);
          // If all else fails, create a custom PC model with geometry
          createGeometricPCModel();
        }
      );
    };

    // Create a geometric PC model if all GLTF models fail
    const createGeometricPCModel = () => {
      const group = new THREE.Group();
      
      // Create PC case
      const caseGeometry = new THREE.BoxGeometry(1.5, 3, 1);
      const caseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 0.5
      });
      const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
      pcCase.position.set(0, -0.5, 0);
      pcCase.castShadow = true;
      pcCase.receiveShadow = true;
      group.add(pcCase);
      
      // Create monitor
      const monitorBaseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.1, 16);
      const monitorBaseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.2
      });
      const monitorBase = new THREE.Mesh(monitorBaseGeometry, monitorBaseMaterial);
      monitorBase.position.set(-2, -1.5, 0);
      monitorBase.castShadow = true;
      monitorBase.receiveShadow = true;
      group.add(monitorBase);
      
      // Create monitor stand
      const standGeometry = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      const standMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.2
      });
      const monitorStand = new THREE.Mesh(standGeometry, standMaterial);
      monitorStand.position.set(-2, -0.9, 0);
      monitorStand.castShadow = true;
      monitorStand.receiveShadow = true;
      group.add(monitorStand);
      
      // Create monitor screen
      const screenGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
      const screenFrameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.5,
        roughness: 0.2
      });
      const screen = new THREE.Mesh(screenGeometry, screenFrameMaterial);
      screen.position.set(-2, -0.2, 0);
      screen.castShadow = true;
      screen.receiveShadow = true;
      group.add(screen);
      
      // Create glowing screen display
      const displayGeometry = new THREE.PlaneGeometry(1.8, 1);
      // Fix: Use MeshStandardMaterial instead of MeshBasicMaterial for emissive property
      const displayMaterial = new THREE.MeshStandardMaterial({
        color: 0x0088ff,
        emissive: new THREE.Color(0x0088ff),
        emissiveIntensity: 1
      });
      const display = new THREE.Mesh(displayGeometry, displayMaterial);
      display.position.set(-2, -0.2, 0.06);
      group.add(display);
      
      // Add RGB lights to PC case
      const createRGBLight = (x: number, y: number, z: number, color: number) => {
        const lightGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.05);
        // Fix: Use MeshStandardMaterial instead of MeshBasicMaterial for emissive property
        const lightMaterial = new THREE.MeshStandardMaterial({
          color: color,
          emissive: new THREE.Color(color),
          emissiveIntensity: 1
        });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(x, y, z);
        return light;
      };
      
      // Add lights in a pattern
      const rgbColors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00, 0x00ffff];
      
      for (let i = 0; i < 6; i++) {
        const y = -1.2 + (i * 0.4);
        const light = createRGBLight(0.7, y, 0.53, rgbColors[i % rgbColors.length]);
        group.add(light);
      }
      
      // Add keyboard
      const keyboardGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.6);
      const keyboardMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.8
      });
      const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
      keyboard.position.set(-1.5, -1.5, 0.8);
      keyboard.castShadow = true;
      keyboard.receiveShadow = true;
      group.add(keyboard);
      
      // Add mouse
      const mouseGeometry = new THREE.CapsuleGeometry(0.12, 0.25, 4, 8);
      const mouseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.8
      });
      const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
      mouse.position.set(-0.5, -1.5, 0.8);
      mouse.rotation.set(Math.PI / 2, 0, Math.PI / 4);
      mouse.scale.set(1, 1, 0.5);
      mouse.castShadow = true;
      mouse.receiveShadow = true;
      group.add(mouse);
      
      // Add desktop surface
      const tableGeometry = new THREE.BoxGeometry(6, 0.1, 3);
      const tableMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x5d4037,
        metalness: 0.0,
        roughness: 0.8
      });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      table.position.set(-1, -1.55, 0);
      table.receiveShadow = true;
      group.add(table);
      
      // Position and add the whole setup to the scene
      group.position.set(1, 0, 0);
      group.rotation.set(0, -Math.PI / 6, 0);
      scene.add(group);
      modelRef.current = group;
      
      // Animate RGB lights
      const rgbLights = group.children.filter(child => {
        // Fix: Type checking to ensure we're only looking for meshes with materials that have emissive property
        if ((child as THREE.Mesh).isMesh) {
          const material = (child as THREE.Mesh).material;
          return material && 'emissive' in material;
        }
        return false;
      });
      
      rgbLights.forEach((light, index) => {
        const mesh = light as THREE.Mesh;
        // Fix: Add type assertion to ensure material is MeshStandardMaterial
        const material = mesh.material as THREE.MeshStandardMaterial;
        gsap.to(material, {
          emissiveIntensity: 0.5,
          duration: 0.5 + (index * 0.1),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
      
      // Initial animations
      gsap.from(group.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out"
      });
      
      gsap.from(group.position, {
        y: -5,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
      
      setIsLoading(false);
    };

    // Add a ground plane with shadow
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({
      opacity: 0.2
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      // Update particles for tech effect
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Mouse interaction events for better UX
    const handleMouseDown = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = true;
      }
      document.body.style.cursor = 'grab';
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseleave', handleMouseUp);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full rounded-2xl room-3d cursor-grab" 
      style={{ 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    />
  );
};

export default Room3D;
