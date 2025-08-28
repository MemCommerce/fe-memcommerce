"use client";

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

      {claims.length === 0 ? (
        <p>No claims found.</p>
      ) : (
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
        <h2 className="text-xl font-semibold mb-2">Refund Policy</h2>
        <p className="mb-2">
          Refunds are processed within 7-14 business days after the claim has been approved. The refund will be issued
          to the original payment method.
        </p>
        <p>Please note that shipping fees are non-refundable unless the return is due to a mistake on our part.</p>
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
