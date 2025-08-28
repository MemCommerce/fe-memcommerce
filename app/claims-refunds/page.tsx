"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { getClaims } from "../api/claimsApi";
import { ClaimWithItems } from "@/lib/types";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function ClaimsPage() {
  const [isLoading, setLoading] = useState(true);
  const [claims, setClaims] = useState<ClaimWithItems[]>([]);
  const { token } = use(AuthContext);

  useEffect(() => {
    if (!token) return;

    const fetchClaims = async () => {
      toast.loading("Loading claims...");

      try {
        const data = await getClaims(token);
        setClaims(data);
        toast.success("Claims loaded successfully!");
      } catch (err) {
        console.error("Error fetching claims:", err);
        toast.error("Failed to load claims.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Claims & Refunds</h1>
      {isLoading && <p>Loading...</p>}

      {!isLoading && claims.length > 0 && (
        <table className="min-w-full border mb-8">
          <thead>
            <tr>
              <th className="border px-4 py-2">Claim ID</th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Reason</th>
              <th className="border px-4 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.claim_request.id}>
                <td className="border px-4 py-2">{claim.claim_request.id}</td>
                <td className="border px-4 py-2">{claim.claim_request.order_id}</td>
                <td className="border px-4 py-2 capitalize">{claim.claim_request.status}</td>
                <td className="border px-4 py-2">{claim.claim_request.reason}</td>
                <td className="border px-4 py-2">
                  {claim.items.map((item) => (
                    <div key={item.id} className="mb-2">
                      <p>
                        <strong>Qty:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Resolution:</strong> {item.resolution}
                      </p>
                      <p>
                        <strong>Refund:</strong> {item.refund_amount}
                      </p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
          Refunds are processed within 7-14 business days after the claim has been approved. The refund will be issued
          to the original payment method.
        </p>
        <p>Please note that shipping fees are non-refundable unless the return is due to a mistake on our part.</p>
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
