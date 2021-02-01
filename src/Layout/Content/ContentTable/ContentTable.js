import React from 'react'
import styles from './ContentTable.module.css';
import TableNav from './TableNav/TableNav'
import {Switch, Route} from 'react-router-dom';

import CoinTable2 from './CoinTable/CoinTable2'
import CoinTable from './CoinTable/CoinTable'
import Exchange from '../../Exchange/Exchange';

function ContentTable() {





    return (
        <div className={styles.conatiner}>
            <div>
                <TableNav/>
            </div>
            <div>
                <CoinTable/>
            </div>

            <Switch>
                <Route path="/watchlist">
                    <Exchange/>
                </Route>
            </Switch>


        </div>
    )
}

export default ContentTable
