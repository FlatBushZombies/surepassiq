import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WishlistPage } from "@/components/learning/wishlist-page";

export default function WishlistRoutePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
          <WishlistPage />
        </div>
      </main>
      <Footer />
    </div>
  );
}
