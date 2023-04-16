import user from "../User";

export function setBreakEnd(breakEnd) {
  user.lastBreakEnd = breakEnd;
}

export function timeForBreak() {
  const now = new Date();
  const timeSinceLastBreak = user.lastBreakEnd
    ? now - user.lastBreakEnd
    : now - user.clockedIn;

  return (timeSinceLastBreak >= 3 * 60 * 60 * 1000);
}
