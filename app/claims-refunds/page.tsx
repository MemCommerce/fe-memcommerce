"use client";

import Image from "next/image";

export default function ClaimsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Claims & Refunds</h1>

      <p className="mb-4">
        If you have an issue with your order or would like to request a refund, please follow the steps below.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How to Submit a Claim</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Check your order details and invoice to identify the item(s) involved.</li>
          <li>Gather any supporting information, such as images of damaged products.</li>
          <li>
            Contact our support team by email at <strong>support@example.com</strong> or via our contact form.
          </li>
          <li>Include your order number, product name, and reason for the claim.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Refund Policy</h2>
        <p className="mb-2">
          Refunds are processed within 7-14 business days after the claim has been approved. The refund will be
          issued to the original payment method.
        </p>
        <p>
          Please note that shipping fees are non-refundable unless the return is due to a mistake on our part.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sample Products Eligible for Refund</h2>
        <table className="min-w-full border mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Reason for Refund</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <div className="h-12 w-12 relative">
                  <Image
                    src="/images/sample-product.jpg"
                    alt="Sample Product"
                    width={48}
                    height={48}
                    className="object-cover rounded"
                  />
                </div>
              </td>
              <td className="border px-4 py-2">Sample Product 1</td>
              <td className="border px-4 py-2">Damaged on arrival</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <div className="h-12 w-12 relative">
                  <Image
                    src="/images/sample-product-2.jpg"
                    alt="Sample Product 2"
                    width={48}
                    height={48}
                    className="object-cover rounded"
                  />
                </div>
              </td>
              <td className="border px-4 py-2">Sample Product 2</td>
              <td className="border px-4 py-2">Incorrect item</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
        <p>
          For any questions regarding your claim or refund, please reach out to our support team. We aim to respond
          within 24 hours.
        </p>
      </section>
    </div>
  );
}