import { createContext, useState } from "react";


export const RowContext = createContext<any>({});

export function RowContextProvider({children}:any) {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <RowContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </RowContext.Provider>
    )
};

