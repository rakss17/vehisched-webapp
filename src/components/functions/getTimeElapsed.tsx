export function getTimeElapsed(created_at: string) {
  const now = new Date();
  const createdAtDate = new Date(created_at);

  let years = now.getFullYear() - createdAtDate.getFullYear();
  let months = now.getMonth() - createdAtDate.getMonth();
  let weeks = Math.floor(
    (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  let days =
    Math.floor(
      (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24)
    ) % 7;
  let hours =
    Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60)) %
    24;
  let minutes =
    Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60)) % 60;
  let seconds =
    Math.floor((now.getTime() - createdAtDate.getTime()) / 1000) % 60;

  if (
    now.getMonth() < createdAtDate.getMonth() ||
    (now.getMonth() == createdAtDate.getMonth() &&
      now.getDate() < createdAtDate.getDate())
  ) {
    years--;
  }
  if (now.getDate() < createdAtDate.getDate()) {
    months--;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  if (hours === 24) {
    hours = 0;
    days++;
  }
  if (days === 7) {
    days = 0;
    weeks++;
  }
  if (months === 12) {
    months = 0;
    years++;
  }

  let timeElapsed = "";
  if (years > 0) {
    timeElapsed += `${years} year${years > 1 ? "s" : ""} `;
  }
  if (months > 0) {
    timeElapsed += `${months} month${months > 1 ? "s" : ""} `;
  }
  if (weeks > 0) {
    timeElapsed += `${weeks} week${weeks > 1 ? "s" : ""} `;
  }
  if (days > 0) {
    timeElapsed += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    timeElapsed += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    timeElapsed += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }
  if (seconds > 0 && minutes < 60) {
    timeElapsed += `${seconds} second${seconds > 1 ? "s" : ""} `;
  }

  return timeElapsed.trim();
}
