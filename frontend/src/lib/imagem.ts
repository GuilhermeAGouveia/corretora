import { UploadedFile } from "../components/ImageUploader";
import { getAPIHTTPClient } from "../services/api";
import { ImovelType } from "./interfaces";

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

//TODO: Obter imagens aleatórias de certos tipos de imóveis cadastrados no banco de dados

export function getRandomImageByImovelType(imovelType: ImovelType) {
  const imagesByType = {
    [ImovelType.CASA]:
      "https://corretora-storage.s3.sa-east-1.amazonaws.com/banner-images/casa.jpg",
    [ImovelType.APTO]:
      "https://corretora-storage.s3.sa-east-1.amazonaws.com/banner-images/apto.jpeg",
    [ImovelType.COMERCIO]:
      "https://corretora-storage.s3.sa-east-1.amazonaws.com/banner-images/comercio.jpg",
  };

  return imagesByType[imovelType];
}
