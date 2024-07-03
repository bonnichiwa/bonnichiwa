import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import NavLabel from "./NavLabel";
import useDateStore, { DateStore } from "@/stores/date";
import { directory, mappedMonths, mappedMonthsReverse } from ".";
import ActivityBar from "./ActivityBar";
import gsap from "gsap";

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'june',
  'july',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec',
];

export default function NavMonth() {
  const { year, month: currentMonth, day, setDate } = useDateStore(state => state) as DateStore;
  const boxRef = useRef<any>([]);

  useEffect(() => {
    gsap.fromTo(boxRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, stagger: 0.05, delay: 2.3 }
    )
  }, [])

  return (
    <Container>
      {
        months.map((month, i) => (
          <Box key={i} ref={(el) => boxRef.current[i] = el}>
            <ActivityBar posts={directory[year][mappedMonths[month]].length} />
            <NavLabel
              label={month}
              selected={month === mappedMonthsReverse[currentMonth]}
              onClick={() => setDate(year, mappedMonths[month], day)}
            />
          </Box>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  max-width: 280px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: none;
    align-items: normal;
    justify-content: normal;
    gap: 0;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
`
