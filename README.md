# Piaomiao Xiyou Flash Game Resources

Resource collection from the Flash web game "Piaomiao Xiyou" (飘渺西游).

## Repository Structure

```
├── swf/
│   ├── core/                    # Core SWF files
│   │   ├── Loading.swf          # Game loader (11KB)
│   │   ├── Loading_uncompressed.swf
│   │   ├── PmxyGame.swf         # Game entry (223KB)
│   │   └── PmxyGame_uncompressed.swf
│   ├── shared-library/          # Shared library
│   │   └── ShareLib_5.5.3.swf   # Shared library (1.3MB)
│   ├── game-module/             # Game module (XOR encrypted)
│   │   ├── tangseng_5.5.1.swf   # v5.5.1 (18MB)
│   │   ├── tangseng_5.5.3.swf   # v5.5.3 (18MB)
│   │   └── tangseng_5.5.4.swf   # v5.5.4 (18MB)
│   ├── game-module-decrypted/   # Game module (decrypted)
│   │   ├── tangseng_5.5.1.swf   # v5.5.1 (18MB)
│   │   ├── tangseng_5.5.3.swf   # v5.5.3 (18MB)
│   │   └── tangseng_5.5.4.swf   # v5.5.4 (18MB)
│   └── loading/                 # Loading related
│       ├── wooduan_loading.swf  # Loading animation (27KB)
│       └── tangseng_loader_2.0.3.jpg
├── images/
│   ├── extracted/               # Images extracted from tangseng.swf
│   ├── microclient/             # Micro-client UI images
│   └── login/                   # Login screen images
├── website/                     # Original website files
├── config/                      # Configuration files
├── scripts/                     # Tool scripts
└── docs/                        # Documentation
```

## Game Loading Chain

Loading.swf → Config.xml → ShareLib.swf → Socket Login → PmxyGame.swf → tangseng.swf → /res/ resources

## Encryption

The game module tangseng.swf uses XOR encryption starting at byte offset 9473, XORed with value 2.

## Server Info

- Login Server: ng1.wan5d.com:9072
- Game Server: s1.wan5d.com
- Game Version: 5.5.3
- Loading Version: 0.2.9
- Pre Version: 2.0.3

## License

This repository is for archival and research purposes only.
