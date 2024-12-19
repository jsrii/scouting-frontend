import { ReactNode } from "react";

interface NameHeaderProp {
  children: ReactNode;
}

function NameHeader({ children }: NameHeaderProp) {
  return (
    <h1 className="mt-5 mb-10 text-6xl font-bold font-sans flex">
      Welcome,&nbsp;
      <div className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        {children}.
      </div>
    </h1>
  );
}

export default NameHeader;
