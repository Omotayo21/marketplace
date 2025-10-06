"use client";
import Link from "next/link";
import Image from "next/image";

import LogoLight from "../../public/agora-logo-light.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
             
              <Image
                src={LogoLight}
                alt="Agora Logo"
                className="w-24 "
              />
            </Link>
            <p className="text-gray-300 dark:text-gray-300 mb-4 max-w-xs">
              Your local marketplace for unique finds and meaningful
              connections. Buy and sell with confidence.
            </p>
          
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-300 dark:text-white mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2">
           
              <li>
                <Link
                  href="#"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
               Top sellers
                </Link>
              </li>
           
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-300 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
             
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                    >
                      Contact Support
                    </Link>
                  </li>
              
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  Report an issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-300 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  href="about"
                  className="text-gray-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  Terms of Servie
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 dark:text-gray-400 text-sm">
            © {currentYear} Agora Marketplace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
