// Bug log: real, shipped fixes pulled from each project's own history.
// One row per bug. Keep entries factual — this is not a feature list.
export const bugsLog = [
  // RabbitHole (MCTOSH)
  { program: 'RabbitHole', bug: 'Production build crashed on every page load ("Cannot read properties of undefined, reading \'createContext\'")', cause: 'vendor-react and the catch-all vendor chunk mutually imported each other, racing React\'s module evaluation', fix: 'Merged React into the catch-all chunk to remove the circular dependency' },
  { program: 'RabbitHole', bug: 'API backend crashed on startup whenever OPENAI_API_KEY was not set', cause: 'AI clients were constructed eagerly at import time', fix: 'Lazy-initialize the AI clients on first use' },
  { program: 'RabbitHole', bug: 'Requests from the mctosh.ca custom domain were rejected', cause: 'CORS allow-list only had the default deployment origin', fix: 'Added the custom domain to the CORS policy' },
  { program: 'RabbitHole', bug: 'API calls broke once the app was served from the custom domain', cause: 'Relative /api/* URLs assumed the app and API shared an origin', fix: 'Routed every call through an apiUrl() helper' },
  { program: 'RabbitHole', bug: 'The four-domains flow wrapped and broke its layout on narrower screens', cause: 'Flex row had no wrap/scroll behavior set', fix: 'Set nowrap with horizontal overflow scroll' },

  // RH IPTV Player
  { program: 'RH IPTV Player', bug: 'Closing the Android player left the ffmpeg transcode job running on the server', cause: 'The client tore down its own UI without telling the backend the stream lease was done', fix: 'Player close now stops that item\'s job/lease immediately' },
  { program: 'RH IPTV Player', bug: 'Browser player showed a black frame with audio playing after a server restart', cause: 'The video element reported "playing" before a real decoded frame existed', fix: 'Reveal the video only on a confirmed requestVideoFrameCallback, with a decoder-wedge watchdog' },
  { program: 'RH IPTV Player', bug: 'Watch-with-Partner sessions barely buffered for either side', cause: 'Host and partner each started their own ffmpeg job for the same item and repeatedly killed each other on poll', fix: 'One canonical job key per WWP session shared by both sides' },
  { program: 'RH IPTV Player', bug: 'Watch-with-Partner joiner froze on a muted black screen while the host kept playing', cause: 'Autoplay was blocked with no user gesture, and the partner sent its own device token to the media endpoint and got a 404', fix: 'Muted autoplay with an unmute prompt, and the partner now uses the host\'s ticket for media requests' },
  { program: 'RH IPTV Player', bug: 'A deep forward seek on Roku always fell back to a full transcode, adding 22s+ to startup', cause: 'Stream-copy\'s wait for a GOP boundary close to the seek target timed out at 8s', fix: 'Raised the GOP-close timeout to 16s' },
  { program: 'RH IPTV Player', bug: 'Live TV playback on Roku resumed far behind the live edge after a reconnect', cause: 'The channel job survived the reconnect fine, but the client always started at the manifest\'s oldest segment', fix: 'Added EXT-X-START to the manifest so playback starts near live' },
  { program: 'RH IPTV Player', bug: 'Roku Settings dropdowns silently swallowed the OK button', cause: 'They were built as a single-row LabelList, which is not a focusable group', fix: 'Replaced with a proper focusable ServerCategorySelector' },
  { program: 'RH IPTV Player', bug: 'Roku Welcome rail cards clipped English titles once Arabic UI was enabled, and the focus offset drifted after a few cards', cause: 'Title layout was never re-measured for the RTL font, and the offset formula used a hardcoded single-card width', fix: 'Recomputed title layout for the active language and switched to a real content-width offset formula' },
  { program: 'RH IPTV Player', bug: 'Roku Series/Movies/Channels grids clipped their bottom row and posters looked squashed', cause: 'The grid was laid out for two rows in a space sized for one, then a vertical-squash hack was added to force it to fit', fix: 'Reduced the grid to one row at its correct height and removed the squash' },
  { program: 'RH IPTV Player', bug: 'A VOD title returned 403 from the provider for one account', cause: 'A leftover TEST-only source line plus a stale rokuSourceId saved on that account, not an actual provider block', fix: 'Removed the TEST line and corrected the stale source id' },
  { program: 'RH IPTV Player', bug: 'Android Series/Movies/Channels pages stuttered while scrolling', cause: 'The collapsing header and bottom nav were being relaid out on every single scroll pixel', fix: 'Coalesced scroll handling with dedupe + post()-batched relayout' },

  // Noga Planner
  { program: 'Noga Planner', bug: 'Chat send route crashed for a friend pair that had never chatted before', cause: 'The route assumed a chat document already existed for the sender', fix: 'Added an ensureChatDocument step that creates the chat/user link on first send' },
  { program: 'Noga Planner', bug: 'Real-time chat and presence stopped connecting after a dependency update', cause: 'socket.io had pulled in an incompatible engine.io version', fix: 'Pinned socket.io back to the working version' },
  { program: 'Noga Planner', bug: 'Home profile picture rendered at an inconsistent, sometimes oversized size', cause: 'The picture wrapper used width/height: auto instead of the shared size variable', fix: 'Sized the wrapper from --home-profile-size with a locked aspect ratio' },
  { program: 'Noga Planner', bug: 'Gallery thumbnails overflowed their grid cell on narrow content', cause: 'The flex item had no min-width: 0, so long content pushed the cell wider than its track', fix: 'Added min-width: 0 to the gallery item' },

  // DJ Khalil
  { program: 'DJ Khalil', bug: 'Backend was unreachable through the reverse proxy after deployment', cause: 'The server was bound to a loopback/interface address the proxy and Docker network couldn\'t route to', fix: 'Rebound the server to the address the deployment topology actually needed' },
]
