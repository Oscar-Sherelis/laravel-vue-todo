<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Learn Vue.js',
                'description' => 'Study Vue 3 composition API and best practices',
                'is_completed' => false,
            ],
            [
                'title' => 'Build Laravel API',
                'description' => 'Create REST API with proper validation and error handling',
                'is_completed' => true,
            ],
            [
                'title' => 'Setup PostgreSQL',
                'description' => 'Configure database and run migrations',
                'is_completed' => true,
            ],
            [
                'title' => 'Style with Vuetify',
                'description' => 'Create beautiful UI components with Material Design',
                'is_completed' => false,
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}