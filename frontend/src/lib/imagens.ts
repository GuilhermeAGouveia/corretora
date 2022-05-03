import { getAPIHTTPClient } from "../services/api";

export async function insertImage(image: File, cod_imv: string, ctx?: any): Promise<void> {
  const api = getAPIHTTPClient(ctx);
  const formData = new FormData();
  formData.append("file", image);

  await api.post<any>(`/image/upload?idOwner=${cod_imv}`, formData);
}
