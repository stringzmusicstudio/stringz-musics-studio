"use client";

import { useMemo, useRef } from "react";
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

/* =========================================================
   GUITAR
========================================================= */

export function GuitarModel() {
  const { scene } = useGLTF("/models/guitar-optimized.glb");

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const centeredModel = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    clone.position.sub(center);

    // Do this ONCE instead of traversing every React render.
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Shadows aren't being used for Guitar anyway.
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        // Avoid unnecessary frustum calculations for the rotating model.
        mesh.frustumCulled = true;
      }
    });

    return {
      clone,
      radius: sphere.radius,
    };
  }, [scene]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Frame-rate independent rotation.
    groupRef.current.rotation.y += delta * 0.55;

    // Very subtle breathing animation.
    const breathingScale =
      1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.012;

    groupRef.current.scale.setScalar(breathingScale);

    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={groupRef}>
        <group rotation={[-0.18, 0, Math.PI / 2]}>
          <primitive
            object={centeredModel.clone}
            scale={
              isMobile
                ? 0.33
                : 1.8 / centeredModel.radius
            }
            position={[0, isMobile ? -0.1 : 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   DRUMS
========================================================= */

export function DrumModel() {
  const { scene } = useGLTF("/models/drums-optimized.glb");
  const { viewport } = useThree();

  const groupRef = useRef<THREE.Group>(null);

  const centeredScene = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.48;

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
          position={[
            0,
            viewport.width < 5 ? -0.65 : -1,
            0,
          ]}
          rotation={[0, -Math.PI / 5, 0]}
        />
      </Float>
    </group>
  );
}

/* =========================================================
   KEYBOARD
========================================================= */

export function KeyboardModel() {
  const { scene } = useGLTF("/models/keyboard.glb");
  const { viewport } = useThree();

  const groupRef = useRef<THREE.Group>(null);

  const centeredModel = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    clone.position.sub(center);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    return {
      clone,
      radius: sphere.radius,
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Removed the duplicate rotation increment.
    groupRef.current.rotation.y += delta * 0.48;

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
          scale={
            viewport.width < 5
              ? 4
              : 2.1 / centeredModel.radius
          }
          position={[
            0,
            viewport.width < 5 ? -0.15 : 0.2,
            0,
          ]}
          rotation={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

/* =========================================================
   PRELOAD

   Only preload Guitar because it is the first instrument.
   Drums and Keyboard load when their sections approach.
========================================================= */

useGLTF.preload("/models/guitar-optimized.glb");

/* =========================================================
   PLACEHOLDERS
========================================================= */

export function GuitarPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.2;

    meshRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0}
      floatIntensity={1}
    >
      <mesh
        ref={meshRef}
        material={premiumMaterial}
      >
        <capsuleGeometry args={[1, 3, 4, 16]} />
      </mesh>
    </Float>
  );
}

export function DrumPlaceholder() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.15;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0}
      floatIntensity={0.8}
    >
      <group ref={meshRef}>
        <mesh
          position={[0, 0, 0]}
          material={premiumMaterial}
        >
          <cylinderGeometry
            args={[1.5, 1.5, 1.5, 32]}
          />
        </mesh>

        <mesh
          position={[-2, 1, -1]}
          material={premiumMaterial}
        >
          <cylinderGeometry
            args={[0.8, 0.8, 1, 32]}
          />
        </mesh>

        <mesh
          position={[2, 1, -1]}
          material={premiumMaterial}
        >
          <cylinderGeometry
            args={[0.8, 0.8, 1, 32]}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function KeyboardPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.1;

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) *
        0.1 +
      0.2;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        material={premiumMaterial}
      >
        <boxGeometry args={[6, 0.5, 1.5]} />
      </mesh>
    </Float>
  );
}