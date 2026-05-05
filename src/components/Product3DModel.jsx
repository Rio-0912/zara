"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

export default function Product3DModel({ modelPath = "/dress.glb", className = "w-full aspect-square bg-zinc-50" }) {
  return (
    <div className={`${className} relative group cursor-grab active:cursor-grabbing`}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-zinc-200 border-t-black rounded-full animate-spin" />
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase">Loading 3D Experience</p>
          </div>
        </div>
      }>
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
          <Environment preset="city" />
          <Stage environment="city" intensity={0.6} contactShadow={false}>
             <Model url={modelPath} />
          </Stage>
          <OrbitControls 
            makeDefault
            enablePan={true} 
            enableZoom={true} 
            autoRotate={false}
            screenSpacePanning={true}
          />
          <ContactShadows 
            position={[0, -0.8, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Canvas>
      </Suspense>
      
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] tracking-widest text-zinc-400 uppercase">360° Interaction</p>
      </div>
    </div>
  );
}
