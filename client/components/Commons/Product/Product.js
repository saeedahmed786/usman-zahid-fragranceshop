import { Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ButtonComp } from '../ButtonComp/ButtonComp'
import styles from './Product.module.css'

export const Product = ({ product }) => {
  const router = useRouter();
  return (
    <div className={styles.Product}>
      <Image width={100} height={100} src={product?.pictures[0]?.response?.url} />
      <div>
        <h2>{product?.title}</h2>
        <div className='max-w-[200px] mx-[auto]'>
          <ButtonComp text="Shop Now" onClick={() => router.push(`/product/${product?._id}`)} />
        </div>
      </div>
    </div>
  )
}
