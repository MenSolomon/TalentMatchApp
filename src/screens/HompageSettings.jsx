import React from "react";
import PlayerDetailsMenuTab from "../components/Tabs/SettingsTab";

function HompageSettings() {
  const menuLabelArray = [
    "Profile",
    "Notifications",
    "Security",
    "Billing",
    "Support",
  ];
  return (
    <>
      <div className="md:w-[100%] md:h-[100%]">
        {/* style={{ background: "pink" }} */}
        <PlayerDetailsMenuTab PlayerTabItemsArray={menuLabelArray} />
      </div>
    </>
  );
}

export default HompageSettings;
