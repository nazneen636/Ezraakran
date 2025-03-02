// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios, { AxiosError } from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "@/redux/slice/userSlice";

// interface PaymentFormData {
//   cardNumber: string;
//   expMonth: string;
//   expYear: string;
//   cvc: string;
// }

// export default function PaymentComponent() {
//   const { register, handleSubmit } = useForm<PaymentFormData>();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const postId = searchParams.get("postId");
//   const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
//   const user = useSelector(selectUser);
//   const accessToken = user?.user?.accessToken;

//   const onSubmit = async (data: PaymentFormData): Promise<void> => {
//     const payload = new URLSearchParams({
//       "card[number]": data.cardNumber,
//       "card[exp_month]": data.expMonth,
//       "card[exp_year]": data.expYear,
//       "card[cvc]": data.cvc,
//       type: "card",
//     });

//     console.log(data);

//     try {
//       const paymentMethodResponse = await axios.post(
//         "https://api.stripe.com/v1/payment_methods",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer pk_test_51NJSZOLH2qYLXKH2R8ublpbSD1hpEMAqQIrsHSUw5JVfyFMlBokEjQFIsfl75UrTi6T24R21GXmJT8rpuo6d7G4300KwUoutMn`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       setPaymentMethodId(paymentMethodResponse.data.id);

//       confirmPayment(paymentMethodResponse.data.id);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error creating payment method:", error.response?.data);
//       } else {
//         console.error("Unknown error creating payment method:", error);
//       }
//     }
//   };

//   const confirmPayment = async (paymentMethodId: string): Promise<void> => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_DEV_API_URL}/payment/buy-product`,
//         {
//           postId,
//           paymentMethodId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         alert("Payment successful!");
//         router.push("/success");
//       } else {
//         console.error("Payment failed:", response.data.message);
//         alert(`Payment failed: ${response.data.message}`);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error confirming payment:", error.response?.data);
//       } else {
//         console.error("Unknown error confirming payment:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
//         <h1 className="text-xl font-bold mb-4">Enter Payment Details</h1>

//         {/* {postId && <p className="text-gray-500 mb-4">Product ID: {postId}</p>} */}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-sm font-medium">Card Number</label>

//             <Input
//               {...register("cardNumber")}
//               type="text"
//               placeholder="4242 4242 4242 4242"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium">
//                 Expiration Month
//               </label>

//               <Input
//                 {...register("expMonth")}
//                 type="number"
//                 placeholder="12"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium">
//                 Expiration Year
//               </label>

//               <Input
//                 {...register("expYear")}
//                 type="number"
//                 placeholder="2025"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium">CVC</label>

//             <Input
//               {...register("cvc")}
//               type="text"
//               placeholder="123"
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full bg-black text-white">
//             Confirm Payment
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaCircle, FaAddressCard } from "react-icons/fa";
import { InfoIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import {
  useCreateBuyProductsMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/api/baseApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

export default function PaymentForm() {
  const { register, handleSubmit, control, watch } = useForm();
  const selectedDate = watch("expirationDate");
  const [createBuyProducts, { isLoading }] = useCreateBuyProductsMutation();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  console.log(postId);

  const onSubmit = async (data: any) => {
    const expirationDate = new Date(data.expirationDate);
    const expMonth = expirationDate.getMonth() + 1; // 0-based month
    const expYear = expirationDate.getFullYear();

    // Payload for creating payment method
    const payload = new URLSearchParams({
      "card[number]": data.cardNumber,
      "card[exp_month]": expMonth.toString(),
      "card[exp_year]": expYear.toString(),
      "card[cvc]": data.securityCode,
      type: "card",
    });

    console.log(data);

    try {
      // Step 1: Create a payment method
      const paymentMethodResponse = await axios.post(
        "https://api.stripe.com/v1/payment_methods",
        payload,
        {
          headers: {
            Authorization: `Bearer pk_test_51Qd3W6LFJ88ap2ZLjvXQPNdSPrVfXH1hRATqdsLborMexP99MbU21NOrzMsxg0dJG2lC6gYYWSsI3OKXG19I5vLK00HuX6Tybx`, // Replace with your Stripe Secret Key
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const paymentMethodId = paymentMethodResponse?.data?.id;
      console.log("Payment Method Response:", paymentMethodResponse);
      console.log(paymentMethodId);

      // Step 2: Confirm the payment intent
      const paymentBuyProductsResponse = await createBuyProducts({
        postId,
        paymentMethodId,
      }).unwrap();
      console.log(paymentBuyProductsResponse);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during payment process:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-90px)] text-black">
      <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <Button
          type="submit"
          className="h-12 text-lg bg-gray-200 text-black mb-6 px-4 flex gap-3"
        >
          <FaCircle />
          Card
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-sm text-muted-foreground font-medium">
              Card number
            </label>
            <div className="relative">
              <Input
                {...register("cardNumber")}
                type="text"
                placeholder="4242 4242 4242 4242"
                className="h-12 pr-12"
              />
              <FaAddressCard className="absolute right-4 top-1/2 -translate-y-1/2 text-black" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-medium">
                Expiration date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-left font-normal bg-white"
                  >
                    {selectedDate ? (
                      <span>
                        {(selectedDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}{" "}
                        / {selectedDate.getFullYear()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">MM / YY</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <Controller
                    name="expirationDate"
                    control={control}
                    defaultValue={
                      new Date(new Date().getFullYear(), new Date().getMonth())
                    }
                    render={({ field }) => (
                      <div className="space-y-4">
                        {/* Month Selector */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Month
                          </label>
                          <select
                            value={
                              field.value?.getMonth() + 1 ||
                              new Date().getMonth() + 1
                            }
                            onChange={(e) => {
                              const newMonth = parseInt(e.target.value, 10) - 1;
                              field.onChange(
                                new Date(field.value.getFullYear(), newMonth, 1)
                              );
                            }}
                            className="block w-full border rounded-md p-2"
                          >
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", {
                                  month: "short",
                                })}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Year Selector */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Year
                          </label>
                          <select
                            value={
                              field.value?.getFullYear() ||
                              new Date().getFullYear()
                            }
                            onChange={(e) => {
                              const newYear = parseInt(e.target.value, 10);
                              field.onChange(
                                new Date(newYear, field.value.getMonth(), 1)
                              );
                            }}
                            className="block w-full border rounded-md p-2"
                          >
                            {Array.from(
                              { length: 10 },
                              (_, i) => new Date().getFullYear() + i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-medium">
                Security code
              </label>
              <div className="relative">
                <Input
                  {...register("securityCode")}
                  type="text"
                  placeholder="CVC"
                  className="h-12 pr-10"
                />
                <InfoIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-black text-white"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
        </form>
      </div>
    </div>
  );
}
