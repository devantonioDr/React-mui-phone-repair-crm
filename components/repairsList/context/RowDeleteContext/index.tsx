import { faIR } from "date-fns/locale";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";
import { RepairListContext } from "..";
import { DeleteDialog } from "../../deleteDialog";
import { useToggleDialog } from "../../hooks/useChangeStatusDialog";

type RowDeleteDialogContextProviderProps = {
  rowData: RepairData;
  children?: any;
};

type RowDeleteDialogContextValue = {
  handleClickOpen: Function;
};

export const RowDeleteDialogContext =
  createContext<RowDeleteDialogContextValue>({} as RowDeleteDialogContextValue);

export function RowDeleteDialogContextProvider({
  children,
  rowData,
}: RowDeleteDialogContextProviderProps) {
  const tableContext = useContext(RepairListContext);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const { open, handleClickOpen, handleClose } = useToggleDialog();

  // const handleClickOpen = ()=>{
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false
  //   })

  //   swalWithBootstrapButtons.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, cancel!',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       swalWithBootstrapButtons.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   });
  // }

  const onError = useCallback(() => {
    setIsloading(false);
    setWasDeleted(false);
  }, []);

  const handleDelete = useCallback(() => {
    // Set loadign as true.
    setIsloading(true);

    fetch("http://localhost:3000/api/repairs", {
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"_id":"' + rowData._id + '"}',
      method: "DELETE",
      mode: "cors",
      credentials: "omit",
    })
      .then((data) => data.json())
      // If response resolves.
      .then(async (data) => {
        setIsloading(false);
        if (data.status == "ok") {
          console.log(data);
          setWasDeleted(true);

          setTimeout(() => {
            tableContext.fetchNewRepairs();
            handleClose();
            setWasDeleted(false);
          }, 1000);

          return;
        }
        onError();
        console.log(data);
      })
      // If rejects.
      .catch((err) => {
        onError();
      });
  }, []);

  const conTextValue = {
    handleClickOpen,
  };
  return (
    <RowDeleteDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <DeleteDialog
        open={open}
        isloading={isloading}
        repairId={rowData._id}
        onClose={handleClose}
        notifySave={tableContext.fetchNewRepairs}
        onDelete={handleDelete}
        wasDeleted={wasDeleted}
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

    return <PureComponent {...props} handleClickOpen={state.handleClickOpen} />;
  };
}
