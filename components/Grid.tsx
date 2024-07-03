import useDateStore, { DateStore } from "@/stores/date";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { BufferGeometry, Event, Vector3 } from "three";
import { CameraControls, Html, PerspectiveCamera, Text } from "@react-three/drei"
import { directory } from ".";
import CameraControl from "camera-controls"
import Square from "./Square";
import gsap from "gsap";
import styled from "styled-components";


function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { year, month } = useDateStore(state => state) as DateStore;
  const [points, setPoints] = useState([]);
  const sleepyRef = useRef<any>();
  const sleepyHtmlRef = useRef<any>();

  const files = directory[year][month];
  const width = 15;
  const height = 15;
  const space = 0.5;
  let rows = [];
  let columns = [];
  let squares = files.length;

  // const { gl } = useThree();
  // useEffect(() => {
  //   // gl === WebGLRenderer
  //   // gl.info.calls
  //   console.log(gl.info);
  // });

  useEffect(() => {
    if (files.length) {
      const newSquares = positionSquares(0, squares, []);
      setPoints(newSquares);
    } else {
      setPoints([]);
    }

    if (sleepyRef.current) {
      gsap.fromTo(sleepyRef.current?.scale, { x: 0, y: 0 }, {x: 8, y: 1, duration: 0.3});
    }
  }, [files]);

  // useEffect(() => {
  //   window.addEventListener('mousemove', (e) => {
  //     handleMouseMove(e);
  //   })

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   }
  // }, []);

  // draw the rows
  for (let y = 0; y < height+space; y+=space) {
    rows.push([y, height])
  }

  // draw the columns
  for (let x = 0; x < width+space; x+=space) {
    columns.push([x, width])
  }

  const drawRow = (row: any) => {
    const points = [];
    points.push(new Vector3(row[0], 0, 0))
    points.push(new Vector3(row[0], row[1], 0))

    return new BufferGeometry().setFromPoints(points)
  }

  const drawColumn = (column: any) => {
    const points = [];
    points.push(new Vector3(0, column[0], 0))
    points.push(new Vector3(column[1], column[0], 0))

    return new BufferGeometry().setFromPoints(points)
  }

  const generateRandomPoints = () => {
    // Generate randomly with bounds
    const randomPointX = Math.random() < 0.5
      ? Math.random() * (width/2) - (space * 8)
      : Math.random() * -(width/2) + (space * 8)
    const randomPointY = Math.random() < 0.5
      ? Math.random() * (height/2) - (space * 8)
      : Math.random() * -(height/2) + (space * 8)
    const roundedRandomPointX = Math.round(randomPointX / space)*space
    const roundedRandomPointY = Math.round(randomPointY / space)*space

    return [roundedRandomPointX, roundedRandomPointY]
  }

  const positionSquares = (index, length, newPoints) => {
    if (index === 0) {
      const randomPoint = [0, 0]
      return positionSquares(1, length, [randomPoint]);
    };

    if (index < length) {
      const randomPoint = generateRandomPoints();
      let canAddPoint = true;
      for (let i = 0; i < newPoints.length; i++) {
        if ((
          newPoints[i][0] - randomPoint[0] <= -space
          || newPoints[i][0] - randomPoint[0] >= space*2)
          && (newPoints[i][1] - randomPoint[1] <= -space*2
          || newPoints[i][1] - randomPoint[1] >= space
        )) {
          canAddPoint = true;
        } else {
          canAddPoint = false;
          break;
        }
      }
      if (canAddPoint) {
        const newCurrentPoints = [...newPoints, randomPoint]
        const newIndex = index + 1;
        return positionSquares(newIndex, length, newCurrentPoints);
      } else {
        return positionSquares(index, length, newPoints);
      }
    }
    return newPoints;
  }

  const { camera, mouse } = useThree();

  const handleMouseMove = (e) => {
    // setTimeout(() => {
      if (!meshRef.current) return;
      // meshRef.current.position.x = (((mouse.x + 1) / 2) * window.innerWidth)/(window.innerWidth*5)
      // meshRef.current.position.y = (((mouse.y + 1) / 2) * window.innerHeight)/(window.innerHeight*5)
      meshRef.current.position.x = mouse.x * 0.1
      meshRef.current.position.y = mouse.y * 0.1
    // }, 500)
  }

  const limitPanningDistance = (e: Event) => {
    const maxX = 0.9;
    const minX = -0.9;
    const maxY = 1.65;
    const minY = -1.65;
    const x = e?.target._target.x;
    const y = e?.target._target.y;

    if (x < minX || x > maxX) {
      e?.target._target.setX(x < minX ? minX : maxX);
      camera.position.setX(x < minX ? minX : maxX);
    }

    if (y < minY || y > maxY) {
      e?.target._target.setY(y < minY ? minY : maxY);
      camera.position.setY(y < minY ? minY : maxY);
    }
  }

  const cameraStartPosition = new Vector3(0, 0, 5);
  const cameraControlRef = useRef<any>();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={cameraStartPosition}
        zoom={0.8}
        aspect={window.innerWidth/window.innerHeight}
      />
      <CameraControls
        makeDefault
        ref={cameraControlRef}
        enabled={true}
        smoothTime={0.7}
        maxZoom={3}
        minZoom={0.8}
        mouseButtons={{
          left: CameraControl.ACTION.TRUCK,
          middle: CameraControl.ACTION.DOLLY,
          right: CameraControl.ACTION.NONE,
          wheel: CameraControl.ACTION.ZOOM,
        }}
        onChange={(e) => limitPanningDistance(e)}
      />
    <mesh
      ref={meshRef}
      dispose={null}
      onPointerMove={(e) => handleMouseMove(e)}
    >
      <group position={[-width/2, -height/2, 0]}>
        {rows.map((row, i) => {
          return (
            <mesh key={`${row}-i`}>
              <lineSegments geometry={drawRow(row)}>
                <lineBasicMaterial attach="material" color={'#000000'} />
              </lineSegments>
            </mesh>
          )
        })}
        {columns.map((column, i) => {
          return (
            <mesh key={`${column}-i`}>
              <lineSegments geometry={drawColumn(column)}>
                <lineBasicMaterial attach="material" color={'#000000'} />
              </lineSegments>
            </mesh>
          )
        })}
      </group>
      {points.length && files.length ? points.map((point, index) => (
        <Suspense fallback={null}>
          <Square
            position={point}
            space={space}
            date={directory[year][month][index]}
            key={index}
          />
        </Suspense>
      )) : (
        <Suspense fallback={null}>
          <mesh
            ref={sleepyRef}
            position={new Vector3(0, 0, 0)}
          >
            <planeGeometry
              args={[0.125, 1]}
            />
            <meshBasicMaterial
              color="black"
            />
            <Html position={[-0.035, 0.25, 0]} ref={sleepyHtmlRef}>
              <SleepyCard>
                {year === 2023 && !files.length ? 'This was a sleepy period...' : 'Something great is on the way...'}
              </SleepyCard>
            </Html>
          </mesh>
        </Suspense>
      )}
      </mesh>
    </>
  )
}

export default function Grid() {
  const canvasRef = useRef<any>();

  useEffect(() => {
    gsap.fromTo(canvasRef.current, {opacity: 0}, { opacity: 1, delay: 1.7 })
  }, []);
  return (
    <div ref={canvasRef}>
      <Canvas
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* <PerformanceMonitor onChange={(e) => console.log(e)}/> */}
        <ambientLight />
          <Scene />
      </Canvas>
    </div>

  )
}

const SleepyCard = styled.div`
  color: white;
  font-size: 12px;
`
