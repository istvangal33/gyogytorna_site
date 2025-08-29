import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapcsolat | Gyógytorna - Professzionális Fizioterápia',
  description: 'Vegye fel velünk a kapcsolatot időpont foglaláshoz vagy kérdéseivel. Gyors válasz, személyes szolgáltatás.',
  openGraph: {
    title: 'Kapcsolat | Gyógytorna - Professzionális Fizioterápia',
    description: 'Vegye fel velünk a kapcsolatot időpont foglaláshoz vagy kérdéseivel. Gyors válasz, személyes szolgáltatás.',
  },
};

export default function KapcsolatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}