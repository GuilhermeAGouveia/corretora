import { useForm } from "react-hook-form";
import { FilterValues } from "../../../lib/interfaces";
import SelectReactHookForm from "../../SelectReactHookForm";
import FilterInputRangeNumber from "../FilterInputRangeNumber";
import { ActionButton, ActionContainer, ActionContent, ActionItem, ActionLabel, ActionTitle } from "./styles";

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
    <ActionContainer>
      <ActionTitle>
        <h2>Filtros</h2>
      </ActionTitle>
      <ActionContent onSubmit={handleSubmit(onFilter)}>
        <ActionItem>
          <ActionLabel>
            <h3>Tipo</h3>
          </ActionLabel>
          <SelectReactHookForm
            value={filterValues.type || typeSelectOptions[0].value}
            controlReactHookForm={control}
            name={"type"}
            options={typeSelectOptions}
          ></SelectReactHookForm>
        </ActionItem>
        <ActionItem>
          <ActionLabel>
            <h3>Mensalidade</h3>
          </ActionLabel>
          <FilterInputRangeNumber
            name="mensalidade"
            minValue={filterValues.mensalidadeMin?.toString() || "0"}
            maxValue={filterValues.mensalidadeMax?.toString() || "Máx."}
            registerReactHookForm={register}
          ></FilterInputRangeNumber>
        </ActionItem>
        <ActionItem>
          <ActionLabel>
            <h3>Preço</h3>
          </ActionLabel>
          <FilterInputRangeNumber
            name="price"
            minValue={filterValues.priceMin?.toString() || "0"}
            maxValue={filterValues.priceMax?.toString() || "Máx."}
            registerReactHookForm={register}
          ></FilterInputRangeNumber>
        </ActionItem>
        <ActionItem>
          <ActionLabel>
            <h3>Tipo de Oferta</h3>
          </ActionLabel>
          <SelectReactHookForm
            value={filterValues.offerType || offerTypeSelectOptions[0].value}
            controlReactHookForm={control}
            name={"offerType"}
            options={offerTypeSelectOptions}
          ></SelectReactHookForm>
        </ActionItem>

        <ActionButton type="submit">Filtrar</ActionButton>
      </ActionContent>
    </ActionContainer>
  );
};

export default Filter;


