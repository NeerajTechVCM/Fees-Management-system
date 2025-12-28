import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { Progress, Spinner } from "@chakra-ui/react";

export function SignUpForm({ className, ...props }) {
  const [auth, setAuth] = useAuth();
  const [imageLoader,setImageLoader] = useState(false)
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  function inputHandle(e) {
    const a = e.target.name;
    const b = e.target.value;
    setFormData(() => {
      return {
        ...formData, [a]: b,
      }

    })

  }

  const handleFileChange = async (e) => {
setImageLoader(true)
    let img = e.target.files[0];
    // setSelectedFile(event.target.files[0])
    try {
      const formData = new FormData()
      console.log(img)

      formData.append('file', img)
      formData.append('upload_preset', 'Fees management')
      formData.append('cloud_name', 'dbggewejk')
      console.log(formData)
      const result = await fetch('https://api.cloudinary.com/v1_1/dbggewejk/image/upload', {
        method: "POST",
        // mode: 'no-cors',

        body: (formData)
        // credentials: 'include',
      });
      const data = await result.json();
      console.log(data.url)
      setImage(data.url)
      setImageLoader(false)


    } catch (error) {

    }

  }
  async function handleSubmit(e) {
    e.preventDefault();
setLoading(true)

    const result = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ formData, image }),
      credentials: 'include'

    });
    const data = await result.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth(data)
      setLoading(false)
      navigate("/");
      toast.success(data.message)

    } else {

      toast.error(data.message)
      setLoading(false)

    }
    setFormData({
      name: "",
      email: "",
      password: "",
    })
  }


  return (
    <>
      <Toaster />
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit} >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-balance text-muted-foreground">
                    Sign up to start using your  account
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name={"email"}
                    value={formData.email}
                    onChange={inputHandle}
                
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    name={"name"}
                    value={formData.name}
                    onChange={inputHandle}
              
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile">Profile</Label>
                  <Input
                    id="profile"
                    type="file"
                    onChange={handleFileChange}


                  />
                  {
                    imageLoader? <Progress size='xs' isIndeterminate colorScheme='black'/>:""
                  }
                 
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    name={"password"}
                    value={formData.password}
                    onChange={inputHandle}
                
                  />
                </div>

                <Button type="submit" className="w-full">
                  {
                    loading?<Spinner color='red.500' />:" Sign Up"
                  }
                 
                </Button>
                <div className="text-center text-sm mt-4">
                  <span>Already have an account? </span>
                  <a href="/login" className="underline underline-offset-4">
                    Login here
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