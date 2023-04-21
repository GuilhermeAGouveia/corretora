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
      const progress = Math.round((e.loaded * 100) / (e.total || 1));
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
      "https://s2.glbimg.com/fekecXBrhfj5oL5VQYcTae7-VYE=/620x430/e.glbimg.com/og/ed/f/original/2020/05/04/gettyimages-1170286036.jpg",
    [ImovelType.APTO]:
      "https://www.tpsimoveis.com.br/tim.php?src=uploads/properties/2020/09/apartamento-venda-moinhos-de-vento-porto-alegre-tpsimoveis-1.jpg&w=1600&h=800",
    [ImovelType.COMERCIO]:
      "https://s3.amazonaws.com/static.nidoimovel.com.br/c399862d3b9d6b76c8436e924a68c45b/imovel/VK/VK3574/34b258c41f2ea117b14cbb319b824a78.jpg?1661525548",
  };

  return imagesByType[imovelType];
}

export function getImovelImage(cod_imv: string, ctx?: any) {
  const api = getAPIHTTPClient(ctx);
  return api.get(`/image/${cod_imv}`);
}