// Every internal link goes through here, so a base path (e.g. /jessduma/ on github.io) only changes astro.config.mjs.
export const u = (path = "") => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
