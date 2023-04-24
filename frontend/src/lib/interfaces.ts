export interface IButton {
  label: string;
}

export enum AlertType {
    ERROR = "error",
    SUCCESS = "success",
    WARNING = "warning",
}

export interface CardImovelProps {
  imovel: IImovel;
  onDelete?: (imovelId: string) => void;
}

export interface Image {
  url: string;
  originalname: string;
  size: number;
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


export enum ImovelType {
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
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthdate: Date;
  address: string;
  city: string;
  state: string;
  cep: string;
  phones: string[];
  avatar?: string;
}

export interface Locador extends Pessoa {
  isPartner: boolean;
}

export interface FilterValues {
  local?: string[];
  type?: string;
  offerType?: string;
  mensalidadeMin?: number;
  mensalidadeMax?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface OrderByValues {
  orderBy?: string;
  sort?: string;
}

export interface FilterOrderQuery extends FilterValues, OrderByValues {}

export interface Page<T> {
  data: T[];
  total: number;
  hasNext: boolean;
}