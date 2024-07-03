import styled from "styled-components";
import Title from "./Title";
import AnimatedText from "./AnimatedText";
import { useEffect, useRef } from "react";
import { useSpring, animated, useChain } from 'react-spring'

export default function TitleSequence() {
  const introRef = useRef();
  const backgroundRef = useRef();
  const absoluteBgRef = useRef();

  useEffect(() => {
    // animate([
    //   [titleRef?.current, { opacity: [0, 1] }, { duration: 1 }],
    // // //   [introRef?.current, { opacity: 0 }, { delay: 4.5 }],
    // //   // [titleRef?.current, { scale: [2, 1]}, { delay: 0.5 , duration: 1 }],
    //   [titleRef?.current, { top: ['50%', '0'], left: ['50%', '0']} , { delay: 2 , duration: 2 }],
    //   [titleRef?.current, { opacity: [1, 0]} , { delay: 2 }],
    // // //   ['#title-box', {border: '1.5px solid #000', outline: '1.5px solid #000'}],
    // // //   ['#title-letter', {color: '#000', '-webkit-text-stroke-width': 0}],
    // // //   ['#title-box', {backgroundImage: 'none'}],
    // // //   [backgroundRef?.current, {backgroundColor: ['#000', '#fff'], opacity: [1, 0]}, {delay: -2}],
    // ])

  }, []);

  // const titleTransformRef = useSpringRef();
  const title = useSpring({
    ref: titleTransformRef,
    from: { left: '50%', top: '50%', x: '-50%', y: '-50%' },
    to: { left: '0%', top: '0%', x: '0', y: '0' },
    delay: 6000,
    config: {
      duration: 700
    },
    onRest: (e) => {
      if (e.finished === true) {
       backgroundRef.current.style.visibility = 'hidden';
      }
    },
  })

  // const bgRef = useSpringRef();
  const bg = useSpring({
    ref: bgRef,
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 0
  })

  // useChain([titleTransformRef, bgRef])

  return (
    <animated.div style={bg}>
      <Background ref={backgroundRef}>
        <div>
        {/* <ScaleContainer ref={scaleTitleRef}> */}
        {/* <TitleContainer ref={titleRef}> */}
        <animated.div
          style={{
            ...title,
            position: 'absolute'
          }}
          ref={absoluteBgRef}
        >
          <Title
            withBg
          />
        </animated.div>
    
          {/* </TitleContainer>  */}
        {/* </ScaleContainer> */}
        <Intro ref={introRef}>
          <AnimatedText
            text="bonnie pham; creative technologist, artist, software engineer"
            variant="intro"
            delay={2000}
            stagger={0.05}
          />
        </Intro>
        </div>
      </Background>
    </animated.div>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
  background-color: #000;
  overflow: hidden;
`

const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Intro = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  color: white;
  position: absolute;
  bottom: 20%;
  left: 0;
`