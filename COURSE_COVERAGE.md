# ITEC 1620 course coverage

Build 0.3 contains original teaching prose and runnable examples aligned to the uploaded course materials. It reorganizes the topics into eight modules so the user can study one concept at a time. It does not reproduce the lecture decks, textbook pages, official assignment or an official past exam.

| Module | Lessons | Source alignment |
| --- | ---: | --- |
| Java foundations | 5 | Introduction (3)(1).ppt; Week1(1).txt |
| Data & expressions | 6 | DataExpressions (3)(1).ppt; Week2 (1)(1).txt |
| Using Java objects | 7 | UsingObjects (3)(1).ppt; Week3(1).txt |
| Making decisions | 5 | Conditionals(1).ppt; Week5.txt |
| Loops that make sense | 6 | Repetitions (2)(1).pptx; Week6.txt |
| Methods & decomposition | 4 | Classes (2)(1).pptx; Week1(1).txt; Week7.txt |
| Building your own classes | 7 | Classes (2)(1).pptx; OODesign (2).ppt; Week4.txt; Week7.txt |
| Arrays & collections | 10 | Week8.txt; Week9.txt; Week10.txt |

Each lesson includes the idea, complete runnable Java file(s), expected output, execution explanation, common mistakes, a change to try, and an open-ended knowledge check with a hidden explanation. Selected loops and sorting lessons include trace tables.

## Practical content

- **84 reference entries:** output and formatting, Scanner, Strings, Math, Random, primitive operations, control flow, methods, wrapper parsing, array utilities and ArrayList methods. Each includes a tiny executable example and a common mistake.
- **34 exercises:** 29 coding challenges and five debugging drills, with difficulty filters, requirements, sample inputs/outputs, hidden hints and runnable solutions.
- **Three original mocks:** Campus print shop (45 minutes), Network signal report (60 minutes), and The neighbourhood library (90 minutes). Each has a complete specification, sample tests, hints, separate solution files and a 100-point self-review checklist.
- **Library project:** Main, Book and Library classes; encapsulated book state; fixed array plus count; capacity and duplicate protection; ID lookup; title search; adding, listing, borrowing and returning; a repeating numeric-command menu.

The practice contracts deliberately specify exact output and valid-input assumptions. Sample checks exercise behaviour but do not inspect the chosen algorithm or prove every class-design requirement. The UI states this distinction and uses self-review rubrics for structure. Checking a provided solution is labelled as a solution copy and can also pass samples.

The lab supports pre-supplied input rather than a live interactive terminal. Multi-file compilation includes the selected file's same-folder Java sources. Separate examples and tasks use separate folders.

## Corrections to older material

| Source | Corrected wording used in the app |
| --- | --- |
| Classes, slide 26 | No access modifier gives package access, not public access. |
| Classes, slide 46 | Java generates a default constructor only if the class declares no constructors. |
| Classes, slide 37 | A method header includes its return type. For these non-generic examples, overload distinction uses the method name and parameter types; it cannot use return type alone. |
| UsingObjects, slide 8 | String and Math are in java.lang, automatically imported. This is different from the unnamed/default package. |
| UsingObjects, formatting discussion | DecimalFormat formats and rounds for display rather than simply truncating a stored value. |
| UsingObjects, wrapper discussion | Wrapper classes represent values as objects and provide utilities. They are not all non-instantiable utility classes like Math. |
| Week5, T1 | Scanner uses nextInt(), not readInt(). |
| OODesign, slide 4 | A static method cannot directly use an instance Random field. The Week7 version uses static fields. |
| Weekly shuffle examples | A handful of arbitrary swaps does not implement a uniform shuffle. The app teaches Fisher–Yates. |

Other details are stated precisely: Java passes argument values (including reference values) by value; String indexing counts UTF-16 code units; integer division truncates toward zero; Math.round ties go toward positive infinity; and array copies are shallow for object references.

## Scope notes

The original A1 file is used for a design checklist only. The app does not supply a completed assignment submission. Inheritance is introduced as relationship vocabulary because OODesign defers detailed inheritance to ITEC 2610. Modern helpers such as String.strip and Arrays utilities are marked or explained alongside the core course syntax. Monetary examples use fictional prices and rules, not live pricing or policy.

## Official language/API references

- [Java 17 language specification, classes and constructors](https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html)
- [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)
- [Scanner](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html)
- [Math](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Math.html)
- [Random](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Random.html)
- [Arrays](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html)
- [ArrayList](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html)

## Verification

`npm test` compiles 171 Java bundles and runs 247 expected-output checks. It also tests server file operations, persistence across restart, Scanner input, compiler/runtime errors, path/request protections, timeout termination, failing and passing sample-check submissions, the multi-file library mock, and persistence of course progress alongside existing notes.

Browser review covers learning navigation, progress and answer saving, reference search, exercise search, starter launch, failed sample comparisons, separate solution launch, successful samples, and mock/rubric controls. Execution was checked on Node.js 24 and OpenJDK 21 in the build environment. Windows setup is provided but has not been executed on the user's computer.

The build 0.3 desktop redesign preserves this content and adds a monochrome Windows-style shell. Browser review also covers Start search, My Computer, Notepad saving, window minimize/maximize/restore/close, title-bar dragging, resizing, and Java execution in the new Command Prompt. The editor was inspected for exact RGB colors: green (0, 255, 0) on black (0, 0, 0). Desktop assets are served locally, and integration tests verify persisted window preferences alongside existing course data.
