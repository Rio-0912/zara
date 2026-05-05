import CategoryPage from "@/components/CategoryPage";
import { womanProducts } from "@/lib/data";

export const metadata = {
  title: "ZARA | Woman",
  description: "Discover the latest Zara Woman collection — dresses, tops, knitwear, trousers and more.",
};

const categories = ["DRESSES", "TOPS", "KNITWEAR", "TROUSERS", "COATS", "SHOES"];

export default function WomanPage() {
  return (
    <CategoryPage
      title="WOMAN"
      products={womanProducts}
      categories={categories}
      navActive="HOME"
    />
  );
}
