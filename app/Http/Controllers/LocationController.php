<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        return inertia('Location/Index');
    }

    public function getProvinces()
    {
        $provinces = Province::all();
        return response()->json(['provinces' => $provinces]);
    }

    public function getRegencies(Request $request, $provinceId)
    {
        $regencies = Regency::where('province_id', $provinceId)->get();
        return response()->json(['regencies' => $regencies]);
    }

    public function getDistricts(Request $request, $regencyId)
    {
        $districts = District::where('regency_id', $regencyId)->get();
        return response()->json(['districts' => $districts]);
    }

    public function getVillages(Request $request, $districtId)
    {
        $villages = Village::where('district_id', $districtId)->get();
        return response()->json(['villages' => $villages]);
    }
}
