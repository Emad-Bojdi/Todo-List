import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";


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

    const handleSignUp = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(data.status === "success") {
            router.push("/signin");
        }
    }



    return (
        <div className="signin-form">
            <h3 className="">Registration Form</h3>
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <div >
                <p className=""> Have an account?</p>
                <Link href="/signin">Sign In</Link>
            </div>
        </div>
    )
}

export default SignUpPage;
