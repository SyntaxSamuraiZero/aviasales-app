import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCheckedList, setCheckAll } from "../../store/checkboxSlice";
import { Checkbox } from "antd";
import { ConfigProvider } from "antd";

import styles from "./CheckboxFilters.module.scss";
import "./AntCheckboxStyle.css";

const plainOptions = [
  "Без пересадок",
  "1 пересадка",
  "2 пересадки",
  "3 пересадки",
];

export default function CheckboxFilters() {
  const checkedList = useSelector((state) => state.checkbox.checkedList);
  const checkAll = useSelector((state) => state.checkbox.checkAll);
  const dispatch = useDispatch();

  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list) => {
    dispatch(setCheckedList(list));
  };

  const onCheckAllChange = (e) => {
    dispatch(setCheckAll(e.target.checked));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: "#9ABBCE",
          colorPrimary: "#fff",
          colorText: "#4A4A4A",
          colorWhite: "#2196F3",
          fontSize: 13,
          borderRadiusSM: 2,
        },
      }}
    >
      <aside className={styles["stops-filter"]}>
        <span className={styles["stops-filter__title"]}>
          Количество пересадок
        </span>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Все
        </Checkbox>
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </aside>
    </ConfigProvider>
  );
}
