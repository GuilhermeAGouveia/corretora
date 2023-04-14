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
import { ListContainer, LoadingBottomContainer } from "../../../styles/pages/lista";



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
    <ListContainer isMobile={isMobileView}>
      <ListCards imoveis={page.data} cardComponent={CardComponent} isLoading={isLoadingItems} />
      {isLoadingItems && (
        <LoadingBottomContainer>
          <CircularProgress />
        </LoadingBottomContainer>
      )}
      <Pagination
        count={page.total / page.data.length}
        onChange={(e, page) => onChangePage(page)}
        style={{
          margin: "20px 0",
        }}
      />
   
    </ListContainer>
  );
}

