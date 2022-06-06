import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from "./Pagination.module.css"

export default function Pagination({ handlePages }) {

    const pagination = useSelector(state => state.pagination)
    const [pages, setPages] = useState([1])

    useEffect(() => {
        let page = []
        for (let i = 1; i <= pagination.pageNum; i++) {
            page.push(i)
        }
        setPages(page)
    }, [pagination])

    const back = () => {
        if(parseInt(pagination.page) !== 1) handlePages(pagination.page-1)
    }
    
    const next = () => {
        if(parseInt(pagination.page) !== parseInt(pagination.pageNum)) handlePages(parseInt(pagination.page)+1)
    }

    const dots = (page) => {
        handlePages(page)
        window.scrollTo(0,0)
    }

    return (
        <div>
            <div className={styles.dotContainer}>
                {
                    pages.map((e, k) =>
                        <span key={k + 1} className={parseInt(pagination.page) !== e ? styles.dot : styles.activeDot} onClick={() => dots(e)}></span>
                    )
                }
            </div>
            <div className={styles.pageBox}>
                <a className={styles.prev} onClick={back}>&#10094;</a>
                <a className={styles.next} onClick={next}>&#10095;</a>
            </div>
        </div>

    )
}
