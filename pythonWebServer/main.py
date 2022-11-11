import socketio

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.event
async def message(sid, data):
    print('hello')
    await sio.emit("nullish", {"data": "sada"})
    print(data)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)

