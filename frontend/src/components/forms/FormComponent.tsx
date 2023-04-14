import React, { useEffect, useState, KeyboardEvent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
import { SvgIconComponent } from "@mui/icons-material";

export interface IFormSection {
  description: string;
  icon: SvgIconComponent;
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
            <ChevronLeftIcon
              sx={{
                color: colors.primary,
                fontSize: 20,
              }}
            />
          </MoveButton>
          <AreaShow>{sections[trail].description}</AreaShow>
          <MoveButton onClick={() => handleSetTrailNumber(trail + 1)}>
            <CheckIcon
              sx={{
                color: colors.primary,
                fontSize: 20,
              }}
            />
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
            if (trail === sections.length - 1) onSubmit();
            else handleSetTrailNumber(trail + 1);
          }}
          animate={{
            left: -trail * 100 + "%",
          }}
          nsections={sections.length}
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
