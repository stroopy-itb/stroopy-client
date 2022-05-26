import React from "react";
import { UserProfile } from "../../domain/model";
import { translateInstitutionType } from "../utils";

export default function UserProfileInfo(props: {
  profile?: UserProfile;
}): JSX.Element {
  const { profile } = props;

  return (
    <div className="grid grid-flow-row gap-5 justify-items-around content-stretch">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <h3 className="py-3 text-lg font-bold">Nama</h3>
          <p className="py-3 text-md">{profile?.name}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">No. Identitas</h3>
          <p className="py-3 text-md">{profile?.identityNumber}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">E-Mail</h3>
          <p className="py-3 text-md">{profile?.email}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">No. Telepon</h3>
          <p className="py-3 text-md">{profile?.phone}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Tanggal Lahir</h3>
          <p className="py-3 text-md">{profile?.dateOfBirth}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Gender</h3>
          <p className="py-3 text-md">{profile?.gender}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Suku</h3>
          <p className="py-3 text-md">{profile?.ethnicGroup}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Pekerjaan</h3>
          <p className="py-3 text-md">{profile?.job}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Tipe Institusi</h3>
          <p className="py-3 text-md">{translateInstitutionType(profile?.institutionType)}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Institusi</h3>
          <p className="py-3 text-md">{profile?.institution}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Fakultas</h3>
          <p className="py-3 text-md">{profile?.faculty}</p>
        </div>
        <div>
          <h3 className="py-3 text-lg font-bold">Program Studi</h3>
          <p className="py-3 text-md">{profile?.study}</p>
        </div>
      </div>
    </div>
  );
}
