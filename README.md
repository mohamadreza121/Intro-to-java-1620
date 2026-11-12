# 1620 — Java, understood.

A Windows 7 inspired, local-first study desktop for Introduction to Java. Monochrome graphite Aero windows, a real Java lab, and your own files on disk. **Build 0.3 includes the course content:** 50 lessons in eight modules, 84 reference entries, 34 coding/debugging tasks, and three original mock tests. The explanations and scenarios are based on the uploaded lecture topics, with original modern examples.

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
- Eight learning modules with 50 concise lessons, runnable examples, execution explanations, common mistakes and open-ended knowledge checks. Lesson completion, personal answers and bookmarks are saved on disk.
- 84 searchable reference entries with syntax, example results and common mistakes. Global search includes lessons, commands, exercises, mocks and filenames.
- Code lab with line numbers, Tab indentation, autosave, explicit Save and keyboard shortcuts.
- Real compile/run using your installed JDK; compiler errors and runtime errors are shown in the console.
- Multi-file Java projects: all `.java` files in the selected file's folder compile together. Select the file containing `main` before running. Keep separate exercises in separate folders. All source files in the folder must compile, even unused ones. Nested source folders and third-party dependencies are not included in this version.
- Live standard input: press Run, wait for your prompt, then type an answer and press Enter or Send. Empty Enter sends a real blank line; Shift+Enter adds a line for pasting multiple answers. Java input stays open until the program exits or you press Stop. Use sample loads an example into the input box without sending it. Sample-test checks still supply their inputs automatically.
- Local file/folder creation, rename, document import/download and recoverable trash. Document import limit: 20 MB per file. Java/text files open in the editor; binary lecture files download to open in their usual apps.
- Personal notes, three dark themes, saved activity and a JSON progress export.
- 34 coding and debugging tasks with closed-by-default hints and solutions. Open a starter or saved copy in the lab and use **Check sample tests** for input/expected/actual comparisons.
- Three original mocks: **Campus print shop (45 min)**, **Network signal report (60 min)**, and **The neighbourhood library (90 min)**. Each has a complete specification, sample cases, hints, runnable solution and a 100-point self-review rubric. Timers persist and support pause/resume.
- The library mock uses three separate classes: Book, Library and Main. It covers adding, listing, borrowing, returning and searching titles with array capacity and duplicate checks.
- A Sources & corrections page maps the lectures and corrects known typos and oversimplifications. See [COURSE_COVERAGE.md](COURSE_COVERAGE.md).

Shortcuts: **Ctrl+S** save, **Ctrl+Enter** run Java, **Ctrl+K** search, **Tab** indent code. macOS Cmd equivalents are also supported. The application has no CDN dependencies, analytics, external compiler services or cloud database.

## Runtime behaviour

The server listens on `127.0.0.1` by default and requires a per-launch token for API calls. It rejects workspace traversal and symlink paths. Java runs as your local user, with ordinary Java access to your computer; it is not a security sandbox. Run your own practice code here. Compilation and batch runs have a 15-second limit. Interactive runs allow 10 minutes, including time spent waiting for input, and can be stopped at any time. Output is capped, and the Java process receives a 128 MB heap limit. Each sample-test execution has a separate 4-second limit. Only one program runs at a time. No shell interpolation is used for compilation.

`npm run dev` is an internal preview mode that binds to all interfaces; use **START.cmd** or **npm start** for normal local work. Change the local port with the `PORT` environment variable if 1620 is already in use. The data root defaults to the app folder regardless of the terminal's working directory.

## Development

```sh
npm start
npm test
```

The integration checks start an isolated server and use a temporary data directory. They cover Java compilation, multi-file projects, Scanner input, live prompts, repeated blank lines, Stop, compiler/runtime errors, disk persistence, file operations and request/path protections. A JDK is required for those checks.

## Using the course

1. Open **Learning path** and select a lesson. Read the idea and follow the execution walkthrough. Examples always display full Java files.
2. Use **Open example in lab**. The app creates a copy under `workspace/examples/<lesson-id>/`. It reopens an existing copy without overwriting your edits. Input-based examples load their sample input automatically.
3. Write an explanation in the lesson's answer box, reveal the explanation when ready, and mark the lesson reviewed.
4. Open **Practice**, choose a task, and read its exact output contract. Open the starter in `workspace/practice/<task-id>/`. Debugging tasks start with deliberately faulty code.
5. Use **Check sample tests** in the lab. Compiler errors and expected-versus-actual differences appear in the console. Checks use a fresh JVM for each sample, so a previous sample cannot leave in-memory state for the next one.
6. Hints and solutions start closed. Opening a solution creates a separate copy in `workspace/solutions/`; your working copy stays intact. Reopening an example, starter or solution preserves its existing files.
7. For a mock, read the complete brief, start its optional timer and open the project. Use the rubric for your own structural review. Passing samples does not prove all inputs or design requirements are correct.

Sample checks normalize CRLF/LF and trim whitespace around the entire output, but do not ignore extra prompts, interior whitespace or wrong values. They are learning feedback, not an official grade. A checked solution copy can also pass the samples; the app does not claim you independently solved the task.

The timer counts wall-clock time while running, including while the app is closed. Pausing preserves remaining time. Only one mock timer is saved at a time; switching to another asks before replacing it. It does not send notifications while the app is closed.

## Updating from the template

Stop the command window, then run `git pull` from the app folder if you cloned the repository. Start `START.cmd` again and refresh the browser. If using ZIP downloads, replace only application source files and the `public` and `test` folders. Keep your existing `workspace` and `.1620` folders. The server merges new progress fields with existing saved state and does not overwrite the welcome example or prior practice files.

## Content validation

`npm test` includes compilation of every lesson/reference example and every exercise/mock solution: **171 Java bundles with 247 expected-output runs**. Integration checks also cover the sample-check endpoint, failing and passing submissions, the three-class library solution, saved course progress, and preservation of existing notes.

The full uploaded lecture files and assignment are not published. All included teaching explanations, exercises and mock scenarios are original. The A1 source is used only for a design checklist; no completed A1 submission is included.

## Windows-style desktop (build 0.3)

The overview is now **My Computer**, lessons are **Course Files**, personal files are **Documents**, notes open in **Notepad**, and the Java lab opens as **Command Prompt**. The full course and saved progress remain available.

- Click a desktop shortcut once to open an application. The taskbar and searchable Start menu also launch apps.
- Drag the title bar to move the active app window. Drag its lower-right corner to resize. Minimize, maximize, restore, close, and Show desktop work. Double-clicking the title bar toggles maximize.
- The taskbar remembers opened app locations in the current session. The desktop uses one active content window; switching apps saves pending code/notes before changing the view.
- Window geometry, maximize state, compact spacing and Notepad word wrap are saved under the existing local state file.
- Notepad has a paper-style editing area, File/Edit/Format/View menus, autosave, explicit Save and plain-text export.
- Command Prompt and all code examples use **exact `#00FF00` on `#000000`**, matching the classic CMD **color 0A** palette. UI chrome stays monochromatic.
- Your supplied computer illustration is included as `public/wallpaper.jpg`. CSS applies monochrome, blending and gradients without altering the source image.
- The taskbar clock opens a calendar using the computer's local date. Ctrl+Esc opens Start. Ctrl+K still searches the whole course.

These are web app controls and visual styling. They do not control the real Windows desktop or execute operating-system CMD commands. Java still compiles and runs through the installed local JDK. No external fonts, OS icon packages or CDN dependencies are required.
