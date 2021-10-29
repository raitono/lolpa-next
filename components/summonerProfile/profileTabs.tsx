interface ProfileTabsProps {
  summonerName: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ summonerName }: ProfileTabsProps) => {
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tab: HTMLButtonElement = e.target as HTMLButtonElement;
    const activeTab: HTMLButtonElement | null = document.querySelector(".tab.active");
    if (activeTab) {
      activeTab.classList.remove("active", "border-l", "border-t", "border-r", "rounded-t", "-mb-px");
      activeTab.classList.add("text-blue-400");
    }

    tab.classList.remove("text-blue-400");
    tab.classList.add("active", "border-l", "border-t", "border-r", "rounded-t", "-mb-px");
  };

  return (
    <>
      <div className="p-5 text-3xl">
        <ul className="list-reset flex justify-center border-b">
          <li className="mr-1">
            <button id="lp" onClick={handleTabClick} className="tab bg-white inline-block py-2 px-4 text-blue-400 font-semibold">LP Graphs</button>
          </li>
          <li className="mr-1">
            <button id="matches" onClick={handleTabClick} className="tab bg-white inline-block py-2 px-4 font-semibold active -mb-px border-l border-t border-r rounded-t">Matches</button>
          </li>
          <li className="mr-1">
            <button id="tab3" onClick={handleTabClick} className="tab bg-white inline-block py-2 px-4 text-blue-400 font-semibold">Tab 3</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProfileTabs;