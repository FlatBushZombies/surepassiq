import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CommunityHub } from "@/components/community/community-hub";

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
          <CommunityHub />
        </div>
      </main>
      <Footer />
    </div>
  );
}
