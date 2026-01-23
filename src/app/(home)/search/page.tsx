import SearchClient from "@/components/search-client";

export const metadata = {
  title: "Search Lost & Found Items",
};

export default function SearchPage() {
  return (
    <main className="py-12">
      <SearchClient />
    </main>
  );
}
