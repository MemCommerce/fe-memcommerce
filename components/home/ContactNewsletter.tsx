"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactNewsletter() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [newsletter, setNewsletter] = useState("")

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent! (This would send the message in a real app)")
    setContactForm({ name: "", email: "", message: "" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Subscribed to newsletter! (This would subscribe in a real app)")
    setNewsletter("")
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={contactForm.name} onChange={handleContactChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={contactForm.message}
                onChange={handleContactChange}
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with our latest products, trends, and exclusive offers by subscribing to our newsletter.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div>
              <Label htmlFor="newsletter-email">Email</Label>
              <div className="flex">
                <Input
                  id="newsletter-email"
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
                <Button type="submit" className="ml-2">
                  Subscribe
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why Subscribe?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Get early access to new collections</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Exclusive discounts and promotions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fashion tips and style guides</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Free shipping on your first order</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
