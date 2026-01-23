"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Heart, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Report Lost Item", href: "/report-lost" },
    { label: "Report Found Item", href: "/report-found" },
    { label: "Search Items", href: "/search" },
    { label: "How It Works", href: "/about" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Safety Tips", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">Lost</span>
                <span className="text-foreground">&</span>
                <span className="gradient-text-accent">Found</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting lost items with their rightful owners across India.
              Together, we can increase recovery rates and help communities.
            </p>

            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Lost & Found India. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with{" "}
            <Heart className="w-4 h-4 text-destructive fill-destructive" /> in India
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
