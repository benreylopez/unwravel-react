// const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io":"http://localhost:8000"
const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io":"http://178.128.8.37:8000"
// const api = process.env.Node_env == 'production'?"https://api.aiprofessionals.io": "http://b2baa724.ngrok.io"
export default api;
