@extends('app')

@section('content')
<div class='container'>
<h2>Edit {{ $board -> boardname }}</h2>

{!!Form::model($board, ['url'=>'board/' . $board->boardname,'method'=>'PATCH' ])!!}


<div class="form-group">

    {!!   Form::label('boardname', 'Board Name', array('class' => 'w-form-label checkboxtext'))!!}
{!! Form::text('boardname', null, ['class'=>'form-control']) !!}</div>

    <div class="form-group">

{!! Form::textarea('boardblurb', null, ['class'=>'form-control']) !!}</div>

        <div class="form-group">
{!! Form::text('pincode', null, ['class'=>'form-control']) !!}</div>

            <div class="form-group">
{!! Form::text('admin', null, ['class'=>'form-control']) !!}</div>
    {!! Form::submit('Update Board',['class'=>'btn btn-primary']) !!}

{!!Form::close()!!}
    {!!Form::open(['method' =>'DELETE','route'=>['board.destroy',$board->boardname]])!!}


    {!! Form::submit('Delete',['class'=> 'btn btn-danger']) !!}


    {!! Form::close() !!}
</div>

@endsection