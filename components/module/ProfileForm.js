import { use, useEffect } from "react"


const ProfileForm = ({
    data,
    name,
    lastName,
    password,
    setName,
    setLastName,
    setPassword,
    onSubmit,
    isEdit
}) => {
    return (
        <div className="profile-form__input">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={onSubmit}>
                {isEdit ? "Update Profile" : "Create Profile"}
            </button>
        </div>
    );
};

export default ProfileForm;
