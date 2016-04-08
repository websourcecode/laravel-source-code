<?php
/**
 * Created by PhpStorm.
 * User: Rob
 * Date: 24/11/2015
 * Time: 17:34
 */

namespace App;
use Illuminate\Database\Eloquent\Model as Eloquent;


class Board extends Eloquent
{
    protected $fillable = [
        'boardname','boardblurb','pincode','admin'
    ];
}