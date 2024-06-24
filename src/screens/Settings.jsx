import PlayerDetailsMenuTab from "../components/Tabs/SettingsTab";

function Settings() {
  const menuLabelArray = [
    "Profile",
    "Notifications",
    "Security",
    "Billing",
    "Support",
    "Legal",
  ];
  return (
    <>
      <div className="lg:w-[100%] md:w-[100%] md:h-[100%]  sm:w-[100%] sm:h-[100%] primaryTextColor">
        {/* style={{ background: "pink" }} */}
        <PlayerDetailsMenuTab PlayerTabItemsArray={menuLabelArray} />
      </div>
    </>
  );
}

export default Settings;
