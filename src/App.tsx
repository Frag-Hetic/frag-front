import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserRouter from "./routes/UserRouter";
import { Toaster } from "./components/ui/toaster";
import FileRouter from "./routes/FileRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/files/*" element={<FileRouter />} />
          <Route path="/users/*" element={<UserRouter />} />
          <Route path="/*" element={<div>not foud</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
