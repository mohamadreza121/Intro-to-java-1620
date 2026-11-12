// Original teaching explanations and practice examples for ITEC 1620.
// See COURSE_COVERAGE.md for source alignment and scope.
export const courseModules = [
  {
    "id": "foundations",
    "title": "Java foundations",
    "description": "Program structure, output, input and errors",
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ]
  },
  {
    "id": "data",
    "title": "Data & expressions",
    "description": "Types, arithmetic, conversions and formatting",
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ]
  },
  {
    "id": "objects",
    "title": "Using Java objects",
    "description": "Strings, Scanner, Math, Random and wrappers",
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ]
  },
  {
    "id": "decisions",
    "title": "Making decisions",
    "description": "Comparisons, logic, branching and switch",
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ]
  },
  {
    "id": "loops",
    "title": "Loops that make sense",
    "description": "Validation, counters, sentinels and nested loops",
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ]
  },
  {
    "id": "methods",
    "title": "Methods & decomposition",
    "description": "Parameters, return values, scope and overloading",
    "sources": [
      "Classes (2)(1).pptx",
      "Week1(1).txt",
      "Week7.txt"
    ]
  },
  {
    "id": "classes",
    "title": "Building your own classes",
    "description": "State, constructors, encapsulation and relationships",
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ]
  },
  {
    "id": "arrays",
    "title": "Arrays & collections",
    "description": "Traversals, searching, sorting and object collections",
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ]
  }
];

