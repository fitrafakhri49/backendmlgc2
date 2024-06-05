const predictClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
  const { image } = request.payload; // Mengambil payload gambar
  const { model } = request.server.app; // Mengambil model dari server

  const { label, suggestion } = await predictClassification(model, image); // Melakukan prediksi
  const id = crypto.randomUUID(); // Membuat UUID untuk id
  const createdAt = new Date().toISOString(); // Mengambil waktu saat ini

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data); // Menyimpan data ke database

  return h
    .response({
      status: "success",
      message: "Model is predicted successfully", // Pesan sukses
      data: data,
    })
    .code(201); // Mengembalikan respon dengan kode 201
}

async function getPredictionHistories(request, h) {
  try {
    const data = await loadData(); // Memuat data dari database
    return h
      .response({
        status: "success",
        data: data,
      })
      .code(200); // Mengembalikan respon dengan kode 200
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: "failed to get prediction histories", // Pesan gagal
      })
      .code(500); // Mengembalikan respon dengan kode 500
  }
}

module.exports = { postPredictHandler, getPredictionHistories };
