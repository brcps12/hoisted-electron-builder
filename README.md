# Hoisted Lerna Electron Builder

If you want to build without hoisting, edit lerna.json that `hoist: true` to `hoist: false`
and follow these:

```
lerna bootstrap
npm run build
```

Then, execute `app-builds/win-unpacked/electron-different-versions.exe`
