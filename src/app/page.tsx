import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative bg-[#121212] selection:bg-yellow-500/30 selection:text-white">
      <Overlay />
      <ScrollyCanvas />
      <Projects />
    </main>
  );
}
