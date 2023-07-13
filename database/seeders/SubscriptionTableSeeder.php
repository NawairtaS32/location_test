<?php

use Illuminate\Database\Seeder;
use App\Models\Subscription;

class SubscriptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscriptions = [
            [
                'email' => 'subscriber1@example.com',
                'ip' => '192.168.0.1',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber2@example.com',
                'ip' => '192.168.0.2',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber3@example.com',
                'ip' => '192.168.0.3',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber4@example.com',
                'ip' => '192.168.0.4',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber5@example.com',
                'ip' => '192.168.0.5',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber6@example.com',
                'ip' => '192.168.0.6',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber7@example.com',
                'ip' => '192.168.0.7',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber8@example.com',
                'ip' => '192.168.0.8',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber9@example.com',
                'ip' => '192.168.0.9',
                'created_at' => now(),
            ],
            [
                'email' => 'subscriber10@example.com',
                'ip' => '192.168.0.10',
                'created_at' => now(),
            ],
        ];

        foreach ($subscriptions as $subscription) {
            Subscription::create($subscription);
        }
    }
}
