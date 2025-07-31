"use client";
import Link from "next/link";
import React from "react";

function DisableDraftMode() {

  return (
    <Link
      href="/draft-mode/disabled"
      className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
    >
      Disable Draft Mode
    </Link>
  );
}

export default DisableDraftMode;
