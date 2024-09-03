import React from 'react'
import { Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { setSortType } from '../../store/sortSlice'

import styles from './SortRadioGroup.module.scss'

export default function SortRadioGroup() {
  const sortType = useSelector((state) => state.sort.sortType)
  const { checkedList } = useSelector((state) => state.checkbox)
  const dispatch = useDispatch()

  const handleSortChange = (e) => {
    dispatch(setSortType(e.target.value))
  }

  return (
    <div>
      <Radio.Group
        className={styles['my-radio-group']}
        buttonStyle='solid'
        value={sortType}
        onChange={handleSortChange}
        disabled={checkedList.length === 0}
      >
        <Radio.Button className={styles['my-radio-button']} value='cheapest'>
          Самый дешевый
        </Radio.Button>
        <Radio.Button className={styles['my-radio-button']} value='fastest'>
          Самый быстрый
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}
