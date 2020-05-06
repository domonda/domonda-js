/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const pick = require('lodash/pick');
const rimraf = require('rimraf');

const packagePath = process.cwd();
const contents = 'lib'; // the location of the library used by lerna

async function readPackageData() {
  const packageData = await fse.readFile(path.resolve(packagePath, 'package.json'), 'utf8');
  return JSON.parse(packageData);
}

async function getLibDir() {
  const packageData = await readPackageData();
  return path.dirname(packageData.main);
}

async function includeFileInLib(file, permissive) {
  const sourcePath = path.resolve(packagePath, file);

  // the file might not exist
  const exists = fse.existsSync(sourcePath);
  if (permissive && !exists) {
    return;
  }

  const libDir = await getLibDir();
  const targetPath = path.resolve(libDir, path.basename(file));

  await fse.copy(sourcePath, targetPath);

  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function createLibPackage() {
  const includedLibPackageDataKeys = [
    'name',
    'version',
    'description',
    'keywords',
    'homepage',
    'license',
    'repository',
    'publishConfig',
    'bugs',
    'peerDependencies',
    'dependencies',
  ];

  const { main, types, ...packageData } = await readPackageData();
  const libPackageData = {
    ...pick(packageData, includedLibPackageDataKeys),
    main: path.basename(main),
    types: path.basename(types),
  };

  const libDir = await getLibDir();
  const targetPath = path.resolve(libDir, 'package.json');

  await fse.writeFile(targetPath, JSON.stringify(libPackageData, null, 2), 'utf8');

  console.log(`Created library package.json in ${targetPath}`);
}

async function flattenLib() {
  const libDir = await getLibDir();

  // lib dir already flattened, nothing to do
  if (libDir === contents) {
    return;
  }

  // move lib to tmpdir
  const tmpLibDir = await fse.mkdtemp(packagePath);
  await fse.move(path.resolve(libDir), tmpLibDir, { overwrite: true });

  // clear files in contents directory
  const toDelete = path.resolve(path.join(contents, '*'));
  await new Promise((resolve, reject) =>
    rimraf(toDelete, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    }),
  );
  console.log(`Deleted ${toDelete}`);

  // move lib back to contents
  await fse.move(tmpLibDir, path.resolve(contents), { overwrite: true });
  console.log(`Moved ${tmpLibDir} to ${path.resolve(contents)}`);
}

async function run() {
  try {
    await createLibPackage();
    await includeFileInLib('CHANGELOG.md', true);
    await includeFileInLib('LICENSE');
    await flattenLib();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
