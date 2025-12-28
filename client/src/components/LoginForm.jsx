import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useCourses } from "@/context/CourseContext";
import { useStudents } from "@/context/StudentContext";
import { usePayments } from "@/context/PaymentContext";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";

export function LoginForm({ className, ...props }) {
  const [auth, setAuth] = useAuth();
  const { fetchCourses } = useCourses();
  const { fetchStudents } = useStudents();
  const { fetchPayments } = usePayments();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function inputHandle(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await result.json();
      console.log(data);

      if (data.success) {
        // Update auth context
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);

        // Option 2: Fetch dashboard data immediately after login
        await Promise.all([fetchCourses(), fetchStudents(), fetchPayments()]);

        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
      setFormData({ email: "", password: "" });
    }
  }

  return (
    <>
      <Toaster />
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={inputHandle}
                    placeholder="m@example.com"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={inputHandle}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {loading ? <Spinner color="red.500" /> : " Login"}
                </Button>

                <div className="text-center text-sm mt-4">
                  <span>Don't have an account? </span>
                  <a href="/signup" className="underline underline-offset-4">
                    SignUp here
                  </a>
                </div>
              </div>
            </form>

            <div className="relative hidden bg-muted md:block">
              <img
                src="https://th.bing.com/th/id/OIP.KzbuL39qFxMbehzTVijJRgHaHa?w=2560&h=2560&rs=1&pid=ImgDetMain"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}