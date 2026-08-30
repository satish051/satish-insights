import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';

const EyeModel = () => {
  const groupRef = useRef();
  const innerRef = useRef();
  
  // Track scroll using framer-motion's useScroll hooked into R3F via useFrame
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    // Scroll progress 0 -> 1 mapped to rotation or opening mechanism
    const progress = scrollYProgress.get();
    
    // Rotate the outer casing based on scroll
    if (groupRef.current) {
      groupRef.current.rotation.z = -progress * Math.PI * 2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Float effect
    }

    // The inner 'eye' lids open based on scroll
    // If progress is 0, scale is very small (closed). If progress approaches 1, eye opens fully.
    if (innerRef.current) {
      const openAmount = Math.max(0.1, progress);
      innerRef.current.scale.set(1, openAmount, 1);
      
      // Make the gem glow brighter as it opens
      innerRef.current.material.emissiveIntensity = openAmount * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Casing - Golden rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.15, 16, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Inner mechanisms */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.7}>
        <torusGeometry args={[1, 0.05, 16, 16]} />
        <meshStandardMaterial color="#DAA520" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* The Time Stone (Emerald Green Gem) */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#00FF51" 
          emissive="#00FF51"
          emissiveIntensity={0.1} // Modulated in useFrame
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Lights inside the model space */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#FFD700" />
    </group>
  );
};

export default function EyeOfAgamotto() {
  return (
    <div className="eye-of-agamotto" style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '80px',
      height: '80px',
      zIndex: 9990,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 81, 0.3))'
    }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <EyeModel />
      </Canvas>
    </div>
  );
}
