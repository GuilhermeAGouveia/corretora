import { useForm } from "react-hook-form";
import { OrderByValues } from "../../../../lib/interfaces";
import SelectReactHookForm from "../../../SelectReactHookForm";
import { ActionButton, ActionContainer, ActionContent, ActionItem, ActionLabel } from "./styles";


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
    <ActionContainer>
      <ActionContent onSubmit={handleSubmit(onOrderBy)}>
      <ActionItem>
          <ActionLabel>
            <h4>Campo</h4>
          </ActionLabel>
          <SelectReactHookForm
            name={"orderBy"}
            options={orderByFieldSelectOptions}
            controlReactHookForm={control}
            value={value?.orderBy || orderByFieldSelectOptions[0].value}
          ></SelectReactHookForm>
        </ActionItem>
        <ActionItem>
          <ActionLabel>
            <h4>Modo</h4>
          </ActionLabel>
          <SelectReactHookForm
            name={"sort"}
            options={orderBySelectOptions}
            controlReactHookForm={control}
            value={value?.orderBy || orderBySelectOptions[0].value}
          ></SelectReactHookForm>
        </ActionItem>

        <ActionButton type="submit">Ordenar</ActionButton>
      </ActionContent>
    </ActionContainer>
  );
};

export default OrderBy;
