import SearchClient from "@/components/search-client";
import { HydrateClient, trpc } from "@/trpc/server";

export const metadata = {
  title: "Search Lost & Found Items",
};

export default function SearchPage() {
  trpc.fetchThings.prefetch();
  return (
    <HydrateClient>
      <main className="py-12">
        <SearchClient />
      </main>
    </HydrateClient>
  );
}
