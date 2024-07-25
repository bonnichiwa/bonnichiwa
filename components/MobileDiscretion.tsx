import useModalStore, { ModalStore } from "@/stores/modal";
import styled from "styled-components"

export default function MobileDiscretion() {
  const { closeMobileDiscretionModal } = useModalStore(state => state) as ModalStore;

  return (
    <Popup>
      <Container>
        This website is best experienced on desktop.
        <Button
          onClick={() => closeMobileDiscretionModal()}
        >Got it!</Button>
      </Container>
    </Popup>
  )
}

const Popup = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`

const Container = styled.div`
  border: 2px solid black;
  padding: 20px;
  margin: 20px;
  margin-bottom: 0;
  text-align: center;
  font-size: 12px;
`

const Button = styled.div`
  background-color: black;
  color: white;
  width: fit-content;
  padding: 6px 10px;
  margin: 0 auto;
  margin-top: 20px;
`