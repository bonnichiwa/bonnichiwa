import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import AnimatedText from "./AnimatedText";
import useIntroStore, { IntroStore } from "@/stores/intro";

export default function VideoOpener() {
  const containerRef = useRef<any>();
  const videoRef = useRef<any>([]);
  const wrapperRef = useRef<any>();
  const textRef = useRef<any>();
  const descriptionRef = useRef<any>([]);
  const { setIntroDone } = useIntroStore((state) => state) as IntroStore;

  const handleMouseMove = (e: any) => {
    setTimeout(() => {
      const x = e.clientX;
      const y = e.clientY;
      
      const w = containerRef.current.offsetWidth / 2;
      const h = containerRef.current.offsetHeight / 2;
  
      let convertX = ((x - w) * 10) / w;
      let convertY = ((y - h) * 5) / h;
  
      textRef.current.style.transform = `
        translateX(calc(-50% + ${convertX * 0.5}px))
        translateY(calc(-50% + ${convertY * 0.7}px))
      `
  
      for (let i = 0; i < descriptionRef.current.length; i++) {
        descriptionRef.current[i].style.transform = `
          translateX(calc(-50% - ${convertX * 0.8 * (i/2 + 0.5)}px))
          translateY(calc(-50% - ${convertY * 0.7 * (i/2 + 0.5)}px))
        `
      }
    }, 200)

  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  },[]);

  useEffect(() => {
    gsap.fromTo(videoRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2}
    )

    gsap.to(textRef.current,
      { opacity: 0, y: -150, duration: 1, delay: 8 }
    )

    gsap.to(descriptionRef.current,
      { opacity: 0, y: -50, duration: 1, delay: 8, stagger: 0.1 }
    )

    gsap.to(videoRef.current,
      { opacity: 0, y: -100, duration: 2, delay: 7,
        onComplete: () => {
          gsap.to(wrapperRef.current, { visibility: 'hidden'})
          setIntroDone();
        }
      }
    )

    gsap.to(containerRef.current,
      { opacity: 0, duration: 2, delay: 9.1,
        onComplete: () => {
          gsap.to(containerRef.current, { visibility: 'hidden'});
          window.removeEventListener('mousemove', handleMouseMove);
        }
       }
    )
  }, []);

  return (
    <>
      <Container ref={containerRef} />
      <Wrapper ref={wrapperRef}>
        <div>
          <video
            height={window.innerWidth <= 768 ?  '100%' : window.innerHeight - 200}
            width={window.innerWidth <= 768 ? window.innerWidth - 200 : '100%'}
            autoPlay
            muted
            ref={videoRef}
          >
            <source src={`/videos/2024/5/24.mp4`} type="video/mp4" />
            Could not load video
          </video>
        </div>
        <TextContainer ref={textRef}>
          <AnimatedText
            text="bonniepham"
            variant="intro"
            delay={1}
            stagger={0.15}
          />
        </TextContainer>
        <CreativeTechnologistContainer ref={el => descriptionRef.current[0] = el}>
          <AnimatedText
            text="creative"
            variant="descriptionSmall"
            delay={1.5}
          />
          <AnimatedText
            text="technologist"
            variant="descriptionSmall"
            delay={2}
          />
        </CreativeTechnologistContainer>
        <SoftwareEngineerContainer ref={el => descriptionRef.current[1] = el}>
          <AnimatedText
            text="software"
            variant="descriptionSmall"
            delay={3}
          />
          <AnimatedText
            text="engineer"
            variant="descriptionSmall"
            delay={3.25}
          />
        </SoftwareEngineerContainer>
        <DreamerContainer ref={el => descriptionRef.current[2] = el}>
          <AnimatedText
            text="dreamer"
            variant="descriptionSmall"
            delay={2.25}
          />
        </DreamerContainer>
        <ArtistContainer ref={el => descriptionRef.current[3] = el}>
          <AnimatedText
            text="artist"
            variant="descriptionSmall"
            delay={2.75}
          />
        </ArtistContainer>
      </Wrapper>
    </>
  )
}

const Container = styled.div`
  background: #ffffff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  overflow: hidden;
`

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CreativeTechnologistContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.2);

  @media (max-width: 768px) {
    top: 10%;
    left: 15%;
  }
`

const SoftwareEngineerContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 70%;
  text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.2);

  @media (max-width: 768px) {
    top: 90%;
    left: 75%;
  }
`

const DreamerContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 60%;
  text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.2);

  @media (max-width: 768px) {
    top: 8%;
    left: 70%;
  }
`

const ArtistContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 30%;
  text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.2);

  @media (max-width: 768px) {
    top: 85%;
    left: 15%;
  }
`