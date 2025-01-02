import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileData from "../module/ProfileData";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.status === "success" && data.data.name && data.data.lastName) {
            setData(data.data)
        }
    }

    const submitHandler = async () => {
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({ name, lastName, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (data.status === "success") {
            setName("");
            setLastName("");
            setPassword("");
            toast.success(" Your information submitted successfully!");
        }
    }
    return (
        <div className="profile-form">
            <h2>
                <CgProfile />
                Profile </h2>
            {
                data ? <ProfileData data={data}/> : (
                    <ProfileForm name={name} lastName={lastName} password={password} setName={setName} setLastName={setLastName} setPassword={setPassword} submitHandler={submitHandler} />
                )
            }
            <ToastContainer />
        </div>
    )
}

export default ProfilePage
