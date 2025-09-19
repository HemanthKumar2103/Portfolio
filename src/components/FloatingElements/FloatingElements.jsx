import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useTheme } from '../../common/ThemeContext';
import styles from './FloatingElements.module.css';

function FloatingShape({ position, shape, color }) {
  try {
    const ShapeComponent = shape === 'sphere' ? Sphere : shape === 'box' ? Box : Torus;
    
    return (
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <ShapeComponent position={position} args={shape === 'torus' ? [0.3, 0.1, 8, 16] : [0.5]}>
          <meshStandardMaterial color={color} transparent opacity={0.6} />
        </ShapeComponent>
      </Float>
    );
  } catch (error) {
    console.warn('FloatingShape render error:', error);
    return null;
  }
}

function FloatingElements() {
  const { theme } = useTheme();
  
  const shapes = [
    { position: [-4, 2, -2], shape: 'sphere', color: theme === 'dark' ? '#667eea' : '#764ba2' },
    { position: [4, -1, -3], shape: 'box', color: theme === 'dark' ? '#764ba2' : '#667eea' },
    { position: [-2, -3, -1], shape: 'torus', color: theme === 'dark' ? '#9f7aea' : '#f093fb' },
  ];

  return (
    <div className={styles.container}>
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={(error) => console.warn('Canvas error:', error)}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {shapes.map((shape, index) => (
            <FloatingShape key={`${shape.shape}-${index}`} {...shape} />
          ))}
        </Canvas>
      </Suspense>
    </div>
  );
}

export default FloatingElements;
