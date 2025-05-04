"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/hooks/useCart"
import Image from "next/image"

export default function Header() {
  const { cart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo1.png" alt="MemCommerce Logo" width={32} height={32} />
            <span className="text-xl font-bold">MemCommerce</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/men" className="text-gray-700 hover:text-gray-900">
              Men
            </Link>
            <Link href="/women" className="text-gray-700 hover:text-gray-900">
              Women
            </Link>
            <Link href="/kids" className="text-gray-700 hover:text-gray-900">
              Kids
            </Link>
          </nav>

          <div className="flex items-center">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="ml-4 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-xl font-bold">
                MemCommerce
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6">
              <Link href="/" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/men" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                Men
              </Link>
              <Link href="/women" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                Women
              </Link>
              <Link href="/kids" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                Kids
              </Link>
              <Link
                href="/cart"
                className="text-lg font-medium flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
