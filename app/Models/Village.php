<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    protected $table = 'reg_villages';

    protected $fillable = ['name', 'district_id'];

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }
}
