import useModalStore, { ModalStore } from "@/stores/modal";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components"

export default function Cursor() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const { isModalOpen, isAboutModalOpen } = useModalStore((state) => state) as ModalStore;

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();

    return () => removeEventListeners();
  }, []);

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach(el => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };
  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({x: e.clientX, y: e.clientY});
  };  
    
  const onMouseLeave = () => {
    setHidden(true);
  };
    
  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };
                                                            
  return (
    <Mouse
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      hidden={hidden}
      clicked={clicked}
      hovered={linkHovered}
      modalOpen={isModalOpen}
      aboutModalOpen={isAboutModalOpen}
    />
  )
}

const Mouse = styled.div<{
  hidden: boolean;
  clicked: boolean;
  hovered: boolean;
  modalOpen: boolean;
  aboutModalOpen: boolean;
}>`
  width: 40px;
  height: 40px;
  border: 2px solid #000000;
  border-radius: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 99999;

  transition: all 150ms ease;
  transition-property: background-color;

  ${props => props.hidden && css`
    opacity: 0;
  `}

  ${props => props.clicked && css`
    transform: translate(-50%, -50%) scale(0.8);
    background-color: #000000;
  `} 

  ${props => props.hovered && css`
    transform: translate(-50%, -50%) scale(1.25);
    background-color: #000000;
    mix-blend-mode: difference;
  `}

  ${props => props.modalOpen && css`
    border: 2px solid #ffffff;
  `}

  ${props => props.modalOpen && props.clicked && css`
    border: 2px solid #ffffff;
    background-color: #ffffff;
  `}

  ${props => props.aboutModalOpen && css`
  border: 2px solid #ffffff;
`}

${props => props.aboutModalOpen && props.clicked && css`
  border: 2px solid #ffffff;
  background-color: #ffffff;
`}
`