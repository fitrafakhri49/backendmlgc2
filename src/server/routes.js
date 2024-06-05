const {
  postPredictHandler,
  getPredictionHistories,
} = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler, // Handler untuk POST /predict
    options: {
      payload: {
        allow: "multipart/form-data", // Mengizinkan payload multipart
        maxBytes: 1000000, // Batas maksimum payload
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getPredictionHistories, // Handler untuk GET /predict/histories
  },
];

module.exports = routes; // Mengekspor rute
