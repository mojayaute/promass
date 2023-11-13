<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Log;

class BlogController extends Controller
{

    public function index()
    {
        $posts = Blog::all();
        return response()->json($posts, 200);
    }

    public function show($id)
    {
        try {
            $post = Blog::findOrFail($id);
            if (!$post) {
                return response()->json(['status' => false, 'message' => 'No existe ese post.', 'data' => null], 404);
            }
            return response()->json($post, 200);
        } catch (\Exception $e) {
            Log::info("BlogController->show() | " . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }
    
    public function save(Request $request, $id = null)
    {
        try {
            $post = Blog::updateOrCreate(['id' => $id], $request->all() );
            return response()->json(['status' => true, 'message' => 'Tarea Guardada.', 'data' => $post], 200);

        } catch (\Exception $e) {
            Log::info("TaskController->save() | " . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }
}