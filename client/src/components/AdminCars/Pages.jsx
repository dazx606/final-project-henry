import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from "./Pages.module.css";

function Pages({ pagination, page }) {
    const totalPages = useSelector((state) => state.allCars.totalPages)

    const dispatch = useDispatch();

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
                    <button onClick={() => pagination(1)}>1</button>
                    <button onClick={() => pagination(page - 1)}>{`<`}</button>
                </div>}
            {
                showOnly(2)?.map(p => (
                    <button onClick={() => pagination(p)}>{p}</button>
                ))
            }
            {page !== totalPages &&
                <div>
                    <button onClick={() => pagination(page + 1)}>{`>`}</button>
                    <button onClick={() => pagination(totalPages)}>{totalPages}</button>
                </div>}
        </div>
    )
}

export default Pages