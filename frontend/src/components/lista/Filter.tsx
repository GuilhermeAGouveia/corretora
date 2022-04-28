import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FilterValues } from "../../lib/interfaces";
import colors from "../../styles/colors";
import SelectReactHookForm from "../SelectReactHookForm";
import FilterInputRangeNumber from "./FilterInputRangeNumber";

interface FilterProps {
  onFilter: (data: any) => void;
  filterValues: FilterValues;
}

const Filter = ({ onFilter, filterValues }: FilterProps) => {
  const { control, handleSubmit, register } = useForm();
  const typeSelectOptions = [
    { value: "", label: "Todos" },
    { value: "CASA", label: "Casa" },
    { value: "APTO", label: "Apartamento" },
    { value: "COMERCIO", label: "Comercio" },
  ];

  const offerTypeSelectOptions = [
    { value: "", label: "Todos" },
    { value: "ALUGUEL", label: "Aluguel" },
    { value: "VENDA", label: "Venda" },
  ];

  return (
    <FilterContainer>
      <FilterTitle>
        <h2>Filtros</h2>
      </FilterTitle>
      <FilterContent onSubmit={handleSubmit(onFilter)}>
        <FilterItem>
          <FilterLabel>
            <h3>Tipo</h3>
          </FilterLabel>
          <SelectReactHookForm
            value={filterValues.type || typeSelectOptions[0].value}
            controlReactHookForm={control}
            name={"type"}
            options={typeSelectOptions}
          ></SelectReactHookForm>
        </FilterItem>
        <FilterItem>
          <FilterLabel>
            <h3>Mensalidade</h3>
          </FilterLabel>
          <FilterInputRangeNumber
            name="mensalidade"
            minValue={filterValues.mensalidadeMin?.toString() || "0"}
            maxValue={filterValues.mensalidadeMax?.toString() || "Máx."}
            registerReactHookForm={register}
          ></FilterInputRangeNumber>
        </FilterItem>
        <FilterItem>
          <FilterLabel>
            <h3>Preço</h3>
          </FilterLabel>
          <FilterInputRangeNumber
            name="price"
            minValue={filterValues.priceMin?.toString() || "0"}
            maxValue={filterValues.priceMax?.toString() || "Máx."}
            registerReactHookForm={register}
          ></FilterInputRangeNumber>
        </FilterItem>
        <FilterItem>
          <FilterLabel>
            <h3>Tipo de Oferta</h3>
          </FilterLabel>
          <SelectReactHookForm
            value={filterValues.offerType || offerTypeSelectOptions[0].value}
            controlReactHookForm={control}
            name={"offerType"}
            options={offerTypeSelectOptions}
          ></SelectReactHookForm>
        </FilterItem>

        <FilterButton type="submit">Filtrar</FilterButton>
      </FilterContent>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
`;

const FilterTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 15px;
`;
const FilterContent = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
`;

const FilterItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 150px;
  margin: 20px 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const FilterLabel = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background: ${colors.primary};
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border: none;
`;
