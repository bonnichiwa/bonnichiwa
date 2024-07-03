import useModalStore, { ModalStore } from "@/stores/modal";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components"

export default function Projects() {
  const { closeProjectsModal, isProjectsModalOpen } = useModalStore(state => state) as ModalStore;
  const textRef = useRef<any>();

  useEffect(() => {
    if (isProjectsModalOpen) {
      gsap.to(textRef.current, { opacity: 1, y: 0, delay: 0.5 })
    } else {
      gsap.to(textRef.current, { opacity: 0, y: 20 })
    }
  }, [isProjectsModalOpen])

  return (
    <Container>
      <Text ref={textRef}>
        Projects
      </Text>
      <ExitButton onClick={() => closeProjectsModal()}>
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