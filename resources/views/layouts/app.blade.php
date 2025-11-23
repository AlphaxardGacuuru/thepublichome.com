<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta name="viewport"
		  content="width=device-width, initial-scale=1">
	{{-- Change address bar color Chrome, Firefox OS and Opera --}}
	<meta name="theme-color"
		  content="#232323" />
	{{-- iOS Safari --}}
	<meta name="apple-mobile-web-app-status-bar-style"
		  content="#232323">
	<meta name="description"
		  content="The Public Home" />

	<!-- CSRF Token -->
	<meta name="csrf-token"
		  content="{{ csrf_token() }}">

	<title>{{ config('app.name', 'The Public Home') }}</title>

	<!-- Favicon  -->
	<link rel="icon"
		  href="img/favicon-32x32.png">

	{{-- Manifest --}}
	<link rel="manifest"
		  type="application/manifest+json"
		  href="manifest.webmanifest">

	<!-- Styles -->
	<link href="{{ asset('css/app.css') }}"
		  rel="stylesheet">

	<!-- Styles -->
	<link href="{{ asset('css/custom.css') }}"
		  rel="stylesheet">

	{{-- IOS support --}}
	<link rel="apple-touch-icon"
		  href="img/musical-note.png">
	<meta name="apple-mobile-web-app-status-bar"
		  content="#aa7700">

</head>

<body>
	<noscript>
		<center>
			<h2 class="m-5">
				We're sorry but {{ config('app.name', 'The Public Home') }}
				doesn't work properly without JavaScript enabled.
				Please enable it to continue.
			</h2>
		</center>
	</noscript>

	<div id="app"></div>

	<!-- Scripts -->
	<script src="{{ asset('js/app.js') }}"
			defer></script>

</body>

</html>