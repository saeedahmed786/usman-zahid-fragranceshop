import { Button } from 'antd'
import styles from './ButtonComp.module.css'

export const ButtonComp = ({ text, type, onClick, disabled, loading }) => {
  return (
    <Button
      className={styles.ButtonComp}
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {text}
    </Button>
  )
}
