import React from "react";
import axios, { AxiosError } from "axios";
import { Form, Input, Button } from "@nextui-org/react";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";



function Login() {
    const [action, setAction] = React.useState(null);
    const signIn = useSignIn();
    const navigate = useNavigate();

    const submitData = async (values: any) => {
        try {
            const response = await axios.post("http://192.168.1.40:7777/login", values);
            signIn({
                auth: {
                    token: response.data.token,
                    type: 'Bearer',
                },
                userState: {
                    "email": values.email, "avatarUrl": response.data.avatarUrl,
                    "name": response.data.name
                }
            })
            console.log(response);
            toast.success("Login Success! Welcome");
            navigate("/");
        } catch (err) {
            if (err && err instanceof AxiosError)
                toast.error(err.response?.data.message)
            else if (err && err instanceof Error)
                toast.error(err.message)

            console.log("Error: ", err);
        }
    }

    return (
        <div className="bg-[#262626] w-full h-screen p-4 flex items-center justify-center">
            <div className="bg-background  shadow-3xl self-center p-10 rounded-lg">
                <h4 className="mb-2 font-bold">Login to 7200 Scouting App</h4>
                <Form
                    className="w-full max-w-xs flex flex-col gap-4"
                    validationBehavior="native"
                    onReset={() => setAction("reset")}
                    onSubmit={(e) => {
                        e.preventDefault();
                        let data = Object.fromEntries(new FormData(e.currentTarget));
                        console.log(JSON.stringify(data));
                        console.log(data);
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
        </div>
    );
}

export { Login };