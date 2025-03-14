import React, { useEffect, useState } from 'react'
import styles from './DetailDialog.module.scss'
import { CardDTO, Tag } from '@/pages/index/types/card'
import toast, {toastConfig} from 'react-simple-toasts'
// CSS
import 'react-simple-toasts/dist/style.css';
import "react-simple-toasts/dist/theme/dark-edge.css"

toastConfig({ theme: 'dark' })

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog } : Props) {
    const [bookmark, setBookmark] = useState(false)
    const closeDialog = () => {
        console.log('closed')
        handleDialog(false)
    }
    // 북마크 추가 이벤트
    const addBookmark = (selected: CardDTO) => { 
        setBookmark(true)

        const getLoaclStorage = JSON.parse(localStorage.getItem('bookmark'))
        // 1. 로컬스토리지에 bookmark이라는 데이터가 없을 경우
        if (!getLoaclStorage || getLoaclStorage === null) {
            localStorage.setItem('bookmark', JSON.stringify([selected]))
            toast("해당 이미지를 북마크에 저장하였습니다. 😀")
        } else {
            // 2. 해당 이미지가 이미 로컬스토리이에 데이터가 있을 경우
            if (getLoaclStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
                toast("해당 이미지는 이미 북마크에 추가된 상태입니다. 😀")
            } else {
                const res = [...getLoaclStorage]
                res.push(selected)
                localStorage.setItem('bookmark', JSON.stringify(res))

                toast('해당 이미지를 북마크에 저장하였습니다. 😀')
            }
        }
    }

    useEffect(() => {
        const getLoaclStorage = JSON.parse(localStorage.getItem('bookmark'))

        if (getLoaclStorage && getLoaclStorage.findIndex((item:CardDTO) => item.id === data.id) > -1) {
            setBookmark(true)
        } else if(!getLoaclStorage) return

        // ESC 클릭 시 다이얼로그 창 닫기
        const escKeyDownCloseDialog = (event: any) => {
            console.log('closed')
            if (event.key === 'Escape') {
                closeDialog()
            }
        }
        document.addEventListener('keydown', escKeyDownCloseDialog)
        return () => document.removeEventListener('keydown', escKeyDownCloseDialog)
    }, [])

  return (
    <div className={styles.container}>
        <div className={styles.container__dialog}>
            <div className={styles.container__dialog__header}>
                <div className={styles.close}>
                    <button className={styles.close__button} onClick={closeDialog}>
                        {/* 구글 아이콘 사용 */}
                        <span className='material-symbols-outlined' style={{fontSize: 28 + 'px'}}>close</span>
                    </button>
                    <img src={data.user.profile_image.small} alt='사진작가 프로필 사진' className={styles.close_authorImage}></img>
                    <span className={styles.close__authorName}>{data.user.name}</span>
                </div>
                <div className={styles.bookmark}>
                    <button className={styles.bookmark__button} onClick={() => addBookmark(data)}>
                        {/* 구글 아이콘을 사용 */}
                        {bookmark === false ? (
                            <span className='material-symbols-outlined' style={{fontSize: 16 + 'px'}}>favorite</span>
                        ) : (
                            <span className='material-symbols-outlined' style={{fontSize: 16 + 'px', color: 'red'}}>favorite</span>
                        )}
                        북마크
                    </button>
                    <button className={styles.bookmark__button}>다운로드</button>
                </div>
            </div>
            <div className={styles.container__dialog__body}>
                <img src={data.urls.small} alt='상세이미지' className={styles.image}></img>
            </div>
            <div className={styles.container__dialog__footer}>
                <div className={styles.infoBox}>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>이미지 크기</span>
                        <span className={styles.infoBox__item__value}>{data.width} X {data.height}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>업로드</span>
                        <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                        <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>다운로드</span>
                        <span className={styles.infoBox__item__value}>{data.likes}</span>
                    </div>
                </div>
                <div className={styles.tagBox}>
                    tags
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailDialog