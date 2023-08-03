//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Temperament } = require("./src/db.js");
require("dotenv").config();
const getAllApiTemp = require("./src/controllers/helpers/functions/getAllApiTemp.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  //si esta en true, al conectarse empieza de cero con los modelos y en false lo contrario
  const temperamentsArray = await getAllApiTemp();

  try {
    for (const temp of temperamentsArray) {
      await Temperament.findOrCreate({
        where: { name: temp },
        defaults: { name: temp },
      });
    }
    console.log("Los temperamentos han sido cargados correctamente");
    
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
