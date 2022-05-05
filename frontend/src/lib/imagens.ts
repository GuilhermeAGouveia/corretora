import { UploadedFile } from "../components/ImageUploader";
import { getAPIHTTPClient } from "../services/api";

export async function insertImage(
  image: UploadedFile,
  cod_imv: string,
  progressState?: (fileId: string, progress: number) => void,
  ctx?: any
): Promise<void> {
  const api = getAPIHTTPClient(ctx);
  const formData = new FormData();
  formData.append("file", image.file);
  // A query idOwner é o codigo do dono da imagem, no caso o imóvel
  await api.post<any>(`/image/upload?idOwner=${cod_imv}`, formData, {
    onUploadProgress: (e) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      if (progressState) {
        progressState(image.id, progress);
      }
    },
  });
}

export async function insertManyImages(
  images: UploadedFile[],
  cod_imv: string,
  progressState?: (fileId: string, progress: number) => void,
  ctx?: any
): Promise<void> {
  for (const image of images) {
    await insertImage(image, cod_imv, progressState, ctx);
  }
}
