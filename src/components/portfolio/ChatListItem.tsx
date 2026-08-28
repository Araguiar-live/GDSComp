import fireIcon from "@/assets/crcle/fire.svg";

export type ChatMessage = {
  id: string;
  text: string;
  sentAt: string;
  fromMe: boolean;
};

export type ChatConversation = {
  id: string;
  userName: string;
  userAvatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  /** Flame / purpose status badge next to the name */
  showFlame: boolean;
  messages: ChatMessage[];
};

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

type ChatListItemProps = {
  conversation: ChatConversation;
  onSelect: (conversationId: string) => void;
};

export function ChatListItem({ conversation, onSelect }: ChatListItemProps) {
  const {
    id,
    userName,
    userAvatarUrl,
    lastMessage,
    timestamp,
    unreadCount,
    isOnline,
    showFlame,
  } = conversation;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className="flex w-full items-center justify-between border-b border-[var(--crcle-border,#e6e6e9)] p-3 text-left transition-colors duration-300 hover:bg-[var(--crcle-list-hover,rgba(255,255,255,0.03))]"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative flex shrink-0 items-end">
          <div className="relative mr-[-8px] size-[42px] shrink-0 overflow-hidden rounded-full border border-[var(--crcle-avatar-border,#f7f6f2)] transition-colors duration-300">
            <img
              alt=""
              src={userAvatarUrl}
              className="absolute inset-0 size-full object-cover object-center"
            />
          </div>
          {isOnline ? (
            <span
              className="relative size-3 shrink-0 rounded-full border-2 border-[#0fc950] bg-[var(--crcle-online-dot-fill,#020217)] transition-colors duration-300"
              aria-label="Online"
            />
          ) : (
            <span className="relative size-3 shrink-0" aria-hidden />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
          <div className="flex w-full items-center gap-1.5">
            <span
              className="truncate text-[15px] leading-[18.75px] text-[var(--crcle-fg,#f7f6f2)] transition-colors duration-300"
              style={{ fontFamily: FONT }}
            >
              {userName}
            </span>
            {showFlame ? (
              <span className="relative size-4 shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
                <img alt="" src={fireIcon} className="absolute inset-0 size-full object-contain" />
              </span>
            ) : null}
          </div>
          <p
            className="w-full truncate text-[13px] font-light leading-[16.25px] text-[var(--crcle-fg-muted,#6b7280)] transition-colors duration-300"
            style={{ fontFamily: FONT }}
          >
            {lastMessage}
          </p>
        </div>
      </div>

      <div className="flex h-[42px] w-5 shrink-0 flex-col items-end gap-1">
        <span
          className="whitespace-nowrap text-[11px] font-light leading-[1.4] text-[var(--crcle-fg-subtle,#9ca3af)] transition-colors duration-300"
          style={{ fontFamily: FONT }}
        >
          {timestamp}
        </span>
        {unreadCount > 0 ? (
          <span
            className="flex size-5 items-center justify-center rounded-full bg-[var(--crcle-badge,rgba(247,246,242,0.2))] text-[11px] text-[var(--crcle-badge-fg,#fff)] transition-colors duration-300"
            style={{ fontFamily: FONT }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </div>
    </button>
  );
}
