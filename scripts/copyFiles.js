/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const pick = require('lodash/pick');

async function readPackageData() {
  const packageData = await fse.readFile(path.resolve(process.cwd(), 'package.json'), 'utf8');
  return JSON.parse(packageData);
}

async function copyFile(file, dest, permissive) {
  const sourcePath = path.resolve(process.cwd(), file);

  // the file might not exist
  const exists = fse.existsSync(sourcePath);
  if (permissive && !exists) {
    return;
  }

  const targetPath = path.resolve(dest, path.basename(file));

  await fse.copy(sourcePath, targetPath);

  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function createLibPackage(dest) {
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
    main: 'index.js',
    types: 'index.d.ts',
  };

  const targetPath = path.resolve(dest, 'package.json');

  await fse.writeFile(targetPath, JSON.stringify(libPackageData, null, 2), 'utf8');

  console.log(`Created library package.json in ${targetPath}`);
}

async function run() {
  try {
    const destDir = process.argv[2];
    if (!destDir) {
      throw new Error(`A destination directory is required!`);
    }

    fse.ensureDirSync(destDir);

    await createLibPackage(destDir);
    await copyFile('CHANGELOG.md', destDir, true);
    await copyFile('LICENSE', destDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
