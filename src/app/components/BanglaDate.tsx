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
    <span className="text-xs font-semibold sm:text-sm p-2">
      {date}
    </span>
  );
};

export default BanglaDate;