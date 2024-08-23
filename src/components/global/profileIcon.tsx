"use client";

import Image from "next/image";
import Profile from "../../../public/assets/icons/profile.svg";
import Link from "next/link";




const ProfileIcon: React.FC = () => {


  return (
    <main>
      <Link href="/user/Profile">
        <Image src={Profile} alt="profile" width={30} height={30}  className="bg-white p-1 rounded-full"/>
      </Link>
    </main>
  );
};

export default ProfileIcon;
