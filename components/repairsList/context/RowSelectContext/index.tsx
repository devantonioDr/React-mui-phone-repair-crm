import React, { memo, useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { RepairListContext } from "..";
import { InmutableArrayMethods } from "../../../../helper/inmutableArrayMethods";

export type RowSelectContextValue = {
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

  const [selectedRows, setSelectedRows] = useState<any>([]);

  //  useCallback To avoid recreating the function on each rerender
  const unSelectRow = useCallback(
    (invoiceId: string, selectedRows: string[]) => {
      const m = InmutableArrayMethods;
      // Get index from selected rows list.
      const selectedIndex = selectedRows.indexOf(invoiceId);
      if (m.isItemNotInTheList(selectedIndex)) {
        console.log("Item is not in the list.");
        return;
      }
      // New state.
      let newSelected: string[] = [];

      if (m.isFirstItemInTheList(selectedIndex)) {
        newSelected = m.removeFirstItemOfTheList(selectedRows);
      } else if (m.isLastItemInTheList(selectedRows, selectedIndex)) {
        newSelected = m.removeLastItemOfTheList(selectedRows);
      } else if (m.isSomeWhereInTheList(selectedIndex)) {
        newSelected = m.removeItemAtTheIndexPosition(
          selectedRows,
          selectedIndex
        );
      }
      return newSelected;
    },
    []
  );
  //  useCallback To avoid recreating the function on each rerender
  const selectRow = useCallback((invoiceId: string, selectedRows: string[]) => {
    const m = InmutableArrayMethods;

    const selectedIndex = selectedRows.indexOf(invoiceId);
    if (m.isItemNotInTheList(selectedIndex) == false) {
      console.log("Item is already on the list.");
      return;
    }
    let newSelected: string[] = [];
    if (m.isItemNotInTheList(selectedIndex)) {
      newSelected = m.addValueToTheEndOfTheList(selectedRows, invoiceId);
    }

    return newSelected;
  }, []);

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
      if (InmutableArrayMethods.isItemNotInTheList(selectedIndex)) {
        return selectRow(invoiceId, selectedRows);
      }
      return unSelectRow(invoiceId, selectedRows);
    });
  }, []);

  // Count the amount of selected rows.
  const selectedCount = selectedRows.length;

  const conTextValue: RowSelectContextValue = {
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
// Here i specify the types of cosumers of this RowSelectContext.

// This one cares about the invoidId the check toggle function and and if row is selected.
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
export function withContextSelectRowTableRow<P extends object>(
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
      />
    );
  };
};

// This one cares about the checked elements count.
export function withContextSelectRowHeader<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P ) => {
    const rowSelectContext = useContext(RowSelectContext);
   
    return (
      <PureComponent
        {...props}
        selectedCount={rowSelectContext.selectedCount}
      />
    );
  };
};