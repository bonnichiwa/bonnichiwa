import styled from "styled-components"

interface ActivityBarProps {
  posts: number;
}

export default function ActivityBar({
  posts,
}: ActivityBarProps) {
  return (
    <Container>
      {Array(posts).fill(0).map((post, i) =>
        <Box key={i} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
  padding: 2px;
  max-width: 32px;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
  height: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`

const Box = styled.div`
  height: 3px;
  width: 3px;
  background-color: black;
`