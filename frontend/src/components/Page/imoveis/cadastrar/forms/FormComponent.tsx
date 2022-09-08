import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FiCheck, FiChevronLeft} from "react-icons/fi";
import {ImovelType, LevelFurnished} from "../../../../../lib/interfaces";
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
import {uuid} from "uuidv4";

export interface FormImovel {
    street?: string;
    number?: string;
    district?: string;
    state?: string;
    city?: string;
    type?: ImovelType;
    apto?: string;
    mensalidade?: string;
    price?: string;
    area?: string;
    furnished?: LevelFurnished;
}

export interface IFormSection {
    description: string;
    icon: IconType;
    inputs: React.ReactNode[];
}

interface FormImovelProps {
    sections: IFormSection[];
    onSubmit: any
}

const FormComponent = ({sections, onSubmit}: FormImovelProps) => {

    const {handleSubmit} = useForm();
    const [trail, setTrail] = useState(0);


    useEffect(() => {
        if (trail < 0) {
            setTrail(0);
        }

        if (trail > sections.length) {
            setTrail(trail - 1);
        }
    }, [trail, sections]);

    return (
        <Form>
            <FormHeader>
                <ActionsForm>
                    <ReturnButton onClick={() => setTrail((old) => old - 1)}>
                        <FiChevronLeft size={20} color={colors.primary}/>
                    </ReturnButton>
                    <AreaShow>
                        {sections.map((section) => section.description)[trail]}
                    </AreaShow>
                    <ReturnButton onClick={() => setTrail((old) => old + 1)}>
                        <FiCheck size={20} color={colors.primary}/>
                    </ReturnButton>
                </ActionsForm>
                <ShowTrail
                    trailState={[trail, setTrail]}
                    trails={sections.map((section) => section.icon)}
                ></ShowTrail>
            </FormHeader>
            <FormContentWrapper>
                <FormContent
                    onSubmit={onSubmit}
                    animate={{
                        left: -trail * 100 + "%",
                    }}
                >
                    {sections.map((section) => (
                        <SectionInputContent key={uuid()}>
                            {section.inputs}
                        </SectionInputContent>
                    ))}

                </FormContent>
            </FormContentWrapper>
        </Form>
    );
};

export default FormComponent;
