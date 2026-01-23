"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              <span>Trusted by 50,000+ users across India</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Reuniting{" "}
              <span className="gradient-text">Lost Items</span>
              <br />
              with Their{" "}
              <span className="gradient-text-accent">Owners</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              India&apos;s most trusted platform for recovering lost items.
              Report, search, and connect with finders using our smart
              location-based matching system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/report-lost">
                <Button
                  size="lg"
                  className="btn-gradient rounded-xl px-8 h-12 text-base group"
                >
                  Report Lost Item
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-8 h-12 text-base"
                >
                  <Search className="mr-2 w-4 h-4" />
                  Search Items
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-success" />
                <span>Verified Users</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Location Match</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">

              {/* Main Card */}
              <motion.div
                className="glass-card p-6 rounded-3xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-center p-8"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl btn-gradient flex items-center justify-center pulse-glow">
                      <Search className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Smart Matching
                    </h3>
                    <p className="text-muted-foreground">
                      AI-powered location matching
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 glass-card p-4 rounded-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Secure</p>
                    <p className="text-xs text-muted-foreground">
                      Verified claims
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 glass-card p-4 rounded-2xl"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Nearby</p>
                    <p className="text-xs text-muted-foreground">
                      Location alerts
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
