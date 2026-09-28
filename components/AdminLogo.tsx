import Image from "next/image";

// Az admin bejelentkezési képernyők közös fejléce.
// A logó valódi mérete 826x436 (kb. 1,9:1). A width/height a megjelenítési
// méret kétszerese, hogy retina kijelzőn is éles maradjon — a Next ebből
// generálja a megfelelő méretű változatot.
export default function AdminLogo() {
  return (
    <div className="mb-5 flex justify-center">
      <Image
        src="/logo.webp"
        alt="ReStart Physio"
        width={242}
        height={128}
        className="h-16 w-auto"
        quality={95}
        priority
      />
    </div>
  );
}
