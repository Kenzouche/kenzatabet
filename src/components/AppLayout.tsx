// src/components/AppLayout.jsx
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <TopNav />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-5 py-6 sm:py-10">
        <Outlet />
      </main>
        <Footer/>
    </div>
  );
}
