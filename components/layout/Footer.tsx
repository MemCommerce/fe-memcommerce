import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">About MemCommerce</h3>
            <p className="text-gray-300">
              MemCommerce is a modern fashion brand dedicated to providing high-quality, stylish clothing for men,
              women, and kids. Our mission is to make fashion accessible and sustainable.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/men" className="text-gray-300 hover:text-white">
                  Men
                </a>
              </li>
              <li>
                <a href="/women" className="text-gray-300 hover:text-white">
                  Women
                </a>
              </li>
              <li>
                <a href="/kids" className="text-gray-300 hover:text-white">
                  Kids
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-300 hover:text-white">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="ml-2">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MemCommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
