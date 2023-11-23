<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\MailUpload;
use App\Models\User;
use Illuminate\Http\Request;

class MailController extends Controller
{
    public function post_mail(Request $request)
    {

        $validator = $this->validate($request, [
        'to' => 'required',
        'subject' => 'required',
        'body' => 'required',
        ]);

        if ($validator) {
            $data = $validator->messages();
            return response()->json([
                'status' => false,
                'message' => 'Validation Failed',
                "data"=>$data],
            400);
        }
        $user = auth()->user();
        $id = $user->id;
        $to = User::where('email',$request->to)->get('id');
        if($to->isEmpty()){
            return response()->json([
                'status' => false,
                'message' => 'Email not found',
                "data"=>[],
            ]);
        }
        if($id == $to[0]->id){
            return response()->json([
                'status' => false,
                'message' => 'You cannot send mail to yourself',
                "data"=>[],
            ]);
        }

        $mail = new Mail();
        $mail->from = $id;
        $mail->to = $to[0]->id;
        $mail->subject = $request->subject;
        $mail->body = $request->body;
        $mail->save();
        $mail_id = $mail->id;

        $files = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $key => $file) {
                $file_name = time() . rand(1, 99) . '.' . $file->extension();
                $file->move(public_path('mail_uploads'), $file_name);
                $files[] = ['mail_id' => $mail_id, 'file' => $file_name];
            }
        }

        foreach ($files as $file) {
            MailUpload::create($file);
        }
        return response()->json([
            'status' => true,
            'message' => 'Mail sent successfully',
            "data"=>[],
        ]);

    }

    public function get_mail($id){
        $mail = Mail::find($id);
        $id = auth()->user()->id;
        if($mail){
            $from_user = User::find($mail->from);
            $mail->username = $from_user->username;
            $mail->email = $from_user->email;
            if($mail->from != $id && $mail->to != $id  ){
                return response()->json([
                    'status' => false,
                    'message' => 'You are not authorized to view this mail',
                    "data"=>[],
                ]);
            }
            $mail->files = MailUpload::where('mail_id',$mail->id)->get(['file']);
            return response()->json([
                'status' => true,
                'message' => 'Mail retrieved successfully',
                "data"=>$mail,
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Mail not found',
            "data"=>[],
        ]);

    }

    public function get_all_user_mails(){
        $user = auth()->user();
        $id = $user->id;
        $mails = Mail::where('to',$id)->get();
        $mails->map(function($mail){
            $from_user = User::find($mail->from);
            $mail->username = $from_user->username;
            $mail->email = $from_user->email;
            $mail->files = MailUpload::where('mail_id',$mail->id)->get(['file']);
            return $mail;
        });
        return response()->json([
            'status' => true,
            'message' => 'Mails retrieved successfully',
            "data"=>$mails,
        ]);
    }

    public function validate(Request $request, array $rules, array $messages = [], array $customAttributes = []) : object|bool
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            return $validator;
        }
        return false;
    }
}
