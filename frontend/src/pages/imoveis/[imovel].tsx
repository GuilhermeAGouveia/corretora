import { GetStaticPaths, GetStaticProps } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { getAllImovel, getImovelByCod } from "../../lib/imovel";
import { IImovel } from '../../lib/interfaces';


interface ImovelProps {
    imovel: IImovel | null | undefined;
}

export default function Imovel({imovel}: ImovelProps) {
    const {isMobileView} = useDeviceDetect();
    return (
        <>
            {isMobileView ? <h1>Imovel (Mobile)</h1> : <h1>Imovel (Other device)</h1>}
        </>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const getImovelSlugs = (await getAllImovel())?.map((item) => ({
        params: { imovel: item.cod_imv },
    }));
    
    return {
        paths: getImovelSlugs,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    
    const imovel = await getImovelByCod(ctx.params?.imovel as string, ctx);
        return {
            props: {
                imovel,
            },
            revalidate: 3600, // 1 hour
        };
    }
