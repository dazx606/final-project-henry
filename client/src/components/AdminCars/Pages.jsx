import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from "./Pages.module.css";

function Pages({ pagination, page }) {
    const totalPages = useSelector((state) => state.allCars.totalPages)
    const range = 2;
    const showOnly = (range) => {
        let showOnly = [page];
        for (let i = 1; i <= range; i++) {
            if (page - i >= 1) showOnly.unshift(page - i);
            if (page + i <= totalPages) showOnly.push(page + i);
        }
        return showOnly;
    };

    return (
        <div className={style.pagesCont}>
            {page !== 1 &&
                <div>
                    {page > 1 + range && <button className={style.page} onClick={() => pagination(1)}>1</button>} 
                    {page > 1 + range && <button className={style.pageT}>...</button>}                   
                    <button className={style.page} onClick={() => pagination(page - 1)}>{`<`}</button>
                    
                </div>}
            {
                showOnly(range)?.map((p, i) => (
                    <button className={p === page ? style.current : style.page} key={i} onClick={() => pagination(p)}>{p}</button>
                ))
            }
            {page !== totalPages &&
                <div>
                    <button className={style.page} onClick={() => pagination(page + 1)}>{`>`}</button>
                    {page < totalPages - range && <button className={style.pageT} onClick={() => pagination(1)}>...</button>}
                    {page < totalPages - range && <button className={style.page} onClick={() => pagination(totalPages)}>{totalPages}</button>}
                </div>}
        </div>
    )
}

export default Pages