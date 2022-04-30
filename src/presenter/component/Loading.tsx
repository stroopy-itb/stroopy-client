import React from "react";

export default function Loading(props: { context?: string }): JSX.Element {
  const { context } = props;

  return (
    <div className="flex-grow flex justify-center">
      <h1 className="self-center text-3xl font-bold text-white text-center">
        Memuat{ context? ` ${context}` : "" }...
      </h1>
    </div>
  );
}