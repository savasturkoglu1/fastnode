
import  express  from 'express'
import cors from 'cors'

// Express uygulamasını başlatıyoruz
const app = express();

// Gönderilen JSON verisini işlemek için body-parser orta katmanını kullanıyoruz
app.use(express.json());
app.use(cors())
// 5661 numaralı portu belirliyoruz
const PORT = 5661;
const HOST = '0.0.0.0'
// Bir GET isteği işleyicisi oluşturuyoruz
app.get('/', (req, res) => {
  res.send('GET isteği başarılı!');
});


const contents = {
  "status": true,
  "message": "Content found",
  "data": [
      {
          "id": 3,
          "content_user_id": 2,
          "content_screen_id": 5,
          "content_type": "base",
          "content_content": "<div class=\"fixed inset-0 overflow-hidden\"><img src=\"http://localhost:8000/image/menu1.png\" alt=\"Image\" class=\"w-full h-full object-cover\"></div>",
          "content_schedule_id": 1,
          "creared_at": "2024-06-24 21:26:17",
          "updated_at": "2024-06-24T21:26:17.000000Z",
          "schedule": {
              "id": 1,
              "user_id": 101,
              "start_date": "2023-10-01",
              "end_date": "2023-10-07",
              "start_time": "08:00:00.000000",
              "end_time": "17:00:00.000000",
              "days": "Monday,Tuesday,Wednesday,Thursday,Friday",
              "updated_at": "2024-06-24T20:33:36.000000Z",
              "created_at": "2024-06-24T20:33:36.000000Z"
          }
      },
      {
          "id": 4,
          "content_user_id": 2,
          "content_screen_id": 5,
          "content_type": "",
          "content_content": "<div class=\"fixed inset-0 overflow-hidden\"><img src=\"http://localhost:8000/image/menu2.png\" alt=\"Image\" class=\"w-full h-full object-cover\"></div>",
          "content_schedule_id": 2,
          "creared_at": "2024-06-24 21:27:11",
          "updated_at": "2024-06-24T21:27:11.000000Z",
          "schedule": {
              "id": 2,
              "user_id": 102,
              "start_date": "2024-06-24",
              "end_date": "2024-06-24",
              "start_time": "23:00:00.000000",
              "end_time": "23:30:00.000000",
              "days": "Tuesday,Thursday,Saturday",
              "updated_at": "2024-06-24T20:33:36.000000Z",
              "created_at": "2024-06-24T20:33:36.000000Z"
          }
      },
      {
          "id": 5,
          "content_user_id": 2,
          "content_screen_id": 5,
          "content_type": "",
          "content_content": "<div >\r\n                    <video class=\"w-full h-full object-cover\" autoplay muted loop>\r\n        <source src=\"http://localhost:8000/video/test.mp4\" type=\"video/mp4\">\r\n        Your browser does not support the video tag.\r\n    </video>\r\n                  </div>",
          "content_schedule_id": 3,
          "creared_at": "2024-06-24 21:39:00",
          "updated_at": "2024-06-24T21:39:00.000000Z",
          "schedule": {
              "id": 3,
              "user_id": 103,
              "start_date": "2023-10-15",
              "end_date": "2023-10-21",
              "start_time": "10:00:00.000000",
              "end_time": "19:00:00.000000",
              "days": "Saturday,Sunday",
              "updated_at": "2024-06-24T20:33:36.000000Z",
              "created_at": "2024-06-24T20:33:36.000000Z"
          }
      }
  ]
}

app.get('/get-content', (req, res) => {
  console.log('check-content', req.query);
  

  res.send(contents)
});

const sendResponse = (res, statusCode, status, data, message) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data
  });
};
// /check-install rotasını tanımla

let device_id = null
const licenceKey = 'XXXX-YYYY-XXXX'
app.get('/check-setup', (req, res) => {
  
  console.log('check-install');
  

  let responseData ;
  console.log('device_id', req.query.device_id);
  if (req.query.device_id == device_id) {

   responseData = {
    server: "running",
    setupStatus: true,
    message: 'XYZ123abc',
    data: {
      licenceKey: licenceKey,
      userId: '123123123'
    },

  };
 } else {
  device_id = req.query.device_id;
  responseData = {
    server: "running",
    setupStatus: false,
    data:null
 }
 }

  sendResponse(res, 200, 200, responseData, 'Server installation check successful');
});

// Bir POST isteği işleyicisi oluşturuyoruz
app.post('/post', (req, res) => {
  const body = req.body;
  res.send(`POST isteği başarılı! Gönderilen veri: ${JSON.stringify(body)}`);
});

app.post('/setup', (req, res) => {
 
  const responseData = {
    setupStatus:true,
    message:'Waiting '
  }


  
  sendResponse(res, 200, 200, responseData, '-');
});
// Bir POST isteği işleyicisi oluşturuyoruz

const user_id = '123123123'
app.post('/setup2', (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    sendResponse(res, 400, 400, null, 'No data sent');
    return;
  }

  if (!body.user_id) {
    sendResponse(res, 400, 400, null, 'User ID not sent');
    return;
  }
   
  let responseData = {
    instsalsation_status: 'waiting',
    installation_id: '1234',
       
  };
  if (body.user_id !== user_id) {
     responseData = {
      instsalsation_status: 'waiting',
      installation_id: null,
         
    };
  }  else {
    installation_status = true;
    responseData = {
      instsalsation_status: 'waiting',
      installation_id: '1234',
         
    };
  }

  
  sendResponse(res, 200, 200, responseData, '-');
});


app.post('/finish-setup', (req, res) => {
  const body = req.body;
  console.log(body);

  sendResponse(res, 200, 200, null, 'No data sent');
});

// Sunucuyu belirttiğimiz portta çalıştırıyoruz
app.listen(PORT, HOST, () => {
  console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});