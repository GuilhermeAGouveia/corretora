export interface IButton {
  label: string;
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
  createdAt: Date;
}

enum ImovelType {
  APTO = "APTO",
  CASA = "CASA",
}

enum LevelFurnished {
  FULL = "FULL",
  SEMI = "SEMI",
  NONE = "NONE",
}
