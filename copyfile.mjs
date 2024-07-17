import fse from 'fs-extra';

fse.copySync('src/img/', 'dist/assets/img/');
fse.copySync('public/', 'dist/');
