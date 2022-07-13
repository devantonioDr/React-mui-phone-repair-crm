import React from "react";
import { RowData } from "..";

export const useTableState = (initilState: RowData[]) => {
  let [rows, setRows] = React.useState<readonly RowData[]>(initilState);
  // Set row state for the first time or when the dataFrom props changes.
  return {
    values: { rows },
  };
};
