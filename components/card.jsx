import styles from '../styles/card.module.css'
import Image from 'next/image'

const card = (props) => {
  return (
    <div className={styles.card}>
          <div className={styles.imagem}>
               <Image src={props.img} alt={props.nome} />
          </div>
          <div className={styles.descricao}>
               <h1>{props.nome}</h1>
                {props.tipos.length != 0 ? <div className= {`types ${styles.types}`} >{props.tipos.map((tipo) => (<button id={tipo.type.name} key={tipo.type.name}>{tipo.type.name}</button>))} </div>: <h4>nenhum tipo disponivel</h4>}
          </div>
    </div>
  )
}

export default card