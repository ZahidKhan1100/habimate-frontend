import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Support | HabiMate",
  description:
    "Bug reports, ideas, partnerships—reach the HabiMate team.",
  openGraph: {
    title: "Contact & Support | HabiMate",
    description: "We read every message. Fairness starts with listening.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-xl">
          <h1 className="font-heading text-4xl font-extrabold text-slate-900 dark:text-white">
            Contact & support
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Bugs, feature ideas, or partnerships—pick a category and we&apos;ll
            route it to the right human.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
