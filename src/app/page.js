import CursorTracker from "@/components/mouse-tracker/CursorTracker";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full w-full bg-blue-500">
     <CursorTracker />
    </main>
  );
}
