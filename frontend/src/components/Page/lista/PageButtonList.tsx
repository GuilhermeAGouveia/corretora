import { useEffect, useState } from "react";
import { IImovel, Page } from "../../../lib/interfaces";
import { Pagination, CircularProgress, List } from "@mui/material";
import { getImoveisByFilterWithPage } from "../../../lib/imovel";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import ListComponent from "./IListComponent";
import {
  ListContainer,
  LoadingBottomContainer,
} from "../../../styles/pages/lista";

export default function PageButtonList({
  initialPage,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData,
}: ListComponent) {
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [page, setPage] = useState<Page<IImovel>>(initialPage);
  const { isMobileView } = useDeviceDetect();
  async function onChangePage(page: number) {
    document.getElementById("listRoot")?.scrollTo(0, 0);
    setIsLoadingItems(true);
    setPage((old) => ({ ...old, data: [] }));
    const res = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      page
    );
    setPage(res);
    setIsLoadingItems(false);
  }

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  return (
    <ListContainer isMobile={isMobileView}>
      {/* <ListCards imoveis={page.data} cardComponent={CardComponent} isLoading={isLoadingItems} /> */}
      <List
        style={{
          padding: "10px 20px",
        }}
      >
        {page.data.map((imovel) => (
          <CardComponent key={imovel.cod_imv} imovel={imovel} />
        ))}
      </List>
      {isLoadingItems && (
        <LoadingBottomContainer>
          <CircularProgress />
        </LoadingBottomContainer>
      )}
      {page.data.length && (
        <Pagination
          count={Math.ceil(page.total / 10)}
          onChange={(e, page) => onChangePage(page)}
          style={{
            margin: "20px 0",
          }}
        />
      )}
    </ListContainer>
  );
}
