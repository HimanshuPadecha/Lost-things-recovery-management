"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Upload,
  MapPin,
  Calendar,
  Camera,
  Heart,
} from "lucide-react";

const itemCategories = [
  "Wallet / Purse",
  "Mobile Phone",
  "Keys",
  "Documents (ID, Passport, etc.)",
  "Jewelry",
  "Electronics",
  "Bags / Luggage",
  "Pet",
  "Other",
];

export default function ReportFoundForm() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
          <Heart className="w-4 h-4" />
          <span>Report Found Item</span>
        </div>

        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          Thank You for{" "}
          <span className="gradient-text-accent">Being Kind</span>
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto">
          You're helping someone get their valuable item back. Fill in the details
          and we'll connect you with the owner.
        </p>
      </motion.div>

      {/* Progress */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s
                  ? "bg-success text-success-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 mx-2 rounded-full ${
                  step > s ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="glass-card p-8 rounded-3xl">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold">
              Item Details
            </h2>

            <div>
              <Label>Item Category</Label>
              <Select>
                <SelectTrigger className="mt-2 h-12 rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {itemCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input placeholder="Item name or brief description" />
            <Textarea placeholder="Describe the item (avoid unique identifiers)" />

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-success/50 transition-colors cursor-pointer">
              <Camera className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or{" "}
                <span className="text-success font-medium">browse</span>
              </p>
            </div>

            <Button
              className="bg-success hover:bg-success/90 text-success-foreground w-full h-12 rounded-xl"
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold">
              Where & When
            </h2>

            <Input placeholder="Location found" />
            <Input type="date" />

            <Select>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Where is the item now?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="with-me">With me</SelectItem>
                <SelectItem value="police">Handed to police</SelectItem>
                <SelectItem value="security">Left with security</SelectItem>
                <SelectItem value="other">Other location</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold">
              Your Contact
            </h2>

            <Input placeholder="Email address" />
            <Input placeholder="Phone number" />

            <div className="glass-card p-4 rounded-xl bg-success/5">
              <p className="text-sm text-muted-foreground">
                Your contact details will only be shared after the owner verifies
                ownership.
              </p>
            </div>

            <Button className="btn-accent w-full h-12 rounded-xl">
              <Upload className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
