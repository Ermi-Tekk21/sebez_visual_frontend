import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Show from "../../../public/assets/icons/show.svg";
import Hide from "../../../public/assets/icons/hide.svg";
import Image from "next/image";
import SingleImageUpload from "./uploadSingleImage"

type User = {
  _id: string;
  name: string;
  email: string;
  address: string;
  role: string;
  password: string;
  profileImageUrl: string;
};

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  handleEditProfile: (user: User) => void;
  userData: User;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  onClose,
  handleEditProfile,
  userData,
}) => {
  if (!isOpen) return null;
  const [name, setName] = useState<string>(userData.name);
  const [email, setEmail] = useState<string>(userData.email);
  const [address, setAddress] = useState<string>(userData.address);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(userData.profileImageUrl);
  const [password, setPassword] = useState<string>(userData.password);
  const [showPassword, setShowPassword] = useState(false);

const handleProfileImageChange = async ( changedProfileImageUrl: string) => {
    setProfileImageUrl(changedProfileImageUrl);    
}

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setAddress(userData.address);
    setPassword(userData.password);
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      ...userData,
      name,
      email,
      address,
      password,
      profileImageUrl,
    };

    handleEditProfile(updatedUser);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed opacity-90 inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="sm:w-3/4 bg-white shadow-lg rounded-lg p-10 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={onClose}
        >
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.56-7.288L10.325 52.965C-1.45 41.121-1.45 22.6 10.325 10.756s30.792-11.774 42.551 0L309.59 269.118c11.774 11.844 11.774 30.973 0 42.817a30.369 30.369 0 0 1-21.69 6.648z" />
        </svg>

        <h2 className="text-xl font-bold mb-8">Edit Your Profile</h2>
        <div className="flex gap-6">
          <div className="flex flex-col justify-center text-slate-50 hover:text-white rounded-md w-2/4 bg-indigo-950">
            <SingleImageUpload
            handleProfileImageChange={handleProfileImageChange} 
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-5">

              <div className="flex flex-col gap-10">
                <div className="flex gap-20">
                  <div className="flex flex-col gap-8">
                    <div className="form-group">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="form-group">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address:
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password:
                      </label>

                      <div className="relative mt-1 w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="********"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-indigo-500 focus:outline-none"
                        >
                          {showPassword ? (
                            <Image
                              src={Hide}
                              alt="User Tag"
                              className="text-white z-0"
                              style={{ width: "17px", height: "17px" }}
                            />
                          ) : (
                            <Image
                              src={Show}
                              alt="User Tag"
                              className="text-white z-0"
                              style={{ width: "17px", height: "17px" }}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-900 hover:bg-indigo-950 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
