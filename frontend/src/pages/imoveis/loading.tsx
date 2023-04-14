import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </>
  );
}
