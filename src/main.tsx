import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-[#0D0C11]">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </QueryClientProvider>
  </div>
);
