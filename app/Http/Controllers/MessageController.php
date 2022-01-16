<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function sent(Request $request)
    {
        // Este método sirve para almacenar el mensaje
        // $message = $request->user()->messages()->create([]); 
        // $message = $request->user()->messages()->create(['message' => $request->message]);

        /* $message = $request->user()->messages()->create($request->all())->load('user'); */ // Este método es más eficiente

        $message = auth()->user()->messages()->create([
            'content' => $request->message,
            'chat_id' => $request->chat_id
        ])->load('user');
        
        return $message;        
    }
}
