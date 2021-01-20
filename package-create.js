const copydir = require('copy-dir');
const editJsonFile = require('edit-json-file');

const folderNameArgument = process.argv[2];

copydir('./package-template/', `./packages/${folderNameArgument}`, {
  utimes: false, // keep add time and modify time
  mode: true, // keep file mode
  cover: true, // cover file when exists, default is true
}, (error) => {
  if (error) throw error;

  setPackageName(folderNameArgument);
  // eslint-disable-next-line no-console
  console.log('new package created');
});

function setPackageName(name) {
  const packageJsonFile = editJsonFile(`./packages/${name}/package.json`);
  const packageLockJsonFile = editJsonFile(`./packages/${name}/package-lock.json`);

  const registry = packageJsonFile.get('name').split('/')[0];

  packageJsonFile.set('name', `${registry}/${name}`);
  packageLockJsonFile.set('name', `${registry}/${name}`);

  packageJsonFile.save();
  packageLockJsonFile.save();
}
