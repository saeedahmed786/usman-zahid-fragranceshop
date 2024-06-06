import Image from 'next/image'
import styles from './MainProductCard.module.css'

export const MainProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className={styles.MainProductCard}>
      <Image width={100} height={100} quality={100} src={product?.pictures[0]?.response?.url} />
      <div className='p-2'>
        <h2>{product?.title}</h2>
        <h2>{product?.subTitle}</h2>
        <p>{product?.subCategory?.name}</p>
        <p>From ${product?.price}</p>
      </div>
    </div>
  )
}
