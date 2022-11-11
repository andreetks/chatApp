import socketio

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='http://localhost:5173')
app = socketio.ASGIApp(sio)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.event
async def message(sid, data):
    print('hello')
    print(data)
    await sio.emit("message", { "sid": sid,"data": data})


@sio.event
def disconnect(sid):
    print('disconnect ', sid)

