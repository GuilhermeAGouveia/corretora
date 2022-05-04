import { UploadedFile } from "../components/ImageUploader";
import { getAPIHTTPClient } from "../services/api";

export async function insertImage(image: File, cod_imv: string, ctx?: any): Promise<void> {
  const api = getAPIHTTPClient(ctx);
  const formData = new FormData();
  formData.append("file", image);
  // A query idOwner é o codigo do dono da imagem, no caso o imóvel
  await api.post<any>(`/image/upload?idOwner=${cod_imv}`, formData);
}

export async function insertManyImages(images: UploadedFile[], cod_imv: string, ctx?: any): Promise<void> {
  images.forEach(async (image) => {
      await insertImage(image.file, cod_imv, ctx);
  });
}