import CategoryPage from "@/components/CategoryPage";
import { manProducts } from "@/lib/data";

export const metadata = {
  title: "ZARA | Man",
  description: "Discover the latest Zara Man collection — suits, shirts, knitwear, trousers and more.",
};

const categories = ["SUITS", "SHIRTS", "T-SHIRTS", "TROUSERS", "OUTERWEAR", "KNITWEAR"];

export default function ManPage() {
  return (
    <CategoryPage
      title="MAN"
      products={manProducts}
      categories={categories}
      navActive="HOME"
    />
  );
}
