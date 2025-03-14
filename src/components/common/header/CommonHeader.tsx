import { useNavigate } from 'react-router-dom'
import styles from './CommonHeader.module.scss'

function CommonHeader() {
  const navigate = useNavigate()
  // 북마크 페이지로 이동
  const moveToPage = (filter: string) => {
    if (filter === 'main') navigate('/')
    if (filter === 'bookmark') navigate('/bookmark')
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logBox} onClick={() => moveToPage('main')}>
        <img src="src/assets/images/logo.png" alt="logo" className={styles.header__logBox__logo} />
        <span className={styles.header__logBox__title}>PhotoSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <button className={styles.header__profileBox__button}>사진 제출</button>
        <button className={styles.header__profileBox__button} onClick={() => moveToPage('bookmark')}>
          북마크
        </button>
        <button className={styles.header__profileBox__userName}>doit | doit@doisoft.com</button>
      </div>
    </header>
  )
}

export default CommonHeader