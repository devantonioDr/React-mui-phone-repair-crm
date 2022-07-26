import React, { memo, useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { RepairListContext } from "..";
import { InmutableArrayMethods } from "../../../../helper/inmutableArrayMethods";

export type RowSelectContextValue = {
  totalRowsCount: number,
  selectedCount: number;
  selectedRows: any;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSelectedRow: (invoiceId: string) => void;
};

export const RowSelectContext = createContext<RowSelectContextValue>(
  {} as RowSelectContextValue
);

export function RowSelectContextProvider(props: any) {
  const tableContext = useContext(RepairListContext);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  //   Recreate only if table context repairs changes.
  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRows(() => {
        if (event.target.checked) {
          const newSelecteds = tableContext.repairs.map((n) => n.invoiceId);
          return newSelecteds;
        }
        return [];
      });
    },
    [tableContext.repairs]
  );

  //   useCallback on this fucnmtion to only expose a single
  //   refrence during the component lifecycle.
  const toggleSelectedRow = useCallback((invoiceId: string) => {
    setSelectedRows((selectedRows: string[]) => {

      const selectedIndex = selectedRows.indexOf(invoiceId);
      // If selectedIndex is in the array.
      if (selectedIndex > 0) {
        // Removes the value at given index.
        return [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1)
        ];
      };
      // Adds value
      return [
        ...selectedRows,
        invoiceId
      ];

   
      // if (InmutableArrayMethods.isItemNotInTheList(selectedIndex)) {
      //   return selectRow(invoiceId, selectedRows);
      // }
      // return unSelectRow(invoiceId, selectedRows);
    });
  }, []);

  // Count the amount of selected rows.
  const selectedCount = selectedRows.length;

  const conTextValue: RowSelectContextValue = {
    totalRowsCount: tableContext.repairs.length,
    selectedCount,
    selectedRows,
    handleSelectAll,
    toggleSelectedRow,
  };

  return (
    <RowSelectContext.Provider value={conTextValue}>
      {props.children}
    </RowSelectContext.Provider>
  );
}

// Consumer Wrappers.
// Here i specifyed the types of cosumers of this RowSelectContext.


// This one cares about the handleSelectAll function,
// the total rows count, 
// if rows are partially selected 
// if all rows are selected.

export function withContextSelectAllCheckbox<P extends object>(Component: React.ComponentType<P>) {
  const PureComponent: any = memo(Component);

  return (props: { indeterminate: boolean, checked: boolean, onChange: Function } & P) => {
    const rowSelectionContext = useContext(RowSelectContext);
    const selectedCount = rowSelectionContext.selectedRows.length;
    const rowsCount = rowSelectionContext.totalRowsCount;

    const areRowsPartiallySelected =
      selectedCount > 0 && selectedCount < rowsCount;
    const areAllRowsSelected = rowsCount > 0 && rowsCount == selectedCount;

    return (
      <PureComponent
        {...props}
        indeterminate={areRowsPartiallySelected}
        checked={areAllRowsSelected}
        onChange={(e: any) => {
          rowSelectionContext.handleSelectAll(e);
        }}
      />
    );
  };
};

// This one cares about the invoicedId, the check toggle function  and if row is selected.
export function withContextSelectRowCheckBox<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P & { invoiceId: string }) => {
    const rowSelectContext = useContext(RowSelectContext);
    // Check if the current invoice id is present in the list of selected rows.
    // selected = true if present.
    const selected = !InmutableArrayMethods.isItemNotInTheList(
      InmutableArrayMethods.getIndexOfValue(
        rowSelectContext.selectedRows,
        props.invoiceId
      )
    );

    return (
      <PureComponent
        {...props}
        selected={selected}
        onClick={rowSelectContext.toggleSelectedRow}
        invoiceId={props.invoiceId}
      />
    );
  };
};

// This one cares whether or not the current row is selected.
// it also needs.
export function withContextSelectRowTableRow<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P & { invoiceId: string, children: any }) => {
    const rowSelectContext = useContext(RowSelectContext);
    // Check if the current invoice id is present in the list of selected rows.
    // selected = true if present.
    const selected = !InmutableArrayMethods.isItemNotInTheList(
      InmutableArrayMethods.getIndexOfValue(
        rowSelectContext.selectedRows,
        props.invoiceId
      )
    );

    return (
      <PureComponent selected={selected}>
        {props.children}
      </PureComponent>
    );
  };
};

// This one cares about the checked elements count only.
export function withContextSelectRowHeader<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P) => {
    const rowSelectContext = useContext(RowSelectContext);

    return (
      <PureComponent
        {...props}
        selectedCount={rowSelectContext.selectedCount}
      />
    );
  };
};