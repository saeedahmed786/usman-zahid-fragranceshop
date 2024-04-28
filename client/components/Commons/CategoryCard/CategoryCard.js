import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './CategoryCard.module.css'

export const CategoryCard = ({ category }) => {
  return (
    <div className={styles.CategoryCard}>
      <Image width={100} height={100} src={category?.picture?.response?.url} />
      <div>
        <h2>{category?.title}</h2>
      </div>
    </div>
  )
}
