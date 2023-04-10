import React, { useEffect, useState, KeyboardEvent } from "react";
import { FiCheck, FiChevronLeft } from "react-icons/fi";
import colors from "../../styles/colors";
import ShowTrail from "./component/ShowTrail";

import {
  ActionsForm,
  AreaShow,
  Form,
  FormContent,
  FormContentWrapper,
  FormHeader,
  MoveButton,
  SectionInputContent,
} from "./styles";
import { IconType } from "react-icons";
import BannerInfo, { useBannerInfo } from "../BannerInfo";
import { AlertType } from "../../lib/interfaces";

export interface IFormSection {
  description: string;
  icon: IconType;
  inputs: React.ReactNode[];
}

interface FormImovelProps {
  sections: IFormSection[];
  onSubmit: any;
  error?: string;
}

const FormComponent = ({ sections, onSubmit, error }: FormImovelProps) => {
  const [trail, setTrail] = useState(0);

  const moveInFormByArrow = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key == "Left" || e.key == "ArrowLeft") {
      handleSetTrailNumber(trail - 1);
    } else if (e.key == "Right" || e.key == "ArrowRight") {
      if (trail === sections.length - 1) onSubmit();
      else handleSetTrailNumber(trail + 1);
    }
  };

  const handleSetTrailNumber = (num: number) => {
    if (num < 0) num = 0;

    if (num >= sections.length) num--;

    setTrail(num);
  };

  useEffect(() => {
    console.log("FormComponent - Render");
  }, []);

  return (
    <Form>
      <FormHeader>
        <ActionsForm>
          <MoveButton onClick={() => handleSetTrailNumber(trail - 1)}>
            <FiChevronLeft size={20} color={colors.primary} />
          </MoveButton>
          <AreaShow>{sections[trail].description}</AreaShow>
          <MoveButton onClick={() => handleSetTrailNumber(trail + 1)}>
            <FiCheck size={20} color={colors.primary} />
          </MoveButton>
        </ActionsForm>
        <ShowTrail
          trail={trail}
          handleSetTrailNumber={handleSetTrailNumber}
          trails={sections.map((section) => section.icon)}
        ></ShowTrail>
      </FormHeader>
      <FormContentWrapper>
        <FormContent
          onKeyPress={moveInFormByArrow}
          onSubmit={(e) => {
            e.preventDefault();
            if (trail === sections.length - 1)
                onSubmit();
            else handleSetTrailNumber(trail + 1);
          }}
          animate={{
            left: -trail * 100 + "%",
          }}
          nSections={sections.length}
        >
          {sections.map((section, index) => (
            <SectionInputContent key={"SectionInputContent-" + index}>
              {section.inputs}
            </SectionInputContent>
          ))}
        </FormContent>
      </FormContentWrapper>
    </Form>
  );
};

export default FormComponent;
