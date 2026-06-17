import React from "react";
import UsersNavBar from "../UsersNavBar/UsersNavBar";
import FirstADS from "./FirstADS";
import SwiperADS from "./SwiperADS";

export default function UsersHome() {
  return (
    <>
      <UsersNavBar />
      <FirstADS/>
      <SwiperADS/>
    </>
  );
}
