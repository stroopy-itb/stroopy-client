import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { researchMiddleware } from "../redux/middleware";
import { Stroop } from "../component";
import { Formik } from "formik";
import { AnswerRecord, ColorPair, Result } from "../../domain/model";

enum TestState {
  PENDING,
  STARTED,
  ENDED,
}

export default function StroopPractice(): JSX.Element {
  const localSetup = useSelector(
    (state: RootState) => state.research.localSetup
  );
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );

  const [pairs] = useState<ColorPair[]>(localSetup.pairs);

  const [rounds, setRounds] = useState(localSetup.rounds);

  const [roundTimeout, setRoundTimeout] = useState(localSetup.timeout);

  const { researchId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (researchId) {
      if (research) {
        setRounds(research.researchSetup.rounds);
        setRoundTimeout(research.researchSetup.timeout);
      }
      if (!research || !research.researchSetup || research.id !== researchId) {
        dispatch(researchMiddleware.getOneById({ id: researchId || "" }));
      }
    }
  }, [researchId, research, dispatch]);

  const [testState, setTestState] = useState(TestState.STARTED);
  // For Reconfigurable test setup
  // const [testState, setTestState] = useState(
  //   researchId ? TestState.STARTED : TestState.PENDING
  // );

  const [results, setResults] = useState<
    Result & { answerRecords: AnswerRecord[] }
  >({
    correct: 0,
    wrong: 0,
    rtca: 0,
    unanswered: 0,
    answerRecords: [],
  });

  switch (testState) {
    case TestState.PENDING:
      return (
        <PracticeSetup
          setup={{
            rounds,
            timeout: roundTimeout,
          }}
          handleSubmit={(values: any) => {
            setRounds(values.rounds);
            setRoundTimeout(values.timeout);
            setTestState(TestState.STARTED);
          }}
        />
      );
    case TestState.STARTED:
      return (
        <Stroop
          setup={{
            pairs: pairs,
            rounds: rounds,
            timeout: roundTimeout,
          }}
          onFinish={(results) => {
            setResults(results);
            setTestState(TestState.ENDED);
          }}
          isPractice
        />
      );
    case TestState.ENDED:
      return (
        <PracticeResult
          results={results}
          onRestart={() => setTestState(TestState.STARTED)}
          onReset={
            researchId ? undefined : () => setTestState(TestState.PENDING)
          }
        />
      );
  }
}

function PracticeSetup(props: {
  setup: { rounds: number; timeout: number };
  handleSubmit: (values: any) => void;
}) {
  const { setup, handleSubmit } = props;

  return (
    <div className="flex-grow grid gap-5 justify-items-center content-center">
      <h3 className="text-center font-bold text-xl text-gray-100">
        Edit Pengaturan Tes
      </h3>
      <Formik
        initialValues={{
          rounds: setup.rounds || 50,
          timeout: setup.timeout || 2,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <form
            className="grid gap-5 justify-items-stetch"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="rounds" className="text-black">
                Pengulangan
              </label>
              <input
                className="form-control"
                type="number"
                min={30}
                max={200}
                name="rounds"
                id="rounds"
                placeholder="Pengulangan"
                value={values.rounds}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.rounds}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="rounds" className="text-black">
                Waktu Perulangan (Detik)
              </label>
              <input
                className="form-control"
                type="number"
                min={1}
                max={3}
                step={0.01}
                name="timeout"
                id="timeout"
                placeholder="Token Grup"
                value={values.timeout}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="justify-self-center button button-md button-green"
            >
              Simpan
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

function PracticeResult(props: {
  results: Result & { answerRecords: AnswerRecord[] };
  onRestart: () => void;
  onReset?: () => void;
}) {
  const { results, onReset, onRestart } = props;

  return (
    <div className="flex-grow grid grid-flow-row gap-20 justify-items-center content-center">
      <h1 className="text-5xl text-gray-100 font-bold">Hasil</h1>
      <div className="text-gray-100 text-center grid grid-flow-row gap-2">
        <div className="grid grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold">Benar</h2>
            <h4 className="text-xl">{results.correct}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Salah</h2>
            <h4 className="text-xl">{results.wrong}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Tidak Terjawab</h2>
            <h4 className="text-xl">{results.unanswered}</h4>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">RTCA</h2>
          <h3 className="text-lg font-bold">(Right Time for Correct Answer)</h3>
          <h4 className="text-xl">{results.rtca.toPrecision(3)}</h4>
        </div>
      </div>
      <div className="h-52 overflow-y-auto text-gray-100 text-center w-full md:w-1/3">
        {results && results.answerRecords.length > 0 ? (
          <table className="w-full">
            <thead className="font-bold">
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {results.answerRecords.map((answerRecord, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{answerRecord.status}</td>
                    <td>{answerRecord.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-flow-col gap-5 justify-center">
        <button
          className="w-64 button button-xl button-neutral-outline"
          onClick={() => onRestart()}
        >
          Ulang Tes
        </button>
        {onReset ? (
          <button
            className="w-64 button button-xl button-neutral-outline"
            onClick={() => onReset()}
          >
            Atur Ulang Tes
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
