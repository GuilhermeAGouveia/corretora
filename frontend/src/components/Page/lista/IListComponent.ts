import { IImovel, Page } from "../../../lib/interfaces";

export default interface ListComponent {
    initialPage: Page<IImovel>;
    isLoadingInitialData: boolean;
    cardComponent: React.FC<any>;
    filterValues: any;
    orderByOptions: any;
  }