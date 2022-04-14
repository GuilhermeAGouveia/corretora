import type { NextPage } from "next"
import Link from "next/link"
import styles from "../styles/styles.module.css"


const PrimaryPage: NextPage = () => {


  return (
    <div className={styles.primaryContainer}>
      <h1>Login</h1>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </div>
  )
}

export default PrimaryPage
