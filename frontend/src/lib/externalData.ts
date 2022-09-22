import axios from "axios";

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  nome: string;
  UF: string;
}

export const getEstados = async () => {
  const response = await axios.get<(Estado & { id: number })[]>(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );
  const estados = response.data.map(({ sigla: value, nome: label, id }) => {
    return {
      value,
      label,
    };
  });
  return estados;
};

export const getCidades = async (estado?: string) => {
  const response = await axios.get<(Estado & { id: number })[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
  );
  const cidades = response.data.map(({ nome }) => {
    return {
      value: nome,
      label: nome,
    };
  });
  return cidades;
};


export const getAllCidades = async (): Promise<Cidade[]> => {
  const response = await axios.get<any>(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
  );
  const cidades: Cidade[] = response.data.map((city: any) => {
    return {
      nome: city.nome,
      UF: city.microrregiao.mesorregiao.UF.sigla,
    };
  });
  return cidades;
}