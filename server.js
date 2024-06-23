
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

app.get('/check-content', (req, res) => {
  console.log('check-content', req.query);
  res.send({
    conten_id:null,
    content:null,
    content_:`<div class=" grid  grid-cols-3 gap-2"> 
    <div class="lg:col-span-1"> 
    
        <video class="w-full h-full object-cover" autoplay loop>
            <source src="https://videos.pexels.com/video-files/8879540/8879540-uhd_1440_2732_25fps.mp4"
                type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="lg:col-span-1">
        <img src="https://i.ibb.co/SsBjPjf/Black-Watercolor-Food-and-Drink-Menu-1.png" alt="Image 2"
            class="w-full h-full object-cover">
    </div>
    <div class="lg:col-span-1">
        <img src="https://i.ibb.co/Xx2fFR3/Black-Watercolor-Food-and-Drink-Menu.png" alt="Image 3"
            class="w-full h-full object-cover">
    </div>
</div>`
  });
});

const sendResponse = (res, statusCode, status, data, message) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data
  });
};
// /check-install rotasını tanımla
let installation_status = false;
app.get('/check-install', (req, res) => {
  
  console.log('check-install');
  const responseData = {
    server: "running",
    instalation_status: installation_status,
    user_id: 'XYZ123abc',
    licence_key: 'xxxx-yyyy-zzzz-aaaa',

  };

  sendResponse(res, 200, 200, responseData, 'Server installation check successful');
});

// Bir POST isteği işleyicisi oluşturuyoruz
app.post('/post', (req, res) => {
  const body = req.body;
  res.send(`POST isteği başarılı! Gönderilen veri: ${JSON.stringify(body)}`);
});


// Bir POST isteği işleyicisi oluşturuyoruz

const user_id = '123123123'
app.post('/start-setup', (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});