import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { directory, formatDay, formatMonth } from "@/components"; 
import useModalStore, { ModalStore } from "@/stores/modal";
import useDateStore, { DateStore } from "@/stores/date";
import { data } from "./data";
import gsap from "gsap";

export default function ThumbnailGrid() {
  const { year, month, setDate } = useDateStore(state => state) as DateStore;
  const { openModal } = useModalStore(state => state) as ModalStore;
  const containerRef = useRef<any>();
  let timeline = useRef<any>();
  const thumbnailsRef = useRef<any>([]);

  const files = directory[year][month];
  const [thumbnails, setThumbnails] = useState<{src: string, day: number}[]>([]);

  const importedThumbnails = async () => {
    const images: any[] = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      const image = await import(`@/public/thumbnails/${year}/${month}/${file}.jpg`);
      images.push({src: image.default.src, day: file})
    }
    setThumbnails(images);
  }

  useEffect(() => {
    try {
      importedThumbnails();
    } catch (err) {
      console.error('error', err)
    }
  }, [year, month])

  useEffect(() => {
    if (timeline.current) {
      timeline.current.kill();
    }

    if (files.length && thumbnailsRef?.current && containerRef.current) {
      gsap.set(thumbnailsRef.current, {
        opacity: 0,
        y: 30
      })

      gsap.set(containerRef.current, {opacity: 0})
    
      timeline.current = gsap.timeline()
        .to(containerRef.current, { opacity: 1, delay: 0.1})
        .to(thumbnailsRef.current, { opacity: 1, y: 0, stagger: 0.2 }, '-=0.05')
    }
  }, [thumbnails]);

  return (
    <Wrapper>
      <Container ref={containerRef}>
        {
          thumbnails.length > 0 ? 
          thumbnails.map((thumb, i) => (
            <Box
              onClick={() => {
                openModal()
                setDate(year, month, files[i])
              }}
              key={`box-${i}`}
              ref={el => thumbnailsRef.current[i] = el}
            >
              <div>
                <ThumbnailImg src={thumb.src} />
              </div>
              <Tags>
                <Date>
                  {year}{formatMonth(month)}{formatDay(files[i])}
                </Date>
                {data[year][month][files[i]]?.hashtags.map((hashtag, i) => <Hashtag key={i}>#{hashtag}</Hashtag>)}
              </Tags>
            </Box>
          )) : (
            <SleepyText>{year === 2023 && !files.length ? 'This was a sleepy period...' : 'Something great is on the way...'}</SleepyText>
          )
        }
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  padding: 50px;
  margin-bottom: 50px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`

const Box = styled.div`
  position: relative;
  border: 1px solid black;
  padding: 10px 10px 8px 10px;
  transition: all 0.2s;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
    display: flex;
    gap: 10px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
  }

  &::before {
    content:"";
    position:absolute;
    bottom:0;
    right:0;
    border-width: 0px 0px 20px 20px;
    border-color: black white;
    border-style: solid;
    box-shadow:3px 3px -2px #666  
  }

  &::before {
    border-width: 20px 20px 0px 0px;
    content:"";
    position:absolute;
    bottom: -1px;
    right: -1px;
  }
`

const ThumbnailImg = styled.img`
  width: 200px;
  height: 200px;
  outline: 1px solid black;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const Date = styled.div`
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all;
  width: 100%;
`

const Tags = styled.div`
  width: 100%;
`

const Hashtag = styled.p`
  font-size: 10px;
  line-height: 0;

  &:hover {
    text-decoration: underline;
    text-decoration-style: dashed;
  }
`

const SleepyText = styled.p`
  font-size: 10px;
`