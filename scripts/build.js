const fs = require('fs');
const fse = require('fs-extra');
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

// relative outDir to lib
const outDir = compilerOptions.options.outDir.split('../').join('');
const rootDir = process.argv[2];

fse.ensureDirSync(outDir);
fse.emptyDirSync(outDir);

compilerOptions.fileNames.forEach((file) => {
  if (file.startsWith(rootDir)) {
    const { outputText, diagnostics } = ts.transpileModule(fs.readFileSync(file).toString(), {
      fileName: path.basename(file),
      reportDiagnostics: true,
      compilerOptions,
    });

    (diagnostics || []).forEach((diagnostic) => {
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      } else {
        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      }
    });

    fse.outputFileSync(file.replace(rootDir, outDir).replace(/\.tsx?$/, '.js'), outputText);
  }
});
