import {
  SelectOption
} from "../components/SelectReactHookForm";
import { ImovelType, LevelFurnished } from "./interfaces";

export interface Field {
  componentType: "select" | "input";
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  defaultValue?: string | number;
  metricType?: string;
}

const aditionalFields = {
  [ImovelType.APTO]: [
    {
      componentType: "input",
      name: "nBathrooms",
      type: "number",
      placeholder: "Número de banheiros",
      required: false,
      defaultValue: 0,
      metricType: "banheiros",
    },
    {
      componentType: "input",
      name: "nRooms",
      type: "number",
      placeholder: "Número de quartos",
      required: false,
      defaultValue: 0,
    },
    {
      componentType: "input",
      name: "nSuites",
      type: "number",
      placeholder: "Número de suítes",
      required: false,
      defaultValue: 0,
    },
  ] as Field[],
  [ImovelType.CASA]: [
    {
      componentType: "input",
      name: "nBathrooms",
      type: "number",
      placeholder: "Número de banheiros",
      metricType: "banheiro(s)",
      required: false,
      defaultValue: 0,
    },
    {
      componentType: "input",
      name: "nRooms",
      type: "number",
      placeholder: "Número de quartos",
      metricType: "quarto(s)",
      required: false,
      defaultValue: 0,
    },
    {
      componentType: "input",
      name: "nSuites",
      type: "number",
      metricType: "suíte(s)",
      placeholder: "Número de suítes",
      required: false,
      defaultValue: 0,
    },
    {
      componentType: "select",
      name: "furnished",
      options: [
        {
          label: "Totalmente mobiliada",
          value: LevelFurnished.FULL,
        },
        {
          label: "Parcialmente mobiliada",
          value: LevelFurnished.SEMI,
        },
        {
          label: "Sem mobilia",
          value: LevelFurnished.NONE,
        },
      ],
      placeholder: "Mobilia",
      required: false,
    },
  ] as Field[],

  [ImovelType.COMERCIO]: [
    {
      componentType: "input",
      name: "nEmployees",
      type: "number",
      placeholder: "Número de funcionários",
      required: false,
      defaultValue: 0,
    },
  ] as Field[],
};

export const getAditionalFields = (imovelType: ImovelType): Field[] =>
  aditionalFields[imovelType];
