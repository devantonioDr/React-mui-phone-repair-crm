import { createContext, memo, useCallback, useContext, useState } from "react";
import { RepairListContext } from "..";
import { RepairChangeStatusDialog } from "../../changeStatusDialog";
import { useToggleDialog } from "../../hooks/useChangeStatusDialog";


type RowChangeStatusDialogContextProviderProps = {
  rowData: RepairData;
  children?: any;
};

type RowChangeStatusDialogContextValue = {
  toggleDialog:Function
};

export const RowChangeStatusDialogContext =
  createContext<RowChangeStatusDialogContextValue>(
    {} as RowChangeStatusDialogContextValue
  );

export function RowChangeStatusDialogContextProvider({
  children,
  rowData,
}: RowChangeStatusDialogContextProviderProps) {
  const tableContext = useContext(RepairListContext);
  const [open, setOpen] = useState<boolean>(false);
 

  const toggleDialog = useCallback(() => {
    setOpen(open => !open);
  },[]);

  const conTextValue = {
    toggleDialog,
  };
  return (
    <RowChangeStatusDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <RepairChangeStatusDialog
        open={open}
        repairId={rowData._id}
        selectedValue={rowData.status.key}
        onClose={toggleDialog}
        notifySave={tableContext.fetchNewRepairs}
      />

      {children}
    </RowChangeStatusDialogContext.Provider>
  );
}


// Comsumers
// This consumer only cares about the toggleDialog Function.

export function withContextRowChangeStatusDialogToggle<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P) => {
    const state = useContext(RowChangeStatusDialogContext);
   
    return (
      <PureComponent
        {...props}
        handleClickOpen={state.toggleDialog}
      />
    );
  };
};