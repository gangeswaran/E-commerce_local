import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const initialState = {
  email: "",
  password: "",
};

function AdminLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Axios login request function
  const loginAdmin = async (formData) => {
    try {
      const response = await axios.post("/api/admin/login", formData);
      return response.data;
    } catch (error) {
      console.error("Login Error: ", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  function onSubmit(event) {
    event.preventDefault();

    loginAdmin(formData).then((data) => {
      if (data?.success) {
        toast({
          title: data?.message,
        });
      } else {
        toast({
          title: data?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AdminLogin;
