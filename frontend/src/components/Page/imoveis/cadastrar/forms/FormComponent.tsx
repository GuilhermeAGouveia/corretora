import React, {useEffect, useState} from "react";
import {FiCheck, FiChevronLeft} from "react-icons/fi";
import colors from "../../../../../styles/colors";
import ShowTrail from "./component/ShowTrail";

import {
    ActionsForm,
    AreaShow,
    Form,
    FormContent,
    FormContentWrapper,
    FormHeader,
    ReturnButton,
    SectionInputContent
} from "./styles";
import {IconType} from "react-icons";
import BannerInfo, {useBannerInfo} from "../../../../BannerInfo";
import {AlertType} from "../../../../../lib/interfaces";

export interface IFormSection {
    description: string;
    icon: IconType;
    inputs: React.ReactNode[];
}

interface FormImovelProps {
    sections: IFormSection[];
    onSubmit: any
    error?: string;
}

const FormComponent = ({sections, onSubmit, error}: FormImovelProps) => {
    const [trail, setTrail] = useState(0);

    const handleSetTrailNumber = (num: number) => {
        if (num < 0)
            num = 0;


        if (num >= sections.length)
            num--;

        setTrail(num);
    }

    useEffect(() => {
        console.log("FormComponent - Render");
    }, []);


    return (
        <Form>
            <FormHeader>
                <ActionsForm>
                    <ReturnButton onClick={() => handleSetTrailNumber(trail - 1)}>
                        <FiChevronLeft size={20} color={colors.primary}/>
                    </ReturnButton>
                    <AreaShow>
                        {sections.map((section) => section.description)[trail]}
                    </AreaShow>
                    <ReturnButton onClick={() => handleSetTrailNumber(trail + 1)}>
                        <FiCheck size={20} color={colors.primary}/>
                    </ReturnButton>
                </ActionsForm>
                <ShowTrail
                    trail={trail}
                    handleSetTrailNumber={handleSetTrailNumber}
                    trails={sections.map((section) => section.icon)}
                ></ShowTrail>
            </FormHeader>
            <FormContentWrapper>
                <FormContent
                    onSubmit={onSubmit}
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
