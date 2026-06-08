import { createRoot } from "react-dom/client";
import "./global.scss";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
    defaultOptions : {
        queries: {
            staleTime: 1000*60,
            retry : 1,
            refetchOnWindowFocus: false,
        }
    }
})
createRoot(document.getElementById("root") as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <App />
       {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>} 
    </QueryClientProvider>
);
