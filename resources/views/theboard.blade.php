
@extends('app')

@section('content')
    <div class="container">

    <h2> {{$board->boardname}}</h2>
    <h2> {{$board->boardblurb}}</h2>
<!-- Search form -->


    @include('comments::display', ['boardname' => 'page1'])


</div>


@endsection

