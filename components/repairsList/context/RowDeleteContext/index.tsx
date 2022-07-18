import { createContext, memo, useCallback, useContext, useState } from "react";
import { RepairListContext } from "..";
import { RepairChangeStatusDialog } from "../../changeStatusDialog";
import { DeleteDialog } from "../../deleteDialog";
import { useToggleDialog } from "../../hooks/useChangeStatusDialog";

type RowDeleteDialogContextProviderProps = {
  rowData: RepairData;
  children?: any;
};

type RowDeleteDialogContextValue = {
  toggleDialog:Function
};

export const RowDeleteDialogContext =
  createContext<RowDeleteDialogContextValue>(
    {} as RowDeleteDialogContextValue
  );

export function RowDeleteDialogContextProvider({
  children,
  rowData,
}: RowDeleteDialogContextProviderProps) {
  const tableContext = useContext(RepairListContext);
  const [open, setOpen] = useState<boolean>(false);
 

  const toggleDialog = useCallback(() => {
    setOpen(open => !open);
  },[]);

  const conTextValue = {
    toggleDialog,
  };
  return (
    <RowDeleteDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <DeleteDialog
        open={open}
        repairId={rowData._id}
        selectedValue={rowData.status.key}
        onClose={toggleDialog}
        notifySave={tableContext.fetchNewRepairs}
      />

      {children}
    </RowDeleteDialogContext.Provider>
  );
}


// Comsumers
// This consumer only cares about the toggleDialog Function.

export function withContextDeleteDialogToggle<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P) => {
    const state = useContext(RowDeleteDialogContext);
   
    return (
      <PureComponent
        {...props}
        handleClickOpen={state.toggleDialog}
      />
    );
  };
};