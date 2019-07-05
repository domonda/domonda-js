/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const pick = require('lodash/pick');

const packagePath = process.cwd();

async function readPackageData() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  return JSON.parse(packageData);
}

async function getLibDir() {
  const packageData = await readPackageData();
  return packageData.libDir || './lib';
}

async function includeFileInLib(file) {
  const sourcePath = path.resolve(packagePath, file);
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

  const packageData = await readPackageData();
  const libPackageData = {
    ...pick(packageData, includedLibPackageDataKeys),
    main: './index.js',
    typings: './index.d.ts',
  };

  const libDir = await getLibDir();
  const targetPath = path.resolve(libDir, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(libPackageData, null, 2), 'utf8');

  console.log(`Created library package.json in ${targetPath}`);
}

async function run() {
  try {
    await createLibPackage();
    await Promise.all(['./CHANGELOG.md', './LICENSE'].map((file) => includeFileInLib(file)));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
