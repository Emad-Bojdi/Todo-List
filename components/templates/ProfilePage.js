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
                if (result.data.name) setName(result.data.name);
                if (result.data.lastName) setLastName(result.data.lastName);
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
                setData(result.data);
                setPassword("");
                toast.success("Profile created successfully!");
            } else {
                toast.error(result.message || "Failed to create profile");
            }
        } catch (error) {
            console.error("Profile creation error:", error);
            toast.error("Failed to create profile");
        }
    }

    const editHandler = async () => {
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                body: JSON.stringify({ name, lastName, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const response = await res.json();
            if (response.status === "success") {
                setData(response.data);
                setPassword("");
                toast.success("Profile updated successfully!");
            } else {
                toast.error(response.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = data?.name || data?.lastName ? editHandler : submitHandler;

    return (
        <div className="profile-form">
            <h2>
                <CgProfile />
                Profile
            </h2>

            <ProfileForm
                data={data}
                name={name}
                lastName={lastName}
                password={password}
                setName={setName}
                setLastName={setLastName}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                isEdit={!!(data?.name || data?.lastName)}
            />

            <ToastContainer />
        </div>
    );
}

export default ProfilePage;
