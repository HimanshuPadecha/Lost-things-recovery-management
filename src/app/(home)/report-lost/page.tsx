"use client";

import { motion } from "framer-motion";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Upload, MapPin, Calendar, Camera, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";

export default function ReportLostForm() {
  const [step, setStep] = useState<number>(1);
  const [location,setLocation] = useState("")
  const [name,setName] = useState("")

  const {} = trpc.itemsGetMany.useQuery({location,name})

  return (

    <Suspense>
      <ErrorBoundary fallback={<p>Loading...</p>}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <AlertCircle className="w-4 h-4" />
              <span>Report Lost Item</span>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Lost Something?{" "}
              <span className="gradient-text">We're Here to Help</span>
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto">
              Fill in the details below and our smart matching system will alert
              you when someone finds your item
            </p>
          </motion.div>

          {/* Form Card */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">
                Item Details
              </h2>

              <Input placeholder="Item Name" />
              <Textarea placeholder="Detailed description" />
            </div>

            <div className="space-y-6 pt-5">
              <Input placeholder="Location" />

              <Button
                className="btn-gradient w-full h-12 rounded-xl"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}
