// components/FbxModel.jsx
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export function FbxModel({ url }) {
  const model = useLoader(FBXLoader, url);
  const ref = useRef();

  useEffect(() => {
    if (model && ref.current) {
      model.scale.set(0.01, 0.01, 0.01); // Adjust based on your model
    }
  }, [model]);

  return <primitive object={model} ref={ref} />;
}
