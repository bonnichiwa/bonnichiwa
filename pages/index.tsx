import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

import styled, { css } from 'styled-components'
import NavMonth from '@/components/NavMonth'
import NavYear from '@/components/NavYear'
import Modal from '@/components/Modal'
import Grid from '@/components/Grid'
import useModalStore, { ModalStore } from '@/stores/modal'
import Title from '@/components/Title'
import Cursor from '@/components/Cursor'
import gsap from 'gsap'
import VideoOpener from '@/components/VideoOpener'
import ThumbnailGrid from '@/components/ThumbnailGrid'
import useIntroStore, { IntroStore } from '@/stores/intro'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Error from 'next/error'

export default function Home() {
  const navTitleRef = useRef<any>();
  const yearRef = useRef<any>();
  const monthRef = useRef<any>();
  const topRowRef = useRef<any>();
  const gridRef = useRef<any>();
  const contentRef = useRef<any>();
  const modalRef = useRef<any>();
  const aboutModalRef = useRef<any>();
  const projectsModalRef = useRef<any>();
  const hamburgerRef = useRef<any>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { isModalOpen, isAboutModalOpen, isProjectsModalOpen } = useModalStore((state) => state) as ModalStore;
  const { isIntroDone } = useIntroStore((state) => state) as IntroStore;


  throw new Error();
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);

    if (isMobile) setMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      gsap.to(navTitleRef.current, { x: -310 })
      gsap.to(yearRef.current, { x: 310 })
      gsap.to(monthRef.current, { x: 310, delay: 0.1 })
      gsap.to(topRowRef.current, { x: 310 })
      gsap.to(modalRef.current, {
        opacity: 1, 
        top: 0,
        visibility: 'visible',
        delay: 0.5
      })
      gsap.to(gridRef.current, { opacity: 0 })
    } else {
      gsap.to(navTitleRef.current, { x: 0 })
      gsap.to(yearRef.current, { x: 0 })
      gsap.to(monthRef.current, { x: 0, delay: 0.1 })
      gsap.to(gridRef.current, { opacity: 1, delay: 0.3 })
      gsap.to(topRowRef.current, { x: 0 })
      gsap.to(modalRef.current, { top: '-100vh', opacity: 0, onComplete: () => gsap.to(modalRef.current, { visibility: 'hidden'}) as any})

    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isAboutModalOpen) {
      gsap.to(navTitleRef.current, { x: -310 })
      gsap.to(yearRef.current, { x: 310 })
      gsap.to(monthRef.current, { x: 310, delay: 0.1 })
      gsap.to(topRowRef.current, { x: 310 })
      gsap.to(aboutModalRef.current, {
        opacity: 1, 
        top: -100,
        visibility: 'visible',
        delay: 0.5,
      })
      gsap.to(gridRef.current, { opacity: 0 })
    } else {
      gsap.to(navTitleRef.current, { x: 0 })
      gsap.to(yearRef.current, { x: 0 })
      gsap.to(monthRef.current, { x: 0, delay: 0.1 })
      gsap.to(gridRef.current, { opacity: 1, delay: 0.3 })
      gsap.to(topRowRef.current, { x: 0 })
      gsap.to(aboutModalRef.current, { top: '-100vh', opacity: 0, onComplete: () => gsap.to(aboutModalRef.current, { visibility: 'hidden'}) as any })
    }
  }, [isAboutModalOpen]);

  useEffect(() => {
    if (isProjectsModalOpen) {
      gsap.to(navTitleRef.current, { x: -310 })
      gsap.to(yearRef.current, { x: 310 })
      gsap.to(monthRef.current, { x: 310, delay: 0.1 })
      gsap.to(topRowRef.current, { x: 310 })
      gsap.to(projectsModalRef.current, {
        opacity: 1, 
        top: -100,
        visibility: 'visible',
        delay: 0.5,
      })
      gsap.to(gridRef.current, { opacity: 0 })
    } else {
      gsap.to(navTitleRef.current, { x: 0 })
      gsap.to(yearRef.current, { x: 0 })
      gsap.to(monthRef.current, { x: 0, delay: 0.1 })
      gsap.to(gridRef.current, { opacity: 1, delay: 0.3 })
      gsap.to(topRowRef.current, { x: 0 })
      gsap.to(projectsModalRef.current, { top: '-100vh', opacity: 0, onComplete: () => gsap.to(projectsModalRef.current, { visibility: 'hidden'}) as any })
    }
  }, [isProjectsModalOpen]);

  useEffect(() => {
    if (isIntroDone) {
      gsap.fromTo(navTitleRef.current, { x: -300 }, { x: 0, duration: 1, delay: 1 })
      gsap.fromTo(yearRef.current, { x: 350 }, { x: 0, duration: 1, delay: 1.2 })
      gsap.fromTo(monthRef.current, { x: 350 }, { x:0, duration: 1, delay: 1.3 })
      gsap.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 })
    }
  }, [isIntroDone]);

  const isMobile = width <= 768;

  useEffect(() => {
    gsap.to(contentRef.current, {
      opacity: isMobile ? menuOpen ? 1 : 0 : 1,
      visibility: isMobile ? menuOpen ? 'visible' : 'hidden' : 'visible',
      height: isMobile ? menuOpen? '100%' : 0 : '100%',
      delay: menuOpen ? 0 : -0.2
    })
  }, [menuOpen, isMobile])

  const handleClickOutside = (e: MouseEvent) => {
    if (!contentRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container>
      <Head>
        <title>bonnie pham archives</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=1" />
      </Head>
      <Cursor />
      <VideoOpener />
      <NavContainer modalopen={isModalOpen}>
        <div ref={navTitleRef}>
          <Title withBg={false} />
        </div>
        <TopRow ref={topRowRef} menuOpen={menuOpen}>
          {isMobile ? (
            <div>
              <Hamburger
                ref={hamburgerRef}
                menuOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Menu
              </Hamburger>
              <MobileMenu ref={contentRef}>
                <NavYear />
                <NavMonth />
              </MobileMenu>
            </div>
          ) : (
            <div>
              <div ref={yearRef}>
                <NavYear />
              </div>
              <div ref={monthRef}>
                <MonthsRow>
                  <NavMonth />
                </MonthsRow>
              </div>
            </div>
          )}
        </TopRow>
      </NavContainer>
      {isMobile ? (
        <div ref={gridRef}>
          <ThumbnailGrid />
        </div>
      ) : (
        <div ref={gridRef}>
          <Grid />
        </div>
      )}
      <div ref={modalRef}>
        <Modal />
      </div>
      <div ref={aboutModalRef}>
        <About />
      </div>
      <div ref={projectsModalRef}>
        <Projects />
      </div>
    </Container>
  )
}

const Container = styled.div`
  user-select: none;
  overflow: hidden;

  @media (max-width: 768px) {
    overflow: visible;
  }
`

const TopRow = styled.div<{menuOpen: boolean}>`
  padding: 50px;
  position: fixed;
  z-index: 1;
  right: 0;
  background-color: transparent;
  pointer-events: auto;

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0;
    margin: 20px;
    background-color: white;
  }

  ${props => props.menuOpen && css`
    outline: 1px solid black;
  `}
`

const MobileMenu = styled.div`
`

const MonthsRow = styled.div`
  margin-top: 10px;
`

const Hamburger = styled.div<{menuOpen: boolean}>`
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  display: none;
  background-color: black;
  color: white;

  ${props => props.menuOpen && css`
    border-bottom: 1px solid black;
  `}

  &:hover {
    background-color: white;
    color: black;
    outline: 1px solid black;
    transition: 0.2s all;
  }

  @media (max-width: 768px) {
    display: block;
  }
`

const NavContainer = styled.div<{modalopen: boolean}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  pointer-events: none;

  ${props => props.modalopen && css`
    z-index: -1;
  `}

  @media (max-width: 768px) {
    position: relative;
    width: initial;
  }
`
