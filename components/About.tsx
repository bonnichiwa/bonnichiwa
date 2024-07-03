import useModalStore, { ModalStore } from "@/stores/modal";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components"

export default function About() {
  const { closeAboutModal, isAboutModalOpen } = useModalStore(state => state) as ModalStore;
  const textRef = useRef<any>();

  useEffect(() => {
    if (isAboutModalOpen) {
      gsap.to(textRef.current, { opacity: 1, y: 0, delay: 0.5 })
    } else {
      gsap.to(textRef.current, { opacity: 0, y: 20 })
    }
  }, [isAboutModalOpen])

  return (
    <Container>
      <Text ref={textRef}>
        <p>Hi! I'm Bonnie, a former software engineer and interior designer.</p>
        <p>Most recently I've taken a break to pursue more creative endeavours.</p>
        <p>Having a background in software and design, I've found my passion lies within the unity of the two - creative coding.</p>
        <p>I like to experiment with the blurring of physical and technological layers of art.</p>
        <p>I specialize in creating audioreactive visuals.</p>
        <p>I am open to work and collaborations as a creative technologist.</p>
        <p>You can find me on Instagram <a href="https://www.instagram.com/bani.visuals/" target="_blank">@bani.visuals</a> and over <a href="mailto:dearbonniepham@gmail.com">email</a>.</p>
      </Text>
      <ExitButton onClick={() => closeAboutModal()}>
        X
      </ExitButton>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
  color: white;
  width: -webkit-fill-available;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 11;
  overflow: hidden;
  gap: 50px;
`

const Text = styled.div`
  font-size: 12px;
  max-width: 600px;
  margin: 50px;

  @media (max-width: 768px) {
    margin: 20px;
    max-width: 450px;
  }
`

const ExitButton = styled.div`
  position: absolute;
  right: 50px;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  height: 30px;
  width: 30px;
  background-color: black;
  transition: all 0.2s;
  font-size: 10px;

  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 768px) {
    padding: 0;
    top: 30px;
    right: 20px;
  }
`