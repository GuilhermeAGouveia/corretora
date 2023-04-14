import { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import { IImovel, Page } from "../../../lib/interfaces";
import { ImageList, Pagination, CircularProgress } from "@mui/material";
import {
  getImoveisByFilterWithPage,
  
} from "../../../lib/imovel";
import ListCards from "./ListCards";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import ListComponent from "./IListComponent";



export default function PageButtonList({
  initialPage,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData,
}: ListComponent) {
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [page, setPage] = useState<Page<IImovel>>(initialPage);
  const {isMobileView} = useDeviceDetect()
  async function onChangePage(page: number) {
    document.getElementById("listRoot")?.scrollTo(0, 0);

    console.log(page);
    setIsLoadingItems(true);
    setPage((old) => ({ ...old, data: [] }));
    const res = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      page
    )
    console.log(res);
    setPage(res);
    setIsLoadingItems(false);

  }

  return (
    <PaginationButtonContainer isMobile={isMobileView}>
      <ListCards imoveis={page.data} cardComponent={CardComponent} isLoading={isLoadingItems} />
      {isLoadingItems && (
        <LoadingBottom>
          <CircularProgress />
        </LoadingBottom>
      )}
      <Pagination
        count={page.total / page.data.length}
        onChange={(e, page) => onChangePage(page)}
        style={{
          margin: "20px 0",
        }}
      />
   
    </PaginationButtonContainer>
  );
}

const PaginationButtonContainer = styled.div<{isMobile: boolean}>`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;

  ${props => props.isMobile && `
    padding-bottom: 55px;
  `}
`;

const LoadingBottom = styled.div`
  position: relative;
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
