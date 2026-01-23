"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Target,
  Heart,
  Shield,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community to help each other recover what's lost.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your privacy and security are our top priorities in every interaction.",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    description: "Connecting people across all states and cities in India.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Continuously improving our platform to serve you better.",
  },
];

const team = [
  { name: "Priya Sharma", role: "Founder & CEO" },
  { name: "Rahul Verma", role: "CTO" },
  { name: "Anita Patel", role: "Head of Operations" },
  { name: "Vikram Singh", role: "Community Lead" },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl btn-gradient flex items-center justify-center"
            >
              <Target className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Mission</span> to Reunite
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Lost & Found is building a community-powered platform that makes
              recovering lost items simple, secure, and accessible to everyone.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                "500,000+ Daily Lost Items in India",
                "Only 20% Currently Recovered",
                "We're Changing That",
              ].map((stat, i) => (
                <motion.div
                  key={stat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-medium">{stat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
            Ready to Join Our <span className="gradient-text">Community</span>?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/report-lost">
              <Button size="lg" className="btn-gradient rounded-xl px-8 h-12 group">
                Report Lost Item
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/report-found">
              <Button size="lg" variant="outline" className="rounded-xl px-8 h-12">
                Report Found Item
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
