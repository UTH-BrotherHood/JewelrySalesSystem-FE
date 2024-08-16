"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInBodyType } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";
export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignInBodyType>({
    defaultValues: {
      username: "admin",
      password: "admin",
    },
  });

  async function onSubmit(values: SignInBodyType) {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/jewelry/v1/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result.token);

      document.cookie = `token=${data.result.token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`; // Hết hạn sau 7 ngày

      toast({
        title: "Sign-in",
        description: "Sign-in success",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        description: "Sign-in error",
      });
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 border border-neutral-200 p-8 rounded-md"
      >
        <div className="flex flex-col gap-11 mt-4">
          <div className="flex gap-11">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div className="relative flex flex-col gap-2">
                  <FormItem className="flex items-center">
                    {/* <FormLabel className="w-[6rem] text-text">Email</FormLabel> */}
                    <FormControl>
                      <Input
                        className="w-[24rem] h-[3rem] rounded-sm"
                        placeholder="Input Your Username"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                </div>
              )}
            />
          </div>
          <div className="flex gap-11">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="relative flex flex-col gap-2">
                  <FormItem className="flex items-center">
                    {/* <FormLabel className="w-[6rem] text-text">
                      Password
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        className="w-[24rem] h-[3rem] rounded-sm"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="absolute top-full left-0 text-xs" />
                </div>
              )}
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <Button
              type="submit"
              className="w-full h-[2.8rem] uppercase font-bold text-white rounded-sm"
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
