import { directory, formatDay, formatMonth } from ".";
import { useLoader } from "@react-three/fiber";
import { useTransition, useSpring, animated } from '@react-spring/three'
import { useEffect, useState } from "react";
import useModalStore, { ModalStore } from "@/stores/modal";
import useDateStore, { DateStore } from "@/stores/date";
import { Html } from "@react-three/drei";
import { data } from "./data";
import { TextureLoader } from "three";
import styled from "styled-components";

export default function Textures() {
  const [hovered, setHover] = useState(null)
  const { openModal } = useModalStore(state => state) as ModalStore;
  const { year, month, setDate } = useDateStore(state => state) as DateStore;
  const files = directory[year][month];
  
  useEffect(() => {
    document.body.style.cursor = hovered !== null ? "pointer" : "auto"
  }, [hovered])

  const transitions = useTransition(files, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    exitBeforeEnter: true,
    config: { duration: 100 }
  })

  return(
    // <group>
    transitions((style, item, state, index) => (
      item && (
        <animated.mesh
          scale={style.scale}
          position={[item[0], item[1], 0]}
          onPointerEnter={() => setHover(state.ctrl.id)}
          onPointerLeave={() => setHover(null)}
          onClick={() => {
            openModal();
            setDate(year, month, directory[year][month][index])
          }}
          key={state.ctrl.id}
        >
        <mesh>
          {hovered === state.ctrl.id && (
            <Html
              position={[0.51, 0.5, 0]}
            >
              <Info>
                <b>{`${year}${formatMonth(month)}${formatDay(directory[year][month][index])}`}</b>
                <div style={{height: '10px'}}/>
                {data[year][month][directory[year][month][index]]?.hashtags.map(tag => (
                  <p>#{tag}</p>
                ))}
              </Info>
            </Html>
          )}
                            {/* <Suspense fallback={null}> */}
          <boxGeometry
            // args={[hovered === state.ctrl.id ? space*4 : space*2, hovered === state.ctrl.id ? space*4 : space*2, 0]}
            args={[1, 1, 0]}
            attach="geometry"
            // key={`box-${state.ctrl.id}`}
            // ref={el => texturesRef.current[index] = el}
          />

          <meshStandardMaterial
            // map={textures[index]}
            map={(directory[year][month][index]) ? useLoader(TextureLoader, `../../thumbnails/${year}/${month}/${directory[year][month][index]}.jpg`) : null}
            attach="material"
            transparent
            // key={`material-${state.ctrl.id}`}
          />
                  {/* </Suspense> */}
          <ambientLight intensity={0.25} />
          </mesh>
        </animated.mesh>
        )
      ))
    // </group>
  )
}

const Info = styled.div<{left:number, top: number}>`
  position: absolute;
  left: 0;
  top: 0;
  background: #000000;
  color: #ffffff;
  padding: 10px;
  font-size: 12px;

  > p {
    font-size: 10px;
    line-height: 6px;
  }
`
