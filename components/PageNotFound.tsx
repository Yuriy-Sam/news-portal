import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className=" w-full px-3">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        <Link className=" underline" href="/">
          go home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
