<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todolist;

class TodoController extends Controller
{
    //get all data
    public function getData(Request $request){
      if($request->status == 3){

          $all_data = Todolist::orderBy('id','desc')->where('status','!=',3)->get();
      }else{
        $all_data = Todolist::orderBy('id','desc')->where('status',$request->status)->get();
      }
        return response()->json($all_data);
    }

    //store method
    public function store(Request $request){
        if ($request->ajax()){
        $title = $request->title; //input data 

        if($title != null){ //empty data is not inserted
            Todolist::insert(
                [
                    'title' => $title,
                    'status' => 1,
                    'created_at' => date('Y-m-d H:i:s'),

                ]
            );
        } 
        }

        return response()->json(['success'=>'Store Successfully']);
    }

    // update todo 
    public function update(Request $request){
        if ($request->ajax()){
            if(!empty($request->status)){ //update status
              
                Todolist::where('id',$request->id)->update(
                    [
                        'status' => $request->status,
                        'updated_at' => date('Y-m-d H:i:s'),
    
                    ]
                );
            }
            return response()->json(['success'=>'updated Successfully']); 
        }
    }

    // edit todo 
    public function edit(Request $request){
        if ($request->ajax()){
            if(!empty($request->title)){ //update status
              
                Todolist::where('id',$request->id)->update(
                    [
                        'title' => $request->title,
                        'updated_at' => date('Y-m-d H:i:s'),
    
                    ]
                );
            }
            return response()->json(['success'=>'updated Successfully']); 
        }
    }

    // clear complete todo 
    public function clear(Request $request){
        if ($request->ajax()){
            if(!empty($request->status)){ //update status
                
                Todolist::where('status',2)->delete();
            }
            return response()->json(['success'=>'Clear Successfully']); 
        }
    }


}
