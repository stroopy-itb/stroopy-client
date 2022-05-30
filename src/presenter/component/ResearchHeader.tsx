import { Research, ResearchToken, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import { ResearchSetupInfo } from ".";

export default function ResearchHeader(props: {
  research?: Research;
  researchToken?: ResearchToken;
  user?: User;
  tokenExpired: boolean;
}): JSX.Element {
  const { research, researchToken, user, tokenExpired } = props;

  return (
    <div className="grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-center text-3xl font-bold text-gray-100">
        Detail Penelitian
      </h1>
      <h3 className="text-center text-lg text-gray-100">ID: {research?.id}</h3>
      <div className="grid grid-flow-row lg:grid-flow-col gap-10 w-full">
        <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Token Grup
                </td>
                <td className="py-1 px-2 border-b-2 border-black">Dibuat</td>
                <td className="py-1 px-2 border-b-2 border-black">Diupdate</td>
              </tr>
            </thead>
            <tbody>
              <tr>
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
        <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Token Penelitian
                </td>
                <td className="py-1 px-2 border-b-2 border-black">
                  Kadaluarsa
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">{researchToken?.token}</td>
                <td className={`py-1 px-2 ${tokenExpired ? "text-red" : ""}`}>
                  {new Date(researchToken?.expiredAt || "").toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {user?.role !== UserRole.Researcher ? (
          <div>
            <h3 className="text-lg font-bold text-gray-100">Peneliti</h3>
            <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
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
      <h3 className="text-lg font-bold text-gray-100">Pengaturan Penelitian</h3>
      <ResearchSetupInfo
        research={research}
        user={user}
        tokenExpired={tokenExpired}
      />
    </div>
  );
}
