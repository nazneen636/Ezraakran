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
import { useCreatePaymentIntentMutation } from "@/redux/api/baseApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// interface HTMLAttributes {
//   cardNumber: string;
// }

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const selectedDate = watch("expirationDate");
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const router = useRouter();
  const user = useSelector(selectUser);
  const userId = user?.user?.id;

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
      // Step 1: Create a payment intent
      const paymentIntentResponse = await createPaymentIntent({
        userId,
      }).unwrap();
      const paymentIntentId = paymentIntentResponse?.data?.id;
      console.log(paymentIntentId); // Assuming the ID is returned here
      console.log("Payment Intent Response:", paymentIntentResponse);

      // Step 2: Create the payment method
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

      const paymentMethodId = paymentMethodResponse.data.id;
      console.log("Payment Method Response:", paymentMethodResponse);

      // Step 3: Confirm the payment intent
      const confirmationResponse = await axios.post(
        `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
        new URLSearchParams({
          payment_method: paymentMethodId,
        }),
        {
          headers: {
            Authorization: `Bearer sk_test_51Qd3W6LFJ88ap2ZL5OnkDERytNirnaLc2V7jk8TnEClx0Oeyu9jIuq0PGMT6jlmSBrAGER8jRquizE5moyx5yrhd00lttGvEEz`, // Replace with Secret Key
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Confirmation Response:", confirmationResponse.data);
      if (confirmationResponse?.data?.status === "succeeded") {
        toast.success("Subscription Payment successful!");
        router.replace("/");
      }
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
                type="text" // Use type="text" to allow input formatting
                {...register("cardNumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^[0-9]{16}$/, // Only allows exactly 16 digits
                    message: "Card number must be exactly 16 digits",
                  },
                  maxLength: 16, // Limits the input to 16 digits
                })}
                placeholder="0000 0000 0000 0000"
                className="h-12 pr-12"
                onInput={(e) => {
                  // Prevent entering more than 16 digits
                  const target = e.target as HTMLInputElement;
                  if (target.value.length > 16) {
                    target.value = target.value.slice(0, 16);
                  }
                }}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red mt-1">
                  {errors.cardNumber.message as string}
                </p>
              )}
              {/* <Input
                {...register("cardNumber")}
                type="text"
                placeholder="4242 4242 4242 4242"
                className="h-12 pr-12"
              /> */}
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
            {isLoading ? "Processing..." : "Pay £2"}
          </Button>
        </form>
      </div>
    </div>
  );
}
