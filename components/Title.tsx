import styled from "styled-components"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import { animated } from 'react-spring'
import gsap from "gsap";

interface TitleProps {
  withBg: boolean;
}

export default function Title({
  withBg,
}: TitleProps) {
  const letterRef = useRef<any>([]);
  const name = ['b' ,'o', 'n²', 'i', 'e', 'p', 'h', 'a', 'm']
  const [images, setImages] = useState([
    '../../thumbnails/2024/3/3.jpg',
    '../../thumbnails/2024/3/20.jpg',
    '../../thumbnails/2024/3/23.jpg',
    '../../thumbnails/2024/1/8.jpg',
    '../../thumbnails/2023/11/22.jpg',
    '../../thumbnails/2023/11/20.jpg',
    '../../thumbnails/2024/2/15.jpg',
    '../../thumbnails/2024/2/27.jpg',
    '../../thumbnails/2024/2/28.jpg',
  ]);

  useEffect(() => {
    gsap.fromTo(letterRef.current, {opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.05, delay: 2.2 })
  }, [])

  return (
    <Container>
      {name.map((letter, i) => (
        <div
          ref={el => letterRef.current[i] = el}
          key={i}
        >
          <Box
            bg={images[i]}
            withBg={withBg}
          >
            <motion.div
              animate={{ opacity: 1, y:0 }}
              transition={{ opacity: { from: 0, duration: 1, delay: i*0.2 }, y: { from: -20, duration: 1, delay: i*0.2 } }}
              >
              <animated.span
                // style={letterSpring}
              >{letter}</animated.span>
            </motion.div>
          </Box>
        </div>
      ))}
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{ y: { from: 10, duration: 1.5, delay: 2.1 }, opacity: { from: 0, duration: 1.5, delay: 2.3 } }}
        style={{ width: '100%'}}
      >
        <Archive>
          archives
        </Archive>
      </motion.div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  width: 125px;
  padding: 50px;

  @media (max-width: 768px) {
    gap: 0;
    width: 114px;
    padding: 20px;
  }
`

const Box = styled.div<{bg: string, withBg: boolean}>`
  height: 35px;
  width: 35px;
  flex-basis: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  font-size: 30px;
  font-weight: 700;
  line-height: 22px;
  background-color: transparent;
  background-image: url(${props => props.withBg ? props.bg: 'none'});
  background-size: cover;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);

  @media (max-width: 768px) {
    font-size: 20px;
    height: 30px;
    width: 30px;
    line-height: 18px;
  }
`

const Archive = styled.div`
  color: white;
  text-align: center;
  background-color: black;
  height: 12px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;

  @media (max-width: 768px) {
    font-size: 8px;
    margin-top: 4px;
    height: 10px;
    width: 65%;
  }
`
