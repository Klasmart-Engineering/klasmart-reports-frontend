const authUrl = `https://auth.alpha.kidsloop.net`

interface RedirectToAuthOptions {
  withParams?: boolean;
}

export const redirectToAuth = (options?: RedirectToAuthOptions) => {
  const params = new URLSearchParams({
      continue: options?.withParams ? window.location.href : window.location.origin,
  });
  const redirectURL = new URL(`${authUrl}logout?${params.toString()}`);
  window.location.href = redirectURL.href;
};
