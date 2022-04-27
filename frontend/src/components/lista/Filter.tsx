import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    useForm
} from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";

interface FilterProps {
  onFilter: (data: any) => void;
}

const Filter = ({ onFilter }: FilterProps) => {
  const { control, handleSubmit, register } = useForm();

  const typeSelectOptions = [
    { value: "", label: "Todos" },
    { value: "CASA", label: "Casa" },
    { value: "APTO", label: "Apartamento" },
    { value: "COMERCIO", label: "Comercio" },
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
          <FilterInput>
            <Controller
              control={control}
              defaultValue={typeSelectOptions[0].value}
              name="type"
              render={({
                field: { onChange, ...rest },
              }: {
                field: ControllerRenderProps<FieldValues, "type">;
              }) => (
                <Select
                  ref={rest.ref}
                  defaultValue={typeSelectOptions[0]}
                  options={typeSelectOptions}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            />
          </FilterInput>
        </FilterItem>
        <FilterItem>
          <FilterLabel>
            <h3>Mensalidade</h3>
          </FilterLabel>
          <FilterInputNumber>
            <input type="number" {...register("mensalidadeMin")} /> - <input type="number"{...register("mensalidadeMax")} />
          </FilterInputNumber>
        </FilterItem>
        <FilterItem>
        <FilterLabel>
          <h3>Preco</h3>
        </FilterLabel>
        <FilterInputNumber>
          <input type="number" {...register("priceMin")} /> - <input type="number"{...register("priceMax")} />
        </FilterInputNumber>
      </FilterItem>

        <button type="submit">Filtrar</button>
      </FilterContent>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  position: relative;
  width: 210px;
  height: auto;
  padding: 10px;

  @media (max-width: 768px) {
    display: none;
  }
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
`;

const FilterItem = styled.div`
  position: relative;
  width: 100%;
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

const FilterInput = styled.div`
  position: relative;
  width: 100%;
`;

const FilterInputNumber = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        width: 40%;
    }
`;