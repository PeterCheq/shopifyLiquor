import { Loader } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader className="h-32 w-32 animate-spin text-emerald-600" />
    </div>
  );
}

export default loading;
