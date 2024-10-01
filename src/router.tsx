import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/home";
import Mail from "./routes/mail";
import MailNew from "./routes/mailNew";
import { RootLayout } from "./layout";
import { apiClient } from "./lib/apiClient";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [auto, setAuto] = useState<boolean>(false);

  useEffect(() => {
    const effectCalled = { current: false };

    const getIsAuth = async () => {
      if (effectCalled.current) return;
      effectCalled.current = true;

      try {
        const res = await apiClient.is_auth.get();
        if (res.status === 200) {
          setIsAuth(res.body.access);
        } else {
          toast.error("ログインできませんでした");
          setIsAuth(false);
        }
      } catch (error) {
        toast.error("ログインできませんでした");
        setIsAuth(false);
      }
    };

    getIsAuth();

    return () => {
      effectCalled.current = false;
    };
  }, [setIsAuth]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <RootLayout auth={isAuth}>
        <Routes>
          <Route
            path=""
            element={<Home auth={isAuth} auto={auto} setAuto={setAuto} />}
          />
          <Route path="/:id" element={<Mail auto={auto} />} />
          <Route path="/new" element={<MailNew />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
