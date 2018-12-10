// Make Sure You execute the script in the scripts directory
require('babel-register');
require('babel-polyfill');
const { exec } = require('../app/utilities');

const dir = process.argv[2];

exec(`mkdir ./app/${dir}; 
   cat ./scripts/generate/controller.example.js >> ./app/${dir}/controller.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/controller.js && rm ./app/${dir}/controller.js.bak;
   cat ./scripts/generate/helper.example.js >> ./app/${dir}/helper.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/helper.js && rm ./app/${dir}/helper.js.bak;
   cat ./scripts/generate/helper.example.spec.js >> ./app/${dir}/helper.spec.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/helper.spec.js && rm ./app/${dir}/helper.spec.js.bak;
   cat ./scripts/generate/model.example.js >> ./app/${dir}/model.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/model.js && rm ./app/${dir}/model.js.bak;
   cat ./scripts/generate/model.example.spec.js >> ./app/${dir}/model.spec.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/model.spec.js && rm ./app/${dir}/model.spec.js.bak;
   cat ./scripts/generate/roles.example.js >> ./app/${dir}/roles.js;
   cat ./scripts/generate/routes.example.js >> ./app/${dir}/routes.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/routes.js && rm ./app/${dir}/routes.js.bak;
   cat ./scripts/generate/routes.example.spec.js >> ./app/${dir}/routes.spec.js;
   sed -i.bak 's/Example/${dir}/g' ./app/${dir}/routes.spec.js && rm ./app/${dir}/routes.spec.js.bak;
   cat ./scripts/generate/validation.example.js >> ./app/${dir}/validation.js;`);
