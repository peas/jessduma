// Every internal link goes through here: the site lives under /jessduma/ on GitHub Pages.
export const u = (path = "") => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
