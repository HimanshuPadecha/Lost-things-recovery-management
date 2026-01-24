"use client";

import { motion } from "framer-motion";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  MapPin,
  Filter,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

type ItemType = "lost" | "found";

interface Item {
  id: number;
  type: ItemType;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string | null;
  description: string;
}

const mockItems: Item[] = [
  {
    id: 1,
    type: "lost",
    title: "Black Leather Wallet",
    category: "Wallet / Purse",
    location: "Mumbai, Andheri Station",
    date: "2024-01-20",
    image: null,
    description:
      "Black leather wallet with blue stripe, contains personal cards.",
  },
  {
    id: 2,
    type: "found",
    title: "Samsung Galaxy Phone",
    category: "Mobile Phone",
    location: "Delhi, Connaught Place",
    date: "2024-01-19",
    image: null,
    description: "Found a Samsung phone near coffee shop, screen locked.",
  },
  {
    id: 3,
    type: "lost",
    title: "Golden Retriever",
    category: "Pet",
    location: "Bangalore, Koramangala",
    date: "2024-01-18",
    image: null,
    description:
      "Missing golden retriever, very friendly, wearing blue collar.",
  },
  {
    id: 4,
    type: "found",
    title: "Set of Keys",
    category: "Keys",
    location: "Chennai, T. Nagar",
    date: "2024-01-17",
    image: null,
    description: "Found keys with red keychain and car key attached.",
  },
  {
    id: 5,
    type: "lost",
    title: "Passport & Documents",
    category: "Documents",
    location: "Hyderabad, Airport",
    date: "2024-01-16",
    image: null,
    description:
      "Lost Indian passport and some important documents near check-in.",
  },
  {
    id: 6,
    type: "found",
    title: "Silver Bracelet",
    category: "Jewelry",
    location: "Pune, Koregaon Park",
    date: "2024-01-15",
    image: null,
    description: "Beautiful silver bracelet found in park near fountain.",
  },
];

export default function SearchClient() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<"all" | ItemType>("all");
  const [things] = trpc.fetchThings.useSuspenseQuery();

  console.log(things);

  // const filteredItems = mockItems.filter((item) => {
  //   const q = searchQuery.toLowerCase();

  //   const matchesQuery =
  //     item.title.toLowerCase().includes(q) ||
  //     item.description.toLowerCase().includes(q) ||
  //     item.location.toLowerCase().includes(q);

  //   const matchesType = filterType === "all" || item.type === filterType;

  //   return matchesQuery && matchesType;
  // });

  return (
    <ErrorBoundary fallback={<p>Error..</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Search <span className="gradient-text">Lost & Found</span> Items
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse through reported items or use filters to find what you're
              looking for
            </p>
          </motion.div>

          {/* Filters */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  className="h-12 rounded-xl pl-12"
                  placeholder="Search by item name, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Select
                  value={filterType}
                  onValueChange={(v) => setFilterType(v as any)}
                >
                  <SelectTrigger className="w-[140px] h-12 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {things.length}
            </span>{" "}
            results
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {things.map((thing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <img
                    src={thing.thing_images?.url}
                    className="h-full w-full"
                  />
                  {!thing.thing_images?.url && (
                    <Search className="w-8 h-8 text-destructive" />
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {thing.things.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {thing.things.description}
                  </p>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 btn-gradient">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {things.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
