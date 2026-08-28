import { useState } from "react";
import iconLayers from "@/assets/odicci/template-library/sidebar/layers.svg";
import iconTrendingUp from "@/assets/odicci/template-library/sidebar/trending-up.svg";
import iconFileText from "@/assets/odicci/template-library/sidebar/file-text.svg";
import iconImage from "@/assets/odicci/template-library/sidebar/image.svg";
import iconMail from "@/assets/odicci/template-library/sidebar/mail.svg";
import iconDatabase from "@/assets/odicci/template-library/sidebar/database.svg";
import iconBookOpen from "@/assets/odicci/template-library/sidebar/book-open.svg";
import iconShare2 from "@/assets/odicci/template-library/sidebar/share-2.svg";
import iconGitBranch from "@/assets/odicci/template-library/sidebar/git-branch.svg";
import iconGauge from "@/assets/odicci/template-library/sidebar/gauge.svg";
import iconSettings from "@/assets/odicci/template-library/sidebar/settings.svg";

type NavId =
  | "layers"
  | "reporting"
  | "folders"
  | "assets"
  | "mail"
  | "database"
  | "docs"
  | "share"
  | "workflows"
  | "dashboard"
  | "settings";

const TOP_NAV: { id: NavId; label: string; icon: string }[] = [
  { id: "layers", label: "Experiences", icon: iconLayers },
  { id: "reporting", label: "Reporting", icon: iconTrendingUp },
  { id: "folders", label: "Folders", icon: iconFileText },
  { id: "assets", label: "Assets", icon: iconImage },
  { id: "mail", label: "Inbox", icon: iconMail },
  { id: "database", label: "Data", icon: iconDatabase },
];

const BOTTOM_NAV: { id: NavId; label: string; icon: string }[] = [
  { id: "docs", label: "Docs", icon: iconBookOpen },
  { id: "share", label: "Share", icon: iconShare2 },
  { id: "workflows", label: "Workflows", icon: iconGitBranch },
  { id: "dashboard", label: "Dashboard", icon: iconGauge },
  { id: "settings", label: "Settings", icon: iconSettings },
];

/**
 * Odicci app sidebar — Figma 917:35696
 * Icon rail with experiences, reporting, folders, settings, etc.
 */
export function OdicciAppSidebar({
  activeId = "layers",
  onSelect,
}: {
  activeId?: NavId;
  onSelect?: (id: NavId) => void;
}) {
  const [active, setActive] = useState<NavId>(activeId);

  const select = (id: NavId) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <aside
      className="flex h-full w-[72px] shrink-0 flex-col items-center justify-between border-r border-[#e2e8f0] bg-[#f8fafc] py-6"
      aria-label="App navigation"
    >
      <div className="flex w-full flex-col items-center gap-4">
        {TOP_NAV.map((item) => (
          <SidebarNavButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={active === item.id}
            onClick={() => select(item.id)}
          />
        ))}
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        <div className="h-px w-12 bg-[#e2e8f0]" aria-hidden />
        <div className="flex w-full flex-col items-center gap-4">
          {BOTTOM_NAV.map((item) => (
            <SidebarNavButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={active === item.id}
              onClick={() => select(item.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function SidebarNavButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`flex size-12 shrink-0 items-center justify-center rounded-lg transition ${
        active ? "bg-[#eef2ff]" : "bg-transparent hover:bg-[#eef2ff]/70"
      }`}
    >
      <img
        alt=""
        src={icon}
        className={`size-[22px] ${active ? "opacity-100" : "opacity-70"}`}
        draggable={false}
      />
    </button>
  );
}
