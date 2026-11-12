# 1620 — Java, understood.

A dark, local-first study workspace for Introduction to Java. Terminal-green code, a real Java lab, and your own files on disk. **Build 0.1 is the website template.** Course explanations, full command reference, worked examples, exercise banks and graded mock tests are intentionally waiting for the content phase.

## Run on Reza's Windows computer

Requirements: **Node.js 18 or newer** and a **JDK 17 or newer**. No `npm install` is needed. Verify both from a new terminal with `node --version` and `java -version`. A JRE alone is insufficient; this app uses the compiler module included with a JDK. `JAVA_HOME` is supported if Java is not on PATH.

If the destination folder is empty or does not exist, open PowerShell and run:

```powershell
git clone https://github.com/mohamadreza121/Intro-to-java-1620.git "C:\Users\mrhei\OneDrive\Desktop\york courses\1620\1620 - redo"
Set-Location "C:\Users\mrhei\OneDrive\Desktop\york courses\1620\1620 - redo"
.\START.cmd
```

If the folder already contains course files, download this repository using **Code → Download ZIP**, extract the ZIP elsewhere, and copy the app files directly into `1620 - redo`. Leave existing course files in place. `START.cmd`, `server.mjs`, `package.json` and the `public` folder should sit directly inside `1620 - redo`, rather than in an extra nested folder. Double-click `START.cmd`.

Open **http://127.0.0.1:1620** in Edge or Chrome. Keep the command window open while studying. Ctrl+C stops the server. After setup, the app works without an internet connection.

The ChatGPT build environment cannot write to your Windows C: drive. The app starts saving there once you place it in that folder and run it locally. Settings shows the actual active path, so you can confirm the location.

## Where everything is saved

```text
1620 - redo/
  START.cmd
  server.mjs
  public/                  Application interface
  workspace/               Created automatically on first launch
    playground/Main.java   Runnable welcome example
    lectures/              Files imported through My files
    projects/              Your own practice projects
    mocks/library/         Created when you open the library starter
  .1620/
    state.json             Notes, theme, timer, run history
    trash/                 Files removed through My files
    build/                 Temporary compiler output; cleaned after runs
```

The app uses a local JSON data store rather than a separate database service. Your code is stored as real `.java` files, not just browser storage. Notes and activity are written to disk. You can open your files in another editor. OneDrive manages synchronization normally; the app does not configure OneDrive.

Back up **both `workspace` and `.1620`**, including hidden folders. They are excluded from Git so your lecture materials, code, notes and history will not be committed by an ordinary `git add .`. To recover a removed file, move it out of `.1620/trash` in File Explorer. Files removed outside the app use your operating system's normal behaviour.

If you want the app source elsewhere, you can override the data root before launch:

```powershell
$env:JAVA1620_HOME = "C:\Users\mrhei\OneDrive\Desktop\york courses\1620\1620 - redo"
node server.mjs
```

## What's functional now

- Overview with actual file and program-attempt counts.
- Eight planned learning modules, clearly labelled as content pending.
- Java-reference filters and workspace search (pages, planned modules and saved filenames).
- Code lab with line numbers, Tab indentation, autosave, explicit Save and keyboard shortcuts.
- Real compile/run using your installed JDK; compiler errors and runtime errors are shown in the console.
- Multi-file Java projects: all `.java` files in the selected file's folder compile together. Select the file containing `main` before running. Keep separate exercises in separate folders. All source files in the folder must compile, even unused ones. Nested source folders and third-party dependencies are not included in this template.
- Standard input: enter all Scanner answers in the input box, one answer per line, before pressing Run. The input stream closes after these answers. This version uses pre-supplied input rather than a live interactive terminal.
- Local file/folder creation, rename, document import/download and recoverable trash. Document import limit: 20 MB per file. Java/text files open in the editor; binary lecture files download to open in their usual apps.
- Personal notes, three dark themes, saved activity and a JSON progress export.
- Library mock-test scenario preview with a non-destructive two-file TODO starter and a persistent 60-minute pause/resume timer. It is self-guided; questions, hints, marking and solutions are not loaded yet.

Shortcuts: **Ctrl+S** save, **Ctrl+Enter** run Java, **Ctrl+K** search, **Tab** indent code. macOS Cmd equivalents are also supported. The application has no CDN dependencies, analytics, external compiler services or cloud database.

## Runtime behaviour

The server listens on `127.0.0.1` by default and requires a per-launch token for API calls. It rejects workspace traversal and symlink paths. Java runs as your local user, with ordinary Java access to your computer; it is not a security sandbox. Run your own practice code here. Each compile/run stage has a 15-second limit, output is capped, and the Java process receives a 128 MB heap limit. Only one program runs at a time. No shell interpolation is used for compilation.

`npm run dev` is an internal preview mode that binds to all interfaces; use **START.cmd** or **npm start** for normal local work. Change the local port with the `PORT` environment variable if 1620 is already in use. The data root defaults to the app folder regardless of the terminal's working directory.

## Development

```sh
npm start
npm test
```

The integration checks start an isolated server and use a temporary data directory. They cover Java compilation, multi-file projects, Scanner input, compiler/runtime errors, disk persistence, file operations and request/path protections. A JDK is required for those checks.

## Next: the content phase

After template approval, populate the course using the uploaded lecture decks and weekly examples. Keep explanations concise, modernize scenarios, and add commands with tiny runnable examples, practice questions, debugging drills and complete mock tests. Include the library-management scenario as a full mock. Lecture source files are intentionally not published in this public repository.
