import React from 'react'
import styles from './ContentTable.module.css';
import TableNav from './TableNav/TableNav'
import TableContent from '../../../Components/TableContent/TableContent'



function ContentTable() {





    return (
        <div className={styles.conatiner}>
            <div>
                <TableNav/>
            </div>
            <div>
                <TableContent/>
            </div>

            

        </div>
    )
}

export default ContentTable
