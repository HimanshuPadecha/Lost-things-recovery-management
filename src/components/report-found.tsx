"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { UploadDropzone } from "@/utils/uploadthing";
import { Camera, Heart, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [explanation, setExplanation] = useState("");

  const addthing = trpc.addThing.useMutation({
    onSuccess: () => {
      toast.success("Thing added", { position: "top-center" });
      setStep(2);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
          Thank You for <span className="gradient-text-accent">Being Kind</span>
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto">
          You're helping someone get their valuable item back. Fill in the
          details and we'll connect you with the owner.
        </p>
      </motion.div>

      {/* Progress */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2].map((s) => (
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
            {s < 2 && (
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
            <h2 className="font-display text-xl font-semibold">Item Details</h2>

            <Input
              placeholder="Item name or brief description"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Describe the item (avoid unique identifiers)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the location.."
            />

            <Button
              className="bg-success hover:bg-success/90 text-success-foreground w-full h-12 rounded-xl"
              disabled={addthing.isPending}
              onClick={() => {
                if (!name || !location || !description) {
                  toast.error("fill in all the details..");
                  return;
                }
                addthing.mutate({ name, description, location });
              }}
            >
              {addthing.isPending && <Loader2Icon className="animate-spin" />}
              Continue
            </Button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold">
              Where & When (please input multiple photoes to help us process
              smoothly !!){" "}
            </h2>

            <Textarea
              placeholder="Description of the thing..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />

            <UploadDropzone
              endpoint="imageUploader"
              input={{ thingId: addthing?.data?.id || "", description }}
              onClientUploadComplete={(res) => {
                toast.success("Question generations started");
                setExplanation("")
              }}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-success/50 transition-colors cursor-pointer"
              content={{
                uploadIcon: () => (
                  <Camera className="w-10 h-10 text-muted-foreground" />
                ),
                label: () => (
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or{" "}
                    <span className="text-success font-medium">browse</span>
                  </p>
                ),
                allowedContent: () => null,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
