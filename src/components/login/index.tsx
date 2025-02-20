import axios, { AxiosError } from "axios";
import { Form, Input, Button, Image } from "@nextui-org/react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";

function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const submitData = async (values: any) => {
    console.log();
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        values
      );
      signIn({
        auth: {
          token: response.data.token,
          type: "Bearer",
        },
        userState: {
          email: values.email,
          avatarUrl: response.data.avatarUrl,
          name: response.data.name,
        },
      });
      toast.success("Login Success! Welcome");
      navigate("/");
    } catch (err) {
      if (err && err instanceof AxiosError)
        toast.error(err.response?.data.message);
      else if (err && err instanceof Error) toast.error(err.message);
    }
  };

  return (
    <div className="bg-[#262626] w-full h-screen p-4 flex flex-col gap-2 items-center justify-center">
      <div className="bg-background  shadow-3xl self-center p-6 flex flex-col rounded-lg">
        <Image
          src={"/BantingArcticWORDMARK.png"}
          width={255}
          radius="none"
          alt="shit"
        />
      </div>
      <div className="bg-background  shadow-3xl self-center p-10 rounded-lg">
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));
            0;
            submitData(data);
          }}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            isRequired
            errorMessage="Password is empty"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>
        </Form>
      </div>
      <div className="bg-background  shadow-3xl self-center ps-3 p-2 w-[305px] flex gap-2 rounded-lg">
        <div className="text-md">Can't log in?</div>
        <Link
          isExternal
          color="primary"
          underline="hover"
          showAnchorIcon
          href="mailto:jassri.biz@gmail.com"
        >
          Contact Jas
        </Link>
      </div>
    </div>
  );
}

export { Login };
