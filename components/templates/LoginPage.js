import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';

import { Toaster , toast } from 'react-hot-toast';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        if(status === "authenticated"){
            router.push("/");
        }
    }, [status]);
    const loginHandler = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        
        if(!res.error){
            toast.success("Login successfully")
            router.push("/");
        }
        if(res.status === 401){
            toast.error("Invalid credentials")
        }
    }
    return (<>
        <div className="signin-form">
            <h3 className="">Registration Form</h3>
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginHandler}>Login</button>
            <div >
                <p className=""> Create an account ?</p>
                <Link href="/signup">Sign Up</Link>
            </div>
        </div>
        <Toaster/>
        </>
    )

}

export default LoginPage;
