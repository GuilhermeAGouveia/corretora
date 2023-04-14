import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import SelectOption from "../../SelectionFloatLine";

interface Option {
  buttonDisplayContent: {
    label: string;
    Icon?: React.ComponentType<any>;
  };
  content: React.ReactNode | string;
}

interface ContentControlBySelectionFloatLineProps {
  content: Option[];
  isFixed?: boolean;
  initialSelected?: number;
}

export default function ContentControlByFloatLine({
  content,
  isFixed,
  initialSelected
}: ContentControlBySelectionFloatLineProps) {
  const [selected, setSelected] = useState(initialSelected || 0);

  const selectButtons = content.map(option => {
    return {
      content: option.buttonDisplayContent,
      onClick: (num: number) => {
        setSelected(num);
      },
    };
  });

  return (
    <ContentControlContainer>
      <SelectOption
        style={
          isFixed
            ? {
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "2",
                background: "#fff",
              }
            : {
                position: "relative",
              }
        }
        buttons={selectButtons}
        initialSelected={selected}
      />
      <ContentRoot
        animate={{
          left: `-${selected * 100}vw`,
        }}
        ncontents={selectButtons.length}
      >
        {content.map((option, index) => (
          <Content key={index}>{option.content}</Content>
        ))}
      </ContentRoot>
    </ContentControlContainer>
  );
}

export const Content = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`;

const ContentControlContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  overflow-x: hidden;
`;

const ContentRoot = styled(motion.div)<any>`
  position: relative;
  width: calc(100vw * ${(props) => props.ncontents});
  overflow-x: hidden;
  left: 100vw;
  height: auto;
  display: flex;
`;
