"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";

// Premium gold metallic material for placeholders
const premiumMaterial = new THREE.MeshPhysicalMaterial({
  color: "#d4af37",
  metalness: 0.9,
  roughness: 0.1,
  envMapIntensity: 1.5,
  clearcoat: 0.8,
  clearcoatRoughness: 0.2,
});

export function GuitarModel() {

  const { scene } = useGLTF("/models/guitar-optimized.glb");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const centeredModel = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    clone.position.sub(center);

    return { clone, center, radius: sphere.radius };
  }, [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const rotationY = useRef(0);

  const [hovered, setHovered] = useState(false);

  // Traverse the scene to enable shadows on all meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

useFrame((state) => {
  if (!groupRef.current) return;
  rotationY.current += 0.008;

  const time = state.clock.elapsedTime;

  // Breathing animation
  const breathingScale = 1 + Math.sin(time * 1.2) * 0.012;
  const hoverScale = hovered ? 1.02 : 1;
  const finalScale = breathingScale * hoverScale;

  groupRef.current.scale.setScalar(
    THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      finalScale,
      0.08
    )
  );

  // While hovering, rotate according to mouse movement
 // Auto rotate only when the mouse isn't over the guitar
if (!hovered) {
  rotationY.current += 0.009;
}

// Apply the current rotation
groupRef.current.rotation.y = rotationY.current;

// Keep the guitar upright
groupRef.current.rotation.x = 0;
groupRef.current.rotation.z = 0;
});
return (
  <group position={[0, 0, 0]}>
    <group ref={groupRef}>
      <group rotation={[-0.18, 0, Math.PI / 2]}>
        <primitive
          object={centeredModel.clone}
          scale={isMobile ? 0.33 : 1.8 / centeredModel.radius}
          position={[0, isMobile ? -0.1 : 0, 0]}
        />
      </group>
    </group>
  </group>
);
}
export function DrumModel() {
  const { scene } = useGLTF("/models/drums-optimized.glb");
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
const rotationY = useRef(0);

  const centeredScene = useMemo(() => {
   
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    return clone;
  }, [scene]);
  useFrame(() => {
  if (!groupRef.current) return;

  rotationY.current += 0.008;
  groupRef.current.rotation.y = rotationY.current;

  // Keep the drums upright
  groupRef.current.rotation.x = 0;
  groupRef.current.rotation.z = 0;
});

  return (
  <group ref={groupRef}>
    <Float
      speed={1.5}
      rotationIntensity={0}
      floatIntensity={0.4}
    >
      <primitive
        object={centeredScene}
        scale={viewport.width < 5 ? 11.2 : 3.4}
        position={[0, viewport.width < 5 ? -0.65 : -1, 0]}
        rotation={[0, -Math.PI / 5, 0]}
      />
    </Float>
  </group>
);
}
export function KeyboardModel() {
  const { scene } = useGLTF("/models/keyboard.glb");
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
const rotationY = useRef(0);

  const centeredModel = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    clone.position.sub(center);

    return { clone, radius: sphere.radius };
  }, [scene]);
  useFrame(() => {
  if (!groupRef.current) return;
  rotationY.current += 0.008;

  rotationY.current += 0.004; // rotation speed

  groupRef.current.rotation.y = rotationY.current;
  groupRef.current.rotation.x = 0;
  groupRef.current.rotation.z = 0;
});

  return (
    <Float
  speed={1.2}
  rotationIntensity={0}
  floatIntensity={0.25}
>
      <group ref={groupRef}>
  <primitive
  object={centeredModel.clone}
  scale={viewport.width < 5 ? 4 : 2.1 / centeredModel.radius}
 position={[0, viewport.width < 5 ? -0.15 : 0.2, 0]}
 rotation={[0, 0, 0]}
/>
</group>
</Float>
  );
}

useGLTF.preload("/models/guitar-optimized.glb");

export function GuitarPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <mesh ref={meshRef} material={premiumMaterial} castShadow receiveShadow>
        {/* Placeholder: A stylized rounded box resembling a guitar body */}
        <capsuleGeometry args={[1, 3, 4, 16]} />
      </mesh>
    </Float>
  );
}

export function DrumPlaceholder() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.8}>
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]} material={premiumMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 1.5, 32]} />
        </mesh>
        <mesh position={[-2, 1, -1]} material={premiumMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
        </mesh>
        <mesh position={[2, 1, -1]} material={premiumMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
        </mesh>
      </group>
    </Float>
  );
}

export function KeyboardPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1 + 0.2; // Slight tilt
    }
  });

  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={meshRef} material={premiumMaterial} castShadow receiveShadow>
        <boxGeometry args={[6, 0.5, 1.5]} />
      </mesh>
    </Float>
  );
}
