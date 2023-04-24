import { Locador, Pessoa } from "@prisma/client";
import DTO from "./DTO";

class LocadorDTO extends DTO<Pessoa & {isPartner: boolean}>{
    pessoa: Pessoa;
    isPartner: boolean;
    constructor(locador: Locador & { pessoa: Pessoa}) {
      super();
      this.pessoa = locador.pessoa ;
      this.isPartner = locador.is_partner;
    }
  
    toJSON() {
      return {
        ...this.pessoa,
        password: "",
        birthdate: new Date(0),
        isPartner: this.isPartner,
      };
    }
  }
  
  export default LocadorDTO;