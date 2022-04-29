import { useForm } from "react-hook-form";
import styled from "styled-components";
import { OrderByValues } from "../../lib/interfaces";
import colors from "../../styles/colors";
import SelectReactHookForm from "../SelectReactHookForm";

interface OrderByProps {
  onOrderBy: (data: any) => void;

  value?: OrderByValues;
}

const OrderBy = ({ onOrderBy, value }: OrderByProps) => {
  const { handleSubmit, control } = useForm();

  const orderBySelectOptions = [
    { value: "ASC", label: "Ascendente" },
    { value: "DESC", label: "Descendente" },
  ];


  const orderByFieldSelectOptions = [
    { value: "createdAt", label: "Data de criação" },
    { value: "mensalidade", label: "Mensalidade" },
    { value: "price", label: "Preço" },
    { value: "city", label: "Cidade" },
    { value: "area", label: "Área" },
  ];
  return (
    <FilterContainer>
      <FilterTitle>
        <h2>Ordenar por</h2>
      </FilterTitle>
      <FilterContent onSubmit={handleSubmit(onOrderBy)}>
      <FilterItem>
          <FilterLabel>
            <h3>Campo</h3>
          </FilterLabel>
          <SelectReactHookForm
            name={"orderBy"}
            options={orderByFieldSelectOptions}
            controlReactHookForm={control}
            value={value?.orderBy || orderByFieldSelectOptions[0].value}
          ></SelectReactHookForm>
        </FilterItem>
        <FilterItem>
          <FilterLabel>
            <h3>Modo</h3>
          </FilterLabel>
          <SelectReactHookForm
            name={"sort"}
            options={orderBySelectOptions}
            controlReactHookForm={control}
            value={value?.orderBy || orderBySelectOptions[0].value}
          ></SelectReactHookForm>
        </FilterItem>

        <FilterButton type="submit">Ordenar</FilterButton>
      </FilterContent>
    </FilterContainer>
  );
};

export default OrderBy;

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
7;
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
