const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");
const InputError = require("../exceptions/InputError");

require("dotenv").config();

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"], // Mengizinkan semua asal
      },
    },
  });

  const model = await loadModel(); // Memuat model
  server.app.model = model; // Menyimpan model dalam server app

  server.route(routes); // Menambahkan rute ke server

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      if (response.output.statusCode === 413) {
        const newResponse = h.response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        });
        newResponse.code(413);
        return newResponse; //status 413 saat ukuran file besar
      }
    }

    return h.continue;
  });

  await server.start(); // Memulai server
  console.log(`Server start at: ${server.info.uri}`); // Menampilkan info URI server
})();
