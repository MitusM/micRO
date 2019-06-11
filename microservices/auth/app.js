const MicroMQ = require('micromq')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = new MicroMQ({
  name: 'auth',
  rabbit: {
    url: 'amqp://localhost'
  }
});

app.on('error', (err, req, res) => {
  res.status(err.status || 500);
  // console.log(err.message)

  res.json({
    error: err.message || 'Server error'
  });
});


app.use(async (req, res, next) => {
  try {
    await next();
  } catch (err) {
    // console.log(err.message)
    res.status(err.status || 500);
    res.json({
      error: err.message || 'Server error'
    });
    app.emit('error', err, req, res);
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())

// NOTE: Авторизация. 
app.get('/login', async (req, res) => { 
  res.json({
    ok: true,
  });
  // res.json(req.session)

})

// NOTE: Регистрация.
app.get('/signup', async (req, res) => {
  
  res.json({
    ok: 'signup',
  });

})

// app.listen(5000)
app.start()