<?php


namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    public $response = ['status' => false, 'message' => ''];
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    protected function failedValidation(Validator $validator)
    {
        $this->response['message'] = $validator->errors()->first();
        throw new HttpResponseException(
            response([$this->response], 422)
        );
    }
    public function rules(): array
    {
        return [
            'task_name' => "required|string",
            'task_changes' => 'required|string',
            'user_id' => 'required',
            'task_submission_date' => 'required'
        ];
    }
}
