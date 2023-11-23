<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullName' => 'required|string',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'phoneNumber' => ['required', 'regex:/^[6-9]\d{9}$/', Rule::unique('users', 'phone_number')],
            'password' => 'required|string'
        ];
    }
}
