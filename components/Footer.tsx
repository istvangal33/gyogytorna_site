import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Left text */}
        <div>
          <h2 className="text-2xl font-bold leading-snug mb-4">
            Lorem ipsum <br /> dolor <br /> sit<sup>®</sup>
          </h2>
        </div>

        {/* London */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-3">Győr</h3>
          <p>
            <a
              href="mailto:teszt@gmail.com"
              className="hover:underline"
            >
              teszt@gmail.com
            </a>
          </p>
          <p className="mt-1">+36 30 123 4567</p>
          <p className="mt-1 text-sm">
            Unit 306, Metropolitan Wharf, <br />
            70 Wapping Wall, London E1W 3SS
          </p>
          <Link
            href="#"
            className="mt-3 inline-block text-sm font-semibold hover:underline"
          >
            SEE ON MAP ↗
          </Link>
        </div>


        {/* Newsletter + Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-3">
            Want to be the smartest <br /> in your office?
          </h3>
          <Link
            href="#"
            className="text-sm font-semibold hover:underline"
          >
            SIGN UP FOR OUR NEWSLETTER →
          </Link>

          <h3 className="text-sm font-semibold uppercase mt-6 mb-3">
            Kövess minket!
          </h3>
          <div className="flex space-x-6 text-2xl">
            <Link href="#" aria-label="Facebook" className="hover:text-gray-400">
              <FaFacebookF />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-gray-400">
              <FaInstagram />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <FaLinkedinIn />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
