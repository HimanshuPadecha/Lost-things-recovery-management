"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, MapPin, FileText, Info, Home } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/report-lost", label: "Report Lost", icon: FileText },
  { href: "/report-found", label: "Report Found", icon: MapPin },
  { href: "/search", label: "Search", icon: Search },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-display font-bold text-xl hidden sm:block">
              <span className="gradient-text">Lost</span>
              <span className="text-foreground">&</span>
              <span className="gradient-text-accent">Found</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <Link href="/report-lost" className="hidden sm:block">
              <Button className="btn-accent rounded-xl">
                Report Item
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2.5 rounded-xl bg-secondary"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-2 overflow-hidden"
            >
              <div className="glass-card p-4 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
