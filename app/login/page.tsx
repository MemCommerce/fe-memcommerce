"use client";

import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginWithGoogle } from "@/app/api/auth";

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const fullBaseUrl = `${protocol}//${host}`;
    const returnUrl = `${fullBaseUrl}/google-auth`

    const data = await loginWithGoogle(returnUrl);
    if (data) {
      window.location.href = data;
    } else {
      console.error("Failed to get redirect URL for Google login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <KeyRound size={24} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
