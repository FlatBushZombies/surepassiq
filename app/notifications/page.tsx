import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotificationsPage } from "@/components/learning/notifications-page";

export default function NotificationsRoutePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
          <NotificationsPage />
        </div>
      </main>
      <Footer />
    </div>
  );
}
