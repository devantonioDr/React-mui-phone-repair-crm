import { createContext, useContext, useState } from "react";
import { RepairListContext } from "..";
import { RepairChangeStatusDialog } from "../../changeStatusDialog";
import { DeleteDialog } from "../../deleteDialog";
import { useToggleDialog } from "../../hooks/useChangeStatusDialog";


type RowDeleteContextProviderProps = {
  rowData: RepairData;
  children?: any;
};

type RowDeleteContextValue = {
  expanded: boolean;
  setExpanded: any;
  changeStateDialog: {
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
  };
};

export const RowDeleteContext =
  createContext<RowDeleteContextValue>(
    {} as RowDeleteContextValue
  );

export function RowDeleteContextProvider({
  children,
  rowData,
}: RowDeleteContextProviderProps) {
  const tableContext = useContext(RepairListContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  const changeStateDialog = useToggleDialog();
  const conTextValue = {
    expanded,
    setExpanded,
    changeStateDialog,
  };

  return (
    <RowDeleteContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <DeleteDialog
        open={changeStateDialog.open}
        repairId={rowData._id}
        selectedValue={rowData.status.key}
        onClose={changeStateDialog.handleClose}
        notifySave={tableContext.fetchNewRepairs}
      />

      {children}
    </RowDeleteContext.Provider>
  );
}
