"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, Zap, Users, Bell, Lock } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description:
      "Our smart algorithm matches lost and found items based on GPS location and proximity.",
  },
  {
    icon: Shield,
    title: "Ownership Verification",
    description:
      "Secure verification process ensures items are returned to their rightful owners.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Get real-time alerts when someone reports finding an item matching your description.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join thousands of responsible citizens helping each other recover lost belongings.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Customizable notifications keep you updated on matching items in your area.",
  },
  {
    icon: Lock,
    title: "Secure Communication",
    description:
      "End-to-end encrypted messaging protects your privacy during recovery.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="gradient-text-accent">Lost & Found</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology to maximize your chances of recovery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="glass-card p-6 rounded-2xl h-full transition-all duration-300 group-hover:border-primary/30">
                <motion.div
                  className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  whileHover={{ rotate: -10 }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>

                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
