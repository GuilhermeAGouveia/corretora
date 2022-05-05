import { ImovelType } from "./interfaces";

export interface Field {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
}

const aditionalFields = {
  [ImovelType.APTO]: [
    {
      name: "nBathrooms",
      type: "number",
      placeholder: "Número de banheiros",
      required: false,
      defaultValue: 0,
    },
    {
      name: "nRooms",
      type: "number",
      placeholder: "Número de quartos",
      required: false,
      defaultValue: 0,
    },
    {
      name: "nSuites",
      type: "number",
      placeholder: "Número de suítes",
      required: false,
      defaultValue: 0,
    },
  ],
  [ImovelType.CASA]: [
    {
      name: "nBathrooms",
      type: "number",
      placeholder: "Número de banheiros",
      required: false,
      defaultValue: 0,
    },
    {
      name: "nRooms",
      type: "number",
      placeholder: "Número de quartos",
      required: false,
      defaultValue: 0,
    },
    {
      name: "nSuites",
      type: "number",
      placeholder: "Número de suítes",
      required: false,
      defaultValue: 0,
    },
  ],

  [ImovelType.COMERCIO]: [
    {
      name: "nEmployees",
      type: "number",
      placeholder: "Número de funcionários",
      required: false,
      defaultValue: 0,
    },
  ],
};

export const getAditionalFields = (imovelType: ImovelType): Field[] =>
  aditionalFields[imovelType];
