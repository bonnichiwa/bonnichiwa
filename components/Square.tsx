import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import { formatDay, formatMonth } from ".";
import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useDateStore, { DateStore } from "@/stores/date";
import { data } from "./data";
import styled from "styled-components";
import useModalStore, { ModalStore } from "@/stores/modal";

interface SquareProps {
  space: number;
  date: number;
  position: Array<number>;
}

export default function Square({ space, date, position }: SquareProps) {
  const { year, month, setDate } = useDateStore(state => state) as DateStore;
  const { openModal } = useModalStore(state => state) as ModalStore;
  const map = date ? useLoader(TextureLoader, `../../thumbnails/${year}/${month}/${date}.jpg`) : useLoader(TextureLoader, '../../thumbnails/loading.png');
  const meshRef = useRef<any>();
  const infoRef = useRef<any>();
  const [hovered, setHovered] = useState(0)

  useEffect(() => {
    gsap.from(meshRef.current?.scale, { duration: 0.5, x: 0, y: 0 });
  }, [month]);

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={(e) => {
        setHovered(date)
        gsap.to(meshRef.current?.scale, { duration: 0.4, x: 1.5, y: 1.5 })
        gsap.to(infoRef.current, { opacity: 1, delay: 3})
      }}
      onPointerLeave={(e) => {
        setHovered(0)
        gsap.to(meshRef.current?.scale, { duration: 0.4, x: 1, y: 1 })
      }}
      onClick={() => {
        openModal();
        setDate(year, month, date)
      }}
      position={new Vector3(position[0], position[1], hovered === date ? 0.01 : 0)}
    >
      <mesh>
        <planeGeometry
          args={[space * 2, space * 2]}
        />
        <meshStandardMaterial
          map={map}
        />
        <ambientLight intensity={0.1} />
      </mesh>
      {hovered === date && (
      <Html
        position={[0.51, 0.5, hovered === date ? 0.01 : 0]}
        zIndexRange={[1, 0]}
        ref={infoRef}
      >
        <Info>
          <b>{`${year}${formatMonth(month)}${formatDay(date)}`}</b>
          <div style={{height: '10px'}}/>
          {data[year][month][date]?.hashtags.map((tag, index) => (
            <p key={index}>#{tag}</p>
          ))}
        </Info>
      </Html>
      )}
    </mesh>
  )
}

const Info = styled.div`
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
