import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserProfileForm, UserProfileInfo } from "../component";
import { RootState } from "../redux/store";

export default function UserProfile(): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.user.profile);

  const [editingProfile, setEditingProfile] = useState(profile ? false : true);

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Profil Pengguna</h1>
      <div className="justify-self-stretch bg-white rounded-2xl md:p-5">
        <div className="grid grid-flow-row gap-5 justify-items-around content-stretch">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="py-3 text-lg font-bold">Username</h3>
              <p className="py-3 text-md">{user?.username}</p>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Role</h3>
              <p className="py-3 text-md">{user?.role}</p>
            </div>
          </div>
        </div>
        {editingProfile ? (
          <UserProfileForm
            user={user}
            profile={profile}
            afterSubmit={() => setEditingProfile(false)}
          />
        ) : (
          <UserProfileInfo profile={profile} />
        )}
        {editingProfile ? (
          ""
        ) : (
          <button
            className="justify-self-center w-64 button button-action"
            onClick={() => setEditingProfile(true)}
          >
            Perbarui Profil
          </button>
        )}
      </div>
    </div>
  );
}
