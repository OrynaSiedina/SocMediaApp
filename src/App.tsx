import { AuthLayout, SigninForm, SignupForm } from "./_auth";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/*public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/*private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
