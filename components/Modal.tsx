import styled from "styled-components";

import useModalStore, { ModalStore } from "@/stores/modal";
import useDateStore, { DateStore } from "@/stores/date";
import { formatDay, directory, formatMonth } from "."
import { data } from "./data";
import { useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";
import gsap from "gsap";

export default function Modal() {
  const { closeModal, isModalOpen } = useModalStore((state) => state) as ModalStore;
  const { year, month, day, setDate } = useDateStore(state => state) as DateStore;
  const containerRef = useRef<any>();
  const videoRef = useRef<any>();
  const textContainerRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const hashtagRef = useRef<any>([]);
  const arrowLeftRef = useRef<any>();
  const arrowRightRef = useRef<any>();
  const exitButtonRef = useRef<any>();
  const timeline = useRef<any>();
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current?.contains(e.target) && !arrowLeftRef.current?.contains(e.target) && !arrowRightRef.current?.contains(e.target)) {
      videoRef.current?.pause();
      closeModal();
      setVideoLoaded(false);
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener('mousedown', handleClickOutside);
    return () => containerRef.current?.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    if (timeline.current) timeline.current.kill();

    if (videoRef.current && textContainerRef.current && descriptionRef.current && hashtagRef.current && exitButtonRef.current) {
      gsap.set([videoRef.current, textContainerRef.current, descriptionRef.current, hashtagRef.current, exitButtonRef.current], {
        opacity: 0,
        y: 20
      })
    }

    timeline.current = gsap.timeline()
      .to(containerRef.current, {opacity: 1, top: 0})
      .fromTo(arrowLeftRef.current,
        { opacity: 0, left: window.innerWidth <= 768 ? -100 : -window.innerWidth },
        { opacity: 1, left: window.innerWidth <= 768 ? 20 : 'calc(-50% + 10px)' })
      .fromTo(arrowRightRef.current,
        { right: window.innerWidth <= 768 ? -100 : -window.innerWidth },
        { opacity: 1, right: window.innerWidth <= 768 ? 20 : 'calc(-50% + 10px)' }, '-=0.5')
      .fromTo(exitButtonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 })
      .fromTo(videoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 }, '-=1')
      .fromTo(textContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 })
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }, '-=0.8')
        
    if (hashtagRef.current)
      timeline.current.fromTo(hashtagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1 }, '-=0.8')
    
    videoRef.current?.play();
  }, [day, videoLoaded, isModalOpen, window.innerWidth]);

  return (
    <Container ref={containerRef}>
      <ArrowLeft
        ref={arrowLeftRef}
        onClick={() => {
          const index = directory[year][month].findIndex((el: number) => el == day)
          let prevDay = directory[year][month][index - 1]
          let prevDayElement;
          if (!prevDay) {
            // go to last month
            prevDay = directory[year][month - 1]?.slice(-1)[0]
            if (!prevDay) {
              videoRef.current?.pause();
              closeModal();
              return;
            }
            prevDayElement = data[year][month - 1][prevDay]
            if (prevDayElement) {
              setDate(year, month - 1, prevDay)
            } else {
              videoRef.current?.pause();
              closeModal();
            }
          } else {
            prevDayElement = data[year][month][prevDay]
            if (prevDayElement) {
              setDate(year, month, prevDay)
            } else {
              videoRef.current?.pause();
              closeModal();
            }
          }
          setVideoLoaded(false)
        }}
      >{window.innerWidth <= 768 ? '<' : 'previous'}</ArrowLeft>
      <ContentWrapper>
        <VideoContainer>
        <LoadingContainer>
          {videoLoaded ? null : (
            <Loader>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </Loader>
          )}
          </LoadingContainer>
          <video
            key={`${year}-${month}-${day}`}
            controls
            width="100%"
            ref={videoRef}
            onLoadedData={() => {console.log('loaded'); setVideoLoaded(true)}}
          >
            <source src={`/videos/${year}/${month}/${day}.mp4`} type="video/mp4" />
            Could not load video
          </video>
        </VideoContainer>
        <TextContainer
          ref={textContainerRef}
        >
          <AnimatedText
            text={`${year}${formatMonth(month)}${formatDay(day as number)}`}
            variant="modal"
            delay={1}
          />
          {data[year][month][(day as number)]?.track ? (
            <Description ref={descriptionRef}>
              {`track id: ${data[year][month][(day as number)]?.track}`}
            </Description>
          ) : ''}
          <Hashtags>
            {data[year][month][(day as number)]?.hashtags.map((hashtag: string, i: number) => (
              <Description
                ref={el => hashtagRef.current[i] = el}
                key={i}
              >
                {`#${hashtag}`}
              </Description>
            ))}
          </Hashtags>
        </TextContainer>
      </ContentWrapper>
      <X
        onClick={() => {
          videoRef.current?.pause();
          closeModal();
          setVideoLoaded(false);
        }}
        ref={exitButtonRef}
      >X</X>
      <ArrowRight
        ref={arrowRightRef}
        onClick={() => {
          const index = directory[year][month].findIndex((el) => el == day)
          let nextDay = directory[year][month][index + 1]
          let nextDayElement;
          if (!nextDay) {
            // go to next month
            nextDay = directory[year][month + 1][0]
            nextDayElement = data[year][month + 1][nextDay]
            if (nextDayElement) {
              setDate(year, month + 1, nextDay)
            } else {
              videoRef.current?.pause();
              closeModal();
            }
          } else {
            nextDayElement = data[year][month][nextDay]
            if (nextDayElement) {
              setDate(year, month, nextDay)
            } else {
              videoRef.current?.pause();
              closeModal();
            }
          }
          setVideoLoaded(false);
        }}
      >{window.innerWidth <= 768 ? '>' : 'next'}</ArrowRight>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: -100vh;
  left: 0;
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 10;
  overflow: hidden;

  @media (max-width: 768px) {
    overflow-y: scroll;
    align-items: flex-start;
  }
`

const ArrowLeft = styled.div`
  font-size: 16px;
  padding: 6px;
  transform: rotate(-90deg);
  position: absolute;
  left: calc(-50% + 10px);
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;

  &:hover {
    background-color: white;
    color: black;
    transition: all 0.5s;
  }

  &:active {
    background-color: black;
    color: white;
  }

  @media (max-width: 768px) {
    transform: rotate(0deg);
    border: 1px solid white;
    width: 30px;
    height: 30px;
    left: 20px;
    top: 60px;
  }
`

const ArrowRight = styled.div`
  font-size: 16px;
  padding: 6px;
  transform: rotate(90deg);
  position: absolute;
  right: calc(-50% + 10px);
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;

  &:hover {
    background-color: white;
    color: black;
    transition: all 0.5s;
  }

  &:active {
    background-color: black;
    color: white;
  }

  @media (max-width: 768px) {
    transform: rotate(0);
    border: 1px solid white;
    width: 30px;
    height: 30px;
    right: 20px;
    top: 60px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

const VideoContainer = styled.div`
  display: flex;
  height: 100%;
  width: 30vw;
  margin-top: 50px;

  > video {
    height: fit-content;
    max-height: 80%;
  }

  @media (max-width: 768px) {
    padding: 20px;
    width: 60vw;
    margin: 0;
  }
`

const LoadingContainer = styled.div`
  height: 80%;
  width: 30vw;
  position: absolute;
  z-index: 100;
`

const Loader = styled.div`
  z-index: 100;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  
  div {
    box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 8px;
    border: 4px solid currentColor;
    border-radius: 50%;
    animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: currentColor transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const TextContainer = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  border: 1px solid white;
  padding: 40px;
  max-width: 250px;
  height: fit-content;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
    margin: 20px 0 0 0;
    max-width: -webkit-fill-available;
    border: none;
  }
`

const X = styled.div`
  position: absolute;
  right: 50px;
  top: 50px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  outline: 1px solid white;
  color: white;
  font-size: 12px;

  &:hover {
    background-color: white;
    color: black;
    outline: 1px solid white;
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 21px;
    height: 30px;
    display: none;
  }
`

const Hashtags = styled.div`
  padding-top: 50px;
  font-size: 12px;
  font-weight: 400;

  > span {
    line-height: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-decoration-style: dashed;
    }
  }

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`

const Description = styled.div`
  font-weight: 400;
  font-size: 10px;
  
  @media (max-width: 768px) {
    font-size: 8px;
  }
`