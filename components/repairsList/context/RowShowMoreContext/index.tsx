import {
  ComponentType,
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import { RepairListContext } from "..";

type RowShowMoreContextProviderProps = {
  children?: any;
};

type RowShowMoreContextValue = {
  expanded: string;
  setExpanded: any;
  toggleExpanded: (invoiceId: string) => void;
};

// Context.
export const RowShowMoreContext = createContext<RowShowMoreContextValue>(
  {} as RowShowMoreContextValue
);

// Context Provider for ShowMore button of the table row.
export function RowShowMoreContextProvider({
  children,
}: RowShowMoreContextProviderProps) {
  const [expanded, setExpanded] = useState<string>("");

  const toggleExpanded = useCallback((invoiceId: string) => {
    setExpanded((expanded) => {
      // If current is the one expanded.
      if (expanded == invoiceId) {
        return "";
      }
      // Set expanded value.
      return invoiceId;
    });
  }, []);

  const contextValue: RowShowMoreContextValue = {
    expanded,
    setExpanded,
    toggleExpanded,
  };

  return (
    <RowShowMoreContext.Provider value={contextValue}>
      {children}
    </RowShowMoreContext.Provider>
  );
}

// Consumers wrapper with hook.
// Wraps components to be used with the context.
type WithContextShowMoreProps = {
  isExpanded?: boolean;
  onClick?: Function;
  invoiceId?: string;
};

export function withContextShowMore<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureShowMoreButton: any = memo(Component
  //   , (prev, next) => {
  //   console.log(prev, next);
  //   return false;
  // }
  );

  return function (props: P & WithContextShowMoreProps) {
    const state = useContext(RowShowMoreContext);
    const isExpanded = state.expanded == props.invoiceId;

    return (
      <PureShowMoreButton
        {...props}
        onClick={state.toggleExpanded}
        isExpanded={isExpanded}
      />
    );
  };
}
