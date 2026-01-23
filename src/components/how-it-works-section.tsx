"use client";

import { motion } from "framer-motion";
import { FileText, Search, Bell, Handshake } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report Your Item",
    description:
      "Submit details about your lost or found item including photos, location, and description.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Search,
    title: "Smart Matching",
    description:
      "Our AI analyzes reports and matches lost items with found items based on location and details.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Bell,
    title: "Get Notified",
    description:
      "Receive instant notifications when a potential match is found near your location.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Handshake,
    title: "Connect & Recover",
    description:
      "Securely communicate with the finder and verify ownership to recover your item.",
    color: "bg-primary/10 text-primary",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple 4-step process makes recovering lost items easy and secure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="glass-card p-6 rounded-2xl h-full text-center">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </div>

                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${step.color} flex items-center justify-center`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>

                <h3 className="font-display text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
