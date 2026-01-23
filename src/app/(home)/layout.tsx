import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";

interface pageProps {
  children: React.ReactElement;
}

const layout = ({ children }: pageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
