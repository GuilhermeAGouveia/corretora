import { motion } from "framer-motion";
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import colors from "../styles/colors";

interface Option {
  label: string;
  onClick?: () => void;
}

interface SelectOptionPros extends React.InputHTMLAttributes<HTMLInputElement> {
  options: Option[];
}

const SelectOption = ({ options, style }: SelectOptionPros) => {
  // create refs for each option;
  const optionRef = useRef<RefObject<HTMLObjectElement>[]>([]);

  optionRef.current = Array(options.length)
    .fill(null)
    .map(() => createRef());

  const [selected, setSelected] = useState(0);
  const [lineProps, setLineProps] = useState({
    left: 0,
    width: 0,
  });

  function handleSelect(index: number) {
    const e = optionRef.current[index].current as HTMLObjectElement;
    setLineProps({
      width: e.offsetWidth || 0,
      // left é calculado pegando a posição absoluta de e na tela menos o que tem antes, que é a largura de sectionRef e os 5 pixels de padding da borda
      left: e.offsetLeft || 0,
      // left: e.getBoundingClientRect().left - this.sectionRef.current.getBoundingClientRect().width - 5
    });
    setSelected(index);
  }

  useEffect(() => {
    window.addEventListener("resize", () => handleSelect(selected));
    handleSelect(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectOptionContainer style={style} layout>
      {options.map((option, index) => (
        <Option
          key={"select-option-" + index}
          ref={optionRef.current[index]}
          selected={index === selected}
          onClick={() => {
            handleSelect(index);
          }}
        >
          {option.label}
        </Option>
      ))}
      <LineSelect
        initial={{
          left: "0px",
          width: "0px",
        }}
        animate={{
          left: lineProps.left - 0.25 * lineProps.width + "px", //lineProps.left - 0.25 * lineProps.width + "px",
          width: 1.5 * lineProps.width + "px",
        }}
      />
    </SelectOptionContainer>
  );
};

export default SelectOption;

export const SelectOptionContainer = styled(motion.div)`
  position: relative;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ababab;
`;

export const Option = styled<any>("span")`
  position: relative;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 0.9em;
  line-height: 29px;
  color: ${(props) => (props.selected ? colors.primary : "#ABABAB")};
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
`;

export const LineSelect = styled<any>(motion.span)`
  position: absolute;
  bottom: 0px;
  height: 3px;
  background: ${colors.primary};
`;
