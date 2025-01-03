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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/profile");
            const result = await res.json();
            
            if (result.status === "success") {
                setData(result.data);
            } else {
                toast.error(result.message || "Failed to fetch profile");
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    }

    const submitHandler = async () => {
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({ name, lastName, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            const result = await res.json();
            
            if (result.status === "success") {
                setName("");
                setLastName("");
                setPassword("");
                setData(result.data);
                toast.success("Your information submitted successfully!");
            } else {
                toast.error(result.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-form">
            <h2>
                <CgProfile />
                Profile
            </h2>
            {data && (data.name || data.lastName) ? (
                <ProfileData data={data} />
            ) : (
                <ProfileForm 
                    name={name}
                    lastName={lastName}
                    password={password}
                    setName={setName}
                    setLastName={setLastName}
                    setPassword={setPassword}
                    submitHandler={submitHandler}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default ProfilePage;
