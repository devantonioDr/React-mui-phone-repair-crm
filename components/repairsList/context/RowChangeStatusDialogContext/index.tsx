import { createContext, useContext, useState } from "react";
import { RepairListContext } from "..";
import { RepairChangeStatusDialog } from "../../changeStatusDialog";
import { useToggleDialog } from "../../hooks/useChangeStatusDialog";


type RowChangeStatusDialogContextProviderProps = {
  rowData: RepairData;
  children?: any;
};

type RowChangeStatusDialogContextValue = {
  expanded: boolean;
  setExpanded: any;
  changeStateDialog: {
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
  };
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
  const [expanded, setExpanded] = useState<boolean>(false);
  const changeStateDialog = useToggleDialog();
  const conTextValue = {
    expanded,
    setExpanded,
    changeStateDialog,
  };

  return (
    <RowChangeStatusDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <RepairChangeStatusDialog
        open={changeStateDialog.open}
        repairId={rowData._id}
        selectedValue={rowData.status.key}
        onClose={changeStateDialog.handleClose}
        notifySave={tableContext.fetchNewRepairs}
      />

      {children}
    </RowChangeStatusDialogContext.Provider>
  );
}
