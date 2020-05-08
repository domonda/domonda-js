const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const parseConfigHost = {
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  readDirectory: ts.sys.readDirectory,
  useCaseSensitiveFileNames: true,
};

const configFile = ts.readConfigFile(
  ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json'),
  ts.sys.readFile,
);
const compilerOptions = ts.parseJsonConfigFileContent(configFile.config, parseConfigHost, './');

ts.transpileModule(process.argv[2], { compilerOptions });

compile(process.argv[2], compilerOptions);
function compile(dir, args) {
  fs.readdirSync(dir).map((file) => path.join(dir, file));

  args.options.outDir = args.options.outDir.split('../').join('');
  let program = ts.createProgram(
    fs.readdirSync(dir).map((file) => path.join(dir, file)),
    args,
  );
  let emitResult = program.emit();

  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}
