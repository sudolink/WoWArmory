import { M2Loader } from 'three-m2loader';
import { OrbitControls, Stars } from "@react-three/drei";
import {Canvas, useLoader} from "@react-three/fiber";
import { Suspense } from 'react';


function Box() {
    return (
        <mesh>
            <boxGeometry attach = 'geometry' />
            <meshLambertMaterial attach = 'material' color="hotpink" />
        </mesh>
    )
}

export default function ModelThree(props){

    const m2 = useLoader(M2Loader, 'src/assets/models/dwarf/DwarfMale.m2');
    const model = (
        <>
            <primitive object={m2.scene} scale={0.4} />
        </>
    )

    

    return (
        <Canvas>
            <Suspense fallback={null}>
                {model}
            </Suspense>
            <OrbitControls />
            <Box />
        </Canvas>
    )
} 