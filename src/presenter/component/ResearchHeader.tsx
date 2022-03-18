import { Research, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import { ResearchSetupInfo } from ".";

export default function ResearchHeader(props: {
  research?: Research;
  user?: User;
}): JSX.Element {
  const { research, user } = props;

  return (
    <div className="grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Detail Penelitian</h1>
      <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-2">
        <table className="table-auto w-full">
          <thead>
            <tr className="font-bold">
              <td className="py-1 px-2 border-b-2 border-black">ID</td>
              <td className="py-1 px-2 border-b-2 border-black">Token Grup</td>
              <td className="py-1 px-2 border-b-2 border-black">Dibuat</td>
              <td className="py-1 px-2 border-b-2 border-black">Diupdate</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-2">{research?.id}</td>
              <td className="py-1 px-2">{research?.groupToken}</td>
              <td className="py-1 px-2">
                {new Date(research?.createdAt || "").toLocaleString()}
              </td>
              <td className="py-1 px-2">
                {new Date(research?.updatedAt || "").toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-flow-col gap-10 w-full">
        <div>
          <h3 className="text-lg font-bold text-white">Token Penelitian</h3>
          <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-2">
            <table className="table-auto w-full">
              <thead>
                <tr className="font-bold">
                  <td className="py-1 px-2 border-b-2 border-black">Token</td>
                  <td className="py-1 px-2 border-b-2 border-black">
                    Kadaluarsa
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 px-2">
                    {research?.researchToken?.token}
                  </td>
                  <td className="py-1 px-2">
                    {new Date(
                      research?.researchToken?.expiredAt || ""
                    ).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {user?.role !== UserRole.Researcher ? (
          <div>
            <h3 className="text-lg font-bold text-white">Peneliti</h3>
            <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-2">
              <table className="table-auto w-full">
                <thead>
                  <tr className="font-bold">
                    <td className="py-1 px-2 border-b-2 border-black">
                      Username
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 px-2">
                      {research?.researcher?.username}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <h3 className="text-lg font-bold text-white">Pengaturan Penelitian</h3>
      <ResearchSetupInfo research={research} user={user} />
    </div>
  );
}
