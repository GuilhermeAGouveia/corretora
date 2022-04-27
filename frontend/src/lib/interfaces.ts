export interface IButton {
  label: string;
}

export interface Image {
  url: string;
  originalname?: string;
  size?: number;
}

export interface IImovel {
  cod_imv: string;
  cod_lcd: string;
  type: ImovelType;
  address: string;
  cep: string;
  district: string;
  city: string;
  state: string;
  nApto: number | null;
  hasGarage: boolean;
  hasGarden: boolean;
  hasSuite: boolean;
  nRooms: number;
  nBathrooms: number;
  area: number;
  isFurnished: LevelFurnished;
  supDescribe: string | null;
  price: number | null;
  mensalidade: number | null;
  images: Image[];
  createdAt: Date;
}

export interface ImovelCard {
  city: string;
  state: string;
  mensalidade: number | null;
  price: number | null;
  supDescribe: string | null;
  type: ImovelType;
}


enum ImovelType {
  APTO = "APTO",
  CASA = "CASA",
  COMERCIO = "COMERCIO",
}

export enum LevelFurnished {
  FULL = "FULL",
  SEMI = "SEMI",
  NONE = "NONE",
}

export interface Credenciais {
  email: string;
  password: string;
}

export interface Pessoa {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthdate: Date;
  address: string;
  city: string;
  state: string;
  cep: string;
}