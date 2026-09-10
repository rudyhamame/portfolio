# Repository invariants

## VPN tunnel is manual-only

- Never start, restart, enable, install, reconfigure, or test the WireGuard/RH VPN tunnel unless the user explicitly asks for that exact VPN action in the current request. Prior permission and general troubleshooting requests do not count.
- Do not run `rh-vpn-leak-test`, `install-rh-vpn`, `rh-vpn-control start`, `rh-vpn-control restart`, `wg-quick up`, or an equivalent command proactively. These actions can disrupt the Tailscale Funnel at `https://rh.tailb5a10d.ts.net/`.
- Read-only VPN status checks are allowed. Starting or restarting portfolio or RH application services must never implicitly start, enable, or repair the VPN tunnel.
- Keep `wg-quick@wg0.service`, `rh-vpn-dns.service`, `rh-vpn-killswitch.service`, `rh-vpn-splitroute.service`, and `rh-vpn-docker-killswitch.service` disabled at boot unless the user explicitly requests an autostart change in the current request.
