# Powers

Powers are the main feature of Palladium. They are essentially a collection of configured abilities that can be granted
to a player.
As they are datapack content, they go into `data` directory and can be reloaded by rejoining the world. The minimal
setup for a power would be:

```json title="data/<namespace>/palladium/powers/<filename>.json"
{
  "name": "Test Power",
  "icon": "minecraft:apple"
}
```
