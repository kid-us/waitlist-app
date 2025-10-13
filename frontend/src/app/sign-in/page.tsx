"use client";

import { useState } from "react";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, House, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/dist/client/components/navigation";
import { toast } from "sonner";
import axios from "axios";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // On Submit

  const onSubmit = async (values: LoginValues) => {
    try {
      const loginData = {
        email: values.email,
        password: values.password,
      };

      const res = await axios.post("/api/auth", loginData);

      // Success
      toast.success(res.data?.details?.message || "Login successful!", {
        className: "!bg-green-500 !text-white",
        duration: 8000,
        position: "bottom-center",
      });

      router.push("/admin");
    } catch (error: any) {
      // Error
      toast.error(
        error.response?.data?.details?.message || "Invalid email or password",
        {
          className: "!bg-red-500 !text-white",
          duration: 8000,
          position: "bottom-center",
        }
      );
    }
  };

  return (
    <div
      className={`font-sans flex items-center justify-center min-h-screen relative`}
    >
      {/* Return back to Home */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center space-x-1 text-primary"
      >
        <House size={20} />
        <p>Home</p>
      </Link>

      <div className={`md:max-w-sm w-[90%] p-8 rounded-lg border`}>
        <h2 className="text-3xl text-center font-semibold">
          Sign in to Wait-list
        </h2>
        <div className="flex justify-center">
          <p className="w-60 mb-8 text-zinc-500 text-sm text-center mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jondoe@gmail.com"
                      {...field}
                      className="border border-border h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password with Show/Hide */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs mt-3">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border border-border h-10 pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={`absolute inset-y-0 right-3 flex items-center text-primary`}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`w-full h-11 mt-5`}
            >
              {isSubmitting ? <Loader className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
