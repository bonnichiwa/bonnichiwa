import useDateStore, { DateStore } from "@/stores/date";
import { Variant } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  variant: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

export default function AnimatedText({
  text,
  variant,
  delay,
  stagger = 0.1,
}: AnimatedTextProps) {
  const textArray = Array.isArray(text) ? text : [text];
  const charSpanRef = useRef<any>([]);
  const { day } = useDateStore(state => state) as DateStore;
  const timeline = useRef<any>();

  useEffect(() => {
    if (timeline.current) timeline.current.kill();

    timeline.current = gsap.fromTo(charSpanRef.current,
      { opacity: 0 , y: 20 },
      { opacity: 1, y: 0, stagger: stagger, duration: 0.03, delay: delay },
    )

    timeline.current.play();
  }, [day]);

  const splitLine = textArray.map((line, lineIndex) => {
    return line.split(" ").map((word, wordIndex) => {
      return word.split("").map((char, charIndex) => {
        return char
      })
    })
  })

  return (
    <span>
      {textArray.map((line, lineIndex) => (
        <span style={{display: 'flex', gap: '3px'}} key={`${line}-${lineIndex}`}>
          {line.split(" ").map((word, wordIndex) => (
            <Text variant={variant} key={`${word}-${wordIndex}`}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${char}-${charIndex}`}
                  ref={el => charSpanRef.current[charIndex] = el }
                >
                  {char}
                </span>
              ))}
            </Text>
          ))}
        </span>
      ))}
    </span>
  );
};

const Text = styled.p<{variant: string}>`
  margin: 0;
  display: flex;
  
  ${props => props.variant === 'title' && css`
    letter-spacing: -1px;
    line-height: 27px;
    font-style: italic;
    font-weight: 700;
    font-size: 36px;
  `}

  ${props => props.variant === 'intro' && css`
    font-weight: 700;
    font-size: 3.5em;
    letter-spacing: 15px;
    text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.2);

    @media (max-width: 768px) {
      font-size: 2em;
    }
  `}

  ${props => props.variant === 'modal' && css`
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 10px;
    line-height: 40px;

    @media (max-width: 768px) {
      font-size: 16px;
      letter-spacing: 6px;
      line-height: 20px;
    }
  `}

  ${props => props.variant === 'description' && css`
    font-weight: 400;
    font-size: 12px;
  `}

  ${props => props.variant === 'descriptionSmall' && css`
    font-weight: 400;
    font-size: 12px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  `}
`
