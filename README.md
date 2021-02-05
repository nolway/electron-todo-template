## Installation

```bash
npm install
```

## Launch app

```bash
npm start
```

## Dans le cas ou vous voulez distribuer votre application, il faut:
(si vous êtes sur windows, autoriser l'exécution de script)
```bash
set-executionpolicy remotesigned
```
#### Installer electron-forge :
```bash
npx @electron-forge/cli@latest import
```
**puis**
```bash
npm install --save-dev electron-prebuilt-compile
```
**Vérifier** que dans votre package.json c'est bien une version **exacte** qui est installée
Par exemple, si vous avez :
```bash
"electron-prebuilt-compile" "^8.2.0"  Il faut le remplacer par : "electron-prebuilt-compile" "8.2.0"
```

#### Puis vous pouvez distribuer votre application :
```bash
electron-forge make
```