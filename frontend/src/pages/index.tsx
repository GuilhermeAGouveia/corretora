import Link from "next/link"
import { getAllImovel } from "../lib/imovel"
import { IImovel } from "../lib/interfaces"
import styles from "../styles/styles.module.css"


type Props = {
  imoveis: IImovel[]
}

export function PrimaryPage({imoveis}: Props) {


  return (
    <div className={styles.primaryContainer}>
      <h1>Login</h1>
      {imoveis.map((imovel) => (
        <div key={imovel.cod_imv}>
          <Link href="/imovel/[id]" as={`/imovel/${imovel.cod_imv}`}>
            <a>{imovel.type}</a>
          </Link>
        </div>
      ))}
      <Link href="/home">
        <a>Home</a>
      </Link>
    </div>
  )
}

export default PrimaryPage

export const getStaticProps = async () => {
  const imoveis = await getAllImovel()
  return {
    props: {
      imoveis
    }
  }
}
