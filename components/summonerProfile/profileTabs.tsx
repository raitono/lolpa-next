import { useState } from "react";
import MatchList from "./tabs/matchList";

interface ProfileTabsProps {
  summonerName: string;
}

interface ProfileTabContents {
  [index: string]: JSX.Element
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ summonerName }: ProfileTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("matches");

  const tabs: ProfileTabContents = {
    "lp": <div>LP Graph</div>,
    "matches": <MatchList summonerName={summonerName} />,
    "tab3": <div>Tab 3</div>
  };

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tab: HTMLButtonElement = e.target as HTMLButtonElement;
    const activeTab: HTMLButtonElement | null = document.querySelector(".tab.active");
    if (activeTab) {
      activeTab.classList.remove("active");
    }

    tab.classList.add("active");

    setSelectedTab(tab.id);
  };

  return (
    <>
      <div className="p-3 text-3xl">
        <ul className="list-reset flex justify-center">
          <li className="mr-1">
            <button id="lp" onClick={handleTabClick} className="tab inline-block py-2 px-4 text-blue-400 font-semibold">LP Graphs</button>
          </li>
          <li className="mr-1">
            <button id="matches" onClick={handleTabClick} className="tab inline-block py-2 px-4 font-semibold active">Matches</button>
          </li>
          <li className="mr-1">
            <button id="tab3" onClick={handleTabClick} className="tab inline-block py-2 px-4 text-blue-400 font-semibold">Tab 3</button>
          </li>
        </ul>
      </div>
      <div className="container px-3">
        {tabs[selectedTab]}
      </div>
    </>
  );
}

export default ProfileTabs;