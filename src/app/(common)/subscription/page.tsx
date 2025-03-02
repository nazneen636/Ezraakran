"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectUser } from "@/redux/slice/userSlice";
import { useCreateSubscriptionMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PricingPlan {
  title: string;
  price: number;
  period: string;
  monthlyPrice?: number;
  minLicense: number;
  features: Array<{
    text: string;
    addon?: boolean;
  }>;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Standard",
    price: 2,
    period: "user/mo",
    minLicense: 1,
    features: [
      { text: "Personalized user profiles" },
      { text: "Post items for sale or investments" },
      { text: "Secure payments via cards" },
      { text: "Comment on posts to connect" },
      { text: "Community chat for discussions" },
      { text: "WhatsApp-style group chat" },
      { text: "Real-time updates and notifications" },
    ],
  },
];

export default function SubscriptionPage() {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const user: any = useSelector(selectUser);
  const userId = user?.user?.id;
  const router = useRouter();

  const handleBuyNow = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }
    try {
      const response = await createSubscription({ userId }).unwrap();
      // console.log("Subscription created successfully:", response);
      if (response?.success) {
        toast.success("Subscription created successfully");
        router.replace("/subscription/payment-method");
      }
    } catch (error: any) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex items-center justify-center p-4 md:p-8">
      <div className="mx-auto grid md:grid-cols-1 gap-8">
        {pricingPlans.map((plan) => (
          <div key={plan.title} className="w-full max-w-sm mx-auto">
            <div className="bg-red rounded-3xl p-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {plan.title}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold tracking-tight">
                    £{plan.price}
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    /{plan.period}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-customYellow">
                    {plan.minLicense} License Minimum
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 group bg-darkBlue text-white border-none"
                  onClick={handleBuyNow}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Subscribe Now"}{" "}
                  <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Button>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <Check className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">
                      {feature.text}
                      {feature.addon && (
                        <span className="text-gray-400 ml-1">(add-on)</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