export const lessons = [
  {
    "id": "first-program",
    "module": "foundations",
    "title": "Read the shape of a Java program",
    "summary": "A class contains methods. The main method is where this console program starts.",
    "points": [
      "A class groups related code. Save public class Main in Main.java because the names must match exactly.",
      "public static void main(String[] args) is the standard entry point used throughout this course. The braces enclose its statements.",
      "A statement such as println ends with a semicolon. A class or method body ends with a closing brace, without adding a semicolon."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"1620 lab online\");\n        System.out.println(\"Ready to practise.\");\n    }\n}\n"
    },
    "output": "1620 lab online\nReady to practise.",
    "walkthrough": [
      "The runtime enters main before executing either print statement.",
      "Each println writes text and then moves to a new line. The two calls run from top to bottom."
    ],
    "pitfalls": [
      "Main and main are different identifiers. MAIN is not the main entry point.",
      "Curly quotes copied from a document are not Java string delimiters."
    ],
    "tryIt": "Add a third line showing one topic you want to understand.",
    "check": {
      "question": "What must the filename be if the public class is Practice?",
      "answer": "Practice.java. Match spelling and capitalization."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ],
    "number": 1
  },
  {
    "id": "output",
    "module": "foundations",
    "title": "print, println and escape characters",
    "summary": "Choose whether output stays on a line or starts the next one.",
    "points": [
      "print writes exactly the supplied value. println writes it and adds a line separator.",
      "Quotation marks delimit a String. Use backslash escapes to include a quote, a newline or a backslash inside it.",
      "A tab is a tab stop, so it does not guarantee perfectly aligned columns. Use printf when alignment matters."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.print(\"Desk: \");\n        System.out.println(\"A12\");\n        System.out.println(\"Status: \\\"available\\\"\");\n        System.out.println(\"Next\\nstudent\");\n    }\n}\n"
    },
    "output": "Desk: A12\nStatus: \"available\"\nNext\nstudent",
    "walkthrough": [
      "The first two calls share a line because print does not add a newline.",
      "The escaped quotes are printed as ordinary quotation marks. The \\n inside the final string introduces another line."
    ],
    "pitfalls": [
      "Writing /n prints slash and n. The newline escape uses a backslash: \\n.",
      "An actual Java string literal cannot be split across source lines using an unescaped newline."
    ],
    "tryIt": "Print a two-line receipt that includes a quoted item name.",
    "check": {
      "question": "How many lines does System.out.println(\"A\\nB\") produce?",
      "answer": "Two visible lines: A, then B. println adds the final line separator."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ],
    "number": 2
  },
  {
    "id": "names-comments",
    "module": "foundations",
    "title": "Names, comments and useful structure",
    "summary": "Choose names that explain what a value means.",
    "points": [
      "Variables and methods conventionally use lowerCamelCase; classes use UpperCamelCase. Constants conventionally use UPPER_SNAKE_CASE.",
      "An identifier cannot start with a digit, contain a space, or be a keyword. A single underscore is not a valid identifier in current Java.",
      "Comments explain intent and assumptions. They do not change execution. Use // for one line or /* ... */ for a block."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        // Count equipment ready for checkout.\n        int availableNets = 4;\n        final int MAX_CHECKOUT = 2;\n        System.out.println(availableNets - MAX_CHECKOUT);\n    }\n}\n"
    },
    "output": "2",
    "walkthrough": [
      "The names give meaning to otherwise unexplained numbers.",
      "final prevents reassignment after initialization. This constant represents a policy within this example."
    ],
    "pitfalls": [
      "first-name is parsed as subtraction, not a single name.",
      "A name can be legal but unclear: prefer availableNets over x."
    ],
    "tryIt": "Rename the variables in a previous exercise so the calculation reads naturally.",
    "check": {
      "question": "Which is legal: 2students, studentCount, student-count?",
      "answer": "studentCount. The first starts with a digit and the last contains a hyphen."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ],
    "number": 3
  },
  {
    "id": "scanner-basics",
    "module": "foundations",
    "title": "Read values with Scanner",
    "summary": "Input supplies values; your program decides how to use them.",
    "points": [
      "import java.util.Scanner makes the Scanner type available by its short name. new Scanner(System.in) creates an object connected to standard input.",
      "nextInt reads an integer token, nextDouble reads a decimal token, and next reads one token of text. Whitespace normally separates tokens.",
      "In this lab, press Run, then enter each answer in Live input and press Enter or Send. Empty Enter sends a blank line. Each run gets a fresh JVM. Close scan after the program has finished reading."
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int nets = scan.nextInt();\n        double price = scan.nextDouble();\n        System.out.printf(java.util.Locale.US, \"Cost: %.2f%n\", nets * price);\n        scan.close();\n    }\n}\n"
    },
    "output": "Cost: 37.50",
    "walkthrough": [
      "The first input token 3 becomes nets. The next token 12.50 becomes price.",
      "The multiplication uses the stored values. %.2f shows two digits after the decimal point."
    ],
    "pitfalls": [
      "Scanner has nextInt(), not readInt(). One weekly example contains this typo.",
      "A non-integer token passed to nextInt causes an input mismatch. Start with valid input, then learn validation."
    ],
    "tryIt": "Change the sample input to 4 and 7.25. Predict the new cost.",
    "check": {
      "question": "Does next() read the entire line \"Reza Heidarpoor\"?",
      "answer": "No. It reads Reza; nextLine() is for a whole line."
    },
    "stdin": "3\n12.50\n",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ],
    "number": 4
  },
  {
    "id": "errors-testing",
    "module": "foundations",
    "title": "Compile errors, runtime errors and wrong answers",
    "summary": "A program can compile successfully and still solve the wrong problem.",
    "points": [
      "A compile-time error prevents bytecode generation. Examples include an unknown method name, a missing semicolon and incompatible types.",
      "A runtime error happens during execution, such as an invalid array index or integer division by zero.",
      "A logic error produces an incorrect result without necessarily throwing an exception. Test ordinary cases and boundaries, and compare actual output with a hand-worked answer."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int completed = 3;\n        int total = 4;\n        double ratio = (double) completed / total;\n        System.out.println(ratio);\n    }\n}\n"
    },
    "output": "0.75",
    "walkthrough": [
      "Casting completed to double changes the division before it takes place.",
      "Without the cast, 3 / 4 produces integer zero. Storing that zero in a double afterward would only give 0.0."
    ],
    "pitfalls": [
      "An exit code of zero means execution finished normally; it does not prove your formula is correct.",
      "Read the first compiler error first. Later errors may be consequences of it."
    ],
    "tryIt": "Try completed = 0, then completed = total. Finally think about what total = 0 requires.",
    "check": {
      "question": "What kind of error is using width + height when the requirement is width * height?",
      "answer": "A logic error. The code can compile and run while giving the wrong area."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Introduction (3)(1).ppt",
      "Week1(1).txt"
    ],
    "number": 5
  },
  {
    "id": "types",
    "module": "data",
    "title": "Choose a type and initialize it",
    "summary": "A variable has a type, a name and a value.",
    "points": [
      "Java has eight primitive types: byte, short, int, long, float, double, char and boolean. String is a reference type.",
      "int is a 32-bit signed integer; long is 64-bit. Write an L suffix for a long literal that is too large for int. double is the usual choice for course decimal calculations.",
      "Local variables must be assigned before you read them. A char literal uses single quotes and represents one UTF-16 code unit; some visible characters need more than one char."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int seats = 32;\n        long serial = 3000000000L;\n        double rate = 1.5;\n        char zone = 'A';\n        boolean open = true;\n        System.out.println(seats + \" \" + serial + \" \" + rate + \" \" + zone + \" \" + open);\n    }\n}\n"
    },
    "output": "32 3000000000 1.5 A true",
    "walkthrough": [
      "Each declaration fixes the type of value the variable can hold.",
      "String concatenation converts these values into readable text for the output."
    ],
    "pitfalls": [
      "char letter = \"A\" is wrong because double quotes create a String.",
      "Floating-point arithmetic is approximate. For exact cents in these exercises, integer cents can avoid some rounding surprises."
    ],
    "tryIt": "Model an item name, stock count, price and availability using appropriate types.",
    "check": {
      "question": "Is String one of the eight primitive types?",
      "answer": "No. String is a class and its variables hold references to String objects."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 6
  },
  {
    "id": "division-remainder",
    "module": "data",
    "title": "Division and remainder without guessing",
    "summary": "Integer division drops the fractional part toward zero. Remainder is what is left.",
    "points": [
      "If both operands are integers, / performs integer division. If at least one operand is floating-point, the division can retain a fractional part.",
      "For nonnegative quantities, total / size counts complete groups and total % size gives the leftover.",
      "For a = 7 and b = 10: zero complete groups of ten fit into seven, so 7 / 10 is 0 and 7 % 10 is 7. With negative integers, the remainder has the sign of the dividend or is zero."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int minutes = 137;\n        System.out.println(minutes / 60 + \" hours\");\n        System.out.println(minutes % 60 + \" minutes\");\n        System.out.println(7 / 10);\n        System.out.println(7 % 10);\n        System.out.println(7 / 10.0);\n    }\n}\n"
    },
    "output": "2 hours\n17 minutes\n0\n7\n0.7",
    "walkthrough": [
      "137 = 2 * 60 + 17. Division gives 2; remainder gives 17.",
      "7 / 10.0 has a double operand, so it evaluates to 0.7."
    ],
    "pitfalls": [
      "Assigning 7 / 10 to a double does not recover the fraction. The division already happened.",
      "The % operator calculates remainder; it does not convert something into a percentage."
    ],
    "tryIt": "Convert 3671 seconds into hours, minutes and seconds.",
    "check": {
      "question": "What are 29 / 10 and 29 % 10?",
      "answer": "2 and 9. The quotient counts tens, and the remainder is the units digit."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 7
  },
  {
    "id": "precedence-concat",
    "module": "data",
    "title": "Arithmetic first, or text first?",
    "summary": "The + symbol adds numbers or joins text depending on its operands.",
    "points": [
      "Parentheses control grouping. Multiplication, division and remainder bind more tightly than addition and subtraction. Operators at the same arithmetic level generally group left to right.",
      "Once a left-to-right + operation produces a String, following values are joined as text.",
      "Use parentheses around the arithmetic you intend to show inside an output message."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Total: \" + 3 + 4);\n        System.out.println(\"Total: \" + (3 + 4));\n        System.out.println(3 + 4 + \" items\");\n        System.out.println(20 - 6 / 2);\n    }\n}\n"
    },
    "output": "Total: 34\nTotal: 7\n7 items\n17",
    "walkthrough": [
      "\"Total: \" + 3 creates text ending in 3, then + 4 appends another digit.",
      "(3 + 4) forces numeric addition. In the final line, divide 6 by 2 before subtracting from 20."
    ],
    "pitfalls": [
      "Java does not interpret a math formula based on how it looks on paper. Write every multiplication with *.",
      "^ is not exponentiation. Use Math.pow for powers."
    ],
    "tryIt": "Predict \"Sum=\" + 2 * 5 and then test it.",
    "check": {
      "question": "Why does 2 + 3 + \"4\" produce \"54\"?",
      "answer": "2 + 3 is evaluated first as numeric addition. The following + joins the result 5 to the String \"4\"."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 8
  },
  {
    "id": "casting",
    "module": "data",
    "title": "Convert before the information is lost",
    "summary": "A cast changes the type used at a particular point in an expression.",
    "points": [
      "Widening conversions such as int to double often happen automatically. Some widening conversions can still lose precision, such as long to double.",
      "Narrowing from double to int needs an explicit cast and discards the fractional part toward zero. It does not round to the nearest integer.",
      "The location of the cast matters: (double) a / b is different from (double) (a / b)."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int wins = 7;\n        int games = 10;\n        System.out.println((double) wins / games);\n        System.out.println((double) (wins / games));\n        System.out.println((int) -3.8);\n    }\n}\n"
    },
    "output": "0.7\n0.0\n-3",
    "walkthrough": [
      "The first line converts wins before division, preserving a fractional result.",
      "The second divides integers first. The final cast truncates -3.8 toward zero."
    ],
    "pitfalls": [
      "(int) x is not equivalent to Math.floor(x) for a negative decimal.",
      "A cast can silence a type error while hiding an incorrect calculation. Decide why you need it."
    ],
    "tryIt": "Calculate an average of the integers 8, 9 and 10 while preserving a decimal result.",
    "check": {
      "question": "What is the value of (double) (5 / 2)?",
      "answer": "2.0. The integer division has already produced 2."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 9
  },
  {
    "id": "updates",
    "module": "data",
    "title": "Assignment, compound updates and ++",
    "summary": "An update reads the old value and writes a new one.",
    "points": [
      "x = x + 1 reads x, adds one, and stores the result back into x. x += 1 is a compound assignment.",
      "As standalone statements, x++ and ++x both increment x by one. In a larger expression, postfix yields the old value and prefix yields the new one.",
      "Trace mixed updates in execution order. Prefer separate statements when side effects make the expression hard to read."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 3;\n        int oldValue = count++;\n        int newValue = ++count;\n        System.out.println(oldValue);\n        System.out.println(newValue);\n        System.out.println(count);\n    }\n}\n"
    },
    "output": "3\n5\n5",
    "walkthrough": [
      "count++ supplies 3 to oldValue, then count becomes 4.",
      "++count changes 4 to 5 before supplying 5 to newValue."
    ],
    "pitfalls": [
      "count = count++ stores the old value back after the increment and is a trap to avoid.",
      "+= may include an implicit conversion for small numeric types; do not treat every compound assignment as a literal text substitution."
    ],
    "tryIt": "Trace int a = 5; int b = a--; int c = --a; on paper.",
    "check": {
      "question": "After int x = 2; x += 3 * 4; what is x?",
      "answer": "14. The right side 3 * 4 is evaluated to 12, then added to the old value 2."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 10
  },
  {
    "id": "formatting",
    "module": "data",
    "title": "Format a readable receipt",
    "summary": "Formatting changes how a result is displayed, not the stored value.",
    "points": [
      "printf uses placeholders: %d for an integer, %s for text, %.2f for a floating-point value with two decimal places, and %n for a platform line separator.",
      "NumberFormat formats currency or percentages using a locale. DecimalFormat applies a pattern such as 0.00. Both are covered in your materials.",
      "Specifying Locale.US makes these runnable examples produce consistent decimal points. It is a display choice, not a claim about local tax or currency rules."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        double total = 19.5;\n        System.out.printf(java.util.Locale.US, \"Total: $%.2f%n\", total);\n        java.text.DecimalFormat fmt = new java.text.DecimalFormat(\"0.00\", java.text.DecimalFormatSymbols.getInstance(java.util.Locale.US));\n        System.out.println(fmt.format(total));\n        System.out.println(total);\n    }\n}\n"
    },
    "output": "Total: $19.50\n19.50\n19.5",
    "walkthrough": [
      "printf and DecimalFormat create a display with two decimal places.",
      "Printing the original value again shows that formatting did not mutate total."
    ],
    "pitfalls": [
      "%.2f rounds for display; it does not truncate the stored number.",
      "Printing a raw ratio with a percent sign is wrong unless you multiply by 100 or use a percent formatter."
    ],
    "tryIt": "Display 0.875 as a percentage with one decimal place.",
    "check": {
      "question": "Does formatting 1.2345 with %.2f change the variable to 1.23?",
      "answer": "No. The variable keeps its original value. The formatted output shows 1.23."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "DataExpressions (3)(1).ppt",
      "Week2 (1)(1).txt"
    ],
    "number": 11
  },
  {
    "id": "scanner-lines",
    "module": "objects",
    "title": "The nextInt → nextLine problem",
    "summary": "Token methods and line methods move through input differently.",
    "points": [
      "nextInt consumes the integer token but usually leaves the newline after it. nextLine then reads the rest of the current line, which can be empty.",
      "When the next desired field is on a new line, consume that leftover line ending with one nextLine call before reading the field.",
      "Another pattern is to read complete lines and parse numbers with Integer.parseInt. Use one consistent input plan."
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int age = scan.nextInt();\n        scan.nextLine(); // finish the number line\n        String fullName = scan.nextLine();\n        System.out.println(fullName + \" is \" + age);\n        scan.close();\n    }\n}\n"
    },
    "output": "Reza Heidarpoor is 22",
    "walkthrough": [
      "The first nextLine intentionally discards the remainder of the age line.",
      "The second nextLine reads the complete name including its space."
    ],
    "pitfalls": [
      "Adding nextLine blindly after every read can discard useful input when fields share a line.",
      "Creating several Scanners on System.in can cause buffering problems. Reuse one scanner."
    ],
    "tryIt": "Read a quantity on the first line and an item description on the second.",
    "check": {
      "question": "Why can nextLine immediately after nextInt return an empty String?",
      "answer": "Because it reads the remainder of the number line, often just the line ending."
    },
    "stdin": "22\nReza Heidarpoor\n",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 12
  },
  {
    "id": "strings-index",
    "module": "objects",
    "title": "String indexes and substring",
    "summary": "Indexes start at zero. An end index usually stops before that position.",
    "points": [
      "For a String s, valid charAt indexes run from 0 through s.length() - 1. length() is the number of UTF-16 code units.",
      "substring(start, end) includes start and excludes end. The result length is end - start. substring(start) takes the remainder of the string.",
      "String methods return values. Store or use those returned values when you need them."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String course = \"ITEC1620\";\n        System.out.println(course.length());\n        System.out.println(course.charAt(4));\n        System.out.println(course.substring(4, 8));\n        System.out.println(course.substring(0, 4));\n    }\n}\n"
    },
    "output": "8\n1\n1620\nITEC",
    "walkthrough": [
      "Characters I, T, E, C occupy indexes 0 to 3. The digit 1 is at index 4.",
      "substring(4, 8) visits indexes 4, 5, 6 and 7."
    ],
    "pitfalls": [
      "charAt(s.length()) is out of bounds.",
      "Arrays use .length without parentheses; String uses .length()."
    ],
    "tryIt": "Extract the campus prefix and numeric suffix from \"YU12345\".",
    "check": {
      "question": "What does \"network\".substring(1, 4) return?",
      "answer": "\"etw\": indexes 1, 2 and 3 are included, while index 4 is excluded."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 13
  },
  {
    "id": "strings-immutable",
    "module": "objects",
    "title": "String methods return new text",
    "summary": "Changing a String variable and changing a String object are different ideas.",
    "points": [
      "String objects are immutable. Methods such as toUpperCase, replace and trim return String values rather than editing the existing text in place.",
      "A String variable can still be reassigned so it refers to the returned text.",
      "trim removes leading and trailing characters up to U+0020; strip is a newer whitespace-aware alternative. These examples keep to the methods emphasized in your course."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String label = \"  java lab  \";\n        label.toUpperCase();\n        System.out.println(\"[\" + label + \"]\");\n        label = label.trim().toUpperCase();\n        System.out.println(label);\n        System.out.println(label.replace(\"LAB\", \"PRACTICE\"));\n    }\n}\n"
    },
    "output": "[  java lab  ]\nJAVA LAB\nJAVA PRACTICE",
    "walkthrough": [
      "The first method result is ignored, so label still refers to the original string.",
      "The reassignment uses the returned trimmed, uppercase string. replace returns another value for the last print."
    ],
    "pitfalls": [
      "Calling a method without using its result can make it appear to do nothing.",
      "Do not confuse String immutability with final: a final reference cannot be reassigned, but a mutable object it refers to may still change."
    ],
    "tryIt": "Normalize an entered course name by trimming spaces and converting it to uppercase.",
    "check": {
      "question": "Does text.replace(\"a\", \"b\") edit text automatically?",
      "answer": "No. Use the returned String, for example text = text.replace(\"a\", \"b\")."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 14
  },
  {
    "id": "string-comparisons",
    "module": "objects",
    "title": "Compare content, not just references",
    "summary": "Use equals for equal text and compareTo for ordering.",
    "points": [
      "For reference types, == checks whether the references designate the same object. String.equals checks equal character sequences.",
      "equalsIgnoreCase ignores letter case. compareTo returns a negative number, zero or a positive number according to lexicographic UTF-16 order. Do not expect exactly -1 or 1.",
      "For natural-language sorting, case and locale can matter. Here we use simple course comparisons."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\");\n        String b = new String(\"Java\");\n        System.out.println(a == b);\n        System.out.println(a.equals(b));\n        System.out.println(\"YORK\".equalsIgnoreCase(\"york\"));\n        System.out.println(\"Alpha\".compareTo(\"Beta\") < 0);\n    }\n}\n"
    },
    "output": "false\ntrue\ntrue\ntrue",
    "walkthrough": [
      "The two new expressions create distinct objects, so reference equality is false.",
      "Their text matches, so equals is true. Alpha sorts before Beta in this example."
    ],
    "pitfalls": [
      "== can appear to work for some string literals because Java may share them. That does not make it a content comparison.",
      "Calling a method on a null reference throws NullPointerException; use a known literal as the receiver when useful."
    ],
    "tryIt": "Accept yes, YES or Yes as a positive menu response.",
    "check": {
      "question": "What should you use to compare an entered password with a stored text value in a basic exercise?",
      "answer": "equals compares their content. These course exercises do not implement real password storage or authentication."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 15
  },
  {
    "id": "math",
    "module": "objects",
    "title": "Math is a toolkit of static methods",
    "summary": "Call Math methods using the class name.",
    "points": [
      "Math.sqrt(x) computes a square root, Math.pow(base, exponent) computes a power, and Math.abs(x) gives an absolute value within the type limits.",
      "ceil moves up toward positive infinity; floor moves down toward negative infinity. round returns the nearest integer value with ties toward positive infinity.",
      "These are static methods, so you use Math.sqrt(25) without constructing a Math object. Trigonometric arguments are in radians."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.sqrt(81));\n        System.out.println(Math.pow(2, 5));\n        System.out.println(Math.ceil(-2.3));\n        System.out.println(Math.floor(-2.3));\n        System.out.println(Math.round(-2.5));\n    }\n}\n"
    },
    "output": "9.0\n32.0\n-2.0\n-3.0\n-2",
    "walkthrough": [
      "-2 is above -2.3 on the number line; -3 is below it.",
      "round(-2.5) chooses -2 because the tie direction is toward positive infinity."
    ],
    "pitfalls": [
      "^ is bitwise XOR for integers, not a power operator.",
      "Math.sqrt of a negative double returns NaN rather than a real square root."
    ],
    "tryIt": "Calculate the distance between (1, 2) and (4, 6) using sqrt and pow.",
    "check": {
      "question": "How do floor(-3.2) and (int) -3.2 differ?",
      "answer": "floor returns -4.0; the cast truncates toward zero and returns -3."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 16
  },
  {
    "id": "random",
    "module": "objects",
    "title": "Build a random range you can explain",
    "summary": "Count the possible integers, then shift the range.",
    "points": [
      "random.nextInt(bound) returns an integer from 0 inclusive to bound exclusive. The bound must be positive.",
      "For inclusive min through max, use nextInt(max - min + 1) + min, assuming this arithmetic fits the type. The +1 includes both endpoints.",
      "A seed can make a practice example reproducible. Random is suitable for these games and simulations, not security tokens."
    ],
    "files": {
      "Main.java": "import java.util.Random;\n\npublic class Main {\n    public static void main(String[] args) {\n        Random random = new Random(42);\n        int roll = random.nextInt(6) + 1;\n        int level = random.nextInt(11) + 10;\n        System.out.println(\"Die: \" + roll);\n        System.out.println(\"Level valid: \" + (level >= 10 && level <= 20));\n    }\n}\n"
    },
    "output": "Die: 3\nLevel valid: true",
    "walkthrough": [
      "nextInt(6) gives 0 through 5. Adding 1 maps these to 1 through 6.",
      "20 - 10 + 1 gives 11 choices for the inclusive second interval."
    ],
    "pitfalls": [
      "nextInt(6) can never return 6.",
      "Do not create a new Random on every loop iteration when one shared generator will do."
    ],
    "tryIt": "Generate an integer from -5 through 5, inclusive.",
    "check": {
      "question": "How many possible values can nextInt(15) + 20 produce, and what are they?",
      "answer": "15 possible integers, from 20 through 34 inclusive."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 17
  },
  {
    "id": "wrappers-formatters",
    "module": "objects",
    "title": "Parsing, wrappers and formatter objects",
    "summary": "Some classes represent values; others help convert or display them.",
    "points": [
      "Integer.parseInt(\"42\") returns a primitive int. Double.parseDouble works similarly for decimal text. Invalid numeric text causes NumberFormatException.",
      "Wrapper classes include Integer, Double, Boolean and Character. They represent primitive-like values as objects and provide useful static methods. They are not simply non-instantiable utility classes like Math.",
      "NumberFormat.getPercentInstance returns a formatter object. Its format method turns a numeric ratio into display text."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = Integer.parseInt(\"12\");\n        Integer boxed = count;\n        int unboxed = boxed;\n        java.text.NumberFormat percent = java.text.NumberFormat.getPercentInstance(java.util.Locale.US);\n        System.out.println(unboxed + 3);\n        System.out.println(percent.format(0.75));\n    }\n}\n"
    },
    "output": "15\n75%",
    "walkthrough": [
      "Autoboxing converts count to an Integer reference; unboxing gets the int value back.",
      "The percent formatter receives the ratio 0.75 and displays 75%."
    ],
    "pitfalls": [
      "Unboxing a null Integer throws NullPointerException.",
      "parseInt(\"3.5\") is invalid because the text is not an integer."
    ],
    "tryIt": "Read a whole line, trim it and parse it as an integer.",
    "check": {
      "question": "What type does Integer.parseInt(\"17\") return?",
      "answer": "int, a primitive value."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "UsingObjects (3)(1).ppt",
      "Week3(1).txt"
    ],
    "number": 18
  },
  {
    "id": "if-else",
    "module": "decisions",
    "title": "Choose one branch with if / else",
    "summary": "A condition evaluates to a boolean, then selects a path.",
    "points": [
      "An if block runs only when its condition is true. An else block runs when that condition is false.",
      "Braces define the block. Without braces, only the immediately following statement belongs to the branch, regardless of indentation.",
      "For a range split into bands, test the boundaries deliberately so values such as 0 or 20 land in the intended band."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int temperature = 20;\n        if (temperature < 0) {\n            System.out.println(\"Freezing\");\n        } else if (temperature <= 20) {\n            System.out.println(\"Cool\");\n        } else {\n            System.out.println(\"Warm\");\n        }\n    }\n}\n"
    },
    "output": "Cool",
    "walkthrough": [
      "20 is not below zero, so Java moves to the next condition.",
      "20 <= 20 is true. The Cool branch runs and the rest of the chain is skipped."
    ],
    "pitfalls": [
      "A semicolon immediately after if (condition) creates an empty controlled statement.",
      "Separate if statements can both run. An if / else if chain selects at most one branch."
    ],
    "tryIt": "Test -1, 0, 20 and 21 by changing the value.",
    "check": {
      "question": "If the first condition of an if / else if chain is true, are later conditions checked?",
      "answer": "No. Its block runs and the remaining alternatives are skipped."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ],
    "number": 19
  },
  {
    "id": "boolean-ranges",
    "module": "decisions",
    "title": "Inside a range uses AND; outside uses OR",
    "summary": "Translate the requirement into two small comparisons.",
    "points": [
      "For a valid width from 1 through 30 inclusive, width >= 1 && width <= 30 requires both boundaries to hold.",
      "For an invalid width, width < 1 || width > 30 allows either kind of failure.",
      "Negating an AND expression turns it into an OR of the negated parts: !(a && b) is equivalent to !a || !b."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int width = 31;\n        boolean valid = width >= 1 && width <= 30;\n        boolean invalid = width < 1 || width > 30;\n        System.out.println(valid);\n        System.out.println(invalid);\n        System.out.println(!valid == invalid);\n    }\n}\n"
    },
    "output": "false\ntrue\ntrue",
    "walkthrough": [
      "31 satisfies the lower boundary but fails the upper boundary, so the AND is false.",
      "It is above 30, so the invalid OR condition is true."
    ],
    "pitfalls": [
      "width >= 1 || width <= 30 is true for every ordinary integer. Almost anything satisfies at least one side.",
      "Java does not support 1 <= width <= 30. Write two comparisons joined with &&."
    ],
    "tryIt": "Write valid and invalid conditions for an age from 18 through 65.",
    "check": {
      "question": "Why does width >= 1 || width <= 30 fail as an invalid-input loop condition?",
      "answer": "It remains true for every integer. Even 100 is >= 1, and even -5 is <= 30, so the loop keeps asking."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ],
    "number": 20
  },
  {
    "id": "short-circuit",
    "module": "decisions",
    "title": "Short-circuit safely",
    "summary": "The second condition may never need to run.",
    "points": [
      "a && b stops when a is false because the entire AND is already false. a || b stops when a is true because the OR is already true.",
      "Put a safety check before the expression that relies on it, such as checking an array index or a denominator.",
      "! has high precedence. Use parentheses around complex negations so the intended grouping is visible."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int total = 25;\n        int count = 0;\n        if (count != 0 && total / count > 5) {\n            System.out.println(\"High average\");\n        } else {\n            System.out.println(\"No valid average\");\n        }\n    }\n}\n"
    },
    "output": "No valid average",
    "walkthrough": [
      "count != 0 is false, so Java does not evaluate total / count.",
      "Skipping that expression prevents an integer division-by-zero error."
    ],
    "pitfalls": [
      "& and",
      "on booleans evaluate both sides; they do not provide these short-circuit guards.",
      "Reversing the two comparisons can evaluate the unsafe expression before the guard."
    ],
    "tryIt": "Write a safe condition that checks a non-null String has length greater than 3.",
    "check": {
      "question": "Does false && (10 / 0 > 2) perform the division?",
      "answer": "No. The left operand is false, so the right operand is skipped."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ],
    "number": 21
  },
  {
    "id": "comparison-bands",
    "module": "decisions",
    "title": "Order ranges and handle ties",
    "summary": "Start with a clear decision table.",
    "points": [
      "When thresholds overlap, order the tests so the most restrictive case is considered first, or use a lower-bound chain in descending order.",
      "Explicitly decide what happens at equality. The comparison < excludes the boundary; <= includes it.",
      "Floating-point results often need tolerance comparisons rather than exact equality. For simple decimal displays, formatting and computation are separate tasks."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score < 0 || score > 100) {\n            System.out.println(\"Invalid\");\n        } else if (score >= 90) {\n            System.out.println(\"A\");\n        } else if (score >= 80) {\n            System.out.println(\"B\");\n        } else {\n            System.out.println(\"Keep practising\");\n        }\n        System.out.println(Math.abs((0.1 + 0.2) - 0.3) < 0.000001);\n    }\n}\n"
    },
    "output": "B\ntrue",
    "walkthrough": [
      "Invalid scores are rejected before grading. 85 fails >= 90, then passes >= 80.",
      "The absolute difference check allows for small floating-point representation error."
    ],
    "pitfalls": [
      "Testing score >= 50 before score >= 90 in an else-if chain swallows the higher scores.",
      "This is a fictional grading scale for practising branches, not a York grading policy."
    ],
    "tryIt": "Add another band for 70 through 79 and test both endpoints.",
    "check": {
      "question": "Which test should come first in a descending threshold chain, >= 90 or >= 80?",
      "answer": ">= 90. Otherwise scores of 90 or more would already enter the >= 80 branch."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ],
    "number": 22
  },
  {
    "id": "switch",
    "module": "decisions",
    "title": "Switch on a fixed menu choice",
    "summary": "A switch selects an action for a discrete value.",
    "points": [
      "The classic switch syntax in your lectures uses case labels and break statements. break exits the switch.",
      "Without break, control can fall through into later cases. Sometimes this groups cases intentionally; often it is a bug.",
      "default handles values that match no case. A switch is useful for specific values, whereas if is convenient for ranges and mixed conditions."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int choice = 2;\n        switch (choice) {\n            case 1:\n                System.out.println(\"Check out\");\n                break;\n            case 2:\n                System.out.println(\"Return item\");\n                break;\n            default:\n                System.out.println(\"Unknown choice\");\n        }\n    }\n}\n"
    },
    "output": "Return item",
    "walkthrough": [
      "Java finds case 2, executes its statement, then break leaves the switch.",
      "default is skipped because a matching case was found."
    ],
    "pitfalls": [
      "case choice > 3 is not a classic constant case label. Use if for a range.",
      "A break inside a switch nested in a loop exits the switch, not automatically the surrounding loop."
    ],
    "tryIt": "Add a case 0 for Exit and a case 3 for Show stock.",
    "check": {
      "question": "What happens after case 1 if its break is omitted in classic switch syntax?",
      "answer": "Execution continues into the next case statements until a break or the end is reached."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Conditionals(1).ppt",
      "Week5.txt"
    ],
    "number": 23
  },
  {
    "id": "while-trace",
    "module": "loops",
    "title": "Follow a while loop one iteration at a time",
    "summary": "Check the condition, run the body, then check again.",
    "points": [
      "A while loop checks its condition before each iteration. It can therefore run zero times.",
      "Trace the value before the condition, the work performed inside the body, and the update that prepares the next check.",
      "A loop must make progress toward a stopping condition unless it is intentionally waiting for an external event."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int remaining = 3;\n        while (remaining > 0) {\n            System.out.println(\"Remaining: \" + remaining);\n            remaining--;\n        }\n        System.out.println(\"Done: \" + remaining);\n    }\n}\n"
    },
    "output": "Remaining: 3\nRemaining: 2\nRemaining: 1\nDone: 0",
    "walkthrough": [
      "With remaining = 3, the condition is true, so 3 prints and the update makes it 2.",
      "When the update finally makes it zero, the next condition fails and execution reaches Done."
    ],
    "pitfalls": [
      "Forgetting the update can create an infinite loop.",
      "A semicolon after while (condition) creates an empty loop body."
    ],
    "tryIt": "Trace the same loop starting at zero before you run it.",
    "check": {
      "question": "How many times does while (remaining > 0) run if remaining starts at -1?",
      "answer": "Zero. The very first condition is false."
    },
    "stdin": "",
    "trace": {
      "columns": [
        "Check value",
        "Condition > 0",
        "Print",
        "After update"
      ],
      "rows": [
        [
          "3",
          "true",
          "Remaining: 3",
          "2"
        ],
        [
          "2",
          "true",
          "Remaining: 2",
          "1"
        ],
        [
          "1",
          "true",
          "Remaining: 1",
          "0"
        ],
        [
          "0",
          "false",
          "Done: 0",
          "loop exits"
        ]
      ]
    },
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 24
  },
  {
    "id": "input-validation",
    "module": "loops",
    "title": "Repeat while the input is invalid",
    "summary": "Re-read the value inside the loop.",
    "points": [
      "Ask once, then loop while the input violates the allowed range. Ask again inside the loop and replace the variable.",
      "For inclusive boundaries 1 through 30, the invalid condition is width < 1 || width > 30.",
      "This example assumes the user supplies integer tokens. Checking token type with hasNextInt is an additional validation layer."
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int width = scan.nextInt();\n        while (width < 1 || width > 30) {\n            System.out.println(\"Try again\");\n            width = scan.nextInt();\n        }\n        System.out.println(\"Accepted: \" + width);\n        scan.close();\n    }\n}\n"
    },
    "output": "Try again\nTry again\nAccepted: 12",
    "walkthrough": [
      "0 is invalid, so the loop reads 31. That is invalid too, so it reads 12.",
      "Both boundaries hold for 12, making the invalid condition false."
    ],
    "pitfalls": [
      "If you do not assign the new input back to width, the condition keeps testing the old value.",
      "An inclusive valid range and an inclusive invalid range need different comparisons."
    ],
    "tryIt": "Reject negative quantities but accept zero.",
    "check": {
      "question": "Where should the repeated nextInt call go?",
      "answer": "Inside the loop, so each failed check can be followed by a new value."
    },
    "stdin": "0\n31\n12\n",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 25
  },
  {
    "id": "for-counters",
    "module": "loops",
    "title": "For loops, counters and accumulators",
    "summary": "Use the loop variable for traversal and separate variables for results.",
    "points": [
      "A for loop has initialization, condition and update. Initialization runs once; each successful check runs the body followed by the update.",
      "A counter records how many matches occurred. An accumulator records their total. They answer different questions.",
      "Use one OR condition to match multiples of 3 or 5, so values divisible by both are processed only once."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        int sum = 0;\n        for (int i = 1; i <= 15; i++) {\n            if (i % 3 == 0 || i % 5 == 0) {\n                count++;\n                sum += i;\n            }\n        }\n        System.out.println(\"Count: \" + count);\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n"
    },
    "output": "Count: 7\nSum: 60",
    "walkthrough": [
      "The matched numbers are 3, 5, 6, 9, 10, 12 and 15.",
      "count increments seven times; sum accumulates the values. 15 enters the single if block once."
    ],
    "pitfalls": [
      "Two independent if blocks can double-count multiples of both divisors.",
      "Resetting sum or count inside the loop loses earlier results."
    ],
    "tryIt": "Print the matched values as well as their count and sum.",
    "check": {
      "question": "Should count += i be used to count the number of matches?",
      "answer": "No. count++ counts matches; sum += i adds the values."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 26
  },
  {
    "id": "sentinel-average",
    "module": "loops",
    "title": "Use a sentinel without counting it",
    "summary": "A special input value can mean stop.",
    "points": [
      "A sentinel marks the end of input and is not part of the data. Choose one outside the normal data domain.",
      "Read a value before the while condition, process it only if it is not the sentinel, then read the next value.",
      "Guard count == 0 before computing an average. An empty dataset needs its own result."
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int sum = 0, count = 0;\n        int mark = scan.nextInt();\n        while (mark != -1) {\n            sum += mark;\n            count++;\n            mark = scan.nextInt();\n        }\n        if (count == 0) System.out.println(\"No marks\");\n        else System.out.printf(java.util.Locale.US, \"Average: %.1f%n\", (double) sum / count);\n        scan.close();\n    }\n}\n"
    },
    "output": "Average: 80.0",
    "walkthrough": [
      "70, 80 and 90 contribute to sum and count. The -1 is read but fails the loop condition.",
      "Casting sum before division preserves the fractional part if one exists."
    ],
    "pitfalls": [
      "Adding the sentinel before checking it corrupts the total.",
      "Using zero as the sentinel prevents you from recording a genuine score of zero."
    ],
    "tryIt": "Test the input -1 by itself. Then test 0 followed by -1.",
    "check": {
      "question": "For inputs 10, 20, -1, what should count be?",
      "answer": "2. The sentinel stops the loop and is not a data item."
    },
    "stdin": "70\n80\n90\n-1\n",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 27
  },
  {
    "id": "do-break-continue",
    "module": "loops",
    "title": "do / while, break and continue",
    "summary": "Choose control flow based on when you need the condition checked.",
    "points": [
      "do / while executes the body once before its first condition check. It is useful for a menu that must appear at least once.",
      "break exits the nearest enclosing loop or switch. continue skips the rest of the current loop iteration and moves to the next iteration step.",
      "You rarely need an else { continue; } at the bottom of a loop. Control is already about to continue."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int menu = 0;\n        do {\n            System.out.println(\"Menu shown\");\n        } while (menu != 0);\n        for (int i = 1; i <= 5; i++) {\n            if (i == 2) continue;\n            if (i == 4) break;\n            System.out.println(i);\n        }\n    }\n}\n"
    },
    "output": "Menu shown\n1\n3",
    "walkthrough": [
      "The do body runs once even though menu starts at zero.",
      "In the for loop, 2 is skipped, 3 prints, and 4 stops the loop before it can print."
    ],
    "pitfalls": [
      "The do / while statement ends with a semicolon after the condition.",
      "In a while loop, continue can skip a necessary update if you place that update at the bottom."
    ],
    "tryIt": "Write a loop that prints 1 through 10 except multiples of 3.",
    "check": {
      "question": "Does continue exit the entire loop?",
      "answer": "No. It skips the rest of the current iteration. break exits the loop."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 28
  },
  {
    "id": "nested-loops",
    "module": "loops",
    "title": "Nested loops and doubling traces",
    "summary": "Each outer iteration runs a complete inner loop.",
    "points": [
      "Trace one outer value and list every inner value before moving to the next outer value.",
      "To draw a triangle, the inner limit can depend on the current row. Row 1 prints one symbol, row 2 prints two, and so on.",
      "Updating k *= 2 means repeated doubling: 1, 2, 4, 8. It does not produce 2, 4, 6, 8, which would require += 2."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= row; col++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n        for (int k = 1; k <= 8; k *= 2) System.out.print(k + \" \");\n    }\n}\n"
    },
    "output": "*\n**\n***\n1 2 4 8 ",
    "walkthrough": [
      "row = 2 makes the inner loop use col = 1 and 2 before printing a newline.",
      "Starting at 1, four successive body visits use 1, 2, 4 and 8. The next update makes 16, failing the check."
    ],
    "pitfalls": [
      "Putting println inside the inner loop makes each symbol start a new line.",
      "For a doubling loop, count multiplication steps rather than treating k as an ordinary counter."
    ],
    "tryIt": "Trace k = 1; k <= 32; k *= 2. How many body visits occur?",
    "check": {
      "question": "Why is the kth value after t doublings 2 raised to t?",
      "answer": "Start at 1 = 2^0. Each update multiplies by another 2: after one update 2^1, then 2^2, and after t updates 2^t. This describes the updates, not k growing by two."
    },
    "stdin": "",
    "trace": {
      "columns": [
        "Outer row",
        "Inner col values",
        "Printed row"
      ],
      "rows": [
        [
          "1",
          "1",
          "*"
        ],
        [
          "2",
          "1, 2",
          "**"
        ],
        [
          "3",
          "1, 2, 3",
          "***"
        ]
      ]
    },
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Repetitions (2)(1).pptx",
      "Week6.txt"
    ],
    "number": 29
  },
  {
    "id": "methods-return",
    "module": "methods",
    "title": "Give a calculation a name",
    "summary": "A method can receive inputs and return one result.",
    "points": [
      "A method header gives the visibility, optional static modifier, return type, name and typed parameters.",
      "Arguments in the call are evaluated and their values are copied into the parameters. A return sends a value back and ends that method call.",
      "A static helper in Main can be called directly from static main. An instance method needs an appropriate object."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        double average = average(70, 90);\n        System.out.println(average);\n    }\n\n    public static double average(int a, int b) {\n        return (a + b) / 2.0;\n    }\n}\n"
    },
    "output": "80.0",
    "walkthrough": [
      "average(70, 90) calls the helper with a = 70 and b = 90.",
      "The returned 80.0 becomes the value assigned to average, then main continues."
    ],
    "pitfalls": [
      "A method cannot be declared inside another method in this course style. Put helpers inside the class but outside main.",
      "A returned value does not print itself; the caller decides how to use it."
    ],
    "tryIt": "Add a static method that converts Celsius to Fahrenheit.",
    "check": {
      "question": "What is the difference between return total and System.out.println(total)?",
      "answer": "return sends the value to the caller and ends the method. println displays text and does not return that value."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "Week1(1).txt",
      "Week7.txt"
    ],
    "number": 30
  },
  {
    "id": "scope-void",
    "module": "methods",
    "title": "Local scope and void methods",
    "summary": "A name is available only within its scope.",
    "points": [
      "A local variable declared inside a block is usable from its declaration to the end of that block, subject to Java rules. A method parameter is local to that method call.",
      "void means the method returns no value. A void method may still change an object or print output.",
      "Fields belong to objects or classes; local variables belong to individual method executions. Distinguish them before deciding where to store data."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        printBanner(\"Code lab\");\n        int total = 7;\n        System.out.println(total);\n    }\n\n    public static void printBanner(String title) {\n        System.out.println(\"=== \" + title + \" ===\");\n    }\n}\n"
    },
    "output": "=== Code lab ===\n7",
    "walkthrough": [
      "The helper receives its own title parameter and prints it.",
      "total belongs to main. The helper cannot refer to this local variable by its name."
    ],
    "pitfalls": [
      "You cannot assign the result of a void method to an int or String.",
      "A local variable declared inside an if block is not automatically usable after the block."
    ],
    "tryIt": "Write a void printReceipt method that accepts an item name and an integer quantity.",
    "check": {
      "question": "Can two different methods each declare a local variable called count?",
      "answer": "Yes. Their local scopes are separate."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "Week1(1).txt",
      "Week7.txt"
    ],
    "number": 31
  },
  {
    "id": "pass-by-value",
    "module": "methods",
    "title": "Java always passes values",
    "summary": "An object argument copies a reference value, not the entire object.",
    "points": [
      "For a primitive argument, the method receives a copy of the primitive value. Reassigning the parameter does not reassign the caller's variable.",
      "For an object or array argument, the copied value is a reference. The method can mutate the same object through that reference.",
      "Reassigning an object parameter to a new object still changes only the parameter. This distinction explains both aliasing and array mutation."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int number = 5;\n        int[] values = {5};\n        changeNumber(number);\n        changeArray(values);\n        System.out.println(number);\n        System.out.println(values[0]);\n    }\n\n    public static void changeNumber(int x) { x = 99; }\n    public static void changeArray(int[] data) {\n        data[0] = 99;\n        data = new int[] {1};\n    }\n}\n"
    },
    "output": "5\n99",
    "walkthrough": [
      "changeNumber replaces its own local copy with 99; main's number remains 5.",
      "changeArray writes into the array shared with main, then only reassigns its local reference."
    ],
    "pitfalls": [
      "Java does not switch to pass-by-reference for objects. It passes reference values by value.",
      "Reassigning data = new int[] {...} inside the helper does not replace the caller's array variable."
    ],
    "tryIt": "Add a second array element and mutate it inside a helper.",
    "check": {
      "question": "If a method executes list = new int[3], does that reassign the caller's list variable?",
      "answer": "No. It reassigns the method's local parameter. Mutating list[0] would affect the shared array."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "Week1(1).txt",
      "Week7.txt"
    ],
    "number": 32
  },
  {
    "id": "overloading-design",
    "module": "methods",
    "title": "Overload by parameters; split by responsibility",
    "summary": "One method name can support several parameter lists.",
    "points": [
      "Overloaded methods share a name but have different parameter type lists or different numbers of parameters. Changing only the return type is insufficient.",
      "Choose helpers based on responsibilities such as calculateTotal, findBook and printReport. A long main often becomes easier to test when calculations are separated from input/output.",
      "A method signature includes the name and parameter types for these simple examples. The return type and parameter names are not what distinguish overloads."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(area(4));\n        System.out.println(area(4, 3));\n    }\n\n    public static int area(int side) { return side * side; }\n    public static int area(int width, int height) { return width * height; }\n}\n"
    },
    "output": "16\n12",
    "walkthrough": [
      "area(4) selects the overload with one int parameter.",
      "area(4, 3) selects the two-parameter overload."
    ],
    "pitfalls": [
      "int area(int x) and double area(int y) cannot coexist as distinct overloads.",
      "Do not overload unrelated operations merely because a name is available."
    ],
    "tryIt": "Write total(int quantity, int unitCents) and total(int quantity, int unitCents, int feeCents).",
    "check": {
      "question": "Can parameter names alone distinguish overloads?",
      "answer": "No. The parameter type list must differ."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "Week1(1).txt",
      "Week7.txt"
    ],
    "number": 33
  },
  {
    "id": "class-state",
    "module": "classes",
    "title": "A class describes state and behaviour",
    "summary": "Each object gets its own instance fields.",
    "points": [
      "A class is a type definition. An object is an instance created from it. Fields store state; methods provide behaviour.",
      "Two objects of the same class share method definitions but normally keep separate instance values.",
      "A driver class has main and creates objects to exercise their methods. The driver should use the public interface rather than reach into private fields."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Equipment camera = new Equipment(\"Camera\", 4);\n        Equipment mic = new Equipment(\"Microphone\", 1);\n        camera.checkout();\n        System.out.println(camera);\n        System.out.println(mic);\n    }\n}\n",
      "Equipment.java": "public class Equipment {\n    private String name;\n    private int quantity;\n    public Equipment(String name, int quantity) {\n        this.name = name;\n        this.quantity = quantity;\n    }\n    public void checkout() { if (quantity > 0) quantity--; }\n    public String toString() { return name + \": \" + quantity; }\n}\n"
    },
    "output": "Camera: 3\nMicrophone: 1",
    "walkthrough": [
      "new Equipment creates two separate objects with their own quantity fields.",
      "Checking out one camera reduces the camera quantity while the microphone quantity remains unchanged."
    ],
    "pitfalls": [
      "new is what creates the object; declaring a reference variable alone does not create an instance.",
      "Fields declared static are shared by the class, unlike these instance fields."
    ],
    "tryIt": "Create a third equipment item and verify its count is independent.",
    "check": {
      "question": "How many quantity fields exist for two distinct Equipment objects?",
      "answer": "Two instance fields, one in each object."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 34
  },
  {
    "id": "constructors-this",
    "module": "classes",
    "title": "Constructors and this",
    "summary": "A constructor initializes a newly created object.",
    "points": [
      "A constructor has exactly the class name and no return type, not even void. A parameterized constructor can receive the starting state.",
      "this refers to the current object. In this.name = name, this.name is the field and name is the parameter.",
      "Java provides a default no-argument constructor only when the class declares no constructors. Once you declare a constructor, add any other forms you need yourself."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Course course = new Course(\"Java Lab\");\n        System.out.println(course.getName());\n    }\n}\n",
      "Course.java": "public class Course {\n    private String name;\n    public Course(String name) { this.name = name; }\n    public String getName() { return name; }\n}\n"
    },
    "output": "Java Lab",
    "walkthrough": [
      "The parameter named name shadows the field. this.name identifies the object's field explicitly.",
      "new Course(\"Java Lab\") invokes this one-parameter constructor."
    ],
    "pitfalls": [
      "public void Course(...) declares a method rather than a constructor.",
      "Writing one parameterized constructor does not automatically leave a Course() constructor available."
    ],
    "tryIt": "Add a no-argument constructor that delegates to this(\"Untitled\").",
    "check": {
      "question": "Does a class with only Course(String name) automatically support new Course()?",
      "answer": "No. The compiler only generates the default constructor when no constructors are declared."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 35
  },
  {
    "id": "encapsulation",
    "module": "classes",
    "title": "Protect state with methods",
    "summary": "A private field can enforce rules through a public operation.",
    "points": [
      "Encapsulation groups state with the methods that manage it. A private field cannot be accessed directly from an unrelated driver class.",
      "A getter returns information; a mutator changes state. A well-designed mutator can reject an invalid change and report whether it succeeded.",
      "No access modifier means package access, not public. protected is introduced as vocabulary; inheritance is outside the main scope of these materials."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Stock stock = new Stock(5);\n        System.out.println(stock.checkout(9));\n        System.out.println(stock.checkout(2));\n        System.out.println(stock.getCount());\n    }\n}\n",
      "Stock.java": "public class Stock {\n    private int count;\n    public Stock(int count) { this.count = Math.max(0, count); }\n    public int getCount() { return count; }\n    public boolean checkout(int amount) {\n        if (amount <= 0 || amount > count) return false;\n        count -= amount;\n        return true;\n    }\n}\n"
    },
    "output": "false\ntrue\n3",
    "walkthrough": [
      "checkout(9) fails because only five items are available, preserving stock.",
      "checkout(2) succeeds, reducing stock to three. The boolean return tells the caller what happened."
    ],
    "pitfalls": [
      "A setter that blindly accepts any value does not protect an invariant such as stock >= 0.",
      "A constructor should also establish valid starting state. This example clamps a negative initial count to zero."
    ],
    "tryIt": "Add a returnItems method that rejects nonpositive amounts.",
    "check": {
      "question": "Why return a boolean from checkout?",
      "answer": "The caller can distinguish a successful checkout from a rejected request."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 36
  },
  {
    "id": "aliases-static",
    "module": "classes",
    "title": "References, aliases and static fields",
    "summary": "Two references can point to one object; static data belongs to the class.",
    "points": [
      "Assigning one reference variable to another copies the reference value. Both variables may then refer to the same object; they are aliases.",
      "An instance field belongs to an individual object. A static field is shared at the class level and can count how many objects were created.",
      "When an object becomes unreachable, it is eligible for garbage collection. Collection timing is not something this course code controls."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = a;\n        b.setValue(9);\n        Counter other = new Counter();\n        System.out.println(a.getValue());\n        System.out.println(Counter.getCreated());\n    }\n}\n",
      "Counter.java": "public class Counter {\n    private int value;\n    private static int created;\n    public Counter() { created++; }\n    public void setValue(int value) { this.value = value; }\n    public int getValue() { return value; }\n    public static int getCreated() { return created; }\n}\n"
    },
    "output": "9\n2",
    "walkthrough": [
      "b = a creates an alias, not a copied Counter object. Updating b.value changes the object a also refers to.",
      "Only two new expressions run, so the static created field is 2."
    ],
    "pitfalls": [
      "Assigning a reference does not clone the object.",
      "Do not mark every field static just to access it from main. That would merge state that should belong to separate objects."
    ],
    "tryIt": "Create a second independent counter and show that modifying one does not modify the other.",
    "check": {
      "question": "How many objects are created by Counter a = new Counter(); Counter b = a;?",
      "answer": "One. b receives a copy of the reference to that object."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 37
  },
  {
    "id": "tostring-api",
    "module": "classes",
    "title": "Read a class API and write toString",
    "summary": "An API describes the operations a caller may use.",
    "points": [
      "A class API lists constructors, methods and their parameter/return types. The caller can use this contract without knowing the private implementation.",
      "public String toString() returns a readable representation. println(object) uses it automatically for a non-null object.",
      "toString should return text rather than print it. Keeping output decisions in the caller makes the object reusable."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Ticket ticket = new Ticket(\"A12\");\n        System.out.println(ticket);\n    }\n}\n",
      "Ticket.java": "public class Ticket {\n    private String id;\n    private boolean open = true;\n    public Ticket(String id) { this.id = id; }\n    public String toString() {\n        return \"Ticket \" + id + \": \" + (open ? \"OPEN\" : \"CLOSED\");\n    }\n}\n"
    },
    "output": "Ticket A12: OPEN",
    "walkthrough": [
      "The driver creates a Ticket through its constructor, then println obtains its textual representation.",
      "The helper returns text and does not itself write to the console."
    ],
    "pitfalls": [
      "ToString and tostring do not match the required toString name.",
      "An API declaration in lecture notes may omit implementation. It is not necessarily a complete source file you can compile."
    ],
    "tryIt": "Add a close method and make toString show CLOSED after calling it.",
    "check": {
      "question": "Why is public void toString() wrong for the Object method?",
      "answer": "The required method returns String. void gives it an incompatible return type."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 38
  },
  {
    "id": "aggregation-design",
    "module": "classes",
    "title": "Design a has-a relationship",
    "summary": "Split the problem into objects with clear responsibilities.",
    "points": [
      "A dependency means one class uses another. Aggregation describes a has-a relationship, such as a Member storing a reference to an Address.",
      "Start with requirements, identify data and operations, assign them to classes, then test the interactions. A small UML-style table can list class, fields and public methods.",
      "Inheritance is an is-a relationship introduced for contrast in the lecture; detailed inheritance belongs to the next course. A library holding books is a has-a relationship."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Address address = new Address(\"Toronto\");\n        Member member = new Member(\"Reza\", address);\n        System.out.println(member);\n    }\n}\n",
      "Address.java": "public class Address {\n    private String city;\n    public Address(String city) { this.city = city; }\n    public String getCity() { return city; }\n}\n",
      "Member.java": "public class Member {\n    private String name;\n    private Address address;\n    public Member(String name, Address address) { this.name = name; this.address = address; }\n    public String toString() { return name + \" @ \" + address.getCity(); }\n}\n"
    },
    "output": "Reza @ Toronto",
    "walkthrough": [
      "Member stores a reference to Address rather than copying city handling into every method.",
      "Member.toString asks the Address object for its city through a method."
    ],
    "pitfalls": [
      "A class with many unrelated responsibilities becomes hard to test.",
      "A has-a relationship does not require extends. Use a field containing the other object."
    ],
    "tryIt": "Plan Book, Library and Main. Decide which class owns availability and which owns the catalogue.",
    "check": {
      "question": "Should Book or Library own the availability of one book?",
      "answer": "Book should own that book's availability. Library manages the collection and delegates state changes through Book methods."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 39
  },
  {
    "id": "object-parameters",
    "module": "classes",
    "title": "Return a new object from an operation",
    "summary": "An operation can combine two objects and return a third.",
    "points": [
      "A method can accept another object of the same class. Read the other object through its API or appropriate same-class access.",
      "Decide whether an operation changes the receiver or returns a new object. Clear method contracts avoid surprising changes.",
      "Rational-number examples in OODesign use this pattern. This smaller point example makes the data flow visible without fraction arithmetic."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        Point2 a = new Point2(3, 4);\n        Point2 b = new Point2(2, 3);\n        Point2 c = a.plus(b);\n        System.out.println(a);\n        System.out.println(c);\n    }\n}\n",
      "Point2.java": "public class Point2 {\n    private int x, y;\n    public Point2(int x, int y) { this.x = x; this.y = y; }\n    public Point2 plus(Point2 other) { return new Point2(x + other.x, y + other.y); }\n    public String toString() { return x + \",\" + y; }\n}\n"
    },
    "output": "3,4\n5,7",
    "walkthrough": [
      "a.plus(b) reads coordinates from both objects and constructs a new Point2 result.",
      "The original point a still prints 3,4, while the returned point has summed coordinates."
    ],
    "pitfalls": [
      "Returning a new object and mutating this are different contracts. State which one your method follows.",
      "A null argument cannot have its fields or methods read without a guard or a documented precondition."
    ],
    "tryIt": "Add a minus method that returns a new point without changing either operand.",
    "check": {
      "question": "After Point2 c = a.plus(b), is c necessarily the same object as a?",
      "answer": "No. This implementation returns a new Point2 object."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Classes (2)(1).pptx",
      "OODesign (2).ppt",
      "Week4.txt",
      "Week7.txt"
    ],
    "number": 40
  },
  {
    "id": "array-basics",
    "module": "arrays",
    "title": "Arrays store a fixed number of elements",
    "summary": "Use one variable name and an index to access related values.",
    "points": [
      "int[] marks = new int[3] creates three int elements initialized to zero. An initializer such as {70, 80, 90} gives the values immediately.",
      "Valid indexes are 0 through marks.length - 1. The length is fixed after creation.",
      "An array variable is a reference. new Book[3] creates three reference slots initialized to null; it does not create three Book objects."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] marks = {70, 80, 90};\n        marks[1] = 85;\n        System.out.println(marks.length);\n        System.out.println(marks[0]);\n        System.out.println(marks[1]);\n    }\n}\n"
    },
    "output": "3\n70\n85",
    "walkthrough": [
      "marks[1] selects the second element because indexes start at zero.",
      "Changing an element does not change the fixed length of the array."
    ],
    "pitfalls": [
      "The final valid index is length - 1, not length.",
      "Arrays use .length, while ArrayList uses .size() and String uses .length()."
    ],
    "tryIt": "Create an array of five equipment counts and update its final element.",
    "check": {
      "question": "What are the default values in new int[2] and new String[2]?",
      "answer": "The int elements are 0. The String reference elements are null."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 41
  },
  {
    "id": "array-traversal",
    "module": "arrays",
    "title": "Traverse, total and reverse an array",
    "summary": "Choose an indexed loop when the position matters.",
    "points": [
      "for (int i = 0; i < data.length; i++) visits every valid index. Use i < length to stop before the first invalid position.",
      "An enhanced for loop visits values directly and is convenient for reading totals. Reassigning its primitive loop variable does not replace array elements.",
      "To traverse backward, start at length - 1 and continue while i >= 0."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] counts = {3, 5, 2};\n        int total = 0;\n        for (int value : counts) total += value;\n        System.out.println(\"Total: \" + total);\n        for (int i = counts.length - 1; i >= 0; i--) System.out.println(counts[i]);\n    }\n}\n"
    },
    "output": "Total: 10\n2\n5\n3",
    "walkthrough": [
      "The enhanced loop adds 3, then 5, then 2.",
      "The reverse loop uses indexes 2, 1 and 0."
    ],
    "pitfalls": [
      "i <= data.length performs one extra iteration and fails.",
      "int max = 0 gives the wrong maximum for an array containing only negative values. Initialize from the first element when nonempty."
    ],
    "tryIt": "Compute the minimum and maximum of {-8, -3, -10}.",
    "check": {
      "question": "Does for (int x : values) { x = 0; } zero an int array?",
      "answer": "No. x is a local copy of each primitive element. Use indexed assignment values[i] = 0."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 42
  },
  {
    "id": "linear-search",
    "module": "arrays",
    "title": "Search until you find the target",
    "summary": "An index can report both where a value was found and whether it was found.",
    "points": [
      "Linear search checks elements one at a time. It works on unsorted arrays.",
      "Return the matching index as soon as you find it. Use -1 to report no match because it is not a valid array index.",
      "Searching objects often means comparing a field, such as book.getId() or book.getTitle().equals(query), rather than comparing the entire reference."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] ids = {402, 117, 305};\n        System.out.println(indexOf(ids, 117));\n        System.out.println(indexOf(ids, 999));\n    }\n\n    public static int indexOf(int[] ids, int target) {\n        for (int i = 0; i < ids.length; i++) {\n            if (ids[i] == target) return i;\n        }\n        return -1;\n    }\n}\n"
    },
    "output": "1\n-1",
    "walkthrough": [
      "The first call checks 402, then matches 117 at index 1 and returns.",
      "The second checks every element and then reaches return -1."
    ],
    "pitfalls": [
      "Returning -1 inside the first unmatched iteration stops the search too early.",
      "Always check a returned index is not -1 before indexing the array."
    ],
    "tryIt": "Search an array containing repeated values and confirm that this method returns the first occurrence.",
    "check": {
      "question": "Does linear search require sorted input?",
      "answer": "No. It simply checks each element."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 43
  },
  {
    "id": "bubble-sort",
    "module": "arrays",
    "title": "Bubble sort by swapping neighbours",
    "summary": "A pass moves the largest remaining value to the right.",
    "points": [
      "Compare adjacent elements and swap them when they are out of ascending order. Use a temporary variable to preserve one value during the swap.",
      "After each complete left-to-right pass, the final position of the remaining unsorted region is settled. Shrink the inner boundary by one.",
      "Bubble sort is included because your weekly examples use it. For ordinary library work, Arrays.sort is available, but practising the loop teaches the algorithm."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {9, 2, 5};\n        for (int end = values.length - 1; end > 0; end--) {\n            for (int i = 0; i < end; i++) {\n                if (values[i] > values[i + 1]) {\n                    int temp = values[i];\n                    values[i] = values[i + 1];\n                    values[i + 1] = temp;\n                }\n            }\n        }\n        System.out.println(java.util.Arrays.toString(values));\n    }\n}\n"
    },
    "output": "[2, 5, 9]",
    "walkthrough": [
      "The first comparison swaps 9 and 2, producing [2, 9, 5].",
      "The next swaps 9 and 5, leaving the largest value at the end. A second pass confirms 2 and 5 are ordered."
    ],
    "pitfalls": [
      "i + 1 must remain below the array length; this is why the loop uses i < end.",
      "Assigning one element over another before saving a temporary value loses data."
    ],
    "tryIt": "Change the comparison to sort descending and explain the change.",
    "check": {
      "question": "What is guaranteed after the first complete ascending bubble-sort pass?",
      "answer": "A largest value from the array has reached the final position."
    },
    "stdin": "",
    "trace": {
      "columns": [
        "Comparison",
        "Action",
        "Array"
      ],
      "rows": [
        [
          "9 vs 2",
          "swap",
          "[2, 9, 5]"
        ],
        [
          "9 vs 5",
          "swap",
          "[2, 5, 9]"
        ],
        [
          "2 vs 5",
          "keep",
          "[2, 5, 9]"
        ]
      ]
    },
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 44
  },
  {
    "id": "array-utilities",
    "module": "arrays",
    "title": "Copy, sort and search with Arrays",
    "summary": "Know when two variables share one array and when you need a copy.",
    "points": [
      "b = a makes two references point to one array. Arrays.copyOf makes a distinct array container with copied elements.",
      "Arrays.sort sorts the supplied array in place. Arrays.binarySearch requires matching sorted order and returns an index on success or a negative insertion encoding on failure.",
      "For arrays of objects, copying the array still copies references to the same contained objects. It is a shallow copy."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] original = {8, 3, 5};\n        int[] copy = java.util.Arrays.copyOf(original, original.length);\n        java.util.Arrays.sort(copy);\n        System.out.println(java.util.Arrays.toString(original));\n        System.out.println(java.util.Arrays.toString(copy));\n        System.out.println(java.util.Arrays.binarySearch(copy, 5));\n    }\n}\n"
    },
    "output": "[8, 3, 5]\n[3, 5, 8]\n1",
    "walkthrough": [
      "Only the new array is sorted, leaving original unchanged.",
      "In [3, 5, 8], binarySearch finds 5 at index 1."
    ],
    "pitfalls": [
      "binarySearch on unsorted input has no useful search guarantee.",
      "A negative result from Arrays.binarySearch is not always -1; check result >= 0 for success."
    ],
    "tryIt": "Compare the behaviour of alias = original with copyOf by mutating one element.",
    "check": {
      "question": "Does Arrays.sort return the sorted array?",
      "answer": "No. It returns void and sorts the supplied array in place."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 45
  },
  {
    "id": "two-dim-arrays",
    "module": "arrays",
    "title": "Rows and columns are separate indexes",
    "summary": "A 2-D array is an array of row arrays.",
    "points": [
      "Use table[row][col] to select one element. table.length is the number of rows; table[row].length is the width of that particular row.",
      "Each row can have a different length, so use the actual current row length in your inner loop.",
      "Nested loops are natural for row totals, seat maps and equipment counts across rooms."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[][] rooms = {{2, 3}, {4, 1, 2}};\n        for (int row = 0; row < rooms.length; row++) {\n            int total = 0;\n            for (int col = 0; col < rooms[row].length; col++) total += rooms[row][col];\n            System.out.println(\"Room \" + row + \": \" + total);\n        }\n    }\n}\n"
    },
    "output": "Room 0: 5\nRoom 1: 7",
    "walkthrough": [
      "The first row visits columns 0 and 1. The second visits 0, 1 and 2.",
      "total is reset once per row to keep the room results independent."
    ],
    "pitfalls": [
      "Using table.length for both loops confuses row count with column count.",
      "A row reference can itself be null if you create only the outer array without filling its rows."
    ],
    "tryIt": "Compute a grand total as well as the per-room totals.",
    "check": {
      "question": "What does table[2].length mean?",
      "answer": "The number of elements in row index 2, which is the third row."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 46
  },
  {
    "id": "object-arrays",
    "module": "arrays",
    "title": "Manage a catalogue with an array and a count",
    "summary": "Capacity and the number of real entries are different quantities.",
    "points": [
      "new Book[100] reserves 100 reference slots. A separate count records how many slots actually contain catalogue entries.",
      "Add at data[count], then increment count. Process indexes from zero up to count - 1, rather than dereferencing all the unused null slots.",
      "Before adding, check count < data.length. This fixed-capacity pattern connects directly to the library mock."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String[] titles = new String[5];\n        int count = 0;\n        titles[count++] = \"Java basics\";\n        titles[count++] = \"Network lab\";\n        System.out.println(count + \" / \" + titles.length);\n        for (int i = 0; i < count; i++) System.out.println(titles[i]);\n    }\n}\n"
    },
    "output": "2 / 5\nJava basics\nNetwork lab",
    "walkthrough": [
      "The array has capacity 5 but only two titles have been added.",
      "The traversal uses count to avoid the three remaining null slots."
    ],
    "pitfalls": [
      "array.length is capacity; count is the occupied prefix in this design.",
      "Incrementing count before assignment can skip slot zero or step outside the intended range."
    ],
    "tryIt": "Replace the title Strings with Book objects and call a getter during traversal.",
    "check": {
      "question": "Why can for-each over a partly filled Book[] cause NullPointerException?",
      "answer": "It also visits unused slots containing null, so calling a method on those slots fails."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 47
  },
  {
    "id": "arraylist",
    "module": "arrays",
    "title": "ArrayList grows as you add elements",
    "summary": "Use methods rather than indexes in square brackets.",
    "points": [
      "ArrayList<T> stores references and manages its size as elements are added and removed. Use wrapper types such as Integer for primitive-like values.",
      "add appends, get reads, set replaces, remove deletes and shifts later positions. size() reports the current element count.",
      "An ArrayList is covered in Week10. It is a useful alternative to the fixed array plus count, but practise both patterns."
    ],
    "files": {
      "Main.java": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> tasks = new ArrayList<>();\n        tasks.add(\"Check projector\");\n        tasks.add(\"Open gates\");\n        tasks.set(0, \"Check audio\");\n        tasks.remove(1);\n        System.out.println(tasks.size());\n        System.out.println(tasks.get(0));\n    }\n}\n"
    },
    "output": "1\nCheck audio",
    "walkthrough": [
      "After two adds, the list holds two items. set replaces the first without growing the list.",
      "remove(1) deletes the second item, so size becomes one."
    ],
    "pitfalls": [
      "ArrayList<int> is invalid; use ArrayList<Integer>.",
      "On ArrayList<Integer>, remove(1) removes index 1. remove(Integer.valueOf(1)) removes a matching value."
    ],
    "tryIt": "Create an ArrayList<Integer> of scores, remove a score by value and compute an average.",
    "check": {
      "question": "Which methods replace array.length and array[i] for an ArrayList?",
      "answer": "list.size() and list.get(i). To replace an element, use list.set(i, value)."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 48
  },
  {
    "id": "frequency-shuffle",
    "module": "arrays",
    "title": "Count categories and shuffle fairly",
    "summary": "Arrays can be counters, and swapping can randomize order.",
    "points": [
      "If categories are small nonnegative integers, use the category as an index into a count array. Increment one element for each input item.",
      "To uniformly shuffle with the usual pseudorandom model, use Fisher–Yates: for i from the last index down to 1, choose j uniformly from 0 through i and swap.",
      "A fixed seed makes this demonstration repeatable. Counting should not change the original values; shuffling changes their order in place."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] categories = {0, 2, 2, 1, 0};\n        int[] frequency = new int[3];\n        for (int c : categories) frequency[c]++;\n        System.out.println(java.util.Arrays.toString(frequency));\n        java.util.Random random = new java.util.Random(7);\n        for (int i = categories.length - 1; i > 0; i--) {\n            int j = random.nextInt(i + 1);\n            int temp = categories[i]; categories[i] = categories[j]; categories[j] = temp;\n        }\n        java.util.Arrays.sort(categories);\n        System.out.println(java.util.Arrays.toString(categories));\n    }\n}\n"
    },
    "output": "[2, 1, 2]\n[0, 0, 1, 2, 2]",
    "walkthrough": [
      "Each category value selects the matching frequency slot.",
      "The shuffle visits each shrinking suffix position once. Sorting only afterward verifies that all the original values are still present."
    ],
    "pitfalls": [
      "Validate category bounds if the input is not guaranteed to fit the counter array.",
      "A few random swaps do not necessarily produce an unbiased shuffle."
    ],
    "tryIt": "Print the shuffled array before sorting it, then remove the seed and compare runs.",
    "check": {
      "question": "Why is nextInt(i + 1) used in the shuffle?",
      "answer": "The selection must include all indexes from 0 through i, including i itself."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 49
  },
  {
    "id": "resizing",
    "module": "arrays",
    "title": "Grow a full array without losing entries",
    "summary": "Arrays have fixed length, so growing means replacing the container.",
    "points": [
      "When count reaches array.length, create a larger array and copy existing elements. Reassign the array reference to the new container.",
      "Arrays.copyOf can perform the copy. Existing elements keep their positions. New reference slots are null and new int slots are zero.",
      "When copying an object array, the contained objects are shared through copied references. This is the strategy behind the expanding collection example in Week10."
    ],
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String[] titles = new String[2];\n        int count = 0;\n        titles[count++] = \"Java\";\n        titles[count++] = \"Networks\";\n        if (count == titles.length) titles = java.util.Arrays.copyOf(titles, Math.max(1, titles.length * 2));\n        titles[count++] = \"Linux\";\n        System.out.println(count + \" / \" + titles.length);\n        for (int i = 0; i < count; i++) System.out.println(titles[i]);\n    }\n}\n"
    },
    "output": "3 / 4\nJava\nNetworks\nLinux",
    "walkthrough": [
      "The full two-slot array is copied to a four-slot array before index 2 is used.",
      "count grows from two to three, while capacity grows from two to four."
    ],
    "pitfalls": [
      "Doubling a zero-length array leaves it zero length unless you choose a minimum capacity.",
      "Replacing the container does not deep-clone its contained objects."
    ],
    "tryIt": "Wrap this pattern in a Catalogue.add method and test a resize at the exact boundary.",
    "check": {
      "question": "Does the original array physically become larger?",
      "answer": "No. A new array is created, existing values are copied, and the variable is reassigned."
    },
    "stdin": "",
    "trace": null,
    "pattern": null,
    "minutes": 6,
    "sources": [
      "Week8.txt",
      "Week9.txt",
      "Week10.txt"
    ],
    "number": 50
  }
];

export const referenceEntries = [
  {
    "id": "println",
    "category": "Input & output",
    "name": "System.out.println(value)",
    "description": "Print a value and move to the next line.",
    "snippet": "System.out.println(\"Lab ready\");",
    "output": "Lab ready",
    "gotcha": "A newline is added after the value.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Lab ready\");\n    }\n}\n"
    }
  },
  {
    "id": "print",
    "category": "Input & output",
    "name": "System.out.print(value)",
    "description": "Print without adding a line separator.",
    "snippet": "System.out.print(\"A\");\nSystem.out.print(\"B\");",
    "output": "AB",
    "gotcha": "The next print starts at the current position.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.print(\"A\");\n        System.out.print(\"B\");\n    }\n}\n"
    }
  },
  {
    "id": "printf",
    "category": "Input & output",
    "name": "System.out.printf(format, values)",
    "description": "Format text and numbers.",
    "snippet": "System.out.printf(java.util.Locale.US, \"%s: %.2f%n\", \"Price\", 7.5);",
    "output": "Price: 7.50",
    "gotcha": "Use %n for a line separator; %.2f expects a floating-point value.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.printf(java.util.Locale.US, \"%s: %.2f%n\", \"Price\", 7.5);\n    }\n}\n"
    }
  },
  {
    "id": "printf-int",
    "category": "Input & output",
    "name": "%d, %s, %b, %% and %n",
    "description": "Use placeholders matching your values.",
    "snippet": "System.out.printf(\"%d %s %b 100%%%n\", 3, \"nets\", true);",
    "output": "3 nets true 100%",
    "gotcha": "%% prints a percent sign without consuming a value.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.printf(\"%d %s %b 100%%%n\", 3, \"nets\", true);\n    }\n}\n"
    }
  },
  {
    "id": "scanner-int",
    "category": "Input & output",
    "name": "scan.nextInt()",
    "description": "Read an integer token.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"42\");\nSystem.out.println(scan.nextInt());\nscan.close();",
    "output": "42",
    "gotcha": "The remainder of the line, including a following newline, is not consumed.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"42\");\n        System.out.println(scan.nextInt());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-double",
    "category": "Input & output",
    "name": "scan.nextDouble()",
    "description": "Read a decimal token.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"3.75\").useLocale(java.util.Locale.US);\nSystem.out.println(scan.nextDouble());\nscan.close();",
    "output": "3.75",
    "gotcha": "Scanner numeric formats depend on locale. Examples use decimal points.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"3.75\").useLocale(java.util.Locale.US);\n        System.out.println(scan.nextDouble());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-long",
    "category": "Input & output",
    "name": "scan.nextLong()",
    "description": "Read a 64-bit integer token.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"3000000000\");\nSystem.out.println(scan.nextLong());\nscan.close();",
    "output": "3000000000",
    "gotcha": "Use long for integer values outside int range.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"3000000000\");\n        System.out.println(scan.nextLong());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-next",
    "category": "Input & output",
    "name": "scan.next()",
    "description": "Read the next whitespace-delimited token.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"Reza H\");\nSystem.out.println(scan.next());\nscan.close();",
    "output": "Reza",
    "gotcha": "This returns one token, not the entire name line.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"Reza H\");\n        System.out.println(scan.next());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-line",
    "category": "Input & output",
    "name": "scan.nextLine()",
    "description": "Read the remainder of the current line.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"Reza Heidarpoor\\n\");\nSystem.out.println(scan.nextLine());\nscan.close();",
    "output": "Reza Heidarpoor",
    "gotcha": "After a numeric read, the remainder of that line may be empty.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"Reza Heidarpoor\\n\");\n        System.out.println(scan.nextLine());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-has",
    "category": "Input & output",
    "name": "scan.hasNextInt()",
    "description": "Check whether the next token can be read as int.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"hello 7\");\nSystem.out.println(scan.hasNextInt());\nscan.next();\nSystem.out.println(scan.nextInt());\nscan.close();",
    "output": "false\n7",
    "gotcha": "hasNextInt does not consume a bad token. Consume it before trying again.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"hello 7\");\n        System.out.println(scan.hasNextInt());\n        scan.next();\n        System.out.println(scan.nextInt());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "scanner-close",
    "category": "Input & output",
    "name": "scan.close()",
    "description": "Close this scanner and its closeable input source.",
    "snippet": "java.util.Scanner scan = new java.util.Scanner(\"7\");\nSystem.out.println(scan.nextInt());\nscan.close();",
    "output": "7",
    "gotcha": "Closing a Scanner on System.in closes that input stream for the current JVM.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Scanner scan = new java.util.Scanner(\"7\");\n        System.out.println(scan.nextInt());\n        scan.close();\n    }\n}\n"
    }
  },
  {
    "id": "currency",
    "category": "Input & output",
    "name": "NumberFormat.getCurrencyInstance(locale)",
    "description": "Obtain a locale-specific currency formatter.",
    "snippet": "java.text.NumberFormat fmt = java.text.NumberFormat.getCurrencyInstance(java.util.Locale.CANADA);\nSystem.out.println(fmt.format(12.5));",
    "output": "$12.50",
    "gotcha": "format returns a String; it does not alter the original amount.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.text.NumberFormat fmt = java.text.NumberFormat.getCurrencyInstance(java.util.Locale.CANADA);\n        System.out.println(fmt.format(12.5));\n    }\n}\n"
    }
  },
  {
    "id": "percent",
    "category": "Input & output",
    "name": "NumberFormat.getPercentInstance(locale)",
    "description": "Format a ratio as a percentage.",
    "snippet": "java.text.NumberFormat fmt = java.text.NumberFormat.getPercentInstance(java.util.Locale.US);\nSystem.out.println(fmt.format(0.85));",
    "output": "85%",
    "gotcha": "Pass 0.85 for 85%, not 85.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.text.NumberFormat fmt = java.text.NumberFormat.getPercentInstance(java.util.Locale.US);\n        System.out.println(fmt.format(0.85));\n    }\n}\n"
    }
  },
  {
    "id": "decimal-format",
    "category": "Input & output",
    "name": "new DecimalFormat(\"0.00\")",
    "description": "Apply a decimal display pattern.",
    "snippet": "java.text.DecimalFormat fmt = new java.text.DecimalFormat(\"0.00\", java.text.DecimalFormatSymbols.getInstance(java.util.Locale.US));\nSystem.out.println(fmt.format(2.5));",
    "output": "2.50",
    "gotcha": "0 requires a displayed digit; # is optional. Formatting rounds for display.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.text.DecimalFormat fmt = new java.text.DecimalFormat(\"0.00\", java.text.DecimalFormatSymbols.getInstance(java.util.Locale.US));\n        System.out.println(fmt.format(2.5));\n    }\n}\n"
    }
  },
  {
    "id": "string-length",
    "category": "Strings",
    "name": "text.length()",
    "description": "Get the number of UTF-16 code units.",
    "snippet": "String text = \"Java\";\nSystem.out.println(text.length());",
    "output": "4",
    "gotcha": "Some visible characters, such as many emoji, occupy two code units.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        System.out.println(text.length());\n    }\n}\n"
    }
  },
  {
    "id": "char-at",
    "category": "Strings",
    "name": "text.charAt(index)",
    "description": "Read the char at an index.",
    "snippet": "System.out.println(\"Java\".charAt(2));",
    "output": "v",
    "gotcha": "Indexes run from 0 through length() - 1.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java\".charAt(2));\n    }\n}\n"
    }
  },
  {
    "id": "substring-range",
    "category": "Strings",
    "name": "text.substring(start, end)",
    "description": "Extract a half-open range.",
    "snippet": "System.out.println(\"ITEC1620\".substring(4, 8));",
    "output": "1620",
    "gotcha": "start is included; end is excluded.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"ITEC1620\".substring(4, 8));\n    }\n}\n"
    }
  },
  {
    "id": "substring-tail",
    "category": "Strings",
    "name": "text.substring(start)",
    "description": "Extract from start to the end.",
    "snippet": "System.out.println(\"YU12345\".substring(2));",
    "output": "12345",
    "gotcha": "An index equal to length() gives an empty String.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"YU12345\".substring(2));\n    }\n}\n"
    }
  },
  {
    "id": "equals",
    "category": "Strings",
    "name": "text.equals(other)",
    "description": "Compare String content exactly.",
    "snippet": "String a = new String(\"Java\");\nSystem.out.println(a.equals(\"Java\"));",
    "output": "true",
    "gotcha": "== compares references for objects; it is not the general text comparison.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\");\n        System.out.println(a.equals(\"Java\"));\n    }\n}\n"
    }
  },
  {
    "id": "equals-ignore",
    "category": "Strings",
    "name": "text.equalsIgnoreCase(other)",
    "description": "Compare content without case distinctions.",
    "snippet": "System.out.println(\"YES\".equalsIgnoreCase(\"yes\"));",
    "output": "true",
    "gotcha": "This is not a full locale-sensitive natural-language comparison.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"YES\".equalsIgnoreCase(\"yes\"));\n    }\n}\n"
    }
  },
  {
    "id": "compareto",
    "category": "Strings",
    "name": "text.compareTo(other)",
    "description": "Compare lexicographic ordering.",
    "snippet": "System.out.println(\"Alpha\".compareTo(\"Beta\") < 0);",
    "output": "true",
    "gotcha": "Check the sign. The result is not limited to -1, 0 and 1.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Alpha\".compareTo(\"Beta\") < 0);\n    }\n}\n"
    }
  },
  {
    "id": "upper",
    "category": "Strings",
    "name": "text.toUpperCase()",
    "description": "Return uppercase text.",
    "snippet": "System.out.println(\"java\".toUpperCase(java.util.Locale.ROOT));",
    "output": "JAVA",
    "gotcha": "The original String object does not change.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"java\".toUpperCase(java.util.Locale.ROOT));\n    }\n}\n"
    }
  },
  {
    "id": "lower",
    "category": "Strings",
    "name": "text.toLowerCase()",
    "description": "Return lowercase text.",
    "snippet": "System.out.println(\"JAVA\".toLowerCase(java.util.Locale.ROOT));",
    "output": "java",
    "gotcha": "Locale.ROOT is useful for predictable machine labels.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"JAVA\".toLowerCase(java.util.Locale.ROOT));\n    }\n}\n"
    }
  },
  {
    "id": "trim",
    "category": "Strings",
    "name": "text.trim()",
    "description": "Remove surrounding characters up to U+0020.",
    "snippet": "System.out.println(\"[\" + \"  Java  \".trim() + \"]\");",
    "output": "[Java]",
    "gotcha": "Whitespace inside the text remains.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"[\" + \"  Java  \".trim() + \"]\");\n    }\n}\n"
    }
  },
  {
    "id": "strip",
    "category": "Strings",
    "name": "text.strip()",
    "description": "Remove surrounding whitespace using Unicode-aware checks.",
    "snippet": "System.out.println(\"  Java  \".strip());",
    "output": "Java",
    "gotcha": "Available since Java 11. Included as a small modern alternative to trim.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"  Java  \".strip());\n    }\n}\n"
    }
  },
  {
    "id": "replace",
    "category": "Strings",
    "name": "text.replace(old, replacement)",
    "description": "Return text with literal replacements.",
    "snippet": "System.out.println(\"net-net\".replace(\"net\", \"ball\"));",
    "output": "ball-ball",
    "gotcha": "Use the returned String. replaceAll uses regular expressions; replace does not.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"net-net\".replace(\"net\", \"ball\"));\n    }\n}\n"
    }
  },
  {
    "id": "indexof",
    "category": "Strings",
    "name": "text.indexOf(target)",
    "description": "Find the first matching position.",
    "snippet": "System.out.println(\"java lab\".indexOf(\"lab\"));\nSystem.out.println(\"java\".indexOf(\"x\"));",
    "output": "5\n-1",
    "gotcha": "A return value of -1 means no match.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"java lab\".indexOf(\"lab\"));\n        System.out.println(\"java\".indexOf(\"x\"));\n    }\n}\n"
    }
  },
  {
    "id": "contains",
    "category": "Strings",
    "name": "text.contains(sequence)",
    "description": "Check whether a sequence occurs.",
    "snippet": "System.out.println(\"java lab\".contains(\"lab\"));",
    "output": "true",
    "gotcha": "The comparison is case-sensitive.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"java lab\".contains(\"lab\"));\n    }\n}\n"
    }
  },
  {
    "id": "starts-with",
    "category": "Strings",
    "name": "text.startsWith(prefix)",
    "description": "Check the beginning of text.",
    "snippet": "System.out.println(\"YU123\".startsWith(\"YU\"));",
    "output": "true",
    "gotcha": "This checks a prefix, not arbitrary position.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"YU123\".startsWith(\"YU\"));\n    }\n}\n"
    }
  },
  {
    "id": "ends-with",
    "category": "Strings",
    "name": "text.endsWith(suffix)",
    "description": "Check the ending of text.",
    "snippet": "System.out.println(\"Main.java\".endsWith(\".java\"));",
    "output": "true",
    "gotcha": "Case still matters.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Main.java\".endsWith(\".java\"));\n    }\n}\n"
    }
  },
  {
    "id": "concat",
    "category": "Strings",
    "name": "text.concat(other)",
    "description": "Return the joined text.",
    "snippet": "System.out.println(\"Java\".concat(\" Lab\"));",
    "output": "Java Lab",
    "gotcha": "The + operator is often more convenient for readable output.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java\".concat(\" Lab\"));\n    }\n}\n"
    }
  },
  {
    "id": "empty",
    "category": "Strings",
    "name": "text.isEmpty()",
    "description": "Check whether length is zero.",
    "snippet": "System.out.println(\"\".isEmpty());\nSystem.out.println(\" \".isEmpty());",
    "output": "true\nfalse",
    "gotcha": "A string containing a space is not empty.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"\".isEmpty());\n        System.out.println(\" \".isEmpty());\n    }\n}\n"
    }
  },
  {
    "id": "pow",
    "category": "Math & Random",
    "name": "Math.pow(base, exponent)",
    "description": "Raise a number to a power.",
    "snippet": "System.out.println(Math.pow(2, 5));",
    "output": "32.0",
    "gotcha": "Returns double. ^ is not exponentiation.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.pow(2, 5));\n    }\n}\n"
    }
  },
  {
    "id": "sqrt",
    "category": "Math & Random",
    "name": "Math.sqrt(x)",
    "description": "Compute a square root.",
    "snippet": "System.out.println(Math.sqrt(49));",
    "output": "7.0",
    "gotcha": "A negative double input returns NaN.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.sqrt(49));\n    }\n}\n"
    }
  },
  {
    "id": "abs",
    "category": "Math & Random",
    "name": "Math.abs(x)",
    "description": "Get an absolute value.",
    "snippet": "System.out.println(Math.abs(-12));",
    "output": "12",
    "gotcha": "For the most-negative int or long, the positive magnitude is not representable in the same type.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.abs(-12));\n    }\n}\n"
    }
  },
  {
    "id": "ceil",
    "category": "Math & Random",
    "name": "Math.ceil(x)",
    "description": "Round up toward positive infinity.",
    "snippet": "System.out.println(Math.ceil(-2.3));",
    "output": "-2.0",
    "gotcha": "Up on the number line can mean toward zero for a negative value.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.ceil(-2.3));\n    }\n}\n"
    }
  },
  {
    "id": "floor",
    "category": "Math & Random",
    "name": "Math.floor(x)",
    "description": "Round down toward negative infinity.",
    "snippet": "System.out.println(Math.floor(-2.3));",
    "output": "-3.0",
    "gotcha": "A cast to int truncates toward zero instead.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.floor(-2.3));\n    }\n}\n"
    }
  },
  {
    "id": "round",
    "category": "Math & Random",
    "name": "Math.round(x)",
    "description": "Round to nearest, ties toward positive infinity.",
    "snippet": "System.out.println(Math.round(-2.5));",
    "output": "-2",
    "gotcha": "The double overload returns long. The float overload returns int.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.round(-2.5));\n    }\n}\n"
    }
  },
  {
    "id": "min",
    "category": "Math & Random",
    "name": "Math.min(a, b)",
    "description": "Choose the smaller value.",
    "snippet": "System.out.println(Math.min(8, 3));",
    "output": "3",
    "gotcha": "The overload determines the result type.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.min(8, 3));\n    }\n}\n"
    }
  },
  {
    "id": "max",
    "category": "Math & Random",
    "name": "Math.max(a, b)",
    "description": "Choose the larger value.",
    "snippet": "System.out.println(Math.max(8, 3));",
    "output": "8",
    "gotcha": "For an array maximum, initialize from real data rather than blindly using zero.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.max(8, 3));\n    }\n}\n"
    }
  },
  {
    "id": "pi",
    "category": "Math & Random",
    "name": "Math.PI",
    "description": "The double approximation of pi.",
    "snippet": "System.out.println(Math.PI > 3.14);",
    "output": "true",
    "gotcha": "PI is a field, so there are no parentheses.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.PI > 3.14);\n    }\n}\n"
    }
  },
  {
    "id": "radians",
    "category": "Math & Random",
    "name": "Math.toRadians(degrees)",
    "description": "Convert degrees into radians.",
    "snippet": "System.out.println(Math.toRadians(180) == Math.PI);",
    "output": "true",
    "gotcha": "sin, cos and tan expect radians.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.toRadians(180) == Math.PI);\n    }\n}\n"
    }
  },
  {
    "id": "sin",
    "category": "Math & Random",
    "name": "Math.sin(radians)",
    "description": "Compute sine.",
    "snippet": "System.out.println(Math.sin(0));",
    "output": "0.0",
    "gotcha": "Use toRadians first if your input is in degrees.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.sin(0));\n    }\n}\n"
    }
  },
  {
    "id": "cos",
    "category": "Math & Random",
    "name": "Math.cos(radians)",
    "description": "Compute cosine.",
    "snippet": "System.out.println(Math.cos(0));",
    "output": "1.0",
    "gotcha": "Math.cos(90) does not mean cosine of 90 degrees.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.cos(0));\n    }\n}\n"
    }
  },
  {
    "id": "math-random",
    "category": "Math & Random",
    "name": "Math.random()",
    "description": "Produce a double in [0.0, 1.0).",
    "snippet": "System.out.println(Math.random() < 1.0);",
    "output": "true",
    "gotcha": "One is excluded. For integer ranges, scale and cast carefully.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.random() < 1.0);\n    }\n}\n"
    }
  },
  {
    "id": "random-bound",
    "category": "Math & Random",
    "name": "random.nextInt(bound)",
    "description": "Get an integer from 0 inclusive to bound exclusive.",
    "snippet": "java.util.Random random = new java.util.Random(42);\nSystem.out.println(random.nextInt(6));",
    "output": "2",
    "gotcha": "The bound must be positive. The maximum returned value is bound - 1.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Random random = new java.util.Random(42);\n        System.out.println(random.nextInt(6));\n    }\n}\n"
    }
  },
  {
    "id": "random-inclusive",
    "category": "Math & Random",
    "name": "nextInt(max - min + 1) + min",
    "description": "Generate an inclusive integer interval.",
    "snippet": "java.util.Random random = new java.util.Random(42);\nint value = random.nextInt(11) - 5;\nSystem.out.println(value >= -5 && value <= 5);",
    "output": "true",
    "gotcha": "The +1 counts both endpoints. Assume the range arithmetic does not overflow.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Random random = new java.util.Random(42);\n        int value = random.nextInt(11) - 5;\n        System.out.println(value >= -5 && value <= 5);\n    }\n}\n"
    }
  },
  {
    "id": "random-double",
    "category": "Math & Random",
    "name": "random.nextDouble()",
    "description": "Get a pseudorandom double in [0.0, 1.0).",
    "snippet": "java.util.Random random = new java.util.Random(42);\ndouble value = random.nextDouble();\nSystem.out.println(value >= 0 && value < 1);",
    "output": "true",
    "gotcha": "A seed makes a repeatable sequence when calls occur in the same order.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.Random random = new java.util.Random(42);\n        double value = random.nextDouble();\n        System.out.println(value >= 0 && value < 1);\n    }\n}\n"
    }
  },
  {
    "id": "parse-int",
    "category": "Methods & objects",
    "name": "Integer.parseInt(text)",
    "description": "Parse a decimal integer String.",
    "snippet": "System.out.println(Integer.parseInt(\"42\") + 1);",
    "output": "43",
    "gotcha": "Invalid text throws NumberFormatException.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Integer.parseInt(\"42\") + 1);\n    }\n}\n"
    }
  },
  {
    "id": "parse-double",
    "category": "Methods & objects",
    "name": "Double.parseDouble(text)",
    "description": "Parse decimal floating-point text.",
    "snippet": "System.out.println(Double.parseDouble(\"2.5\") * 2);",
    "output": "5.0",
    "gotcha": "This returns double, not a formatted String.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Double.parseDouble(\"2.5\") * 2);\n    }\n}\n"
    }
  },
  {
    "id": "integer-limits",
    "category": "Methods & objects",
    "name": "Integer.MIN_VALUE / MAX_VALUE",
    "description": "Read int range limits.",
    "snippet": "System.out.println(Integer.MAX_VALUE);",
    "output": "2147483647",
    "gotcha": "Integer arithmetic can overflow silently.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Integer.MAX_VALUE);\n    }\n}\n"
    }
  },
  {
    "id": "char-digit",
    "category": "Methods & objects",
    "name": "Character.isDigit(c)",
    "description": "Check whether a char is classified as a digit.",
    "snippet": "System.out.println(Character.isDigit('7'));",
    "output": "true",
    "gotcha": "This recognizes more than only ASCII digits 0 through 9.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Character.isDigit('7'));\n    }\n}\n"
    }
  },
  {
    "id": "char-letter",
    "category": "Methods & objects",
    "name": "Character.isLetter(c)",
    "description": "Check whether a char is classified as a letter.",
    "snippet": "System.out.println(Character.isLetter('A'));",
    "output": "true",
    "gotcha": "For full supplementary Unicode handling, code points need more care than a single char.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Character.isLetter('A'));\n    }\n}\n"
    }
  },
  {
    "id": "declaration",
    "category": "Basics",
    "name": "type name = value;",
    "description": "Declare and initialize a local variable.",
    "snippet": "int count = 3;\nSystem.out.println(count);",
    "output": "3",
    "gotcha": "A local variable must be assigned before it is read.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 3;\n        System.out.println(count);\n    }\n}\n"
    }
  },
  {
    "id": "final",
    "category": "Basics",
    "name": "final type NAME = value;",
    "description": "Prevent reassignment of a variable.",
    "snippet": "final int MAX = 30;\nSystem.out.println(MAX);",
    "output": "30",
    "gotcha": "final on a reference does not make its referred object immutable.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        final int MAX = 30;\n        System.out.println(MAX);\n    }\n}\n"
    }
  },
  {
    "id": "cast",
    "category": "Basics",
    "name": "(type) expression",
    "description": "Explicitly convert a value.",
    "snippet": "System.out.println((double) 7 / 10);",
    "output": "0.7",
    "gotcha": "Cast before integer division if you need the fraction.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println((double) 7 / 10);\n    }\n}\n"
    }
  },
  {
    "id": "remainder",
    "category": "Basics",
    "name": "a % b",
    "description": "Compute remainder.",
    "snippet": "System.out.println(7 % 10);",
    "output": "7",
    "gotcha": "For nonzero integer b, a = (a / b) * b + a % b.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(7 % 10);\n    }\n}\n"
    }
  },
  {
    "id": "increment",
    "category": "Basics",
    "name": "count++ / ++count",
    "description": "Increment, with old/new expression value.",
    "snippet": "int count = 3;\nSystem.out.println(count++);\nSystem.out.println(++count);",
    "output": "3\n5",
    "gotcha": "In standalone updates, both increment by one.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 3;\n        System.out.println(count++);\n        System.out.println(++count);\n    }\n}\n"
    }
  },
  {
    "id": "compound",
    "category": "Basics",
    "name": "total += amount",
    "description": "Update a variable using the old value.",
    "snippet": "int total = 3;\ntotal += 4;\nSystem.out.println(total);",
    "output": "7",
    "gotcha": "Initialize accumulators before the loop, not on each iteration.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int total = 3;\n        total += 4;\n        System.out.println(total);\n    }\n}\n"
    }
  },
  {
    "id": "conditional",
    "category": "Control flow",
    "name": "condition ? whenTrue : whenFalse",
    "description": "Select one of two expression values.",
    "snippet": "int count = 2;\nSystem.out.println(count > 0 ? \"In stock\" : \"Empty\");",
    "output": "In stock",
    "gotcha": "The two alternatives must have compatible types in context.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 2;\n        System.out.println(count > 0 ? \"In stock\" : \"Empty\");\n    }\n}\n"
    }
  },
  {
    "id": "if",
    "category": "Control flow",
    "name": "if / else if / else",
    "description": "Choose a branch using boolean conditions.",
    "snippet": "int mark = 85;\nif (mark >= 80) System.out.println(\"Pass band\");\nelse System.out.println(\"Other\");",
    "output": "Pass band",
    "gotcha": "Use braces for multi-statement branches.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int mark = 85;\n        if (mark >= 80) System.out.println(\"Pass band\");\n        else System.out.println(\"Other\");\n    }\n}\n"
    }
  },
  {
    "id": "and-or",
    "category": "Control flow",
    "name": "&&, || and !",
    "description": "Combine or negate boolean results.",
    "snippet": "int n = 12;\nSystem.out.println(n >= 1 && n <= 30);",
    "output": "true",
    "gotcha": "Valid interval: AND. Outside the interval: OR.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int n = 12;\n        System.out.println(n >= 1 && n <= 30);\n    }\n}\n"
    }
  },
  {
    "id": "while",
    "category": "Control flow",
    "name": "while (condition) { ... }",
    "description": "Repeat with a pre-check.",
    "snippet": "int i = 1;\nwhile (i <= 2) { System.out.println(i); i++; }",
    "output": "1\n2",
    "gotcha": "The body can run zero times. Make sure the loop can terminate.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 2) { System.out.println(i); i++; }\n    }\n}\n"
    }
  },
  {
    "id": "do-while",
    "category": "Control flow",
    "name": "do { ... } while (condition);",
    "description": "Repeat with a post-check.",
    "snippet": "int count = 0;\ndo { System.out.println(count); } while (count != 0);",
    "output": "0",
    "gotcha": "The body always runs at least once.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        do { System.out.println(count); } while (count != 0);\n    }\n}\n"
    }
  },
  {
    "id": "for",
    "category": "Control flow",
    "name": "for (initial; condition; update)",
    "description": "Repeat with a compact traversal structure.",
    "snippet": "for (int i = 1; i <= 3; i++) System.out.println(i);",
    "output": "1\n2\n3",
    "gotcha": "The update follows each completed body iteration.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) System.out.println(i);\n    }\n}\n"
    }
  },
  {
    "id": "break",
    "category": "Control flow",
    "name": "break;",
    "description": "Exit the nearest loop or switch.",
    "snippet": "for (int i = 1; i <= 5; i++) { if (i == 3) break; System.out.println(i); }",
    "output": "1\n2",
    "gotcha": "In a switch inside a loop, break normally leaves the switch.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) { if (i == 3) break; System.out.println(i); }\n    }\n}\n"
    }
  },
  {
    "id": "continue",
    "category": "Control flow",
    "name": "continue;",
    "description": "Skip the rest of this loop iteration.",
    "snippet": "for (int i = 1; i <= 3; i++) { if (i == 2) continue; System.out.println(i); }",
    "output": "1\n3",
    "gotcha": "A while-loop update after continue may be skipped.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) { if (i == 2) continue; System.out.println(i); }\n    }\n}\n"
    }
  },
  {
    "id": "switch",
    "category": "Control flow",
    "name": "switch / case / default",
    "description": "Dispatch on an exact menu value.",
    "snippet": "int choice = 2;\nswitch (choice) { case 1: System.out.println(\"A\"); break; case 2: System.out.println(\"B\"); break; default: System.out.println(\"?\"); }",
    "output": "B",
    "gotcha": "Classic case labels fall through without break.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int choice = 2;\n        switch (choice) { case 1: System.out.println(\"A\"); break; case 2: System.out.println(\"B\"); break; default: System.out.println(\"?\"); }\n    }\n}\n"
    }
  },
  {
    "id": "array-length",
    "category": "Arrays & lists",
    "name": "array.length",
    "description": "Get the fixed number of array slots.",
    "snippet": "int[] values = new int[4];\nSystem.out.println(values.length);",
    "output": "4",
    "gotcha": "No parentheses. The highest valid index is length - 1.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] values = new int[4];\n        System.out.println(values.length);\n    }\n}\n"
    }
  },
  {
    "id": "foreach",
    "category": "Arrays & lists",
    "name": "for (type value : array)",
    "description": "Read each element in sequence.",
    "snippet": "int[] values = {3, 4};\nfor (int value : values) System.out.println(value);",
    "output": "3\n4",
    "gotcha": "Reassigning the loop variable does not replace primitive array elements.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {3, 4};\n        for (int value : values) System.out.println(value);\n    }\n}\n"
    }
  },
  {
    "id": "arrays-string",
    "category": "Arrays & lists",
    "name": "Arrays.toString(array)",
    "description": "Return a readable one-dimensional array representation.",
    "snippet": "System.out.println(java.util.Arrays.toString(new int[] {3, 4}));",
    "output": "[3, 4]",
    "gotcha": "Printing the array reference itself does not list its elements.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(java.util.Arrays.toString(new int[] {3, 4}));\n    }\n}\n"
    }
  },
  {
    "id": "arrays-sort",
    "category": "Arrays & lists",
    "name": "Arrays.sort(array)",
    "description": "Sort elements in place.",
    "snippet": "int[] values = {9, 2, 5};\njava.util.Arrays.sort(values);\nSystem.out.println(java.util.Arrays.toString(values));",
    "output": "[2, 5, 9]",
    "gotcha": "Returns void; the supplied array changes.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {9, 2, 5};\n        java.util.Arrays.sort(values);\n        System.out.println(java.util.Arrays.toString(values));\n    }\n}\n"
    }
  },
  {
    "id": "arrays-copy",
    "category": "Arrays & lists",
    "name": "Arrays.copyOf(array, length)",
    "description": "Create a new array container.",
    "snippet": "int[] a = {4, 5};\nint[] b = java.util.Arrays.copyOf(a, 3);\nSystem.out.println(java.util.Arrays.toString(b));",
    "output": "[4, 5, 0]",
    "gotcha": "Object-array copies are shallow: contained references are copied.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {4, 5};\n        int[] b = java.util.Arrays.copyOf(a, 3);\n        System.out.println(java.util.Arrays.toString(b));\n    }\n}\n"
    }
  },
  {
    "id": "arrays-search",
    "category": "Arrays & lists",
    "name": "Arrays.binarySearch(sorted, target)",
    "description": "Search an array sorted in matching order.",
    "snippet": "int[] data = {2, 5, 9};\nSystem.out.println(java.util.Arrays.binarySearch(data, 5));",
    "output": "1",
    "gotcha": "A failure returns a negative insertion-point encoding, not always -1.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        int[] data = {2, 5, 9};\n        System.out.println(java.util.Arrays.binarySearch(data, 5));\n    }\n}\n"
    }
  },
  {
    "id": "list-add",
    "category": "Arrays & lists",
    "name": "list.add(value)",
    "description": "Append an element.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nSystem.out.println(list);",
    "output": "[A]",
    "gotcha": "The size grows by one.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        System.out.println(list);\n    }\n}\n"
    }
  },
  {
    "id": "list-get",
    "category": "Arrays & lists",
    "name": "list.get(index)",
    "description": "Read an element.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nSystem.out.println(list.get(0));",
    "output": "A",
    "gotcha": "Use get rather than square brackets.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        System.out.println(list.get(0));\n    }\n}\n"
    }
  },
  {
    "id": "list-set",
    "category": "Arrays & lists",
    "name": "list.set(index, value)",
    "description": "Replace an existing element.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nlist.set(0, \"B\");\nSystem.out.println(list);",
    "output": "[B]",
    "gotcha": "This does not append a new element or grow the list.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        list.set(0, \"B\");\n        System.out.println(list);\n    }\n}\n"
    }
  },
  {
    "id": "list-remove",
    "category": "Arrays & lists",
    "name": "list.remove(index)",
    "description": "Remove an element and shift later indexes.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.remove(0);\nSystem.out.println(list);",
    "output": "[B]",
    "gotcha": "For Integer lists, distinguish remove(index) from remove(Integer.valueOf(value)).",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        list.remove(0);\n        System.out.println(list);\n    }\n}\n"
    }
  },
  {
    "id": "list-size",
    "category": "Arrays & lists",
    "name": "list.size()",
    "description": "Read the current element count.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nSystem.out.println(list.size());",
    "output": "1",
    "gotcha": "This is a method call; array.length is a field.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        System.out.println(list.size());\n    }\n}\n"
    }
  },
  {
    "id": "list-contains",
    "category": "Arrays & lists",
    "name": "list.contains(value)",
    "description": "Check for an equal element.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nSystem.out.println(list.contains(\"A\"));",
    "output": "true",
    "gotcha": "Contains uses equality, rather than an index lookup.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        System.out.println(list.contains(\"A\"));\n    }\n}\n"
    }
  },
  {
    "id": "list-clear",
    "category": "Arrays & lists",
    "name": "list.clear()",
    "description": "Remove every element.",
    "snippet": "java.util.ArrayList<String> list = new java.util.ArrayList<>();\nlist.add(\"A\");\nlist.clear();\nSystem.out.println(list.isEmpty());",
    "output": "true",
    "gotcha": "The list object still exists after clearing.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> list = new java.util.ArrayList<>();\n        list.add(\"A\");\n        list.clear();\n        System.out.println(list.isEmpty());\n    }\n}\n"
    }
  },
  {
    "id": "return",
    "category": "Methods & objects",
    "name": "return expression;",
    "description": "Send a value back to the caller.",
    "snippet": "System.out.println(square(4));",
    "output": "16",
    "gotcha": "A returned value does not automatically print itself.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(square(4));\n    }\n\n    public static int square(int x) { return x * x; }\n}\n"
    }
  },
  {
    "id": "void",
    "category": "Methods & objects",
    "name": "void method(...)",
    "description": "Define an operation with no returned value.",
    "snippet": "banner();",
    "output": "Ready",
    "gotcha": "You cannot assign a void result to a variable.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        banner();\n    }\n\n    public static void banner() { System.out.println(\"Ready\"); }\n}\n"
    }
  },
  {
    "id": "new-object",
    "category": "Methods & objects",
    "name": "new ClassName(arguments)",
    "description": "Create an instance and invoke its constructor.",
    "snippet": "java.util.ArrayList<String> items = new java.util.ArrayList<>();\nSystem.out.println(items.size());",
    "output": "0",
    "gotcha": "A reference declaration alone does not create an object.",
    "files": {
      "Main.java": "public class Main {\n    public static void main(String[] args) {\n        java.util.ArrayList<String> items = new java.util.ArrayList<>();\n        System.out.println(items.size());\n    }\n}\n"
    }
  }
];

