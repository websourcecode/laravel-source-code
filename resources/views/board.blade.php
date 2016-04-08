@extends('app')

@section('content')
<h1>   All Discussion Boards </h1>
        @foreach ($boards as $b)
            <li><a href="/board/{{ $b->boardname }}"> {{$b->boardname}}</a></li>
            @endforeach
@endsection