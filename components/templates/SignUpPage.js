import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Toaster , toast } from "react-hot-toast";


const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        if(status === "authenticated"){
            router.push("/");
        }
    }, [status]);

    const signupHandler = async () => {
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (data.status === 201) {
                toast.success("Account created successfully!");
                router.push("/signin");
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Failed to create account. Please try again.");
        }
    };



    return (<>
        <div className="signin-form">
            <h3 className="">Registration Form</h3>
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signupHandler}>Sign Up</button>
            <div>
                <p className=""> Have an account ?</p>
                
                <Link href="/signin">Sign In</Link>
            </div>
            
        </div>
        <Toaster/>
        </>
    )
}

export default SignUpPage;