export const exercises = [
  {
    "id": "receipt",
    "module": "data",
    "level": "Easy",
    "title": "A campus-store receipt",
    "prompt": "Calculate the total for identical items.",
    "requirements": [
      "Read an integer quantity, then a decimal unit price. Assume both are nonnegative.",
      "Print exactly Total: followed by one space and the total with two decimal places. Do not print a currency symbol or input prompts."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 4.50\n",
        "expected": "Total: 13.50"
      },
      {
        "name": "Case 2",
        "stdin": "0 9.99\n",
        "expected": "Total: 0.00"
      },
      {
        "name": "Case 3",
        "stdin": "2 1.25\n",
        "expected": "Total: 2.50"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int quantity = scan.nextInt();\n        double price = scan.nextDouble();\n        System.out.printf(java.util.Locale.US, \"Total: %.2f%n\", quantity * price);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Store quantity and price in different types.",
      "Use %.2f to display the multiplication result."
    ],
    "explanation": "The total is quantity times unit price. Locale.US keeps decimal points consistent.",
    "kind": "code"
  },
  {
    "id": "time-split",
    "module": "data",
    "level": "Easy",
    "title": "Turn minutes into a shift duration",
    "prompt": "Convert a nonnegative integer number of minutes to hours and remaining minutes.",
    "requirements": [
      "Read one nonnegative integer.",
      "Print hours and remaining minutes separated by one space."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "137\n",
        "expected": "2 17"
      },
      {
        "name": "Case 2",
        "stdin": "60\n",
        "expected": "1 0"
      },
      {
        "name": "Case 3",
        "stdin": "7\n",
        "expected": "0 7"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int total = scan.nextInt();\n        System.out.println(total / 60 + \" \" + total % 60);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Count full groups of 60 first.",
      "The remainder gives minutes not part of a full hour."
    ],
    "explanation": "For 137 minutes, 2 * 60 + 17 = 137.",
    "kind": "code"
  },
  {
    "id": "digit-split",
    "module": "data",
    "level": "Easy",
    "title": "Read a device-code suffix",
    "prompt": "Split a nonnegative integer into the value without its last digit and its last digit.",
    "requirements": [
      "Read one integer from 0 through 1000000.",
      "Print the quotient by 10 and the remainder by 10 separated by one space."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3427\n",
        "expected": "342 7"
      },
      {
        "name": "Case 2",
        "stdin": "7\n",
        "expected": "0 7"
      },
      {
        "name": "Case 3",
        "stdin": "100\n",
        "expected": "10 0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int code = scan.nextInt();\n        System.out.println(code / 10 + \" \" + code % 10);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "/ removes the last digit for this nonnegative input.",
      "% keeps the remainder after removing complete tens."
    ],
    "explanation": "This includes the case where the original value is smaller than 10.",
    "kind": "code"
  },
  {
    "id": "completion-rate",
    "module": "data",
    "level": "Easy",
    "title": "A completion percentage",
    "prompt": "Report how much of a task list is complete.",
    "requirements": [
      "Read completed then total as integers. Assume 0 <= completed <= total and total > 0.",
      "Print a numeric percentage with one decimal place and a percent sign."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 4\n",
        "expected": "75.0%"
      },
      {
        "name": "Case 2",
        "stdin": "0 5\n",
        "expected": "0.0%"
      },
      {
        "name": "Case 3",
        "stdin": "1 3\n",
        "expected": "33.3%"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int done = scan.nextInt();\n        int total = scan.nextInt();\n        System.out.printf(java.util.Locale.US, \"%.1f%%%n\", 100.0 * done / total);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Keep at least one operand floating-point before division.",
      "In a printf format string, %% prints a literal percent sign."
    ],
    "explanation": "Multiplying by 100.0 both scales the ratio and makes the division floating-point.",
    "kind": "code"
  },
  {
    "id": "normalise-name",
    "module": "objects",
    "level": "Easy",
    "title": "Clean up a course label",
    "prompt": "Normalize a whole line of entered text.",
    "requirements": [
      "Read a whole line.",
      "Remove surrounding spaces, convert to uppercase and print the result. Use the simple Latin text shown in the examples."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "  java lab  \n",
        "expected": "JAVA LAB"
      },
      {
        "name": "Case 2",
        "stdin": "itec 1620\n",
        "expected": "ITEC 1620"
      },
      {
        "name": "Case 3",
        "stdin": "  York\n",
        "expected": "YORK"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        String name = scan.nextLine();\n        System.out.println(name.trim().toUpperCase(java.util.Locale.ROOT));\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Use nextLine for text containing spaces.",
      "Reuse the String returned by trim and toUpperCase."
    ],
    "explanation": "The returned text is used directly; ignoring it would leave the original value unchanged.",
    "kind": "code"
  },
  {
    "id": "email-prefix",
    "module": "objects",
    "level": "Easy",
    "title": "Extract an email username",
    "prompt": "Find the text before an at-sign.",
    "requirements": [
      "Read a single whole line containing exactly one @ with at least one character before it.",
      "Print the substring before @."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "reza@yorku.ca\n",
        "expected": "reza"
      },
      {
        "name": "Case 2",
        "stdin": "network.lab@example.com\n",
        "expected": "network.lab"
      },
      {
        "name": "Case 3",
        "stdin": "a@b.ca\n",
        "expected": "a"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        String email = scan.nextLine();\n        int at = email.indexOf(\"@\");\n        System.out.println(email.substring(0, at));\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "indexOf finds the marker position.",
      "substring(0, at) excludes the marker itself."
    ],
    "explanation": "The exercise assumes valid input so you can focus on indexes.",
    "kind": "code"
  },
  {
    "id": "temperature",
    "module": "decisions",
    "level": "Easy",
    "title": "Classify a temperature",
    "prompt": "Choose a category using inclusive boundaries.",
    "requirements": [
      "Read an integer temperature.",
      "Below 0 print Freezing; from 0 through 20 print Cool; above 20 print Warm."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "-1\n",
        "expected": "Freezing"
      },
      {
        "name": "Case 2",
        "stdin": "20\n",
        "expected": "Cool"
      },
      {
        "name": "Case 3",
        "stdin": "21\n",
        "expected": "Warm"
      },
      {
        "name": "Case 4",
        "stdin": "0\n",
        "expected": "Cool"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int t = scan.nextInt();\n        if (t < 0) System.out.println(\"Freezing\");\n        else if (t <= 20) System.out.println(\"Cool\");\n        else System.out.println(\"Warm\");\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Test below zero first.",
      "After that branch fails, t <= 20 already means 0 through 20."
    ],
    "explanation": "An else-if chain makes the categories mutually exclusive.",
    "kind": "code"
  },
  {
    "id": "range-check",
    "module": "decisions",
    "level": "Easy",
    "title": "Is the package width valid?",
    "prompt": "Check the inclusive allowed range 1 through 30.",
    "requirements": [
      "Read one integer width.",
      "Print Valid if it is in range, otherwise print Invalid."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "1\n",
        "expected": "Valid"
      },
      {
        "name": "Case 2",
        "stdin": "30\n",
        "expected": "Valid"
      },
      {
        "name": "Case 3",
        "stdin": "31\n",
        "expected": "Invalid"
      },
      {
        "name": "Case 4",
        "stdin": "0\n",
        "expected": "Invalid"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int width = scan.nextInt();\n        System.out.println(width >= 1 && width <= 30 ? \"Valid\" : \"Invalid\");\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Both the lower and upper comparisons must be true.",
      "Use && for the valid range."
    ],
    "explanation": "The conditional operator is a compact if/else here; a full if/else is equally acceptable.",
    "kind": "code"
  },
  {
    "id": "menu-switch",
    "module": "decisions",
    "level": "Easy",
    "title": "Dispatch a facilities menu",
    "prompt": "Use a switch to select an operation.",
    "requirements": [
      "Read one integer choice.",
      "1 prints Checkout, 2 prints Return, 0 prints Exit. Any other value prints Invalid."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "1\n",
        "expected": "Checkout"
      },
      {
        "name": "Case 2",
        "stdin": "2\n",
        "expected": "Return"
      },
      {
        "name": "Case 3",
        "stdin": "7\n",
        "expected": "Invalid"
      },
      {
        "name": "Case 4",
        "stdin": "0\n",
        "expected": "Exit"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int choice = scan.nextInt();\n        switch (choice) {\n            case 1: System.out.println(\"Checkout\"); break;\n            case 2: System.out.println(\"Return\"); break;\n            case 0: System.out.println(\"Exit\"); break;\n            default: System.out.println(\"Invalid\");\n        }\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Each menu number is an exact case.",
      "End each chosen operation with break in classic switch syntax."
    ],
    "explanation": "default catches all unspecified values.",
    "kind": "code"
  },
  {
    "id": "validate-width",
    "module": "loops",
    "level": "Intermediate",
    "title": "Keep asking until the width fits",
    "prompt": "Repeat input until an integer lies in 1 through 30.",
    "requirements": [
      "Read integer tokens until one is valid. Assume a valid token eventually appears.",
      "For each invalid token, print Try again. Then print Accepted: followed by one space and the valid value."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "0 31 12\n",
        "expected": "Try again\nTry again\nAccepted: 12"
      },
      {
        "name": "Case 2",
        "stdin": "1\n",
        "expected": "Accepted: 1"
      },
      {
        "name": "Case 3",
        "stdin": "-5 30\n",
        "expected": "Try again\nAccepted: 30"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int width = scan.nextInt();\n        while (width < 1 || width > 30) {\n            System.out.println(\"Try again\");\n            width = scan.nextInt();\n        }\n        System.out.println(\"Accepted: \" + width);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Outside the range means below the minimum OR above the maximum.",
      "Read a replacement inside the loop."
    ],
    "explanation": "The loop condition describes invalid input, so it is the negation of the valid AND range.",
    "kind": "code"
  },
  {
    "id": "sum-to-n",
    "module": "loops",
    "level": "Easy",
    "title": "Total the first n integers",
    "prompt": "Use a loop to accumulate numbers from 1 through n.",
    "requirements": [
      "Read n where 0 <= n <= 1000.",
      "Use a for loop and print the sum as an integer."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "5\n",
        "expected": "15"
      },
      {
        "name": "Case 2",
        "stdin": "0\n",
        "expected": "0"
      },
      {
        "name": "Case 3",
        "stdin": "1\n",
        "expected": "1"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt();\n        int sum = 0;\n        for (int i = 1; i <= n; i++) sum += i;\n        System.out.println(sum);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Initialize sum once, before the loop.",
      "For n = 0 the loop does not run, leaving the sum at zero."
    ],
    "explanation": "The accumulator keeps the total from earlier iterations.",
    "kind": "code"
  },
  {
    "id": "multiples",
    "module": "loops",
    "level": "Intermediate",
    "title": "Multiples counter",
    "prompt": "Count and total numbers divisible by 3 or 5, without double counting.",
    "requirements": [
      "Read n where 1 <= n <= 1000. Examine every integer from 1 through n.",
      "Print the count and sum separated by one space. Use a loop rather than a closed formula."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "15\n",
        "expected": "7 60"
      },
      {
        "name": "Case 2",
        "stdin": "2\n",
        "expected": "0 0"
      },
      {
        "name": "Case 3",
        "stdin": "5\n",
        "expected": "2 8"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt(), count = 0, sum = 0;\n        for (int i = 1; i <= n; i++) {\n            if (i % 3 == 0 || i % 5 == 0) { count++; sum += i; }\n        }\n        System.out.println(count + \" \" + sum);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "One OR condition matches either divisor.",
      "Put both counter and sum updates in that one block."
    ],
    "explanation": "A value divisible by both still enters the block just once.",
    "kind": "code"
  },
  {
    "id": "factorial",
    "module": "loops",
    "level": "Intermediate",
    "title": "Factorial from a loop",
    "prompt": "Compute the product 1 × 2 × ... × n.",
    "requirements": [
      "Read an integer n from 0 through 12.",
      "Print n! as an integer. Define 0! as 1."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "5\n",
        "expected": "120"
      },
      {
        "name": "Case 2",
        "stdin": "0\n",
        "expected": "1"
      },
      {
        "name": "Case 3",
        "stdin": "1\n",
        "expected": "1"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt(), result = 1;\n        for (int i = 2; i <= n; i++) result *= i;\n        System.out.println(result);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "A product accumulator starts at 1, not zero.",
      "If n is 0 or 1, no multiplication is needed."
    ],
    "explanation": "The stated upper bound keeps the result inside int range.",
    "kind": "code"
  },
  {
    "id": "reverse-digits",
    "module": "loops",
    "level": "Intermediate",
    "title": "Reverse a device number",
    "prompt": "Reverse the digits mathematically.",
    "requirements": [
      "Read an integer from 0 through 1000000.",
      "Use division and remainder in a loop. Print the reversed integer; leading zeroes of the reversed form disappear."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "120\n",
        "expected": "21"
      },
      {
        "name": "Case 2",
        "stdin": "7\n",
        "expected": "7"
      },
      {
        "name": "Case 3",
        "stdin": "0\n",
        "expected": "0"
      },
      {
        "name": "Case 4",
        "stdin": "3427\n",
        "expected": "7243"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt(), reverse = 0;\n        do {\n            reverse = reverse * 10 + n % 10;\n            n /= 10;\n        } while (n != 0);\n        System.out.println(reverse);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "n % 10 extracts the final digit.",
      "Multiply the growing reverse by 10 before appending a digit."
    ],
    "explanation": "The do loop also processes an input of zero once.",
    "kind": "code"
  },
  {
    "id": "vowels",
    "module": "loops",
    "level": "Intermediate",
    "title": "Count vowels in a message",
    "prompt": "Traverse a line of text character by character.",
    "requirements": [
      "Read one whole line. Count English vowels a, e, i, o, u without regard to case.",
      "Print the count only. Spaces and other characters do not count."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "Hello Reza\n",
        "expected": "4"
      },
      {
        "name": "Case 2",
        "stdin": "NETWORK\n",
        "expected": "2"
      },
      {
        "name": "Case 3",
        "stdin": "rhythm\n",
        "expected": "0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        String text = scan.nextLine().toLowerCase(java.util.Locale.ROOT);\n        int count = 0;\n        for (int i = 0; i < text.length(); i++) {\n            char c = text.charAt(i);\n            if (\"aeiou\".indexOf(c) >= 0) count++;\n        }\n        System.out.println(count);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Normalize case once.",
      "indexOf returns -1 if the current char is absent from the vowel string."
    ],
    "explanation": "The loop visits all indexes strictly below text.length().",
    "kind": "code"
  },
  {
    "id": "palindrome",
    "module": "loops",
    "level": "Intermediate",
    "title": "Mirror-word checker",
    "prompt": "Compare the characters from the two ends.",
    "requirements": [
      "Read one nonempty ASCII word without spaces. Compare without case.",
      "Print true if the word is a palindrome, otherwise false. Use a loop."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "Level\n",
        "expected": "true"
      },
      {
        "name": "Case 2",
        "stdin": "router\n",
        "expected": "false"
      },
      {
        "name": "Case 3",
        "stdin": "a\n",
        "expected": "true"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        String word = scan.next().toLowerCase(java.util.Locale.ROOT);\n        boolean palindrome = true;\n        int left = 0, right = word.length() - 1;\n        while (left < right) {\n            if (word.charAt(left) != word.charAt(right)) { palindrome = false; break; }\n            left++; right--;\n        }\n        System.out.println(palindrome);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Compare the first and final characters, then move inward.",
      "Stop at the middle or immediately after a mismatch."
    ],
    "explanation": "A single character needs no pair comparison and is a palindrome.",
    "kind": "code"
  },
  {
    "id": "sentinel",
    "module": "loops",
    "level": "Intermediate",
    "title": "Average a stream of scores",
    "prompt": "Stop on -1 and avoid dividing by zero.",
    "requirements": [
      "Read scores from 0 through 100 terminated by -1.",
      "Print the average with one decimal place; if there are no scores, print No scores."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "70 80 90 -1\n",
        "expected": "80.0"
      },
      {
        "name": "Case 2",
        "stdin": "-1\n",
        "expected": "No scores"
      },
      {
        "name": "Case 3",
        "stdin": "0 -1\n",
        "expected": "0.0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int sum = 0, count = 0;\n        int score = scan.nextInt();\n        while (score != -1) { sum += score; count++; score = scan.nextInt(); }\n        if (count == 0) System.out.println(\"No scores\");\n        else System.out.printf(java.util.Locale.US, \"%.1f%n\", (double) sum / count);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Check the sentinel before adding to the total.",
      "Guard the average with count == 0."
    ],
    "explanation": "Zero is a real score here; -1 alone marks the end.",
    "kind": "code"
  },
  {
    "id": "triangle",
    "module": "loops",
    "level": "Intermediate",
    "title": "Print a growing triangle",
    "prompt": "Use a nested loop with a changing inner limit.",
    "requirements": [
      "Read n from 1 through 8.",
      "Print n rows. Row r contains r asterisks with no spaces."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3\n",
        "expected": "*\n**\n***"
      },
      {
        "name": "Case 2",
        "stdin": "1\n",
        "expected": "*"
      },
      {
        "name": "Case 3",
        "stdin": "2\n",
        "expected": "*\n**"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt();\n        for (int row = 1; row <= n; row++) {\n            for (int col = 1; col <= row; col++) System.out.print(\"*\");\n            System.out.println();\n        }\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "The outer loop selects the row.",
      "Print a newline only after the complete inner loop."
    ],
    "explanation": "The total number of symbols grows as 1 + 2 + ... + n.",
    "kind": "code"
  },
  {
    "id": "method-clamp",
    "module": "methods",
    "level": "Intermediate",
    "title": "Write a clamp helper",
    "prompt": "Keep an entered value within an inclusive interval.",
    "requirements": [
      "Write static int clamp(int value, int min, int max). Assume min <= max.",
      "Read value, min and max as three integers; print clamp(value, min, max). Values inside the range are unchanged."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "31 1 30\n",
        "expected": "30"
      },
      {
        "name": "Case 2",
        "stdin": "-4 1 30\n",
        "expected": "1"
      },
      {
        "name": "Case 3",
        "stdin": "12 1 30\n",
        "expected": "12"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int value = scan.nextInt(), min = scan.nextInt(), max = scan.nextInt();\n        System.out.println(clamp(value, min, max));\n        scan.close();\n    }\n\n    public static int clamp(int value, int min, int max) {\n        if (value < min) return min;\n        if (value > max) return max;\n        return value;\n    }\n}\n"
    },
    "hints": [
      "Use early returns for values below or above the range.",
      "Otherwise return the original value."
    ],
    "explanation": "Separating calculation from input makes the helper reusable.",
    "kind": "code"
  },
  {
    "id": "method-prime",
    "module": "methods",
    "level": "Advanced",
    "title": "Is this number prime?",
    "prompt": "Encapsulate a divisibility check in a method.",
    "requirements": [
      "Write static boolean isPrime(int n). Read one integer from 0 through 10000.",
      "Return false for n < 2; otherwise check divisors using a loop. Print the returned boolean."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "2\n",
        "expected": "true"
      },
      {
        "name": "Case 2",
        "stdin": "1\n",
        "expected": "false"
      },
      {
        "name": "Case 3",
        "stdin": "49\n",
        "expected": "false"
      },
      {
        "name": "Case 4",
        "stdin": "97\n",
        "expected": "true"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        System.out.println(isPrime(scan.nextInt()));\n        scan.close();\n    }\n\n    public static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int d = 2; d * d <= n; d++) if (n % d == 0) return false;\n        return true;\n    }\n}\n"
    },
    "hints": [
      "Handle n < 2 before the loop.",
      "For this small range, testing while d * d <= n is safe."
    ],
    "explanation": "A composite number has a divisor no greater than its square root.",
    "kind": "code"
  },
  {
    "id": "array-max",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Strongest signal",
    "prompt": "Find the maximum even when every reading is negative.",
    "requirements": [
      "Read n from 1 through 20, followed by n integer readings.",
      "Store them in an array and print the maximum."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 -8 -3 -10\n",
        "expected": "-3"
      },
      {
        "name": "Case 2",
        "stdin": "1 -50\n",
        "expected": "-50"
      },
      {
        "name": "Case 3",
        "stdin": "4 5 9 1 9\n",
        "expected": "9"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt();\n        int[] data = new int[n];\n        for (int i = 0; i < n; i++) data[i] = scan.nextInt();\n        int max = data[0];\n        for (int value : data) if (value > max) max = value;\n        System.out.println(max);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Initialize max from an actual element.",
      "Do not use zero as an assumed lower bound."
    ],
    "explanation": "Starting at zero would incorrectly return zero for all-negative input.",
    "kind": "code"
  },
  {
    "id": "array-reverse",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Reverse a set of readings",
    "prompt": "Use indexes to print an array from the end.",
    "requirements": [
      "Read n from 1 through 20, followed by n integers.",
      "Print values in reverse order separated by single spaces, with no extra label."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 4 7 2\n",
        "expected": "2 7 4"
      },
      {
        "name": "Case 2",
        "stdin": "1 9\n",
        "expected": "9"
      },
      {
        "name": "Case 3",
        "stdin": "4 1 2 3 4\n",
        "expected": "4 3 2 1"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] data = new int[scan.nextInt()];\n        for (int i = 0; i < data.length; i++) data[i] = scan.nextInt();\n        for (int i = data.length - 1; i >= 0; i--) {\n            if (i != data.length - 1) System.out.print(\" \");\n            System.out.print(data[i]);\n        }\n        System.out.println();\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "The final valid index is length - 1.",
      "Print separators between values rather than after every value."
    ],
    "explanation": "The first reverse value prints without a leading separator.",
    "kind": "code"
  },
  {
    "id": "find-id",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Locate an asset ID",
    "prompt": "Report the first matching position.",
    "requirements": [
      "Read n from 1 through 20, then n integer IDs, then a target ID.",
      "Perform linear search and print its first index, or -1 if absent."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 402 117 305 117\n",
        "expected": "1"
      },
      {
        "name": "Case 2",
        "stdin": "3 1 2 3 9\n",
        "expected": "-1"
      },
      {
        "name": "Case 3",
        "stdin": "4 7 7 2 7 7\n",
        "expected": "0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] ids = new int[scan.nextInt()];\n        for (int i = 0; i < ids.length; i++) ids[i] = scan.nextInt();\n        int target = scan.nextInt(), found = -1;\n        for (int i = 0; i < ids.length; i++) {\n            if (ids[i] == target) { found = i; break; }\n        }\n        System.out.println(found);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Start found at -1.",
      "On a match, save the index and break to preserve the first occurrence."
    ],
    "explanation": "No sorting is required for linear search.",
    "kind": "code"
  },
  {
    "id": "array-frequency",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Count each equipment category",
    "prompt": "Use array indexes as category counters.",
    "requirements": [
      "Read n from 0 through 20, followed by n integer category codes from 0 through 3.",
      "Print four counts for categories 0, 1, 2 and 3, separated by spaces."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "6 0 1 1 3 0 1\n",
        "expected": "2 3 0 1"
      },
      {
        "name": "Case 2",
        "stdin": "0\n",
        "expected": "0 0 0 0"
      },
      {
        "name": "Case 3",
        "stdin": "3 2 2 2\n",
        "expected": "0 0 3 0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt();\n        int[] counts = new int[4];\n        for (int i = 0; i < n; i++) counts[scan.nextInt()]++;\n        System.out.println(counts[0] + \" \" + counts[1] + \" \" + counts[2] + \" \" + counts[3]);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "An int array starts with zeros.",
      "Increment the element indexed by the current category code."
    ],
    "explanation": "This relies on the specified input range so every code is a valid index.",
    "kind": "code"
  },
  {
    "id": "sort-readings",
    "module": "arrays",
    "level": "Advanced",
    "title": "Order a set of readings",
    "prompt": "Implement ascending bubble sort.",
    "requirements": [
      "Read n from 1 through 20 and n integers.",
      "Sort using neighbour comparisons and swaps, then print values separated by one space. Do not use Arrays.sort for this exercise."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 9 2 5\n",
        "expected": "2 5 9"
      },
      {
        "name": "Case 2",
        "stdin": "4 3 3 -1 2\n",
        "expected": "-1 2 3 3"
      },
      {
        "name": "Case 3",
        "stdin": "1 7\n",
        "expected": "7"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] data = new int[scan.nextInt()];\n        for (int i = 0; i < data.length; i++) data[i] = scan.nextInt();\n        for (int end = data.length - 1; end > 0; end--) {\n            for (int i = 0; i < end; i++) {\n                if (data[i] > data[i + 1]) { int temp = data[i]; data[i] = data[i + 1]; data[i + 1] = temp; }\n            }\n        }\n        for (int i = 0; i < data.length; i++) { if (i > 0) System.out.print(\" \"); System.out.print(data[i]); }\n        System.out.println();\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Compare i and i + 1 only while i < end.",
      "Save one value in a temporary variable before replacing it."
    ],
    "explanation": "Each pass settles one final position. Sample output checks cannot enforce your algorithm choice; review that requirement yourself.",
    "kind": "code"
  },
  {
    "id": "room-totals",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Inventory totals by room",
    "prompt": "Use a 2-D array to store a room inventory grid.",
    "requirements": [
      "Read rows and columns from 1 through 5, then rows * columns nonnegative integer counts in row-major order.",
      "Print each row total on its own line."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "2 3 1 2 3 4 5 6\n",
        "expected": "6\n15"
      },
      {
        "name": "Case 2",
        "stdin": "1 1 9\n",
        "expected": "9"
      },
      {
        "name": "Case 3",
        "stdin": "2 2 0 0 3 7\n",
        "expected": "0\n10"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int rows = scan.nextInt(), cols = scan.nextInt();\n        int[][] data = new int[rows][cols];\n        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) data[r][c] = scan.nextInt();\n        for (int r = 0; r < rows; r++) {\n            int total = 0;\n            for (int c = 0; c < cols; c++) total += data[r][c];\n            System.out.println(total);\n        }\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Use one loop for rows and one for columns.",
      "Reset total at the start of each row."
    ],
    "explanation": "The data is read in the same row/column order as it is stored.",
    "kind": "code"
  },
  {
    "id": "unique-list",
    "module": "arrays",
    "level": "Advanced",
    "title": "Unique room names",
    "prompt": "Store each room name at most once while preserving input order.",
    "requirements": [
      "Read n from 0 through 20, followed by n single-token room names. Compare case-sensitively.",
      "Use ArrayList<String>. Print the unique count, then each unique name on its own line in first-seen order."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "4 A B A C\n",
        "expected": "3\nA\nB\nC"
      },
      {
        "name": "Case 2",
        "stdin": "0\n",
        "expected": "0"
      },
      {
        "name": "Case 3",
        "stdin": "3 York York york\n",
        "expected": "2\nYork\nyork"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int n = scan.nextInt();\n        java.util.ArrayList<String> rooms = new java.util.ArrayList<>();\n        for (int i = 0; i < n; i++) { String room = scan.next(); if (!rooms.contains(room)) rooms.add(room); }\n        System.out.println(rooms.size());\n        for (String room : rooms) System.out.println(room);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "contains checks whether equal text is already stored.",
      "Add only a name not seen earlier."
    ],
    "explanation": "This keeps first-seen ordering and uses String equality through ArrayList.contains.",
    "kind": "code"
  },
  {
    "id": "product-class",
    "module": "classes",
    "level": "Intermediate",
    "title": "Model a product",
    "prompt": "Write a class with private state and a total-cost method.",
    "requirements": [
      "Create Product with private name and unitCents fields, constructor Product(String name, int unitCents), getName(), and int cost(int quantity).",
      "Read a single-token name, nonnegative unit cents and nonnegative quantity. Print name followed by one space and the cost in cents."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "Tape 450 3\n",
        "expected": "Tape 1350"
      },
      {
        "name": "Case 2",
        "stdin": "Net 2500 0\n",
        "expected": "Net 0"
      },
      {
        "name": "Case 3",
        "stdin": "Ball 300 2\n",
        "expected": "Ball 600"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        Product p = new Product(scan.next(), scan.nextInt());\n        int quantity = scan.nextInt();\n        System.out.println(p.getName() + \" \" + p.cost(quantity));\n        scan.close();\n    }\n}\n",
      "Product.java": "public class Product {\n    private String name;\n    private int unitCents;\n    public Product(String name, int unitCents) { this.name = name; this.unitCents = unitCents; }\n    public String getName() { return name; }\n    public int cost(int quantity) { return unitCents * quantity; }\n}\n"
    },
    "hints": [
      "Keep unit price on the object and pass quantity to cost.",
      "Return the computed value; let main print it."
    ],
    "explanation": "The output checks exercise the driver. Also review the requested constructor, private fields and method signatures yourself.",
    "kind": "code"
  },
  {
    "id": "wallet-class",
    "module": "classes",
    "level": "Advanced",
    "title": "A wallet that rejects invalid spending",
    "prompt": "Encapsulate a balance in integer cents.",
    "requirements": [
      "Write Wallet(int balance), boolean spend(int cents), and int getBalance(). Use a private balance field; initial balance is nonnegative.",
      "spend rejects nonpositive amounts or amounts greater than the balance without changing it.",
      "Read initial balance and two spend amounts. Print each boolean result, then the final balance, each on its own line."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "1000 300 900\n",
        "expected": "true\nfalse\n700"
      },
      {
        "name": "Case 2",
        "stdin": "0 1 -5\n",
        "expected": "false\nfalse\n0"
      },
      {
        "name": "Case 3",
        "stdin": "500 500 1\n",
        "expected": "true\nfalse\n0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Read the required input.\n        // TODO: Implement the rules and print the exact result.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        Wallet wallet = new Wallet(scan.nextInt());\n        System.out.println(wallet.spend(scan.nextInt()));\n        System.out.println(wallet.spend(scan.nextInt()));\n        System.out.println(wallet.getBalance());\n        scan.close();\n    }\n}\n",
      "Wallet.java": "public class Wallet {\n    private int balance;\n    public Wallet(int balance) { this.balance = balance; }\n    public int getBalance() { return balance; }\n    public boolean spend(int cents) {\n        if (cents <= 0 || cents > balance) return false;\n        balance -= cents; return true;\n    }\n}\n"
    },
    "hints": [
      "Check all rejection conditions before changing balance.",
      "Return true only after subtracting a valid amount."
    ],
    "explanation": "An operation should preserve its invariant on both success and failure.",
    "kind": "code"
  },
  {
    "id": "debug-division",
    "module": "data",
    "level": "Easy",
    "title": "Debug: the average is always zero",
    "prompt": "Repair a calculation that truncates too early.",
    "requirements": [
      "Read two integers completed and total, with total > 0.",
      "Print their ratio with two decimal places. Fix the computation rather than hardcoding the examples."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 4\n",
        "expected": "0.75"
      },
      {
        "name": "Case 2",
        "stdin": "1 2\n",
        "expected": "0.50"
      },
      {
        "name": "Case 3",
        "stdin": "4 4\n",
        "expected": "1.00"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int done = scan.nextInt(), total = scan.nextInt();\n        double ratio = done / total;\n        System.out.printf(java.util.Locale.US, \"%.2f%n\", ratio);\n        scan.close();\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int done = scan.nextInt(), total = scan.nextInt();\n        double ratio = (double) done / total;\n        System.out.printf(java.util.Locale.US, \"%.2f%n\", ratio);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Look at the operand types before division.",
      "Casting the completed division is too late."
    ],
    "explanation": "Casting the first operand makes the division floating-point.",
    "kind": "debug"
  },
  {
    "id": "debug-newline",
    "module": "objects",
    "level": "Easy",
    "title": "Debug: where did the name go?",
    "prompt": "Repair mixed numeric and whole-line input.",
    "requirements": [
      "Read age on the first line and a full name on the second.",
      "Print name followed by one space and age."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "22\nReza H\n",
        "expected": "Reza H 22"
      },
      {
        "name": "Case 2",
        "stdin": "19\nSara\n",
        "expected": "Sara 19"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int age = scan.nextInt();\n        String name = scan.nextLine();\n        System.out.println(name + \" \" + age);\n        scan.close();\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int age = scan.nextInt();\n        scan.nextLine();\n        String name = scan.nextLine();\n        System.out.println(name + \" \" + age);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "The numeric method leaves the rest of its line.",
      "Consume that remainder before reading the name line."
    ],
    "explanation": "A deliberate extra nextLine finishes the number line.",
    "kind": "debug"
  },
  {
    "id": "debug-range",
    "module": "decisions",
    "level": "Easy",
    "title": "Debug: every width seems valid",
    "prompt": "Fix an always-true range condition.",
    "requirements": [
      "Read one integer.",
      "Print Valid for 1 through 30 inclusive, otherwise Invalid."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "31\n",
        "expected": "Invalid"
      },
      {
        "name": "Case 2",
        "stdin": "0\n",
        "expected": "Invalid"
      },
      {
        "name": "Case 3",
        "stdin": "12\n",
        "expected": "Valid"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int width = scan.nextInt();\n        if (width >= 1 || width <= 30) System.out.println(\"Valid\");\n        else System.out.println(\"Invalid\");\n        scan.close();\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int width = scan.nextInt();\n        if (width >= 1 && width <= 30) System.out.println(\"Valid\");\n        else System.out.println(\"Invalid\");\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "Test a value far above the range. Which side of the OR is still true?",
      "Both boundaries must hold for valid input."
    ],
    "explanation": "Replacing OR with AND expresses the valid interval.",
    "kind": "debug"
  },
  {
    "id": "debug-bounds",
    "module": "arrays",
    "level": "Intermediate",
    "title": "Debug: one step too far",
    "prompt": "Repair the array traversal boundary.",
    "requirements": [
      "Read n from 1 through 20, followed by n integers.",
      "Print the total. The starter throws an exception after visiting the final element."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "3 2 4 6\n",
        "expected": "12"
      },
      {
        "name": "Case 2",
        "stdin": "1 -2\n",
        "expected": "-2"
      },
      {
        "name": "Case 3",
        "stdin": "2 0 0\n",
        "expected": "0"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] data = new int[scan.nextInt()];\n        for (int i = 0; i < data.length; i++) data[i] = scan.nextInt();\n        int total = 0;\n        for (int i = 0; i <= data.length; i++) total += data[i];\n        System.out.println(total);\n        scan.close();\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] data = new int[scan.nextInt()];\n        for (int i = 0; i < data.length; i++) data[i] = scan.nextInt();\n        int total = 0;\n        for (int i = 0; i < data.length; i++) total += data[i];\n        System.out.println(total);\n        scan.close();\n    }\n}\n"
    },
    "hints": [
      "List the valid indexes of an array of length 3.",
      "The condition must stop before length itself."
    ],
    "explanation": "The last valid index is length - 1.",
    "kind": "debug"
  },
  {
    "id": "debug-static",
    "module": "classes",
    "level": "Intermediate",
    "title": "Debug: static main cannot use this field",
    "prompt": "Fix the relationship between an object and static main.",
    "requirements": [
      "No input. The starter tries to access an instance field from a static context.",
      "Keep value as an instance field. Create an object and print 7 through that object."
    ],
    "tests": [
      {
        "name": "Case 1",
        "stdin": "",
        "expected": "7"
      }
    ],
    "files": {
      "Main.java": "public class Main {\n    private int value = 7;\n    public static void main(String[] args) {\n        System.out.println(value);\n    }\n}\n"
    },
    "solution": {
      "Main.java": "public class Main {\n    private int value = 7;\n    public static void main(String[] args) {\n        Main item = new Main();\n        System.out.println(item.value);\n    }\n}\n"
    },
    "hints": [
      "An instance field belongs to an object.",
      "Create Main item = new Main(), then access item.value from within the class."
    ],
    "explanation": "Making everything static would hide the issue rather than practise instance access.",
    "kind": "debug"
  }
];

export const mockTests = [
  {
    "id": "print-shop",
    "title": "Campus print shop",
    "minutes": 45,
    "summary": "Combine input, validation, arithmetic and decisions in a small quotation tool.",
    "requirements": [
      "Read an integer page count followed by a decimal price per page. If pages is outside 1 through 500, print Invalid and stop. Assume the price is nonnegative.",
      "Calculate subtotal = pages * price. Apply a 10% discount to the subtotal when pages >= 100.",
      "Add a fixed 5.00 setup fee after the discount. This is a fictional pricing exercise with no tax.",
      "Print Subtotal:, Discount:, and Total:, each followed by one space and a value with two decimal places, one item per line. Print no prompts.",
      "Use meaningful names, a constant for the setup fee, and a helper method for the discount amount."
    ],
    "tests": [
      {
        "name": "Small order",
        "stdin": "20 0.25\n",
        "expected": "Subtotal: 5.00\nDiscount: 0.00\nTotal: 10.00"
      },
      {
        "name": "Discount threshold",
        "stdin": "100 0.20\n",
        "expected": "Subtotal: 20.00\nDiscount: 2.00\nTotal: 23.00"
      },
      {
        "name": "Invalid count",
        "stdin": "0 0.25\n",
        "expected": "Invalid"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Implement the mock-test requirements.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int pages = scan.nextInt();\n        double price = scan.nextDouble();\n        scan.close();\n        if (pages < 1 || pages > 500) { System.out.println(\"Invalid\"); return; }\n        final double SETUP_FEE = 5.0;\n        double subtotal = pages * price;\n        double discount = discountFor(pages, subtotal);\n        System.out.printf(java.util.Locale.US, \"Subtotal: %.2f%nDiscount: %.2f%nTotal: %.2f%n\", subtotal, discount, subtotal - discount + SETUP_FEE);\n    }\n\n    public static double discountFor(int pages, double subtotal) {\n        return pages >= 100 ? subtotal * 0.10 : 0.0;\n    }\n}\n"
    },
    "rubric": [
      {
        "label": "Read both values using appropriate types",
        "points": 15
      },
      {
        "label": "Reject page counts outside the inclusive range",
        "points": 20
      },
      {
        "label": "Calculate the correct subtotal",
        "points": 15
      },
      {
        "label": "Apply the discount at and above 100 pages",
        "points": 20
      },
      {
        "label": "Add the fee after discount and format output",
        "points": 20
      },
      {
        "label": "Use a helper, constant and clear variable names",
        "points": 10
      }
    ],
    "hints": [
      "Validate the page count before calculating the bill.",
      "Compute the discount separately from the final total.",
      "Test exactly 99 and exactly 100 pages."
    ],
    "explanation": "The helper returns an amount, not a percentage. Subtract it from the subtotal, then add the fee. The sample checks cover behaviour; use the review rubric for structure."
  },
  {
    "id": "signal-report",
    "title": "Network signal report",
    "minutes": 60,
    "summary": "Store readings, summarize them with methods, and handle an empty batch.",
    "requirements": [
      "Read n where 0 <= n <= 20, followed by n integer signal readings from -100 through 0.",
      "Store the readings in an int array. If n is zero, print No readings and stop.",
      "Find the minimum (weakest numeric value), maximum (strongest numeric value), average and count of readings >= -60.",
      "Print Min:, Max:, Average: and Strong: on separate lines. Use one space after each colon and one decimal place for Average.",
      "Write at least two static helpers for the calculations. Do not sort just to get min or max."
    ],
    "tests": [
      {
        "name": "All negative",
        "stdin": "4 -80 -50 -60 -90\n",
        "expected": "Min: -90\nMax: -50\nAverage: -70.0\nStrong: 2"
      },
      {
        "name": "Single boundary",
        "stdin": "1 -60\n",
        "expected": "Min: -60\nMax: -60\nAverage: -60.0\nStrong: 1"
      },
      {
        "name": "Empty batch",
        "stdin": "0\n",
        "expected": "No readings"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Implement the mock-test requirements.\n    }\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int[] data = new int[scan.nextInt()];\n        for (int i = 0; i < data.length; i++) data[i] = scan.nextInt();\n        scan.close();\n        if (data.length == 0) { System.out.println(\"No readings\"); return; }\n        int min = data[0], max = data[0];\n        for (int value : data) { min = Math.min(min, value); max = Math.max(max, value); }\n        System.out.println(\"Min: \" + min);\n        System.out.println(\"Max: \" + max);\n        System.out.printf(java.util.Locale.US, \"Average: %.1f%n\", average(data));\n        System.out.println(\"Strong: \" + countStrong(data));\n    }\n\n    public static double average(int[] data) {\n        int sum = 0;\n        for (int value : data) sum += value;\n        return (double) sum / data.length;\n    }\n    public static int countStrong(int[] data) {\n        int count = 0;\n        for (int value : data) if (value >= -60) count++;\n        return count;\n    }\n}\n"
    },
    "rubric": [
      {
        "label": "Read and store all values in an array",
        "points": 15
      },
      {
        "label": "Handle n = 0 before element access or division",
        "points": 15
      },
      {
        "label": "Find correct min/max for all-negative data",
        "points": 25
      },
      {
        "label": "Calculate a floating-point average",
        "points": 20
      },
      {
        "label": "Count the -60 boundary inclusively",
        "points": 15
      },
      {
        "label": "Use two helpers and exact output formatting",
        "points": 10
      }
    ],
    "hints": [
      "The strongest numeric value is the maximum, even though all inputs are nonpositive.",
      "Initialize min and max from the first real reading.",
      "The empty case must be handled before accessing data[0]."
    ],
    "explanation": "The example uses helpers for average and threshold count. Main handles the empty batch, so the average helper receives a nonempty array."
  },
  {
    "id": "library",
    "title": "The neighbourhood library",
    "minutes": 90,
    "summary": "Build a complete console catalogue with Book objects, a Library collection, and a repeating command menu.",
    "requirements": [
      "Create three classes in separate files: Main, Book and Library. Keep object fields private. Main owns input/output; Book owns one book's state; Library owns an array of books.",
      "Book needs id (int), title, author and availability. Constructor Book(int id, String title, String author) sets availability true. Provide getId(), getTitle(), isAvailable(), boolean borrow(), boolean returnBook() and toString(). Borrowing an unavailable book or returning an available book must fail without changing state.",
      "Library(int capacity) creates a fixed Book[] and count. Provide size(), findById(int id), boolean add(Book book), catalogue() and searchTitle(String query). add rejects null, duplicate IDs and full capacity. findById returns null when absent. Process only occupied slots.",
      "Main creates Library(100). Read integer menu commands on their own lines until 0 or end of input. Do not print prompts or a menu heading; the numbered commands below define the menu contract.",
      "1 = add: read id on the next line, then full title on the next line, then full author on the next. Print ADDED or REJECTED. IDs are positive and titles/authors are nonempty in these tests.",
      "2 = list: print books in insertion order. Each line is id | title | author | AVAILABLE or ON_LOAN. If there are no books, print EMPTY.",
      "3 = borrow: read id on the next line. Print NOT_FOUND if absent, BORROWED on success or UNAVAILABLE if already on loan.",
      "4 = return: read id on the next line. Print NOT_FOUND if absent, RETURNED on success or ALREADY_AVAILABLE if not on loan.",
      "5 = search: read a full-line title query next. Print every matching book in insertion order using case-insensitive substring matching, or NOT_FOUND when no titles match.",
      "0 = exit and print BYE. Other integer commands print INVALID. Use exactly the uppercase status text specified. Use nextLine deliberately after numeric reads.",
      "Self-review extra cases beyond the sample suite: null add, full capacity, a duplicate after borrowing, partial title search, and preserving book state after rejected operations."
    ],
    "tests": [
      {
        "name": "Empty catalogue and unknown ID",
        "stdin": "2\n3\n999\n9\n0\n",
        "expected": "EMPTY\nNOT_FOUND\nINVALID\nBYE"
      },
      {
        "name": "Borrow twice, return twice",
        "stdin": "1\n101\nModern Java\nA Writer\n3\n101\n3\n101\n2\n4\n101\n4\n101\n0\n",
        "expected": "ADDED\nBORROWED\nUNAVAILABLE\n101 | Modern Java | A Writer | ON_LOAN\nRETURNED\nALREADY_AVAILABLE\nBYE"
      },
      {
        "name": "Duplicate and case-insensitive search",
        "stdin": "1\n1\nNetwork Lab\nReza\n1\n1\nDuplicate\nOther\n1\n2\nJava Lab\nSara\n5\nLAB\n5\nmissing\n0\n",
        "expected": "ADDED\nREJECTED\nADDED\n1 | Network Lab | Reza | AVAILABLE\n2 | Java Lab | Sara | AVAILABLE\nNOT_FOUND\nBYE"
      }
    ],
    "files": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Create Library(100) and read commands in a loop.\n        // TODO: Implement the command contract in the brief.\n    }\n}\n",
      "Book.java": "public class Book {\n    // TODO: Private id, title, author and availability.\n    // TODO: Constructor, getters, borrow, returnBook and toString.\n}\n",
      "Library.java": "public class Library {\n    // TODO: Book[] books and int count.\n    // TODO: Constructor, add, findById, size, catalogue, searchTitle.\n}\n"
    },
    "solution": {
      "Main.java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        Library library = new Library(100);\n        boolean running = true;\n        while (running && scan.hasNextInt()) {\n            int choice = scan.nextInt();\n            scan.nextLine();\n            switch (choice) {\n                case 1: {\n                    int id = scan.nextInt();\n                    scan.nextLine();\n                    String title = scan.nextLine();\n                    String author = scan.nextLine();\n                    System.out.println(library.add(new Book(id, title, author)) ? \"ADDED\" : \"REJECTED\");\n                    break;\n                }\n                case 2:\n                    System.out.print(library.catalogue());\n                    break;\n                case 3: {\n                    int id = scan.nextInt();\n                    scan.nextLine();\n                    Book book = library.findById(id);\n                    if (book == null) System.out.println(\"NOT_FOUND\");\n                    else System.out.println(book.borrow() ? \"BORROWED\" : \"UNAVAILABLE\");\n                    break;\n                }\n                case 4: {\n                    int id = scan.nextInt();\n                    scan.nextLine();\n                    Book book = library.findById(id);\n                    if (book == null) System.out.println(\"NOT_FOUND\");\n                    else System.out.println(book.returnBook() ? \"RETURNED\" : \"ALREADY_AVAILABLE\");\n                    break;\n                }\n                case 5:\n                    System.out.print(library.searchTitle(scan.nextLine()));\n                    break;\n                case 0:\n                    System.out.println(\"BYE\");\n                    running = false;\n                    break;\n                default:\n                    System.out.println(\"INVALID\");\n            }\n        }\n        scan.close();\n    }\n}\n",
      "Book.java": "public class Book {\n    private int id;\n    private String title;\n    private String author;\n    private boolean available;\n\n    public Book(int id, String title, String author) {\n        this.id = id;\n        this.title = title;\n        this.author = author;\n        available = true;\n    }\n    public int getId() { return id; }\n    public String getTitle() { return title; }\n    public boolean isAvailable() { return available; }\n    public boolean borrow() {\n        if (!available) return false;\n        available = false;\n        return true;\n    }\n    public boolean returnBook() {\n        if (available) return false;\n        available = true;\n        return true;\n    }\n    public String toString() {\n        return id + \" | \" + title + \" | \" + author + \" | \" + (available ? \"AVAILABLE\" : \"ON_LOAN\");\n    }\n}\n",
      "Library.java": "public class Library {\n    private Book[] books;\n    private int count;\n\n    public Library(int capacity) { books = new Book[capacity]; }\n    public int size() { return count; }\n    public Book findById(int id) {\n        for (int i = 0; i < count; i++) if (books[i].getId() == id) return books[i];\n        return null;\n    }\n    public boolean add(Book book) {\n        if (book == null || count == books.length || findById(book.getId()) != null) return false;\n        books[count++] = book;\n        return true;\n    }\n    public String catalogue() {\n        String result = \"\";\n        for (int i = 0; i < count; i++) result += books[i] + \"\\n\";\n        return count == 0 ? \"EMPTY\\n\" : result;\n    }\n    public String searchTitle(String query) {\n        String result = \"\";\n        for (int i = 0; i < count; i++) {\n            if (books[i].getTitle().toLowerCase(java.util.Locale.ROOT).contains(query.toLowerCase(java.util.Locale.ROOT))) {\n                result += books[i] + \"\\n\";\n            }\n        }\n        return result.isEmpty() ? \"NOT_FOUND\\n\" : result;\n    }\n}\n"
    },
    "rubric": [
      {
        "label": "Book constructor, private state and readable toString",
        "points": 15
      },
      {
        "label": "Borrow/return guards preserve valid state",
        "points": 15
      },
      {
        "label": "Library array, count, capacity and duplicate checks",
        "points": 20
      },
      {
        "label": "Linear lookup and title search",
        "points": 15
      },
      {
        "label": "Main command loop and mixed Scanner input",
        "points": 20
      },
      {
        "label": "Empty, not-found and repeated-operation behaviour",
        "points": 10
      },
      {
        "label": "Clear responsibilities and extra boundary tests",
        "points": 5
      }
    ],
    "hints": [
      "Implement Book and test its state changes first.",
      "In Library, keep count separate from books.length; unused slots are null.",
      "findById is useful both for duplicate detection and checkout/return commands.",
      "Keep each numeric command on its own input line, and consume the remainder before a following title.",
      "A switch break exits the switch; use a running flag to exit the outer command loop."
    ],
    "explanation": "The solution separates responsibilities: Book manages availability, Library manages storage and lookup, Main maps commands to operations. The automatic checks cover console behaviour; the 100-point rubric is a self-review checklist, not an official exam grade."
  }
];

export const sourceNotes = [
  {
    "source": "Introduction / Week1",
    "topics": "Program structure, Scanner, compilation, errors and introductory object vocabulary."
  },
  {
    "source": "DataExpressions / Week2",
    "topics": "Primitive types, output, arithmetic, remainder, assignment and conversion."
  },
  {
    "source": "UsingObjects / Week3",
    "topics": "String operations, references, Random, Math, formatting and wrappers."
  },
  {
    "source": "Classes / Week4",
    "topics": "Fields, constructor setup, visibility, APIs, instance methods and drivers."
  },
  {
    "source": "Conditionals / Week5",
    "topics": "Boolean expressions, comparisons, branches and classic switch."
  },
  {
    "source": "Repetitions / Week6",
    "topics": "Validation, sentinel loops, nested loops, counters and trace tables."
  },
  {
    "source": "OODesign / Week7",
    "topics": "Class relationships, decomposition, object parameters and aggregation."
  },
  {
    "source": "Week8–Week10",
    "topics": "Arrays, 2-D arrays, searching, bubble sort, object collections, resizing and ArrayList."
  }
];

export const corrections = [
  {
    "source": "Classes slide 26",
    "text": "Omitting an access modifier gives package access, not public access."
  },
  {
    "source": "Classes slide 46",
    "text": "A default constructor is generated only if the class declares no constructors."
  },
  {
    "source": "Classes slide 37",
    "text": "A method header includes the return type. For these non-generic examples, the signature used for overloading is the method name plus parameter types, not the return type."
  },
  {
    "source": "UsingObjects slide 8",
    "text": "String and Math are in java.lang, which is automatically imported; that is different from the unnamed/default package."
  },
  {
    "source": "UsingObjects slides 35–40",
    "text": "DecimalFormat rounds for display. Wrapper classes represent values as objects and are not all non-instantiable utility classes."
  },
  {
    "source": "Week5 / T1",
    "text": "Scanner reads an integer with nextInt(), not readInt()."
  },
  {
    "source": "OODesign slide 4 / Week7",
    "text": "A static method cannot directly use an instance Random field. Use a static field deliberately or create an object. The Week7 text uses static fields."
  },
  {
    "source": "Weekly example modernization",
    "text": "The shuffle lesson uses Fisher–Yates. A handful of arbitrary swaps does not provide a uniform shuffle of all permutations."
  }
];

export const documentation = [
  {
    "title": "Java 17 language specification: classes, methods and constructors",
    "url": "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html"
  },
  {
    "title": "String API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html"
  },
  {
    "title": "Scanner API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html"
  },
  {
    "title": "Math API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Math.html"
  },
  {
    "title": "Random API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Random.html"
  },
  {
    "title": "Arrays API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html"
  },
  {
    "title": "ArrayList API",
    "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html"
  }
];

