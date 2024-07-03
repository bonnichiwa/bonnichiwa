import styled from "styled-components";

import NavLabel from "./NavLabel";
import useDateStore, { DateStore } from "@/stores/date";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useModalStore, { ModalStore } from "@/stores/modal";

const years = [
  2023,
  2024,
];

export default function NavYear() {
  const { year: currentYear, month, day, setDate } = useDateStore(state => state) as DateStore;
  const { openAboutModal, openProjectsModal } = useModalStore(state => state) as ModalStore;
  const yearRef = useRef<any>([]);

  useEffect(() => {
    gsap.fromTo(yearRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, stagger: 0.05, delay: 2.2 }
    )
  }, [])

  return (
    <Container>
      <div ref={el => yearRef.current[0]= el}>
        <AboutButton onClick={() => openAboutModal()} >
          about
        </AboutButton>
      </div>
      <div ref={el => yearRef.current[1]= el}>
        <ProjectsButton onClick={() => openProjectsModal()} >
          projects
        </ProjectsButton>
      </div>
      <YearsWrapper>
        {
          years.map((year, i) => (
            <div
              ref={el => yearRef.current[i+2] = el}
              key={i}
            >
              <NavLabel
                label={year}
                selected={year === currentYear}
                onClick={() => setDate(year, month, day as number)}
              />
            </div>
          ))
          }
        </YearsWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-direction: row;

  @media (max-width: 768px) {
    gap: 0;
    justify-content: space-evenly;
    border-bottom: 1px solid black;
    flex-direction: column;
  }
`

const AboutButton = styled.div`
  border: 1.5px solid black;
  border-style: dashed;
  display: flex;
  height: 35px;
  width: 78px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: black;
    color: white;
    transition: all 0.5s;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    height: 18px;
    width: 100%;
    border: none;
  }
`

const ProjectsButton = styled.div`
  border: 1.5px solid black;
  border-style: dashed;
  display: flex;
  height: 35px;
  width: 78px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: black;
    color: white;
    transition: all 0.5s;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    height: 18px;
    width: 100%;
    border: none;
  }
`

const YearsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
    gap: 0;

    > div {
      width: 100%;
      border-top: 1px solid black;
    }
  }
`
