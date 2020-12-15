<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class LogController extends Controller
{
    public function index(): Collection
    {
        return Log::all();
    }
}
