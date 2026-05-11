# Resource Map

## Flash Loading Chain

1. Browser loads index.html
2. swfobject.js embeds Loading.swf
3. Loading.swf fetches Config.xml for server info
4. Loading.swf loads ShareLib.swf (shared library with common classes)
5. Loading.swf connects to login server via Socket (ng1.wan5d.com:9072)
6. After login, PmxyGame.swf is loaded
7. PmxyGame.swf loads tangseng.swf (main game module, XOR encrypted)
8. tangseng.swf loads resources from /res/ path

## Resource Access

The /res/ directory returns 403 Forbidden for direct HTTP requests.
Resources can only be accessed when the Flash Player makes requests during game execution.

## CDN Resources

- cdnimg.wan5d.com - CDN for images
- s1.img4399.com - 4399 CDN

## Extracted Resources

From tangseng.swf (decrypted):
- PNG/JPG images - game sprites, UI elements, characters, effects
- ActionScript scripts - game logic
