import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, Circle, Mail, User } from "lucide-react";
import { useRef } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    console.log("👉 ~ handleFileChange ~ reader:", reader);

    reader.onload = async () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-100 pt-20">
      <div className="max-w-xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-base-content/60">Your information profile</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={preview || authUser.profilePic || "/avatar.png"}
                alt={authUser.fullName}
                className="size-32 rounded-full object-cover border-2 p-1"
              />
              <button
                type="button"
                onClick={handleImageClick}
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 border-1 border-base-100/50 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
                disabled={isUpdatingProfile}
              >
                <Camera className="size-5 text-base-200" />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUpdatingProfile}
              />
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Updating..."
                : "Click the camera icon to update your profile picture."}
            </p>
          </div>

          {/* User details */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-5" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-5" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member since </span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <span>Account Status</span>
                <span>
                  <Circle className="size-4 bg-green-500 rounded-full border-0" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
