<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    //Relación muchos a muchos
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    //Relación de uno a muchos
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

}
