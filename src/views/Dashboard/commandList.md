| Commands        | Description           | Requirements  |
| ------------- |-------------| -----|
| `ban <playername> [reason]`     | Blacklists the name playername from the server so that they can no longer connect. Note: Bans supersede any whitelisting in place. | Always succeeds. |
| `ban-ip <ip-address | playername>`     | Blacklists an IP address so that all subsequent connecti.ons from it are rejected. | ip-address must be valid orplayername must be online. |
| `banlist [ips]` | Displays the banlist. To display banned IP addresses, use the command 'banlist ips' | Always succeeds. |
| `deop <playername>` | Revokes a player's operator status. | Always succeeds. |
| `kick <playername>` [reason]` | Forcibly disconnects playername from the server, displaying an optionalreason to them. | Playername must be online. |
| `list` | Shows the names of all currently-connected players (the same can be achieved when pressing tab) | Always succeeds, even in a command block. |
| `op <playername>` | Grants playername operator status on the server.	 | Always succeeds. |
| `pardon <playername>` | Removes playername from the blacklist, allowing them to connect again.	 | Always succeeds. |
| `pardon >` | Removes ip-address from the IP blacklist, allowing players from that IP address to connect to the server.	 | ip-address must be valid. |
| `save-all` | Forces the server to write all pending changes to the world to disk.	 | Always succeeds. |
| `save-off` | Disables the server writing to the world files. All changes will temporarily be queued.	 | Always succeeds.|
| `save-on` | Enables the server writing to the world files. This is the default behavior.	  | Always succeeds.|
| `stop` | Gracefully shuts down the server.	 | Always succeeds.|
| `whitelist <add | remove> <playername>` | Adds or removes playername from the whitelist.	 | Always succeeds.|
| `whitelist list` | Displays all players in the whitelist. | Always succeeds.|
| `whitelist <on | off>` | Enables/disables the server's use of a whitelist. Note: Server ops will alwaysbe able to connect when the whitelist is active, even if their names do not appear in the whitelist. | Always succeeds.|
| `whitelist reload` | Reloads the list of playernames in white-list.txt from disk (used when white-list.txt has been modified outside of Minecraft).	 | Always succeeds.|
