<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all(); 
        return CategoryResource::collection($categories);
        
    }


    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        
        try {
            $category = Category::create([
                'name' => $validated['name'], 
            ]);

          
            return response()->json([
                'message' => 'Category successfully added!',
                'data' => $category,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'An error occurred while adding the category.',
            ], 500); 
        }
    }


    public function destroy($id){
        try{

            $category = Category::findOrFail($id);
            $category->delete();

        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'An error occurred while deleting the category.',
            ], 500); 
        }
    }

}
