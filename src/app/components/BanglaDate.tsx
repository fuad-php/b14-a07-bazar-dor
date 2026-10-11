"use client";

import { useState } from "react";

const BanglaDate = () => {
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date())
  );

  return (
    <span className="text-xs text-base-content/60 sm:text-sm">
      {date}
    </span>
  );
};

export default BanglaDate;