// const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io":"http://localhost:8000"
const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io":"http://178.128.8.37:8000"
// const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io": "http://81062d3f.ngrok.io"
export default api;
