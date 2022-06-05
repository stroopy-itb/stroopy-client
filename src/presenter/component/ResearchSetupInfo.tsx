import { useState } from "react";
import { Research, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import ResearchSetupForm from "./ResearchSetupForm";

export default function ResearchSetupInfo(props: {
  research?: Research;
  user?: User;
  editable: boolean;
}): JSX.Element {
  const { research, user, editable } = props;

  const [setupForm, setSetupForm] = useState({
    isOpen: false,
    data: research?.researchSetup,
  });

  return (
    <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
      {!setupForm.isOpen ? (
        research?.researchSetup ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Pengulangan
                </td>
                <td className="py-1 px-2 border-b-2 border-black">
                  Waktu Perulangan (Detik)
                </td>
                <td className="py-1 px-2 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">{research.researchSetup.rounds}</td>
                <td className="py-1 px-2">{research.researchSetup.timeout}</td>
                <td className="py-1 px-2 text-right">
                  {user?.role === UserRole.Researcher && editable ? (
                    <button
                      className="button button-sm button-blue p-3"
                      onClick={() =>
                        setSetupForm({
                          isOpen: true,
                          data: research?.researchSetup,
                        })
                      }
                    >
                      Update
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ) : user?.role === UserRole.Researcher && editable ? (
          <button
            className="button button-md button-red w-full"
            onClick={() =>
              setSetupForm({ isOpen: true, data: research?.researchSetup })
            }
          >
            Pengaturan tidak ditemukan. Klik untuk membuat pengaturan
          </button>
        ) : (
          <h4 className="text-center text-red font-bold p-4">
            Pengaturan tidak ditemukan
          </h4>
        )
      ) : (
        <ResearchSetupForm
          data={research}
          afterSubmit={() => setSetupForm({ ...setupForm, isOpen: false })}
        />
      )}
    </div>
  );
}
