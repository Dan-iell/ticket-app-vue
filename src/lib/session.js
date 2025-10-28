export const SESSION_KEY = "ticketapp_session";
export const USERS_KEY = "ticketapp_users";
export const TICKETS_KEY = "ticketapp_tickets";

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};
export const setSession = (user) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
