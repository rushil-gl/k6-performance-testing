import { exec } from 'child_process';
import apiList from "./api-list.test.json";

let command = `echo 'Let's go!!' `;
apiList.forEach((api) => {
  command += `& k6 run --out json=results.json ${__dirname}/endpoints/${api}.js `
});

console.log(command);

// exec(command, (err, res) => {
//   console.log(err);
//   console.log(res);
// });

exec(command).stdout?.on('data', (res) => console.log(res)).on('error', (err) => console.log(err));
