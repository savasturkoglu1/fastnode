
import  express  from 'express'
import cors from 'cors'

// Express uygulamasını başlatıyoruz
const app = express();

// Gönderilen JSON verisini işlemek için body-parser orta katmanını kullanıyoruz
app.use(express.json());
app.use(cors())
// 5661 numaralı portu belirliyoruz
const PORT = 5661;

// Bir GET isteği işleyicisi oluşturuyoruz
app.get('/', (req, res) => {
  res.send('GET isteği başarılı!');
});

const sendResponse = (res, statusCode, status, data, message) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data
  });
};
// /check-install rotasını tanımla
app.get('/check-install', (req, res) => {
  const responseData = {
    server: "running",
    instalation_status: false
  };

  sendResponse(res, 200, 200, responseData, 'Server installation check successful');
});

// Bir POST isteği işleyicisi oluşturuyoruz
app.post('/post', (req, res) => {
  const body = req.body;
  res.send(`POST isteği başarılı! Gönderilen veri: ${JSON.stringify(body)}`);
});


// Bir POST isteği işleyicisi oluşturuyoruz
app.post('/start-setup', (req, res) => {
  const body = req.body;
  console.log(body);
  const responseData = {
    user_id:  body.user_id,
    device_id: body.device_id,
   license_id: 'asdasdreew',
    license_key: 'asdasdreew',
    license_status: 'active',
  };
  sendResponse(res, 200, 200, responseData, '-');
});

// Sunucuyu belirttiğimiz portta çalıştırıyoruz
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});