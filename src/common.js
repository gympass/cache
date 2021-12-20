import * as core from '@actions/core';
import * as exec from '@actions/exec';

export const runTool = async (mode) => {
  const paths = core.getInput('paths');
  const keyFiles = core.getInput('key-files');
  const cannedBundles = core.getInput('bundles');
  const entrypoint = core.getInput('entrypoint');

  const args = ['--operation', mode];
  if (paths != '') {
    args.push('--paths', paths)
  }

  if (keyFiles != '') {
    args.push('--key-files', keyFiles)
  }

  if (cannedBundles != '') {
    args.push('--canned-bundles', cannedBundles)
  }



  try {
    await exec.exec(entrypoint === '' ? '/gympass/cache' : entrypoint, args);
  } catch(err) {
    console.error("Error running command: ", err);
    process.exit(1);
  }
};
