<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|unique:users,phone,' . $user->id,
            'password' => 'nullable|string|min:6',
            'profileImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->has('name')) $user->name = $request->name;
        if ($request->has('phone')) $user->phone = $request->phone;
        if ($request->filled('password')) $user->password = Hash::make($request->password);

        // رفع الصورة
       // رفع الصورة
if ($request->hasFile('profileImage')) {

    // حذف القديمة إذا موجودة
    if ($user->profile_image) {
        $oldPublic = public_path('profile_images/' . $user->profile_image);
        if (file_exists($oldPublic)) {
            @unlink($oldPublic);
        }
    }

    $file = $request->file('profileImage');
    $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();

    $publicDir = public_path('profile_images');
    if (!file_exists($publicDir)) mkdir($publicDir, 0777, true);

    // تحريك الملف مباشرة إلى public/profile_images
    $file->move($publicDir, $filename);

    $user->profile_image = $filename;
}



        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'profile_image' => $user->profile_image
                    ? asset('profile_images/' . $user->profile_image)
                    : null,
            ]
        ]);
    }
}
