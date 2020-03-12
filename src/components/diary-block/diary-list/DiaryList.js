import React from 'react';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import styles from './DiaryList.module.css';

// const productsList1 = [
//   { _id: 1, title: { ru: 'Макароны' }, weight: 150, calories: 300 },
//   { _id: 2, title: { ru: 'Говядина' }, weight: 250, calories: 450 },
//   { _id: 3, title: { ru: 'Сок' }, weight: 100, calories: 75 },
//   { _id: 4, title: { ru: 'Хлеб' }, weight: 30, calories: 20 }
// ];

const DiaryList = ({ productsList, deleteProduct }) => {
  return (
    <>
      <Table className={styles.table}>
      <Tbody>
        {productsList.map(({ _id, title, weight, calories }) => (
          <Tr key={_id}>
            <Td className={[styles.cell, styles.first].join(' ')} key={_id + 1}>
              {title.ru || 'no title'}
            </Td>
            <Td className={styles.cell} key={_id + 2}>
              {weight}
              <span className={styles.unit}>г</span>
            </Td>
            <Td className={styles.cell} key={_id + 3}>
              {Math.round(calories)}
              <span className={styles.unit}>ккал</span>
            </Td>
            <Td key={_id + 4}>
              <button
                className={styles.delete}
                type="button"
                onClick={() => deleteProduct(_id)}
              ></button>
            </Td>
          </Tr>
        ))}
        </Tbody>
      </Table>
    </>
  );
};

export default DiaryList;
