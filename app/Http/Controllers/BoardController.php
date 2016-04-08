<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Board;


class BoardController extends Controller
{
    public function __construct(Board $board)
    {


        $this->board = $board;
    }

    public function index(Board $board)
    {                $boards = $board->get();

                return view('board', compact('boards'));

    }
    public function show(Board $board)
{
    // $theboard = Board::whereSlug($pincode)->first();

    return view('theboard',compact('board'));

}
    public function edit(Board $board)
    {


        return view('boardedit',compact('board'));

    }
    public function update(Board $board, Request $request)
    {
        $board->fill($request->input())->save();




            return redirect('board');



    }

    public function create(Board $board, Request $request)
    {

        return view('build');



    }
    public function store(Board $board, Requests\CreateBoardrequest $request)
    {

        $board->create($request->all());

        return redirect('board');


    }

    public function destroy(Board $board)
    {

        $board->delete();

        return redirect('board');



    }



}