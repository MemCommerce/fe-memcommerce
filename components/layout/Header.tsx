"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Package,
  UserCircle,
  LogOut,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/hooks/useCart";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { cartLineItems } = useCart();
  const { token, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cartLineItems.length;

  const handleLogout = () => {
    logOut();
  };

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
            <Link href="/ai-chat" className="text-gray-700 hover:text-gray-900">
              AI Chat
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!token ? (
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                      <User className="h-5 w-5" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/my-orders" className="flex items-center cursor-pointer">
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-reviews" className="flex items-center cursor-pointer">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      My Reviews
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={handleLogout} className="flex items-center cursor-pointer w-full text-left">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link href="/wishlist" className="relative">
              <Heart className="h-6 w-6 text-gray-700" />
            </Link>

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
              className="md:hidden"
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
              <Link href="/ai-chat" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                AI Chat
              </Link>
              {!token ? (
                <Link
                  href="/login"
                  className="text-lg font-medium flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/my-orders"
                    className="text-lg font-medium flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    My Orders
                  </Link>
                  <Link
                    href="/my-reviews"
                    className="text-lg font-medium flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    My Reviews
                  </Link>
                  <Link
                    href="/profile"
                    className="text-lg font-medium flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                </>
              )}
              <Link
                href="/cart"
                className="text-lg font-medium flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link
                href="/wishlist"
                className="text-lg font-medium flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
