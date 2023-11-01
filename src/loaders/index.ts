import fs from "fs";
//Loads each initialization file as promise and returns a promise
const loader = (confObj: any) =>
  new Promise((resolve, reject) => {
    try {
      const ps: any[] = [];
      fs.readdirSync(__dirname).forEach(async (file) => {
        if (!file.includes("index")) {
          const { default: r } = await import(`./${file.slice(0, -3)}`);

          ps.push(r(confObj));
        }
      });
      Promise.all(ps)
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });

export default loader;
