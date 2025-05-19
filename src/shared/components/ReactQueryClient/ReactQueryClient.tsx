import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import '@ant-design/v5-patch-for-react-19';

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};
