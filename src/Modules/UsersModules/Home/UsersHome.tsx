import React from "react";
import UsersNavBar from "../UsersNavBar/UsersNavBar";
import FirstADS from "./FirstADS";
import SwiperADS from "./SwiperADS";
import ExploreSec from "../../Shared/ExploreSec/ExploreSec";

export default function UsersHome() {
  return (
    <>
      <UsersNavBar />
      <FirstADS/>
      <SwiperADS/>
      <ExploreSec />
    </>
  );
}
