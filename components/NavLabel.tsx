import styled, { css } from "styled-components";

interface navLabelProps {
  label: string | number;
  selected: boolean;
  onClick: () => void;
}

export default function NavLabel({
  label,
  selected,
  onClick,
}: navLabelProps) {
  return (
    <Label
      selected={selected}
      onClick={onClick}
    >{label}</Label>
  )
}

const Label = styled.a<{selected: boolean}>`
  border: 1.5px solid black;
  border-style: dashed;
  display: flex;
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 12px;
  background-color: white;
  color: black;
  text-decoration: none;

  ${props => props.selected && css`
    background-color: black;
    color: white;
    font-weight: 700;
  `}

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