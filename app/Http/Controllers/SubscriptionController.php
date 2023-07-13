<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::all();

        return inertia('Subscription/Index', compact('subscriptions'));
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => ['required', 'email', Rule::unique('subscriptions')],
                'ip' => 'required|ip',
            ]);

            Subscription::create([
                'email' => $request->email,
                'ip' => $request->ip(),
            ]);

            return redirect()->route('subscription.index')->with('success', 'Subscription created successfully');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        }
    }
}





