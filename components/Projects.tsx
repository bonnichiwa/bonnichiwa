import useModalStore, { ModalStore } from "@/stores/modal";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components"

export default function Projects() {
  const { closeProjectsModal, isProjectsModalOpen } = useModalStore(state => state) as ModalStore;
  const textRef = useRef<any>();
  const listRef = useRef<any>();

  useEffect(() => {
    if (isProjectsModalOpen) {
      gsap.to([textRef.current, listRef.current], { opacity: 1, y: 0, delay: 0.5 })
    } else {
      gsap.to([textRef.current, listRef.current], { opacity: 0, y: 20 })
    }
  }, [isProjectsModalOpen])

  return (
    <Container>
      <div>
        <Text ref={textRef}>
          Projects
        </Text>
        <List ref={listRef}>
          <li><a href="https://www.behance.net/gallery/175359421/GGVJ-An-Interactive-VJing-Experience" target="_blank">GGVJ, New York, 2023</a></li>
          <li><a href="https://www.behance.net/gallery/187629401/Shapes-at-Play" target="_blank">Shapes at Play, Montreal, 2023</a></li>
        </List>
      </div>
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

const List = styled.ul`
  margin: 50px;
  font-size: 12px;

  li {
    a {
      &:hover {
        cursor: none;
        font-weight: 700;
        transition: 0.2s all;
      }
    }
`